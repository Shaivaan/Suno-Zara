import { memo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import { Dot, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import FavIcon from "../Icons/FavIcon";

const PlayListHead = ()=>{
    return <div className="flex gap-4">
        <LazyAvatar className="!h-[14rem] !w-[14rem] rounded-[var(--border-radius-all)]" />
        <PlayListText/>  
    </div>
}

const PlayListTextComp = ()=>{
    return <div className="flex flex-col gap gap-16 p-4">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <div className="font-bold text-4xl">Laal Pari ("From Housefull 5")</div>
                    <FavIcon className="size-8"/>
                </div>
                
                <PlayListSongsAndTime/>
            </div>
            <PlayButton/>
        </div>
};

const PlayListSongsAndTime = ()=>{
    return <div className="flex label-text gap-0">
              <div>Playlist</div>
              <Dot/>
              <div>1 songs</div>
              <Dot/>
              <div>4min 16secs</div>
            </div>
}

const PlayButtonComp = ()=>{
    return <Button className="hover:bg-[var(--accent-purple)] bg-[var(--accent-purple)] rounded-[var(--border-radius-all)] w-fit text-[var(--text-gen-color)] text-[1.2rem]"><Play/>Play</Button>
}

const PlayListText = memo(PlayListTextComp);
const PlayButton = memo(PlayButtonComp);

export default PlayListHead;