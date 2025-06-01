import { allOriginsProxy, search_playlist_api, trending_now_api } from "@/api/api";
import { SECTIONS_PART } from "@/api/query";
// import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import useZustandStore from "@/Zustand/store";
import { memo, useEffect } from "react";
import ExploreParentCarousels from "./ExploreContent";
import axios from 'axios';
import { refactorTrendingData } from "./utils";

const ExploreScreen = ()=>{
    const {handleIsLoadedScreen,handleExploreScreenData, isLoaded : {explore}} = useZustandStore();
    const fetchAllPlaylists = async () => {
      try {
        // Convert all fetch calls to axios
        const promises = SECTIONS_PART.map(({ title, query }) => 
          axios.get(`${search_playlist_api}${encodeURIComponent(query)}`)
            .then(res => {
              // axios automatically parses JSON, so res.data contains the parsed response
              return { query, data: res.data, title };
            })
            .catch(err => {
              console.error(`Failed to fetch ${query}:`, err);
              throw new Error(`Failed to fetch ${query}`);
            })
        );
        
        // Keep the trending API call as is (already using axios)
        const trendingPromise = axios.get(
          `${allOriginsProxy}${encodeURIComponent(trending_now_api)}`
        ).then(response => {
          const data = JSON.parse(response.data.contents);
          return data;
        });
        

        const results = await Promise.all(promises);
        const trendResp:{new_trending:TrendingElemType[]} = await trendingPromise;
        const trendingRefactoredData = refactorTrendingData(trendResp?.new_trending || []);
        
        // Process playlist data
        const playlistData:any = {};
        results.forEach(({ title, data }) => {
          playlistData[title] = data?.data?.results || [];
        });
        playlistData['Trending Now'] = trendingRefactoredData;

        // playlistData[]


        
        handleExploreScreenData({carouselData: playlistData});
      } catch (err) {
        // console.error('Error fetching playlists:', err);
      } finally {
        handleIsLoadedScreen({ explore: true });
        handleExploreScreenData({isLoading:false});
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