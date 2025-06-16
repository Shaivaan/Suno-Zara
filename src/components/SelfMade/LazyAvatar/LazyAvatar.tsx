import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Music2 } from "lucide-react";
import { memo } from "react";



const LazyAvatarComp = ({image,className,isLikedSongsAlbum}:LazyAvatarType & IsLikedCardType)=>{
    return <Avatar className={className}>
    {!isLikedSongsAlbum && <>

      <AvatarImage src={image} alt="Music Album Image"/>
      <AvatarFallback>
        <Skeleton className="custom-skeleton flex items-center justify-center" ><Music2/></Skeleton>
    </AvatarFallback>

    </>}
    {isLikedSongsAlbum && <div className="w-full h-full flex items-center justify-center gradient-bg"><Heart className="size-15 fill-[var(--accent-purple)]"/></div>}
</Avatar>
}

const LazyAvatar = memo(LazyAvatarComp);
export {LazyAvatar};