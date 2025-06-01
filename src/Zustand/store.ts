import { explore_titles_head } from '@/api/query';
import { create } from 'zustand';

const {all_time_hits,chill_vibes,editor_picks,fresh_releases,party_anthems,recently_added,top_albums} = explore_titles_head;
interface ExploreScreenDataType{
    exploreScreenData : {
      [all_time_hits]: []
      [chill_vibes]: []
      [editor_picks]: []
      [fresh_releases]: []
      [party_anthems]: []
      [recently_added]: []
      [top_albums]: []
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
  },
  handleExploreScreenData : (data) =>set(() => ({exploreScreenData : data as unknown as ExploreScreenDataType['exploreScreenData']}))
}));

export default useZustandStore;