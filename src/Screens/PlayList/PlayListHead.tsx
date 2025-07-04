import { memo, useMemo } from "react";
import { LazyAvatar } from "../../components/SelfMade/LazyAvatar/LazyAvatar";
import { Dot, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import FavIcon from "../../components/SelfMade/Icons/FavIcon";
import useZustandStore from "@/Zustand/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePlaySong } from "@/hooks/use-musicbar";

const PlayListHead = ()=>{
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') as unknown as ScreenType;
    const isArtist = useMemo(()=>type === 'artist',[type]);
    const {albumPlayListScreenData:{details:{image},isLoading}} = useZustandStore();
    const imageLink = useMemo(()=>isLoading || type === 'liked_songs' ? null : image ,[isLoading]);
    return <div className="flex gap-4">
        <LazyAvatar
          image={imageLink as string}
          className={cn(!isArtist ? "rounded-[var(--border-radius-all)]" : "rounded-[50%]" ,'!h-[14rem] !w-[14rem]')} 
        />
        <PlayListText/>  
    </div>
}

const PlayListTextComp = ()=>{
    const {albumPlayListScreenData:{details:{name},isLoading}} = useZustandStore();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') as unknown as ScreenType;
    const isLikedPlaylistSong = useMemo(()=>type === 'liked_songs',[type]);
    return <div className="flex flex-col gap gap-16 p-4">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    {isLoading ? <Skeleton className="w-[20rem] h-10"/> : <div className="font-bold text-4xl">{name}</div>}
                    {!isLoading && !isLikedPlaylistSong && <FavIcon className="size-8"/>}
                </div>
                
                <PlayListSongsAndTime/>
            </div>
            {!isLoading && <PlayButton/>}
        </div>
};

const PlayListSongsAndTime = ()=>{
    const {albumPlayListScreenData:{details:{duration,type},data,isLoading}} = useZustandStore();
    if(isLoading) return <Skeleton className="w-[15rem] h-5 mt-4"/>
    return <div className="flex label-text gap-0">
              <div className="capitalize">{type}</div>
              <Dot/>
              <div>{data.length} songs</div>
              <Dot/>
              <div className="capitalize">{duration}</div>
            </div>
}

const PlayButtonComp = ()=>{
    const {handleSongAndQueue} = usePlaySong();
    const playSongs = ()=> handleSongAndQueue();
    return <Button onClick={playSongs} className="gen-scale hover:bg-[var(--accent-purple)] bg-[var(--accent-purple)] rounded-[var(--border-radius-all)] w-fit text-[var(--text-gen-color)] text-[1.2rem]"><Play/>Play</Button>
}

const PlayListText = memo(PlayListTextComp);
const PlayButton = memo(PlayButtonComp);

export default PlayListHead;