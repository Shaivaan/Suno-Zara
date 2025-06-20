import useZustandStore from "@/Zustand/store"

const useMusicBar = ()=>{
    const {duration,isPlaying,currentTime,sliderValue, audioUrl,id} = useZustandStore((state)=>state.musicPlayerData);
    const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
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

    const updateDuration = (audioDuration: number)=>{
        handleMusicPlayer({duration: audioDuration || duration});
    }

    return {togglePlayPause, handleMusicSlider, updateTime,isPlaying, currentTime, sliderValue, duration, audioUrl, updateDuration , id}
}

export default useMusicBar;