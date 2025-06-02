import { explore_titles_head } from '@/api/query';
import { create } from 'zustand';

const {all_time_hits,chill_vibes,editor_picks,fresh_releases,party_anthems,recently_added,top_albums,trending_now,trending_artist} = explore_titles_head;
interface ExploreScreenDataType{
    exploreScreenData : {
      carouselData : {
        [all_time_hits]: AlbumsCardType[]
        [chill_vibes]: AlbumsCardType[]
        [editor_picks]: AlbumsCardType[]
        [fresh_releases]: AlbumsCardType[]
        [party_anthems]: AlbumsCardType[]
        [recently_added]: AlbumsCardType[]
        [top_albums]: AlbumsCardType[]
        [trending_now] : AlbumsCardType[]
        [trending_artist] : ArtistCardType[]
      },
      isLoading:boolean
    }
};


const useZustandStore = create<StateStoreType & ExploreScreenDataType>((set) => ({
  isSidebarVisible: false,
  isVolumeAdjustOpen : false,
  
  toggleMobileMenu: () =>set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
  toggleVolume: () =>set((state) => ({ isVolumeAdjustOpen: !state.isVolumeAdjustOpen })),

  isQueueVisible:false,
  toggleQueue:() =>set((state) => ({ isQueueVisible: !state.isQueueVisible })),

  isLoaded : {
    explore : false
  },
  handleIsLoadedScreen : (loadObj) =>set((state) => ({isLoaded: {...state.isLoaded,...loadObj} })),


  exploreScreenData : {
    carouselData:{
      [all_time_hits]: [],
      [chill_vibes]: [],
      [editor_picks]: [],
      [fresh_releases]: [],
      [party_anthems]: [],
      [recently_added]: [],
      [top_albums]: [],
      [trending_now] : [],
      [trending_artist] : []
    },
    isLoading:true  
  },
  handleExploreScreenData : (data) =>set((state) => ({exploreScreenData : {...state.exploreScreenData,...data as unknown as ExploreScreenDataType['exploreScreenData']}}))
}));

export default useZustandStore;