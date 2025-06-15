import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import useZustandStore from "@/Zustand/store";
import { memo } from "react"
import { AlbumSection, ArtistSection, PlaylistSection } from "./LibrarySection";
const library_cat_data = ['playlist','artist','album'];

const Library = ()=>{
    return <div className="flex flex-col col-gap-val">
        <div className="title_carousel">Your Library</div>
        <LibraryButtonContainer/>
        <LibrarySectionHandler/>
    </div>
}

const LibraryButtonContainerComp = ()=>{
    const librarySection = useZustandStore((store)=> store.librarySection);
    const handleLibrarySection = useZustandStore((store)=> store.handleLibrarySection);
    const handleSection = (section:string)=> handleLibrarySection(section as unknown as LibrarySectionType)
    return <ButtonMenu>
        {library_cat_data.map((el)=><MenuButton isActive={librarySection === el} onClick={()=>handleSection(el)}>{el}</MenuButton>)}
    </ButtonMenu>
}


const LibrarySectionHandler = ()=>{
    const librarySection = useZustandStore(state => state.librarySection);
    switch(librarySection){
        case 'playlist': return <PlaylistSection/>
        case 'artist': return <ArtistSection/>
        case 'album': return <AlbumSection/>
    }
}



const LibraryButtonContainer = memo(LibraryButtonContainerComp);


const LibraryScreen = memo(Library);
export default LibraryScreen;