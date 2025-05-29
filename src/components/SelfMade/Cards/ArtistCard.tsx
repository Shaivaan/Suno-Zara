import { memo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar"

const ArtistCardComp = ()=>{
    return <div className="flex-col flex gap-2 artist_card">
        <LazyAvatar className="w-[10rem] h-[10rem] rounded-[50%]"/>
        <div className="text-center">Arijit Singh</div>
    </div>
}

const ArtistCard = memo(ArtistCardComp);
export default ArtistCard;