import useZustandStore from "@/Zustand/store"
import { useCallback, useMemo } from "react";
import useCurrentScreen from "./use-currentscreen";

const useMusicBar = ()=>{
    const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
    const duration = useZustandStore((state)=>state.musicPlayerData).duration as number;
    const repeatMode = useZustandStore((state)=>state.repeatMode);
    const {isPlaying,currentTime,sliderValue} = useZustandStore((state)=>state.musicPlayerData);
    const currentSongId = useZustandStore((state)=>state.musicPlayerData.currentSongId);
    const queueSongs = useZustandStore((state)=>state.queueSongs);
    const currentSong = queueSongs.find(({id})=> id === currentSongId ) as SongListType;
    const [audioUrl, id, image, artist, name] = [currentSong?.url, currentSong?.id, currentSong?.image, currentSong?.artists, currentSong?.name];
    const togglePlayPause = (isPlaying=false):void=>handleMusicPlayer({isPlaying});
    

    const handleMusicSlider = (audio:HTMLAudioElement | null, value:number[])=>{
        if(!audio) return;
        const newTime = (value[0] / 100) * duration;
        audio.currentTime = newTime;
        handleMusicPlayer({currentTime:newTime,sliderValue:value});
    }

    const updateTime = useCallback((current:number): void => {
      const progress = (current / duration) * 100;
      if(progress >= 100) handleNextSongAsPerMode(repeatMode);
      handleMusicPlayer({currentTime:current,sliderValue:[progress]});
    },[repeatMode,duration]);

    const handleNextSongAsPerMode = (repeatMode : RepeatModeType)=> {
      if(repeatMode === 'repeat') playCurrentSongAgain();
      else playNextPrev();
    }

    const playNextPrev = useCallback((isPrev = false) => {
      const currIndex = queueSongs.findIndex(({id}) => id === currentSongId);
      if (currIndex === -1) return;
      const nextSongIndex = isPrev ? currIndex - 1 : currIndex + 1;
      let newSongId = queueSongs[nextSongIndex]?.id;
      if (newSongId === undefined) newSongId = queueSongs[isPrev ? queueSongs.length - 1 : 0]?.id;
      if (newSongId) handleMusicPlayer({currentSongId: newSongId});
    }, [queueSongs, currentSongId, handleMusicPlayer]);

const playCurrentSongAgain = ()=>{
    const originalId = currentSongId;
    handleMusicPlayer({currentSongId: null, isPlaying: false,currentTime: 0,sliderValue: [0]});
    setTimeout(() => handleMusicPlayer({currentSongId: originalId, isPlaying: true,currentTime: 0,sliderValue: [0]}), 0);
}

    const isCurrentSong = useCallback((id : string)=> currentSongId === id,[currentSongId]);
    return {isCurrentSong ,togglePlayPause, handleMusicSlider, updateTime, playNextPrev, isPlaying, currentTime, sliderValue, duration, audioUrl , id, image , name, artist, currentSongId}
}


const useCurrentSongCheck = (id:string)=>{
  const {isCurrentSong, currentSongId} = useMusicBar();
  const queueSongs = useZustandStore((state)=>state.queueSongs);
  const isPlaying = useMemo(()=>isCurrentSong(id),[id,currentSongId,queueSongs.length]);
  return isPlaying;
}

const usePlaySong = (songId = '') => {
  const isCurrentSongPlaying = useCurrentSongCheck(songId);
  const { isPlaying, togglePlayPause } = useMusicBar();
  const { data: playlistData } = useZustandStore((state) => state.albumPlayListScreenData);
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
  const handleSearchScreenPlayback = useCallback((_targetSongId: string) => {
    // TODO: Implement search screen logic
    console.warn('Search screen playback not yet implemented');
  }, []);

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
  const {currentSongId} = useMusicBar();
  const currentSongNumber = useMemo(()=> queueSongs.findIndex(({id})=> id === currentSongId) + 1  ,[currentSongId,queueSongs])
  return {queueLength: queueSongs.length, currentSongNumber, queueSongs}
}

export default useMusicBar;
export {useCurrentSongCheck , usePlaySong, useQueue};