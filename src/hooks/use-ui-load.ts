import useZustandStore from "@/Zustand/store";
import useLocalStorage from "./use-localstorage";
import { localStorageKeys } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { indexDbUtils, useIndexedDbLibraryData, useIndexedDBLibSong } from "./use-indexdb";
const {likeAlbums,likeArtist,likePlaylist} = indexDbUtils.storeNames;

const useUILoad = ()=>{
  const [isLoaded,setIsLoaded] = useState(false);
  const {getData} = useLocalStorage(localStorageKeys.volume);
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const handleLibraryData = useZustandStore((state)=>state.handleLibraryData);
  const {getLikedSongs} = useIndexedDBLibSong();
  const {getLibraryData} = useIndexedDbLibraryData();

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
      handleLibraryData({songs,album,artist,playlist}); 
    }catch(err){

    }
  },[])

  const handleFirstLoad = useCallback(()=>{
    getStoredSongs();
    handleStoreVolume();
    setIsLoaded(true);
  },[])

  useEffect(()=>{
    if(!isLoaded) handleFirstLoad();
  },[]);
};


export default useUILoad;