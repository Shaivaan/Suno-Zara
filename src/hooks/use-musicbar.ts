import useZustandStore from "@/Zustand/store"
import { useCallback, useMemo } from "react";

const useMusicBar = ()=>{
    const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
    const {isPlaying,currentTime,sliderValue,} = useZustandStore((state)=>state.musicPlayerData);
    const currentSongIndex = useZustandStore((state)=>state.musicPlayerData.queueSongIndex) || 0;
    const queueSongs = useZustandStore((state)=>state.queueSongs);
    const currentSong = queueSongs?.[currentSongIndex];
    const currentSongId = currentSong?.id;
    const [duration, audioUrl, id, image, artist, name] = [currentSong?.duration, currentSong?.url, currentSong?.id, currentSong?.image, currentSong?.artists, currentSong?.name];
    const togglePlayPause = (isPlaying=false):void=>handleMusicPlayer({isPlaying});
    

    const handleMusicSlider = (audio:HTMLAudioElement | null, value:number[])=>{
        if(!audio) return;
        const newTime = (value[0] / 100) * duration;
        audio.currentTime = newTime;
        handleMusicPlayer({currentTime:newTime,sliderValue:value});
    }

    const updateTime = (current:number): void => {
      const progress = (current / duration) * 100;
      if(progress >= 100) handleMusicPlayer({isPlaying:false});
      handleMusicPlayer({currentTime:current,sliderValue:[progress]})
    };

    // const updateDuration = (audioDuration: number)=>{
    //     handleMusicPlayer({duration: audioDuration || duration});
    // }

    const isCurrentSong = useCallback((id : string)=> currentSongId === id,[currentSongId]);
    return {isCurrentSong ,togglePlayPause, handleMusicSlider, updateTime,isPlaying, currentTime, sliderValue, duration, audioUrl , id, image , name, artist,currentSongIndex, currentSongId}
}


const useCurrentSongCheck = (id:string)=>{
  const {isCurrentSong, currentSongId} = useMusicBar();
  const queueSongs = useZustandStore((state)=>state.queueSongs);
  const isPlaying = useMemo(()=>isCurrentSong(id),[id,currentSongId,queueSongs.length]);
  return isPlaying;
}

const usePlaySong = (id='') =>{
    const isCurrentSongPlaying = useCurrentSongCheck(id);
    const {isPlaying, togglePlayPause} = useMusicBar();
    const {data:currentPlaylistData} = useZustandStore((state)=>state.albumPlayListScreenData);
    const handleQueueSongs = useZustandStore((state)=>state.handleQueueSongs);
    const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);

    const handleSongAndQueue =  useCallback(()=>{
      if(isCurrentSongPlaying) {
        togglePlayPause(!isPlaying);
        return
      } 
      let readyQueue:SongListType[] = [];
      if(!id) readyQueue = currentPlaylistData;
      else {
        const selectedSong = currentPlaylistData.filter(({id:songId})=>id === songId);
        const upcomingSongs = currentPlaylistData.filter(({id:songId})=>id !== songId);
        readyQueue = [...selectedSong,...upcomingSongs];
      }
      handleQueueSongs(readyQueue);
      handleMusicPlayer({queueSongIndex : 0});
      togglePlayPause(true);
    },[isCurrentSongPlaying,currentPlaylistData,isPlaying,id])

    return {handleSongAndQueue};
};

export default useMusicBar;
export {useCurrentSongCheck , usePlaySong};