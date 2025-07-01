import useZustandStore from "@/Zustand/store"
import { useCallback, useMemo } from "react";
import useCurrentScreen from "./use-currentscreen";
import { toast } from "sonner";
import { toastMessages } from "@/lib/utils";

const useMusicBar = ()=>{
    const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
    const duration = useZustandStore((state)=>state.musicPlayerData).duration as number;
    const repeatMode = useZustandStore((state)=>state.repeatMode);
    const {isPlaying,currentTime,sliderValue, isLastSongPlayed} = useZustandStore((state)=>state.musicPlayerData);
    const currentSongId = useZustandStore((state)=>state.musicPlayerData.currentSongId);
    const queueSongs = useZustandStore((state)=>state.queueSongs);
    const togglePlayPause = (isPlaying=false):void=>handleMusicPlayer({isPlaying});
    

    const handleMusicSlider = (audio:HTMLAudioElement | null, value:number[])=>{
        if(!audio) return;
        const newTime = (value[0] / 100) * duration;
        audio.currentTime = newTime;
        handleMusicPlayer({currentTime:newTime,sliderValue:value});
    }

    const updateTime = useCallback((current:number): void => {
      const progress = (current / duration) * 100;
      handleMusicPlayer({currentTime:current,sliderValue:[progress]});
    },[repeatMode,duration,isLastSongPlayed]);

    const handleNextSongAsPerMode = (audio : HTMLAudioElement )=> {
      switch (repeatMode){
        case 'repeat' : audio.play(); break;
        case 'normal' : playNextPrev(); break;
        case 'repeatOne' : handleRepeatOneLogic(audio); break;
      }
    }

    const handleRepeatOneLogic = (audio : HTMLAudioElement) => {    
      if (!isLastSongPlayed) {
        audio.play();
        handleMusicPlayer({isLastSongPlayed: true});
      }
      else playNextPrev();
    };


    const playNextPrev = useCallback((isPrev = false) => {
      const currIndex = queueSongs.findIndex(({id}) => id === currentSongId);
      if (currIndex === -1) return;
      const nextSongIndex = isPrev ? currIndex - 1 : currIndex + 1;
      let newSongId = queueSongs[nextSongIndex]?.id;
      if (newSongId === undefined) newSongId = queueSongs[isPrev ? queueSongs.length - 1 : 0]?.id;
      if(newSongId === currentSongId) { //if only song if queue stop playing
        handleMusicPlayer({isPlaying:false}); 
        return;
      } 
      if (newSongId) handleMusicPlayer({currentSongId: newSongId});
    }, [queueSongs, currentSongId, handleMusicPlayer]);


    const isCurrentSong = useCallback((id : string)=> currentSongId === id,[currentSongId]);
    return {isLastSongPlayed ,repeatMode,isCurrentSong ,togglePlayPause, handleMusicSlider, updateTime, playNextPrev, isPlaying, currentTime, sliderValue, duration , name, currentSongId, handleNextSongAsPerMode}
}


const useCurrentSongCheck = (id:string)=>{
  const {isCurrentSong, currentSongId} = useMusicBar();
  const queueSongs = useZustandStore((state)=>state.queueSongs);
  const isPlaying = useMemo(()=>isCurrentSong(id),[id,currentSongId,queueSongs.length]);
  return isPlaying;
}

const usePlaySong = (songId = '') => {
  const queueSongs = useZustandStore((state)=>state.queueSongs);
  const isCurrentSongPlaying = useCurrentSongCheck(songId);
  const { isPlaying, togglePlayPause, currentSongId } = useMusicBar();
  const { data: playlistData } = useZustandStore((state) => state.albumPlayListScreenData);
  const { songData } = useZustandStore((state) => state.searchScreenData);
  const handleQueueSongs = useZustandStore((state) => state.handleQueueSongs);
  const handleMusicPlayer = useZustandStore((state) => state.handleMusicPlayer);
  const currentScreen = useCurrentScreen();


  const handleGenreScreenPlayback = useCallback((targetSongId: string) => {
    if (!playlistData?.length) return;
    const songToPlay = targetSongId || playlistData[0]?.id;
    if (!songToPlay) return;
    const queue = playlistData;
    handleQueueSongs(queue);
    handleMusicPlayer({ currentSongId: songToPlay });
    togglePlayPause(true);
  }, [playlistData, handleQueueSongs, handleMusicPlayer, togglePlayPause]);

  /**
   * Handles song playback for Search screen
   */
  const handleSearchScreenPlayback = useCallback((targetSongId: string) => {
    const songToPlay = songData.find(({id})=>id === targetSongId) as SongListType;
    const curSongIndex = queueSongs.findIndex(({id})=> id === currentSongId);
    const prevSongs = queueSongs.filter((_song,index)=>index <= curSongIndex);
    const nextSongs = queueSongs.filter((_song,index)=>index > curSongIndex);
    const newQueue = [...prevSongs,songToPlay,...nextSongs];
    handleQueueSongs(newQueue);
    handleMusicPlayer({ currentSongId: targetSongId });
    togglePlayPause(true);
  }, [currentSongId]);

  /**
   * Main handler for song playback logic
   */
  const handleSongAndQueue = useCallback(() => {
    if (isCurrentSongPlaying) {
      togglePlayPause(!isPlaying);
      return;
    }

    // Handle different screens
    switch (currentScreen) {
      case 'Genre':
        handleGenreScreenPlayback(songId);
        break;
      
      case 'Search':
        handleSearchScreenPlayback(songId);
        break;
      
      default:
        console.warn(`Playback not supported for screen: ${currentScreen}`);
    }
  }, [
    isCurrentSongPlaying,
    isPlaying,
    currentScreen,
    songId,
    togglePlayPause,
    handleGenreScreenPlayback,
    handleSearchScreenPlayback
  ]);


  const handleSongWithQueueUntouched = ()=>{
    if(isCurrentSongPlaying) {
      togglePlayPause(!isPlaying);
      return;
    }
    handleMusicPlayer({currentSongId:songId,isPlaying:true});
  }

  return {
    handleSongAndQueue,
    isCurrentSongPlaying,
    canPlay: Boolean(playlistData?.length || currentScreen === 'Search'),
    handleSongWithQueueUntouched
  };
};


