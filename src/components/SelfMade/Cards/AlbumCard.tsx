import { memo } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import FavIcon from "../Icons/FavIcon";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const AlbumCardComp = ()=>{
    return <div className="album_card relative group/album-song hover:shadow-2xl">
        <LazyAvatar className='w-full h-[10rem] rounded-[var(--border-radius-all)] group-hover/album-song:opacity-80'/>
        <div className="w-full font-bold text-[1.1rem] threeDot">Main Ghar Nhi Jaana</div>
        <CardLabelSection/>
        <FavIcon className="absolute top-2 right-2 group-hover/album-song:opacity-160 opacity-0 size-[1.5rem]"/>
        <Button variant={'ghost'} className="cursor-pointer border-1 rounded-[var(--border-radius-all)] absolute bottom-17 right-4 hover:bg-glass-border bg-[var(--gradient-bg-gen)] opacity-0  group-hover/album-song:opacity-100"><Play/></Button>
    </div>
}

const CardLabelSectionComp = ()=>{
    return <div className="w-full justify-between label-text text-[0.8rem] flex">
            <div className="flex-2 threeDot">Sanam Puri</div>
            <div className="flex-1">23 Songs</div>    
        </div>
}

const AlbumCard = memo(AlbumCardComp);
const CardLabelSection = memo(CardLabelSectionComp);
export default AlbumCard;