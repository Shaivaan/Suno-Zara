import { search_playlist_api } from "@/api/api";
import { SECTIONS_PART } from "@/api/query";
import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import useZustandStore from "@/Zustand/store";
import { memo, useEffect } from "react";

const ExploreScreen = ()=>{
     const {handleIsLoadedScreen,handleExploreScreenData} = useZustandStore();
      const fetchAllPlaylists = async () => {
      try {
        const promises = SECTIONS_PART.map(({title,query}) => 
          fetch(`${search_playlist_api}${encodeURIComponent(query)}`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch ${query}`);
              return res.json();
            })
            .then(data => ({ query, data, title }))
        );

        const results = await Promise.all(promises);
        const playlistData:any = {};
        results.forEach(({ title, data }) => {
          playlistData[title] = data?.data?.results || [];
        });
        handleExploreScreenData(playlistData);
      } catch (err) {
      } finally {
        handleIsLoadedScreen({explore:true});
      }
    };

    useEffect(() => {fetchAllPlaylists()}, []);

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
        <div className="title_carousel">Quantum Hits</div>
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
        <div className="title_carousel">Artist</div>
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