const useQueue = ()=>{
  const queueSongs = useZustandStore((state)=>state.queueSongs);  
  const handleQueueSongs = useZustandStore((state)=>state.handleQueueSongs);
  const {currentSongId,playNextPrev} = useMusicBar();
  const currentSongNumber = useMemo(()=> queueSongs.findIndex(({id})=> id === currentSongId) + 1  ,[currentSongId,queueSongs])


   const deleteSongFromQueue = useCallback((targetSongId:string)=>{
      const filteredQueue = queueSongs.filter(({id})=>id !== targetSongId);
      handleQueueSongs([...filteredQueue]);
      if(targetSongId === currentSongId) playNextPrev();
    },[currentSongId,queueSongs.length,queueSongs]);
  return {queueLength: queueSongs.length, currentSongNumber, queueSongs, deleteSongFromQueue}
}


const useCurrentSongInfo = ()=>{
  const currentSongId = useZustandStore((state)=>state.musicPlayerData.currentSongId);
  const queue = useZustandStore((state)=>state.queueSongs);
  const currentSong = queue.find(({id})=>id === currentSongId);
  const [audioUrl, image, artist, name] = [currentSong?.url, currentSong?.image, currentSong?.artists, currentSong?.name];
  return {image,audioUrl,artist,name};
}


const useLibraryData = () => {
  const { songData: searchSongs } = useZustandStore((state) => state.searchScreenData);
  const { data: genreSongs } = useZustandStore((state) => state.albumPlayListScreenData);
  const { songs: favoriteSongs } = useZustandStore((state) => state.libraryData);
  const handleLibraryData = useZustandStore((state) => state.handleLibraryData);
  
  const { queueSongs } = useQueue();
  const currentScreen = useCurrentScreen();

  const sourceArray = useMemo(() => {
    return currentScreen === 'Search' ? searchSongs : genreSongs;
  }, [currentScreen, searchSongs, genreSongs]);

  const getSongById = useCallback((songId: string, isQueue: boolean): SongListType | undefined => {
    if (isQueue) {
      return queueSongs.find(({ id }) => id === songId);
    }
    
    return sourceArray.find(({ id }) => id === songId);
  }, [queueSongs, sourceArray]);

  const updateFavorites = useCallback((isLiked: boolean, song: SongListType): SongListType[] => {
    if (isLiked) {
      return favoriteSongs.filter(({ id }) => id !== song.id);
    } else {
      const isAlreadyFavorite = favoriteSongs.some(({ id }) => id === song.id);
      return isAlreadyFavorite ? favoriteSongs : [...favoriteSongs, song];
    }
  }, [favoriteSongs]);

  const markSongFav = useCallback((targetSongId: string, isLiked: boolean, isQueue = false) => {
    const song = getSongById(targetSongId, isQueue);
    
    if (!song) {
      console.warn(`Song with ID ${targetSongId} not found`);
      return;
    }

    // Show toast notification
    const message = !isLiked ? toastMessages.favourited : toastMessages.unfavourited;
    toast.success(message);

    // Update favorites
    const updatedFavorites = updateFavorites(isLiked, song);
    handleLibraryData({ songs: updatedFavorites });
  }, [getSongById, updateFavorites, handleLibraryData]);

  return { markSongFav };
};

const useLikeFlag = (id:string,type:LibrarySectionType | 'song')=>{
    const {songs} = useZustandStore((state)=>state.libraryData);
    const favSongsIds = useMemo(()=>songs.map(({id})=>id) ,[songs.length]);
    const isFlagged = useMemo(()=>{
      switch(type){
        case 'song' : return favSongsIds.includes(id);
        default : return false;
      }
    },
    [songs.length,type, favSongsIds.length]);
    return isFlagged;   
};

export default useMusicBar;
export {useCurrentSongCheck , usePlaySong, useQueue ,useCurrentSongInfo, useLibraryData, useLikeFlag};