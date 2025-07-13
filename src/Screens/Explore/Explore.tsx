import { search_playlist_api, trending_stuff } from "@/api/api";
import { explore_titles_head, SECTIONS_PART } from "@/api/query";
import useZustandStore from "@/Zustand/store";
import { memo, useEffect } from "react";
import ExploreParentCarousels from "./ExploreContent";
import axios from 'axios';
import { refactorTrendingData } from "./utils";

const {trending_now,trending_artist} = explore_titles_head;


const ExploreScreen = ()=>{
    const {handleIsLoadedScreen,handleExploreScreenData, isLoaded : {explore}} = useZustandStore();

const fetchAllPlaylists = async () => {
  const playlistData:any = {};
  handleExploreScreenData({ isLoading: true, carouselData: {} });

  const fetchSafe = async (fn:()=>void, fallback = []) => {
    try { return await fn(); } 
    catch (err) { console.error(err); return fallback; }
  };

  const updateData = () => handleExploreScreenData({ carouselData: { ...playlistData }, isLoading: true });

  try {
    // Fetch playlists sequentially
    for (const { title, query } of SECTIONS_PART) {
      playlistData[title] = await fetchSafe(async () => {
        const res = await axios.get(`${search_playlist_api}${encodeURIComponent(query)}`);
        return res.data?.data?.results || [];
      });
      updateData();
    }

    await fetchSafe(async () => {
      const {data} = await axios.get(trending_stuff);
      playlistData[trending_now] = refactorTrendingData(data?.trending_songs);
      playlistData[trending_artist] =  data?.trending_artists;
    });
    // updateData();

  } catch (err) {
    console.error('Critical error:', err);
  } finally {
    handleExploreScreenData({ carouselData: playlistData, isLoading: false });
    handleIsLoadedScreen({ explore: true });
  }
};
    
    useEffect(() => {
      if(!explore) fetchAllPlaylists();
    }, []);

    return <div className="flex flex-col !gap-y-5">
      <ExploreParentCarousels/>
    </div>
}


const Explore = memo(ExploreScreen);
export default Explore;