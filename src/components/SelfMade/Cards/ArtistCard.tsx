import { memo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar"
import FavIcon from "../Icons/FavIcon";

const ArtistCardComp = ()=>{
    return <div className="flex-col flex gap-2 artist_card group/album-song hover:shadow-2xl relative">
        <LazyAvatar className="w-[10rem] h-[10rem] rounded-[50%]  group-hover/album-song:opacity-80 "/>
        <div className="text-center">Arijit Singh</div>
        <FavIcon className="absolute top-[-5px] right-1 group-hover/album-song:opacity-160 opacity-0 size-[1.5rem] "/>
    </div>
}

const ArtistCard = memo(ArtistCardComp);
export default ArtistCard;