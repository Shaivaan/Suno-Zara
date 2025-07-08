import { memo, useMemo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar"
import FavIcon from "../Icons/FavIcon";
import { Skeleton } from "@/components/ui/skeleton";
import CardLinkWrapper from "./CardLinkWrapper";
import { preventDefault, routes, stopPropagation } from "@/lib/utils";
import { useLibraryData, useLikeFlag } from "@/hooks/use-musicbar";

const ArtistCardComp = (artistData: ArtistCardType)=>{
    const {image, name,artistid} = artistData;
    const isFlagged = useLikeFlag(artistid as string,'artist');
    const navigateTo = useMemo(()=> routes.genre + `?id=${artistid}&type=artist`,[artistid]);
    const {markAlbumPlaylistArtistFav} = useLibraryData();
    const flagAlbum = (event:React.MouseEvent<any>)=>{
        stopPropagation(event);
        preventDefault(event);
        markAlbumPlaylistArtistFav(artistData,'artist',isFlagged);
    }; 
    return <CardLinkWrapper navigateTo={navigateTo}>
        <div className="w-[10rem] flex-col flex gap-2 artist_card group/album-song hover:shadow-2xl relative">
            <LazyAvatar image={image} className="w-[10rem] h-[10rem] rounded-[50%]  group-hover/album-song:opacity-80 "/>
            <div className="text-center threeDot">{name}</div>
            <div className="absolute top-[-5px] right-1 group-hover/album-song:opacity-160 opacity-0" onClick={flagAlbum}>
               <FavIcon isFlagged={isFlagged} className="size-[1.5rem]"/>
            </div>
        </div>
    </CardLinkWrapper>
}

const ArtistSkeletonCardComp = ()=>{
    return <div className="flex-col flex gap-2 artist_card group/album-song hover:shadow-2xl relative">
        <LazyAvatar className="w-[10rem] h-[10rem] rounded-[50%]  group-hover/album-song:opacity-80 "/>
        <Skeleton className="h-5 w-full" />
    </div>
}

const ArtistCard = memo(ArtistCardComp);
export default ArtistCard;
export {ArtistSkeletonCardComp};