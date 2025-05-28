import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import { memo } from "react";

const ExploreScreen = ()=>{
    return <div className="flex flex-col !gap-y-5">
        <CarouselContainer/>
        <CarouselContainer/>
        <CarouselContainer/>
        <AlbumArtistContainer/>
        <CarouselContainer/>
    </div>
}

const CarouselContainer = ()=>{
    return <div>
        <div className="title_carousel text-clip w-fit">Quantum Hits</div>
        <CarouselCardContainer/>  
    </div>
}

const CarouselCardContainer = ()=>{
    return <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
        <AlbumCard/>
    </div>
}

const AlbumArtistContainer = ()=>{
    return <div>
        <div className="title_carousel text-clip w-fit">Artist</div>
        <AlbumArtistCardParent/>  
    </div>
}
const AlbumArtistCardParent = ()=>{
    return <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
        <ArtistCard/>
        <ArtistCard/>
        <ArtistCard/>
        <ArtistCard/>
        <ArtistCard/>
        <ArtistCard/>
        <ArtistCard/>
        <ArtistCard/>
    </div>
}

const Explore = memo(ExploreScreen);
export default Explore;