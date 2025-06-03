interface IsLoadedTypes{
    explore : boolean
}

interface StateStoreType {
    isSidebarVisible: boolean;
    toggleMobileMenu: () => void;

    isVolumeAdjustOpen: boolean;
    toggleVolume: () => void;

    isQueueVisible:boolean
    toggleQueue:()=>void

    isLoaded : IsLoadedTypes
    handleIsLoadedScreen : (isLoadedObj : IsLoadedTypes) =>void

    handleExploreScreenData : (data:unknown)=>void

    searchScreenData : {
        searchQuery : string
        activeSection : ActiveSectionType
        songData : SongListType[]
        artistData : ArtistCardType[]
        albumsData : AlbumsCardType[]
        playlistData : AlbumsCardType[]
        isLoading : Record<ActiveSectionType,boolean>
    }
    handleSearchScreenData : (data:Partial<StateStoreType['searchScreenData']>)=>void
}

type ActiveSectionType = 'songs' | 'artists' | 'albums' | 'playlists'