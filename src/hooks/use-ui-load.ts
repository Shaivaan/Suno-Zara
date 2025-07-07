import useZustandStore from "@/Zustand/store";
import useLocalStorage from "./use-localstorage";
import { localStorageKeys } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useIndexedDBLibSong } from "./use-indexdb";

const useUILoad = ()=>{
  const [isLoaded,setIsLoaded] = useState(false);
  const {getData} = useLocalStorage(localStorageKeys.volume);
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const handleLibraryData = useZustandStore((state)=>state.handleLibraryData);
  const {getLikedSongs} = useIndexedDBLibSong();

  const handleStoreVolume = useCallback(()=> {
    const lsVolume = getData();
    const volume = lsVolume ? +lsVolume : 100
    handleMusicPlayer({volume});
  },[]) 

  const getStoredSongs  = useCallback(async()=>{
    try{
      const likeSongs = await getLikedSongs();
      handleLibraryData({songs: likeSongs}); 
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