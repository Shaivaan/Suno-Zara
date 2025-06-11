import { memo, useMemo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar"
import FavIcon from "../Icons/FavIcon";
import { Skeleton } from "@/components/ui/skeleton";
import CardLinkWrapper from "./CardLinkWrapper";
import { routes } from "@/lib/utils";

const ArtistCardComp = ({image, name,artistid}: ArtistCardType)=>{
    const navigateTo = useMemo(()=> routes.genre + `?id=${artistid}&type=artist`,[artistid]);
    return <CardLinkWrapper navigateTo={navigateTo}>
        <div className="w-[10rem] flex-col flex gap-2 artist_card group/album-song hover:shadow-2xl relative">
            <LazyAvatar image={image} className="w-[10rem] h-[10rem] rounded-[50%]  group-hover/album-song:opacity-80 "/>
            <div className="text-center threeDot">{name}</div>
            <FavIcon className="absolute top-[-5px] right-1 group-hover/album-song:opacity-160 opacity-0 size-[1.5rem] "/>
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