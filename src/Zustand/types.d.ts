interface IsLoadedTypes{
    explore : boolean
}

interface LibraryType{
  section: LibrarySectionType
  playlist : []
  album : []
  artist : []
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

    albumPlayListScreenData : AlbumPlayListScreen
    handleAlbumPlayListScreenData : (data:Partial<StateStoreType['albumPlayListScreenData']>)=>void

    libraryData : LibraryType
    handleLibraryData : (data : Partial<LibraryType>) => void;

}


type NullString = null | string;
type ArtistSectionType = 'songs' | 'albums'
interface AlbumPlayListScreen{
        data : SongListType[]
        artistAlbumData : []
        isLoading : boolean
        section : ArtistSectionType
        details : {
            id : NullString
            name : NullString
            duration : NullString
            type : NullString
            image : NullString
        }
        isFailedLoading:boolean
    }

type ActiveSectionType = 'songs' | 'artists' | 'albums' | 'playlists'