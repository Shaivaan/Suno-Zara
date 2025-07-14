import { Button } from "@/components/ui/button";
import { memo, useCallback, useEffect, useMemo, useRef, type ComponentProps, type ReactNode } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import { AlignJustify, Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeOff } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn, localStorageKeys } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import useZustandStore from "@/Zustand/store";
import Queue from "@/Screens/Queue/Queue";
import { formatTime } from "./utils";
import useMusicBar, { useCurrentSongInfo, useRecentlyPlayed } from "@/hooks/use-musicbar";
import useLocalStorage from "@/hooks/use-localstorage";

const MusicBarComp = () => {
  const queue = useZustandStore((state) => state.queueSongs);
  if (!queue.length) return <></>;
  return <div
    className={`p-2 sm:p-4 fixed bottom-0 w-full border-t-1 border-glass-border bg-glass-bg backdrop-blur-[40px] z-[var(--navbar-z-index)]
       grid grid-cols-3 sm:grid-cols-5 items-center gap-1 sm:gap-0
    `}
  >
    <div className="col-span-1"><SongNameWithAvatar/></div>
    <div className="col-span-2 sm:col-span-3"><PlayPausRewind /></div>
    <div className="hidden sm:flex sm:col-span-1 justify-end"><MusicBarButtons /></div>
  </div>;
};

const SongNameWithAvatarComp = () => {
  const { artist, name, image } = useCurrentSongInfo();
  return <div className="flex gap-2 sm:gap-4 items-center">
    <LazyAvatar className="rounded-[var(--border-radius-all)] h-[2.5rem] w-[2.5rem] sm:h-[3rem] sm:w-[3rem]" image={image as string} />
    <div className="max-w-full">
      <div className="threeDot text-[0.8rem] sm:text-[0.95rem] font-medium">{name}</div>
      <div className="hidden sm:block threeDot text-[0.7rem] label-text">{artist}</div>
    </div>
    <Separator orientation="vertical" className="text-sm !h-[2.5rem] sm:!h-[3rem] hidden sm:block" />
  </div>
}

interface MusicBarButtonType {
  children: ReactNode;
  tooltip?: string;
  className?: string
}

const PlayPauseReWindComp = () => {
  const {handleMusicSlider, togglePlayPause, updateTime, isPlaying, currentTime, sliderValue, playNextPrev, duration, currentSongId, handleNextSongAsPerMode } = useMusicBar();
  const {audioUrl} = useCurrentSongInfo();
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const audioRef = useRef<HTMLAudioElement>(null);
  const togglePlayer = () => togglePlayPause(!isPlaying);
  const handleSlider = (value: number[]) => handleMusicSlider(audioRef.current, value);
  const repeatMode = useZustandStore((state)=>state.repeatMode);
  const handleRepeatMode = useZustandStore((state)=>state.handleRepeatMode);
  const {addToRecentPlayed} = useRecentlyPlayed();
  const {setData:setLastPlayedToLS} = useLocalStorage(localStorageKeys.lastPlayedSongId);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTimeFigure = () => {
      const current = audio.currentTime;
      updateTime(current);
    };
    const updateDurationListener = () => handleMusicPlayer({duration : audio.duration});
    const handleNextSong = ()=> handleNextSongAsPerMode(audio);

    // Add event listeners
    audio.addEventListener('timeupdate', updateTimeFigure);
    audio.addEventListener('loadedmetadata', updateDurationListener);
    audio.addEventListener("ended", handleNextSong);

    // Cleanup function - remove listeners when component unmounts
    return () => {
      audio.removeEventListener('timeupdate', updateTimeFigure);
      audio.removeEventListener('loadedmetadata', updateDurationListener);
      audio.removeEventListener("ended", handleNextSong);
    };
  }, [duration, updateTime])

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio?.play();
    else audio?.pause();
  }, [isPlaying, currentSongId]);

  useEffect(()=>{
    if(currentSongId){
      handleMusicPlayer({isLastSongPlayed:false});
      addToRecentPlayed(currentSongId);
      setLastPlayedToLS(currentSongId);
    } 
    
  },[currentSongId])

    const handleMode = useCallback(()=>{
    switch(repeatMode){
      case 'normal' : handleRepeatMode('repeatOne'); break;
      case 'repeatOne' : handleRepeatMode('repeat'); break;
      case 'repeat' : handleRepeatMode('normal'); break;
    }
  },[repeatMode]);

  const getModeToolTip = useCallback(()=>{
    switch(repeatMode){
      case 'normal' : return 'Repeat off';
      case 'repeatOne' : return 'Repeat One';
      default : return 'Repeat on';
    }
  },[repeatMode]);

  return (
    <div className="flex flex-col gap-y-[0.3rem] sm:gap-y-[0.5rem] items-center justify-center w-full">
      <audio
        ref={audioRef}
        src={audioUrl as string}
        preload="metadata"
      />
      
      {/* Mobile: Simplified controls */}
      <div className="flex sm:hidden gap-3 items-center justify-center w-full">
        <MusicBarButton tooltip="Prev" onClick={()=>playNextPrev(true)} className="!w-[1.5rem] !h-[1.5rem]">
          <SkipBack size={16} />
        </MusicBarButton>
        <MusicBarButton onClick={togglePlayer} tooltip="Play" className="!px-[1rem] !py-[1rem] gradient-bg">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </MusicBarButton>
        <MusicBarButton tooltip="Next" onClick={()=>playNextPrev()} className="!w-[1.5rem] !h-[1.5rem]">
          <SkipForward size={16} />
        </MusicBarButton>
      </div>

      {/* Desktop: Full controls */}
      <div className="hidden sm:flex gap-5 items-center">
        <MusicBarButton tooltip="Shuffle"><Shuffle /></MusicBarButton>
        <MusicBarButton tooltip="Prev" onClick={()=>playNextPrev(true)}><SkipBack /></MusicBarButton>
        <MusicBarButton onClick={togglePlayer} tooltip="Play" className="!px-[1.25rem] py-[1.25rem] gradient-bg">
          {isPlaying ? <Pause /> : <Play />}
        </MusicBarButton>
        <MusicBarButton tooltip="Next" onClick={()=>playNextPrev()}><SkipForward /></MusicBarButton>
        <MusicBarButton tooltip={getModeToolTip()} onClick={handleMode}><SongModeHandlerComp/></MusicBarButton>
      </div>

      {/* Progress bar - responsive width */}
      <div className="flex gap-2 sm:gap-4 items-center label-text w-full sm:w-auto">
        <div className="text-[0.7rem] sm:text-[0.8rem] label-text">{formatTime(currentTime)}</div>
        <Slider
          value={sliderValue}
          onValueChange={handleSlider}
          max={100}
          step={0.1}
          className="cursor-pointer w-full sm:w-[25rem] relative mt-[0.2rem]"
        />
        <div className="text-[0.7rem] sm:text-[0.8rem] label-text">{formatTime(duration)}</div>
      </div>
    </div>
  );
};

