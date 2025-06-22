import useZustandStore from "@/Zustand/store"

const useMusicBar = ()=>{
    const currentSongIndex = useZustandStore((state)=>state.musicPlayerData.queueSongIndex) || 0;
    const currentSong = useZustandStore((state)=>state.queueSongs)?.[currentSongIndex];
    const {isPlaying,currentTime,sliderValue,} = useZustandStore((state)=>state.musicPlayerData);
    const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
    const handleQueueSongs = useZustandStore((state)=>state.handleQueueSongs);
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

    const createNewQueueAndPlay = (songArray:SongListType[])=>{
      handleQueueSongs(songArray);
      handleMusicPlayer({queueSongIndex : 0});
      togglePlayPause(true);
    }; 

    return {createNewQueueAndPlay ,togglePlayPause, handleMusicSlider, updateTime,isPlaying, currentTime, sliderValue, duration, audioUrl , id, image , name, artist}
}

export default useMusicBar;