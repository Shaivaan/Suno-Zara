import {
  ButtonMenu,
  MenuButton,
} from "@/components/SelfMade/Wrapper/ButtonMenu";
import { memo, useState } from "react";
import { MusicBarButton } from "@/components/SelfMade/MusicBar/MusicBar"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
  <DeleteIcon/>
import { LazyAvatar } from "@/components/SelfMade/LazyAvatar/LazyAvatar";
import FavIcon, { DeleteIcon } from "@/components/SelfMade/Icons/FavIcon";
import { CirclePause, Play, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import useZustandStore from "@/Zustand/store";

const queue_button_data = ["all", "recently added", "recently played"];

const QueueButtonContainerComp = () => {
  const [queueOption, setQueueOption] = useState(queue_button_data[0]);
  return (
    <div className="flex justify-between">
      <ButtonMenu>
        {queue_button_data.map((el) => (
          <MenuButton isActive={queueOption === el} onClick={() => setQueueOption(el)} key={el}>{el}</MenuButton>
        ))}
      </ButtonMenu>
      <Badge variant={'secondary'}>5 of 9</Badge>
    </div>
  );
};

interface QueueType{
  isScreen?:boolean
}
function QueueDrawerComp() {
  const {isQueueVisible} = useZustandStore();
  return (
    <Sheet open={isQueueVisible}>
      <SheetContent className="!w-[31rem] p-4 overflow-y-auto">
        <Queue />
      </SheetContent>
    </Sheet>
  )
}

const QueueComp = ({isScreen=false}:QueueType)=>{
  const {toggleQueue} = useZustandStore();
  return <div className={cn("flex flex-col gap-2",!isScreen && ' bg-inherit')}>
          <div className= {cn("",!isScreen && '!top-[-1.2rem] sticky-elem z-1 bg-inherit')}>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="title_carousel">Queue</div>
              {!isScreen && <MusicBarButton onClick={toggleQueue} tooltip="Close" className="bg-glass-border"><XIcon/></MusicBarButton>}
            </div>
            <div className={cn("mt-2 my-2",isScreen && 'sticky-elem z-1 !top-[3.2rem]')}><QueueButtonContainer/></div>
          </div>
          <QueueSongsList/>
        </div>
  
  
}

const QueueSongsListComp = ()=>{
  const queue_cards = new Array(15).fill(0);
  return <>
      <QueueSongCard/>
      <QueueSongCard isPlaying/>
      {queue_cards.map((el)=><QueueSongCard key={el}/>)}  
      
  </>
}

const QueueCardComp = ({isPlaying=false}:IsPlayingType)=>{
  return <div className={cn("w-full border-1 px-3 py-1 border-b-glass-border rounded-[var(--border-radius-all)] flex gap-4 items-center group/queue-song cursor-pointer",isPlaying && 'playing')}>
    <div className="text-[0.7rem] rounded-[50%] border-1 p-2 py-[0.15rem]">1</div>
    <div className="relative">
        <LazyAvatar className={cn("rounded-[var(--border-radius-all)] !h-[2.7rem] !w-[2.7rem] group-hover/queue-song:opacity-40",isPlaying && 'opacity-40')}/>
        {!isPlaying &&  <Play className="absolute top-3 right-2.5 opacity-0 group-hover/queue-song:opacity-100 icons-hover" size={'1.3rem'}/>}
        {isPlaying && <CirclePause className="absolute top-3 right-2.5 icons-hover" size={'1.3rem'}/>}
    </div>
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="text-[0.85rem] threeDot">Kesariya Tera (From Brahmastra)</div>
      <div className="label-text text-[0.8rem]">Arijit Singh</div>
    </div>
    <div className="flex gap-4">
      <div className="group-hover/queue-song:opacity-100 opacity-0"><FavIcon className="size-[1.2rem]"/></div>
      <div className="group-hover/queue-song:opacity-100 opacity-0"><DeleteIcon className="size-[1.2rem]"/></div>  
    </div>
  </div>
}

const QueueButtonContainer = memo(QueueButtonContainerComp);
const QueueSongsList = memo(QueueSongsListComp);
const QueueSongCard = memo(QueueCardComp);
const QueueDrawer = memo(QueueDrawerComp);
const Queue = memo(QueueComp);
export default QueueDrawer;
export {Queue};