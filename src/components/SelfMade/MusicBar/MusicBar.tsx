import { Button } from "@/components/ui/button";
import { memo, useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import { AlignJustify, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import useZustandStore from "@/Zustand/store";
import useClickOutside from "@/CustomHook/useClickOutside";
import Queue from "@/Screens/Queue/Queue";
import { formatTime } from "./utils";
import useMusicBar from "@/hooks/use-musicbar";

const MusicBarComp = () => {
  const { id } = useZustandStore((state) => state.musicPlayerData);
  if (!id) return <></>;
  return <div
    className={`p-4 fixed bottom-0 w-full border-t-1 border-glass-border bg-glass-bg backdrop-blur-[40px] z-[var(--navbar-z-index)]
       grid grid-cols-5 items-center
    `}
  >
    <div className="col-span-1"><SongNameWithAvatar/></div>
    <div className="col-span-3"><PlayPausRewind /></div>
    <div className="col-span-1 justify-end flex"><MusicBarButtons /></div>
  </div>;
};

const SongNameWithAvatarComp = () => {
  const { artist, name, image } = useZustandStore((state) => state.musicPlayerData);
  return <div className="flex gap-4 items-center">
    <LazyAvatar className="rounded-[var(--border-radius-all)] h-[3rem] w-[3rem]" image={image as string} />
    <div className="max-w-full">
      <div className="threeDot text-[0.95rem] font-medium">{name}</div>
      <div className="threeDot text-[0.7rem] label-text">{artist}</div>
    </div>
    <Separator orientation="vertical" className="text-sm !h-[3rem]" />
  </div>
}


interface MusicBarButtonType {
  children: ReactNode;
  tooltip?: string;
  className?: string
}

const PlayPauseReWindComp = () => {
  const { handleMusicSlider, togglePlayPause, updateTime, isPlaying, currentTime, sliderValue, duration, audioUrl, updateDuration, id } = useMusicBar();
  const audioRef = useRef<HTMLAudioElement>(null);
  const togglePlayer = () => togglePlayPause(!isPlaying);
  const handleSlider = (value: number[]) => handleMusicSlider(audioRef.current, value);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTimeFigure = () => {
      const current = audio.currentTime;
      updateTime(current);
    };
    const updateDurationListener = () => updateDuration(audio.duration);
    // Add event listeners
    audio.addEventListener('timeupdate', updateTimeFigure);
    audio.addEventListener('loadedmetadata', updateDurationListener);

    // Cleanup function - remove listeners when component unmounts
    return () => {
      audio.removeEventListener('timeupdate', updateTimeFigure);
      audio.removeEventListener('loadedmetadata', updateDurationListener);
    };
  }, [duration])

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio?.play();
    else audio?.pause();
  }, [isPlaying, id]);


  return (
    <div className="flex flex-col gap-y-[0.5rem] items-center justify-center">
      <audio
        ref={audioRef}
        src={audioUrl as string}
        preload="metadata"
      />
      <div className="flex gap-5 items-center">
        <MusicBarButton tooltip="Prev"><SkipBack /></MusicBarButton>
        <MusicBarButton onClick={togglePlayer} tooltip="Play" className="!px-[1.25rem] py-[1.25rem] gradient-bg">
          {isPlaying ? <Pause /> : <Play />}
        </MusicBarButton>
        <MusicBarButton tooltip="Next"><SkipForward /></MusicBarButton>
      </div>

      <div className="flex gap-4 items-center label-text">
        <div className="text-[0.8rem] label-text">{formatTime(currentTime)}</div>
        <Slider
          value={sliderValue}
          onValueChange={handleSlider}
          max={100}
          step={0.1}
          className="cursor-pointer w-[25rem] relative mt-[0.2rem]"
        />
        <div className="text-[0.8rem] label-text">{formatTime(duration)}</div>
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
  const { toggleQueue } = useZustandStore();
  return <div className="flex gap-4 items-center">
    <Separator orientation="vertical" className="text-sm !h-[3rem]" />
    <MusicBarButton tooltip="Prev"><Shuffle /></MusicBarButton>
    <MusicBarButton tooltip="Prev"><Repeat /></MusicBarButton>
    <MusicBarButton tooltip="Prev" onClick={toggleQueue}><AlignJustify /></MusicBarButton>
    <Queue />
    <VolumeAdjust />
  </div>
};

const VolumeAdjustComp = () => {
  const { isVolumeAdjustOpen, toggleVolume } = useZustandStore();
  const volumeRef = useRef<HTMLDivElement>(null);
  useClickOutside(volumeRef as any, toggleVolume, isVolumeAdjustOpen);
  return <div className="relative" ref={volumeRef}>
    <MusicBarButton onClick={toggleVolume} tooltip="Prev"><Volume2 /></MusicBarButton>
    {isVolumeAdjustOpen && <div className="cursor-pointer absolute top-[-9rem] left-[0.7rem] z-20" onClick={(e) => e.stopPropagation()}>
      <Slider
        defaultValue={[20]}
        max={100}
        step={1}
        className="!min-h-[8rem]"
        orientation="vertical"
      />
    </div>}
  </div>
}


const MusicBar = memo(MusicBarComp);
const PlayPausRewind = memo(PlayPauseReWindComp);
const MusicBarButtons = memo(MusicBarButtonComp);
const VolumeAdjust = memo(VolumeAdjustComp);
const SongNameWithAvatar = memo(SongNameWithAvatarComp);
export default MusicBar;