import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import { Music2 } from "lucide-react";
import { memo } from "react";



const images = 'https://github.com/shadcn.png';

const LazyAvatarComp = ({image=images,className}:LazyAvatarType)=>{
    return <Avatar className={className}>
  <AvatarImage src={image} alt="Music Album Image" />
  <AvatarFallback><Skeleton className="custom-skeleton flex items-center justify-center" ><Music2/></Skeleton></AvatarFallback>
</Avatar>
}

const LazyAvatar = memo(LazyAvatarComp);
export {LazyAvatar};