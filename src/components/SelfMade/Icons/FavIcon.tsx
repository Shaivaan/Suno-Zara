import { cn } from "@/lib/utils";
import { Heart } from "lucide-react"
import { memo } from "react";

interface FavIconType{className?:string,isFlagged?:boolean}
const FavIconComp=({className,isFlagged=false}:FavIconType)=>{
    return <Heart className={cn('icons-hover text-[var(--accent-pink)] size-[1rem]',className,isFlagged && 'fill-[var(--accent-pink)]')}/>
}

const FavIcon = memo(FavIconComp);
export default FavIcon;