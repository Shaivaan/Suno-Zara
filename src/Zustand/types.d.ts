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
}
