import { memo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";

const AlbumCardComp = ()=>{
    return <div className="album_card">
        <LazyAvatar className='w-full h-[10rem] rounded-[var(--border-radius-all)]'/>
        <div className="w-full font-bold text-[1.1rem] threeDot">Main Ghar Nhi Jaana</div>
        <div className="label-text text-[0.9rem]">Label of Song</div>
    </div>
}

const AlbumCard = memo(AlbumCardComp);
export default AlbumCard;