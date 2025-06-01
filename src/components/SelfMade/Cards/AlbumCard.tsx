import { memo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import FavIcon from "../Icons/FavIcon";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { secondsToMMSS } from "@/Screens/Explore/utils";
import useZustandStore from "@/Zustand/store";
import { Skeleton } from "@/components/ui/skeleton";

const AlbumCardComp = ({image,name,songCount,type}:AlbumsCardType)=>{
    const imageUrl = image[2].url;
    const isSong = type === 'song';
    const label2 = isSong ? secondsToMMSS(songCount) : songCount + ' Songs';
    return <div className="album_card relative group/album-song hover:shadow-2xl">
        <LazyAvatar image={imageUrl} className='w-full h-[10rem] rounded-[var(--border-radius-all)] group-hover/album-song:opacity-60'/>
        <div className="w-full font-bold text-[1.1rem] threeDot">{name}</div>
        <CardLabelSection label1={type} label2={label2 + ''}/>
        <FavIcon className="absolute top-2 right-2 group-hover/album-song:opacity-160 opacity-0 size-[1.5rem]"/>
        {isSong && <Button variant={'ghost'} className="cursor-pointer bg-[var(--accent-purple)] rounded-[var(--border-radius-all)] absolute bottom-17 right-4 hover:bg-glass-borde opacity-0 icons-hover  group-hover/album-song:opacity-100"><Play className="fill-[var(--text-gen-color)] text-[var(--accent-purple)] size-5"/></Button>}
    </div>
}

const SkeletonAlbumCard = ()=>{
    return <div className="album_card relative group/album-song hover:shadow-2xl">
        <LazyAvatar className='w-full h-[10rem] rounded-[var(--border-radius-all)] group-hover/album-song:opacity-60'/>
        <CardLabelSection label1={'...'} label2={'...'}/>
    </div>
}

const CardLabelSectionComp = ({label1,label2}:CardLabelSectionCompType)=>{
    const {exploreScreenData:{isLoading}} = useZustandStore();
    if(isLoading) return <>
        <Skeleton className="w-full h-5  my-1"/>
        <Skeleton className="w-full h-5"/>
    </> 

    return <div className="w-full justify-between label-text text-[0.8rem] flex">
            <div className="flex-2 threeDot capitalize">{label1}</div>
            <div className="flex-1.5">{label2}</div>    
        </div>
}

const AlbumCard = memo(AlbumCardComp);
const CardLabelSection = memo(CardLabelSectionComp);
export default AlbumCard;
export {SkeletonAlbumCard};