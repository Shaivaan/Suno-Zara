import useZustandStore from "@/Zustand/store"
import { useCallback, useMemo } from "react";
import useCurrentScreen from "./use-currentscreen";
import { indexDbUtils, useIndexedDbLibraryData, useIndexedDBLibSong } from "./use-indexdb";
import useToast from "./use-toast";

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
  const { songs: favoriteSongs, album:favAlbums , playlist:favPlaylist, artist : favArtist } = useZustandStore((state) => state.libraryData);
  const handleLibraryData = useZustandStore((state) => state.handleLibraryData);
  const {addSongToDB,removeSongFromDB} = useIndexedDBLibSong();
  const {addToLibrary, removeFromLibrary} = useIndexedDbLibraryData();
  const {triggerFlagMessage, triggerMessage} = useToast();
  
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

  const updateFavorites = <T extends {id:string}>(isLiked: boolean, song: T,favList: T[],keyName = 'id'): T[] => {
    if (isLiked) {
      return favList.filter(({ [keyName as 'id']:id }) => id !== song[keyName as 'id']);
    } else {
      const isAlreadyFavorite = favList.some(({ [keyName as 'id']:id }) => id === song.id);
      return isAlreadyFavorite ? favList : [...favList, song];
    }
  };

const markSongFav = useCallback(async (targetSongId: string, isLiked: boolean, isQueue = false) => {
    try {
      const song = getSongById(targetSongId, isQueue);
      
      if (!song) {
        console.warn(`Song with ID ${targetSongId} not found`);
        return;
      }

      if (isLiked) await removeSongFromDB(song.id);
      else await addSongToDB(song, song.id);

      const updatedFavorites = updateFavorites(isLiked, song, favoriteSongs);
      handleLibraryData({ songs: updatedFavorites });
      triggerFlagMessage(isLiked);

    } catch (error) {
      const errorMessage = isLiked 
        ? 'Failed to remove song from favorites' 
        : 'Failed to add song to favorites';
      triggerMessage(errorMessage,'error');
    }
  }, [getSongById, updateFavorites, handleLibraryData, removeSongFromDB, addSongToDB]);


  const markAlbumPlaylistArtistFav=async(albumPlaylistData : AlbumsCardType | ArtistCardType,type :LibrarySectionType,isLiked:boolean)=>{
    try {
      const isAlbum = type === 'album';
      const favData =  isAlbum ?  favAlbums : type === 'playlist' ? favPlaylist : favArtist;  
      const idKey = type === 'artist' ? 'artistid' : 'id';
      const idValue = (albumPlaylistData as AlbumsCardType)[idKey as 'id'] as string;
      if (isLiked) await removeFromLibrary(idValue,getStoreName(type));
      else await addToLibrary(albumPlaylistData , idValue , getStoreName(type));

      const data = updateFavorites(isLiked,albumPlaylistData as AlbumsCardType, favData as AlbumsCardType[],type === 'artist'  ? 'artistid' : undefined);
      handleLibraryData({[type] : [...data]});
      triggerFlagMessage(isLiked);

    }catch(err){
        const errorMessage = isLiked 
        ? 'Failed to remove song from favorites' 
        : 'Failed to add song to favorites';
      triggerMessage(errorMessage,'error');
    }
  };
  return { markSongFav, favSongNumber : favoriteSongs.length, favoriteSongs, markAlbumPlaylistArtistFav, favAlbums, favPlaylist, favArtist };
};

const getStoreName = (type : LibrarySectionType)=>{
  const {storeNames : {likeArtist,likeAlbums,likePlaylist}} = indexDbUtils;
  switch(type){
    case 'album' : return likeAlbums;
    case 'artist' : return likeArtist;
    case 'playlist' : return likePlaylist;
  }
};

const useLikeFlag = (id:string,type:LibrarySectionType | 'song')=>{
    const {songs,album, playlist, artist} = useZustandStore((state)=>state.libraryData);
    const favSongsIds = useMemo(()=>songs.map(({id})=>id) ,[songs.length]);
    const favAlbums = useMemo(()=>album.map(({id})=>id) ,[album.length]);
    const favPlaylist = useMemo(()=>playlist.map(({id})=>id) ,[playlist.length]);
    const favArtist = useMemo(()=>artist.map(({artistid})=>artistid) ,[artist.length]);
    const isFlagged = useMemo(()=>{
      switch(type){
        case 'song' : return favSongsIds.includes(id);
        case 'album' : return favAlbums.includes(id);
        case 'playlist' : return favPlaylist.includes(id);
        case 'artist' : return favArtist.includes(id);
        default : return false;
      }
    },
    [type,favSongsIds,favAlbums,favPlaylist,favArtist,id]
    // [songs.length,type, favSongsIds.length,favAlbums.length,album.length,favPlaylist.length,album.length, favArtist.length,artist.length]
  );
    return isFlagged;   
};

export default useMusicBar;
export {useCurrentSongCheck , usePlaySong, useQueue ,useCurrentSongInfo, useLibraryData, useLikeFlag};