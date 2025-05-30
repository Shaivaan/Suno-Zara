import {
  ButtonMenu,
  MenuButton,
} from "@/components/SelfMade/Wrapper/ButtonMenu";
import { memo, useState } from "react";
import { MusicBarButton } from "@/components/SelfMade/MusicBar/MusicBar"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import { LazyAvatar } from "@/components/SelfMade/LazyAvatar/LazyAvatar";

const queue_button_data = ["all", "recently added", "recently played"];

const QueueButtonContainerComp = () => {
  const [queueOption, setQueueOption] = useState(queue_button_data[0]);
  return (
    <div className="flex gap-5 items-center text-[0.9rem]">
      <ButtonMenu>
        {queue_button_data.map((el) => (
          <MenuButton isActive={queueOption === el} onClick={() => setQueueOption(el)} key={el}>{el}</MenuButton>
        ))}
      </ButtonMenu>
    </div>
  );
};


function Queue() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MusicBarButton tooltip="Queue"><AlignJustify /></MusicBarButton>
      </SheetTrigger>
      <SheetContent className="bg-glass-bg backdrop-blur-[10px] !w-[31rem] p-4 overflow-y-auto">

        <SheetHeader>
          <SheetTitle><div className="title_carousel">Queue</div></SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2">
          <QueueButtonContainer/>
          <QueueSongsList/>
        </div>

        <SheetFooter>
        <div>Footer</div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const QueueSongsListComp = ()=>{
  const queue_cards = new Array(40).fill(0);
  return <>
      {queue_cards.map((el)=><QueueSongCard key={el}/>)}  
  </>
}

const QueueCardComp = ()=>{
  return <div className="w-full border-1 p-2 border-b-glass-border rounded-[var(--border-radius-all)] flex gap-4 items-center bg-glass-border">
    <div>1</div>
    <LazyAvatar className="rounded-[var(--border-radius-all)] !h-[2.7rem] !w-[2.7rem]"/>
    <div className="flex flex-col gap-0.4">
      <div>Kesariya Tera (From Brahmastra)</div>
      <div className="label-text text-[0.8rem]">Arijit Singh</div>
    </div>
  </div>
}

const QueueButtonContainer = memo(QueueButtonContainerComp);
const QueueSongsList = memo(QueueSongsListComp);
const QueueSongCard = memo(QueueCardComp);
export default Queue;