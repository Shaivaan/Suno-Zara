import { allOriginsProxy, search_playlist_api, trending_artist_api, trending_now_api } from "@/api/api";
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
        
        const trendingArtistPromise = axios.get(
          `${allOriginsProxy}${encodeURIComponent(trending_artist_api)}`
        ).then(response => {
          const data = JSON.parse(response.data.contents);
          return data;
        });

        const results = await Promise.all(promises);
        const trendResp:{new_trending:TrendingElemType[]} = await trendingPromise;
        const trendingRefactoredData = refactorTrendingData(trendResp?.new_trending || []);
        const trendingArtistRes:{top_artists:ArtistCardType[]} = await trendingArtistPromise;
        
        // Process playlist data
        const playlistData:any = {};
        results.forEach(({ title, data }) => {
          playlistData[title] = data?.data?.results || [];
        });
        playlistData[trending_now] = trendingRefactoredData;
        playlistData[trending_artist] = trendingArtistRes?.top_artists || [];

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


const Explore = memo(ExploreScreen);
export default Explore;