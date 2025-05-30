import { Button } from "@/components/ui/button";
import { memo, useRef, type ComponentProps, type ReactNode } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import { Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import useZustandStore from "@/Zustand/store";
import useClickOutside from "@/CustomHook/useClickOutside";
import Queue  from "@/Screens/Queue/Queue";

const MusicBarComp = () => {
  return (
    <>
    <div
      className={`p-4 fixed bottom-0 w-full border-t-1 border-glass-border bg-glass-bg backdrop-blur-[40px] z-[var(--navbar-z-index)] flex justify-between items-center`}
    >
      <div className="flex gap-4 items-center">
        <LazyAvatar className="rounded-[var(--border-radius-all)] h-[3rem] w-[3rem]" />
        <div>
          <div className="text-[0.95rem] font-medium">Sanam Re..</div>
          <div className="text-[0.7rem] label-text">Arijit Singh</div>
        </div>
        <Separator orientation="vertical" className="text-sm !h-[3rem]"/>
      </div>

      <PlayPausRewind />
      <MusicBarButtons/>
    </div>
    </>
  );
};

interface MusicBarButtonType {
  children: ReactNode;
  tooltip?: string;
  className? : string
}

const PlayPauseReWindComp = () => {
  return (
    <div className="flex flex-col gap-y-[0.5rem] items-center justify-center">
        <div className="flex gap-5 items-center">
        <MusicBarButton tooltip="Prev"><SkipBack /></MusicBarButton>
        <MusicBarButton tooltip="Play" className="!px-[1.25rem] py-[1.25rem] gradient-bg"><Play /></MusicBarButton>
        <MusicBarButton tooltip="Next"><SkipForward /></MusicBarButton>
        </div>

        <div className="flex gap-4 items-center label-text">
            <div className="text-[0.8rem] label-text">1:19</div>
            <Slider 
                defaultValue={[50]} max={100} step={1} className="cursor-pointer w-[25rem] relative mt-[0.2rem]"
            />
            <div className="text-[0.8rem] label-text">3:47</div>
        </div>
    </div>
  );
};

export const MusicBarButton = ({ children, tooltip, className,...props }: MusicBarButtonType & ComponentProps<'button'>) => {
  return (
    <Button
      variant={"secondary"}
      tooltip={tooltip}
      className={cn("hover:scale-[var(--scale-general)] cursor-pointer rounded-[45%] w-[1.9rem] h-[1.9rem]",className)}
      {...props}
    >
      {children}
    </Button>
  );
};

const MusicBarButtonComp = ()=>{
    return <div className="flex gap-4 items-center">
        <Separator orientation="vertical" className="text-sm !h-[3rem]"/>
        <MusicBarButton tooltip="Prev"><Shuffle /></MusicBarButton>
        <MusicBarButton tooltip="Prev"><Repeat /></MusicBarButton>
        {/* <MusicBarButton tooltip="Prev"><AlignJustify /></MusicBarButton> */}
        <Queue/>
        <VolumeAdjust/>
    </div>
};

const VolumeAdjustComp = ()=>{
    const {isVolumeAdjustOpen,toggleVolume} = useZustandStore();
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
export default MusicBar;