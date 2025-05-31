import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import { memo } from "react"
const library_cat_data = ['Playlist','Artist','Album'];

const Library = ()=>{
    return <div>
        <div className="title_carousel">Your Library</div>
    </div>
}

const LibraryButtonContainerComp = ()=>{
    return <ButtonMenu>
        {library_cat_data.map((el)=><MenuButton>{el}</MenuButton>)}
    </ButtonMenu>
}

const LibraryButtonContainer = memo(LibraryButtonContainerComp);

const LibraryScreen = memo(Library);
export default LibraryScreen;