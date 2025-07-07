import { memo, useMemo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import FavIcon from "../Icons/FavIcon";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { secondsToMMSS } from "@/Screens/Explore/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/lib/utils";
import CardLinkWrapper from "./CardLinkWrapper";
import { useLibraryData } from "@/hooks/use-musicbar";

const AlbumCardComp = ({image,name,songCount,type,id,isLikedSongsAlbum=false}:AlbumsCardType & IsLikedCardType)=>{
    const imageUrl = image?.[2]?.url;
    const isSong = type === 'song';
    const label2 = isSong ? secondsToMMSS(songCount) : (songCount + ' Songs');
    const {favSongNumber} = useLibraryData();
    const urlToNavigate = useMemo(()=> isLikedSongsAlbum ? (favSongNumber ? `${routes.genre}?type=${type}`  : '#')  :  (!isSong ? (routes.genre + `?id=${id}&type=${type}`) : null) ,[type]);
    

    return <CardLinkWrapper navigateTo={urlToNavigate}>
        <div className="album_card relative group/album-song hover:shadow-2xl">
            <LazyAvatar image={imageUrl} className='w-full h-[10rem] rounded-[var(--border-radius-all)] group-hover/album-song:opacity-60' isLikedSongsAlbum={isLikedSongsAlbum}/>
            <div className="w-full font-bold text-[1.1rem] threeDot">{name}</div>
            <CardLabelSection label1={type} label2={label2 + ''}/>
            {!isLikedSongsAlbum && <FavIcon className="absolute top-2 right-2 group-hover/album-song:opacity-160 opacity-0 size-[1.5rem]"/>}
            {isSong && <Button variant={'ghost'} className="cursor-pointer bg-[var(--accent-purple)] rounded-[var(--border-radius-all)] absolute bottom-17 right-4 hover:bg-glass-borde opacity-0 icons-hover  group-hover/album-song:opacity-100"><Play className="fill-[var(--text-gen-color)] text-[var(--accent-purple)] size-5"/></Button>}
        </div>
    </CardLinkWrapper>
}

const SkeletonAlbumCard = ()=>{
    return <div className="album_card relative group/album-song hover:shadow-2xl">
        <LazyAvatar className='w-full h-[10rem] rounded-[var(--border-radius-all)] group-hover/album-song:opacity-60'/>
        <CardLabelSection label1={'...'} label2={'...'}/>
    </div>
}

const CardLabelSectionComp = ({label1,label2}:CardLabelSectionCompType)=>{
    if(label1 === '...' && label2 === '...') return <>
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