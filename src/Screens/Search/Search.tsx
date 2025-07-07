import ArtistCard, { ArtistSkeletonCardComp } from "@/components/SelfMade/Cards/ArtistCard";
import SongsList, { SongItemSkeleton } from "@/components/SelfMade/SongList/SongList";
import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import { Input } from "@/components/ui/input";
import useZustandStore, { debounceTime, init_search_data, init_search_loading, load_true } from "@/Zustand/store";
import { memo, useEffect, useRef, useState } from "react";
import useSearch from "@/CustomHook/useSearch";
import AlbumCard, { SkeletonAlbumCard } from "@/components/SelfMade/Cards/AlbumCard";
import { loadArray } from "@/lib/utils";
import { v4 } from "uuid";

const placholderText = 'Search for songs, artists, albums...';
const button_data = ['songs','artists','albums','playlists'];

const SearchComp=()=>{
    return <div className="flex flex-col col-gap-val">
       <div className="title_carousel">Search</div>
       <InputContainer/>
       <ButtonCategory/>
       <SearchSectionHandle/>
    </div>
}

const ButtonCategoryComp = ()=>{
    const {searchScreenData:{activeSection},handleSearchScreenData} = useZustandStore();
    const toggleCategory = (category:ActiveSectionType)=>handleSearchScreenData({activeSection:category});
    return <div className="flex justify-end">
        <ButtonMenu>
        {(button_data as unknown as ActiveSectionType[]).map((label)=> <MenuButton
         onClick={()=>toggleCategory(label)}
         isActive = {label === activeSection}
         key={label}
         >{label}</MenuButton>)}
    </ButtonMenu>
    </div> 
}

const InputContainerComp = ()=>{
    const {searchScreenData:{searchQuery,activeSection,isLoading},handleSearchScreenData} = useZustandStore();
    const {getResults} = useSearch();
    const [searchText,setSearchText] = useState(searchQuery);
    const timer = useRef<NodeJS.Timeout>(null);

    const clearTimer = ()=> clearTimeout((timer as any).current);
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value;

        setSearchText(value);
        if(value.trim().length) handleSearchScreenData({isLoading:load_true});
        else {
            handleSearchScreenData({isLoading:init_search_loading,...init_search_data});
            clearTimer();
            return;
        } 

        
        if(timer.current) clearTimer();
        timer.current = setTimeout(()=>{
            handleSearchScreenData({searchQuery:value});
            getResults(value);
        } ,debounceTime);
    }
    useEffect(()=>setSearchText(searchQuery),[searchQuery]);
    useEffect(()=>{
    if(searchQuery && isLoading[activeSection]) getResults(searchQuery);
    },[activeSection])
    return  <Input value={searchText} onChange={handleChange} className="p-[1.5rem] rounded-[var(--border-radius-all)]" placeholder={placholderText}/>
}



const SearchSectionHandleComp = ()=>{
    const {searchScreenData:{activeSection}} = useZustandStore();
    switch(activeSection){
        case 'songs' : return <SongResults/>;
        case 'albums' : return <AlbumResults/>
        case 'artists' : return <AritistResultComp/>
        case 'playlists' : return <PlaylistResult/>
    }
}

const SongSkeletonParent = ()=>{
    return <div className="flex flex-col gap-2.5">
        {loadArray.map(()=><SongItemSkeleton key={v4()}/>)}
    </div>
}

const SongResults = ()=>{
    const {searchScreenData:{songData,isLoading:{songs}}} = useZustandStore();
    if(songs) return <SongSkeletonParent/>;
    return <SongsList songs={songData}/>
}

const AritistResultComp=()=>{    
const {searchScreenData:{artistData,isLoading:{artists}}} = useZustandStore();
    return <div className="flex flex-wrap gap-4">
        {artists && loadArray.map((elem)=><ArtistSkeletonCardComp key={elem}/>)}
        {!artists && artistData.map((artist)=><ArtistCard {...artist} key={artist.artistid}/>)}
    </div>
}

const PlaylistResultComp=()=>{
const {searchScreenData:{playlistData,isLoading:{playlists}}} = useZustandStore();
    return <div className="flex flex-wrap gap-4">
        {playlists && loadArray.map((elem)=><SkeletonAlbumCard key={elem}/>)}
        {!playlists && playlistData.map((playlist)=><AlbumCard {...playlist} key={playlist.id}/>)}
    </div>
}

const AlbumCardComp=()=>{
    const {searchScreenData:{albumsData,isLoading:{albums}}} = useZustandStore();
    return <div className="flex flex-wrap gap-4">
        {albums && loadArray.map((elem)=><SkeletonAlbumCard key={elem}/>)}
        {!albums && albumsData.map((album)=><AlbumCard {...album} key={album.id}/>)}
    </div>
}

const SearchScreen = memo(SearchComp);
const ButtonCategory = memo(ButtonCategoryComp);
const InputContainer = memo(InputContainerComp);
const AlbumResults = memo(AlbumCardComp);
const SearchSectionHandle = memo(SearchSectionHandleComp);
const PlaylistResult = memo(PlaylistResultComp);


export default SearchScreen;
export {SongSkeletonParent};