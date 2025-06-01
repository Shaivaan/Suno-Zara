import { explore_titles_head } from '@/api/query';
import { create } from 'zustand';

const {all_time_hits,chill_vibes,editor_picks,fresh_releases,party_anthems,recently_added,top_albums,trending_now} = explore_titles_head;
interface ExploreScreenDataType{
    exploreScreenData : {

      [all_time_hits]: AlbumsCardType[]
      [chill_vibes]: AlbumsCardType[]
      [editor_picks]: AlbumsCardType[]
      [fresh_releases]: AlbumsCardType[]
      [party_anthems]: AlbumsCardType[]
      [recently_added]: AlbumsCardType[]
      [top_albums]: AlbumsCardType[]
      [trending_now] : AlbumsCardType[]
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
      [all_time_hits]: [],
      [chill_vibes]: [],
      [editor_picks]: [],
      [fresh_releases]: [],
      [party_anthems]: [],
      [recently_added]: [],
      [top_albums]: [],
      [trending_now] : []
  },
  handleExploreScreenData : (data) =>set(() => ({exploreScreenData : data as unknown as ExploreScreenDataType['exploreScreenData']}))
}));

export default useZustandStore;