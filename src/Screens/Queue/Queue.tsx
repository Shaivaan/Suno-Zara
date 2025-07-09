import {
  ButtonMenu,
  MenuButton,
} from "@/components/SelfMade/Wrapper/ButtonMenu";
import { memo } from "react";
import { MusicBarButton } from "@/components/SelfMade/MusicBar/MusicBar"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
  // <DeleteIcon/>
import { LazyAvatar } from "@/components/SelfMade/LazyAvatar/LazyAvatar";
import FavIcon, { DeleteIcon } from "@/components/SelfMade/Icons/FavIcon";
import { CirclePause, Play, XIcon } from "lucide-react";
import { cn, stopPropagation } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import useZustandStore from "@/Zustand/store";
import useMusicBar, { useCurrentSongCheck, useLibraryData, useLikeFlag, usePlaySong, useQueue } from "@/hooks/use-musicbar";

const queue_button_data = ["all",  "recently played", "recently added"];

const QueueButtonContainerComp = () => {
  const queueSection = useZustandStore((state=>state.queueSection));
  const handleQueueSection = useZustandStore((state=>state.handleQueueSection));
  const {queueLength,currentSongNumber} = useQueue();
  
  return (
    <div className="flex justify-between">
      <ButtonMenu>
        {queue_button_data.map((el) => (
          <MenuButton isActive={queueSection === el} onClick={() => handleQueueSection(el as 'all')} key={el}>{el}</MenuButton>
        ))}
      </ButtonMenu>
      {queueLength !== 0 && <Badge variant={'secondary'}>{currentSongNumber} of {queueLength}</Badge>}
    </div>
  );
};

interface QueueType{
  isScreen?:boolean
}
function QueueDrawerComp() {
  const {isQueueVisible, toggleQueue} = useZustandStore();
  return (
    <Sheet open={isQueueVisible}>
      <SheetContent className="!w-[31rem] p-4 overflow-y-auto" onInteractOutside={toggleQueue}>
        <Queue />
      </SheetContent>
    </Sheet>
  )
}

const QueueComp = ({isScreen=false}:QueueType)=>{
  const toggleQueue = useZustandStore((state)=>state.toggleQueue);
  return <div className={cn("flex flex-col col-gap-val",!isScreen && ' bg-inherit')}>
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

const getQueueDataSection = ()=>{
  const queue_songs = useZustandStore((state)=>state.queueSongs);
  const recently_played = useZustandStore((state)=>state.recentlyPlayedSongs);
  const queueSection = useZustandStore((state)=>state.queueSection);
  switch(queueSection){
    case 'all' : return  queue_songs;
    case 'recently played' : return recently_played;
    case 'recently added' : return [];
  }
};

const QueueSongsListComp = ()=>{
  const queue_songs = getQueueDataSection();
  return <>
      {queue_songs?.map((song,index)=><QueueSongCard key={song.id} {...song} index={index+1}/>)}   
  </>
}


const QueueCardComp = ({id,image,name,artists,index}: SongListType & IndexType)=>{
  const {handleSongWithQueueUntouched} = usePlaySong(id);
  const isCurrentSongPlaying = useCurrentSongCheck(id);
  const {isPlaying} = useMusicBar();
  const {deleteSongFromQueue} = useQueue();
  const deleteSong = (event:React.MouseEvent)=> {
    stopPropagation(event)
    deleteSongFromQueue(id);
  }
  const isFlagged = useLikeFlag(id,'song');
  const {markSongFav} = useLibraryData();

  const likeSong = (event:React.MouseEvent)=>{
    stopPropagation(event);
    markSongFav(id,isFlagged,true);
  };
  
  
  return <div onClick={handleSongWithQueueUntouched} className={cn("w-full border-1 px-3 py-1 border-b-glass-border rounded-[var(--border-radius-all)] flex gap-4 items-center group/queue-song cursor-pointer hover:border-1 hover:bg-glass-bg",isCurrentSongPlaying && 'playing')}>
    <div className="text-[0.7rem] rounded-[50%] border-1 p-2 py-[0.15rem]">{index}</div>
    <div className="relative">
        <LazyAvatar className={cn("rounded-[var(--border-radius-all)] !h-[2.7rem] !w-[2.7rem] group-hover/queue-song:opacity-40",isCurrentSongPlaying && 'opacity-40')} image={image}/>
        {!isCurrentSongPlaying || !isPlaying ? 
          <Play className="absolute top-3 right-2.5 opacity-0 group-hover/queue-song:opacity-100 icons-hover" size={'1.3rem'}/> : 
          <CirclePause className="absolute top-3 right-2.5 icons-hover" size={'1.3rem'}/>
        }
    </div>
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="text-[0.85rem] threeDot">{name}</div>
      <div className="label-text text-[0.8rem]">{artists}</div>
    </div>
    <div className="flex gap-4">
      <div onClick={likeSong} className="group-hover/queue-song:opacity-100 opacity-0"><FavIcon isFlagged={isFlagged} className="size-[1.2rem]"/></div>
      <div onClick={deleteSong} className="group-hover/queue-song:opacity-100 opacity-0"><DeleteIcon className="size-[1.2rem]"/></div>  
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