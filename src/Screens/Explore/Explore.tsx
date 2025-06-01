import { search_playlist_api } from "@/api/api";
import { SECTIONS_PART } from "@/api/query";
// import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import useZustandStore from "@/Zustand/store";
import { memo, useEffect } from "react";
import ExploreParentCarousels from "./ExploreContent";

const ExploreScreen = ()=>{
     const {handleIsLoadedScreen,handleExploreScreenData, isLoaded : {explore}} = useZustandStore();
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

    useEffect(() => {
      if(!explore) fetchAllPlaylists();
    }, []);

    return <div className="flex flex-col !gap-y-5">
          <ExploreParentCarousels/>
    </div>
}






// const AlbumArtistContainer = ()=>{
//     return <div>
//         <div className="title_carousel">Artist</div>
//         <AlbumArtistCardParent/>  
//     </div>
// }
// const AlbumArtistCardParent = ()=>{
//     return <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
//         <ArtistCard/>
//         <ArtistCard/>
//         <ArtistCard/>
//         <ArtistCard/>
//         <ArtistCard/>
//         <ArtistCard/>
//         <ArtistCard/>
//         <ArtistCard/>
//     </div>
// }

const Explore = memo(ExploreScreen);
export default Explore;