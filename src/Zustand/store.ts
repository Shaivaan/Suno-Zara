import { explore_titles_head } from '@/api/query';
import { create } from 'zustand';

const {all_time_hits,chill_vibes,fresh_releases,party_anthems,recently_added,top_albums,trending_now,trending_artist} = explore_titles_head;
const init_search_loading = {
          songs:false,
          artists:false,
          playlists:false,
          albums: false
      };
const init_search_data = {
  albumsData:[],
  artistData:[],
  playlistData:[],
  songData:[]
}

const playlist_init_details = {
        duration:null,
        id : null,
        image : null,
        name : null,
        type : null
}

const load_true = {
    albums:true,
    artists:true,
    playlists:true,
    songs:true
};

interface ExploreScreenDataType{
    exploreScreenData : {
      carouselData : {
        [all_time_hits]: AlbumsCardType[]
        [chill_vibes]: AlbumsCardType[]
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

export const debounceTime = 500;
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
      [fresh_releases]: [],
      [party_anthems]: [],
      [recently_added]: [],
      [top_albums]: [],
      [trending_now] : [],
      [trending_artist] : []
    },
    isLoading:true  ,
  },
  handleExploreScreenData : (data) =>set((state) => ({exploreScreenData : {...state.exploreScreenData,...data as unknown as ExploreScreenDataType['exploreScreenData']}})),

      searchScreenData : {
        searchQuery : '',
        activeSection : 'songs',
        ...init_search_data,
        isLoading : init_search_loading
    },

    handleSearchScreenData : (data:Partial<StateStoreType['searchScreenData']>) =>set((state) => ({searchScreenData : {...state.searchScreenData,...data}})),

    albumPlayListScreenData : {
      data:[],
      isLoading:false,
      section:'songs',
      artistAlbumData:[],
      details : playlist_init_details,
      isFailedLoading:false
    },
    handleAlbumPlayListScreenData : (data:Partial<StateStoreType['albumPlayListScreenData']>) =>set((state) => ({albumPlayListScreenData : {...state.albumPlayListScreenData,...data}})),

    
    libraryData : {
      section:'playlist',
      album : [],
      artist : [],
      playlist :[]
    },
    handleLibraryData : (data)=> set((state)=>({libraryData : {...state.libraryData,...data}})),

    musicPlayerData:{
      currentTime : 0,
      isPlaying:false,
      sliderValue : [0],
      currentSongId : null,
      duration: null,
      isLastSongPlayed : false
    }, 
    handleMusicPlayer: (data)=>set((state)=>({musicPlayerData : {...state.musicPlayerData,...data}})),

    queueSongs : [],
    handleQueueSongs : (data)=>set(()=>({queueSongs : data})),

    repeatMode : 'normal',
    handleRepeatMode : (repeatMode: RepeatModeType)=>set(()=>({repeatMode})),
}));

export default useZustandStore;
export {init_search_loading,init_search_data,playlist_init_details,load_true};