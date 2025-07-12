import useZustandStore from "@/Zustand/store";
import useLocalStorage from "./use-localstorage";
import { localStorageKeys } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { indexDbUtils, useGetDBDataHook } from "./use-indexdb";
const {likeAlbums,likeArtist,likePlaylist} = indexDbUtils.storeNames;

const useUILoad = ()=>{
  const [isLoaded,setIsLoaded] = useState(false);
  const {getData} = useLocalStorage(localStorageKeys.volume);
  const {getData:getLastSongPlayed} = useLocalStorage(localStorageKeys.lastPlayedSongId);
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const handleLibraryData = useZustandStore((state)=>state.handleLibraryData);
  const handleQueueSongs = useZustandStore((state)=>state.handleQueueSongs);
  const {getLikedSongs,getLibraryData,getQueueData} = useGetDBDataHook();

  const handleStoreVolume = useCallback(()=> {
    const lsVolume = getData();
    const volume = lsVolume ? +lsVolume : 100
    handleMusicPlayer({volume});
  },[]) 

  const getStoredSongs  = useCallback(async()=>{
    try{
      const songs = await getLikedSongs();
      const album = await getLibraryData(likeAlbums);
      const artist = await getLibraryData(likeArtist);
      const playlist = await getLibraryData(likePlaylist);
      const queueSongs = await getQueueData();
      handleLibraryData({songs,album,artist,playlist}); 
      handleQueueSongs(queueSongs);
    }catch(err){

    }
  },[])

  const handleLastSongPlayed = useCallback(()=>{
    const lastSongId = getLastSongPlayed();
    if(lastSongId) handleMusicPlayer({currentSongId:lastSongId});
  },[])

  const handleFirstLoad = useCallback(()=>{
    getStoredSongs();
    handleStoreVolume();
    handleLastSongPlayed();
    setIsLoaded(true);
  },[])

  useEffect(()=>{
    if(!isLoaded) handleFirstLoad();
  },[]);
};


export default useUILoad;