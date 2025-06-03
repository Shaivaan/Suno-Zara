import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import SongsList from "@/components/SelfMade/SongList/SongList";
import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import { Input } from "@/components/ui/input";
import useZustandStore, { debounceTime } from "@/Zustand/store";
import { memo, useEffect, useRef, useState } from "react";
import useSearch from "@/CustomHook/useSearch";
import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";

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
    const {searchScreenData:{searchQuery},handleSearchScreenData} = useZustandStore();
    const {getResults} = useSearch();
    const [searchText,setSearchText] = useState(searchQuery);
    const timer = useRef<NodeJS.Timeout>(null);
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value;
        setSearchText(value);
        if(timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(()=>{
            handleSearchScreenData({searchQuery:value,isLoading:{albums:true,artists:true,playlists:true,songs:true}});
            getResults(value);
        } ,debounceTime);
    }
    useEffect(()=>setSearchText(searchQuery),[searchQuery]);
    return  <Input value={searchText} onChange={handleChange} className="p-[1.5rem] rounded-[var(--border-radius-all)]" placeholder={placholderText}/>
}



const SearchSectionHandleComp = ()=>{
    const {searchScreenData:{activeSection,songData}} = useZustandStore();
    switch(activeSection){
        case 'songs' : return <SongsList songs={songData}/>;
        case 'albums' : return <AlbumResults/>
        case 'artists' : return <AritistResultComp/>
        case 'playlists' : return <PlaylistResult/>
    }
}

const AritistResultComp=()=>{
const {searchScreenData:{artistData}} = useZustandStore();
    return <div className="flex flex-wrap gap-4">
        {artistData.map((artist)=><ArtistCard {...artist} key={artist.artistid}/>)}
    </div>
}

const PlaylistResultComp=()=>{
const {searchScreenData:{playlistData}} = useZustandStore();
    return <div className="flex flex-wrap gap-4">
        {playlistData.map((playlist)=><AlbumCard {...playlist} key={playlist.id}/>)}
    </div>
}

const AlbumCardComp=()=>{
    const {searchScreenData:{albumsData}} = useZustandStore();
    return <div className="flex flex-wrap gap-4">
        {albumsData.map((album)=><AlbumCard {...album} key={album.id}/>)}
    </div>
}

const SearchScreen = memo(SearchComp);
const ButtonCategory = memo(ButtonCategoryComp);
const InputContainer = memo(InputContainerComp);
const AlbumResults = memo(AlbumCardComp);
// const ArtistResults = memo(AritistResultComp);
const SearchSectionHandle = memo(SearchSectionHandleComp);
const PlaylistResult = memo(PlaylistResultComp);

export default SearchScreen