export const MusicBarButton = ({ children, tooltip, className, ...props }: MusicBarButtonType & ComponentProps<'button'>) => {
  return (
    <Button
      variant={"secondary"}
      tooltip={tooltip}
      className={cn("hover:scale-[var(--scale-general)] cursor-pointer rounded-[45%] w-[1.9rem] h-[1.9rem]", className)}
      {...props}
    >
      {children}
    </Button>
  );
};

const MusicBarButtonComp = () => {
  const toggleQueue = useZustandStore((state)=>state.toggleQueue);

  return <div className="flex gap-4 items-center">
    <Separator orientation="vertical" className="text-sm !h-[3rem]" />
    <MusicBarButton tooltip="Queue" onClick={toggleQueue}><AlignJustify /></MusicBarButton>
    <Queue />
    <VolumeIconHandler/>
    <VolumeAdjust />
  </div>
};

const VolumeIconHandlerComp = ()=>{
  const {volume} = useZustandStore((state)=>state.musicPlayerData);
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const isNoSound = useMemo(()=>volume === 0,[volume]);

  const handleClick = ()=>{
    let finVolume = 0;
    if(volume) finVolume = 0;
    else finVolume = 100;
    handleMusicPlayer({volume:finVolume});
  }

  return <MusicBarButton tooltip="Volume" onClick={handleClick}>
    {isNoSound ? <VolumeOff/> : <Volume2 /> }
  </MusicBarButton>
}

const SongModeHandlerComp = ()=>{
  const repeatMode = useZustandStore((state)=>state.repeatMode);
  const isRepeatMode = useMemo(()=>repeatMode === 'repeat',[repeatMode]);
  switch(repeatMode){
    case 'repeatOne' : return <Repeat1 className='text-[var(--accent-pink)]'/>;
    default : return <Repeat className={cn(isRepeatMode && 'text-[var(--accent-pink)]')}/>;
  }
}

const VolumeAdjustComp = () => {
  const handleMusicPlayer = useZustandStore((state)=>state.handleMusicPlayer);
  const {volume} = useZustandStore((state)=>state.musicPlayerData);
  const volumeRef = useRef<HTMLDivElement>(null);
  const {setData} = useLocalStorage(localStorageKeys.volume);
  
  useEffect(()=>{
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (audio) audio.volume = volume / 100;
    setData(volume);
  },[volume]);

  const handleVolumeChange = useCallback(async(value: number[]) => {
    const newVolume = value[0];
    handleMusicPlayer({volume: newVolume});
  }, [handleMusicPlayer]);

  return <div className="relative" ref={volumeRef}>
    <div className="cursor-pointer z-20" onClick={(e) => e.stopPropagation()}>
      <Slider
        max={100}
        min={0}
        value={[volume]}
        step={1}
        onValueChange={handleVolumeChange}
        className="!min-w-[8rem]"
      />
    </div>
  </div>
}

const MusicBar = memo(MusicBarComp);
const PlayPausRewind = memo(PlayPauseReWindComp);
const MusicBarButtons = memo(MusicBarButtonComp);
const VolumeAdjust = memo(VolumeAdjustComp);
const SongNameWithAvatar = memo(SongNameWithAvatarComp);
const VolumeIconHandler = memo(VolumeIconHandlerComp);
export default MusicBar;