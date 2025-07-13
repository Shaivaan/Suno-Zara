import { search_playlist_api, trending_artist_api, trending_now_api } from "@/api/api";
import { explore_titles_head, SECTIONS_PART } from "@/api/query";
// import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
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

    // Fetch trending data
    playlistData[trending_now] = await fetchSafe(async () => {
      const res = await axios.get(trending_now_api);
      const data = res?.data?.new_trending || [];
      return refactorTrendingData(data);
    });
    updateData();

    // Fetch trending artists
    playlistData[trending_artist] = await fetchSafe(async () => {
      const res = await axios.get(trending_artist_api);
      const data = res?.data?.top_artists || [];
      return data;
    });

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