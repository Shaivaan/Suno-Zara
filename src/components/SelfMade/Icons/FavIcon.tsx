import { cn } from "@/lib/utils";
import { Heart, Trash2 } from "lucide-react"
import { memo } from "react";

interface FavIconType{className?:string,isFlagged?:boolean}
const FavIconComp=({className,isFlagged=false}:FavIconType)=>{
    return <Heart className={cn('icons-hover text-[var(--accent-pink)] size-[1rem]',className,isFlagged && 'fill-[var(--accent-pink)]')}/>
}

const DeleteIcon = ({className}:ClassNameType)=>{
    return <Trash2 className={cn('icons-hover text-destructive size-[1rem]',className)}/>
}

const FavIcon = memo(FavIconComp);
export default FavIcon;
export {DeleteIcon};