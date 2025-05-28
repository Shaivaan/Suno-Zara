import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
import { memo } from "react";

const ExploreScreen = ()=>{
    return <div className="flex gap-4">
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
    </div>
}

const Explore = memo(ExploreScreen);
export default Explore;