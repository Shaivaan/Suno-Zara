import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import { memo, useState } from "react"
const library_cat_data = ['playlist','artist','album'];

const Library = ()=>{
    return <div className="flex flex-col col-gap-val">
        <div className="title_carousel">Your Library</div>
        <LibraryButtonContainer/>
    </div>
}

const LibraryButtonContainerComp = ()=>{
    const [libraryOpted,setLibraryOpted] = useState('playlist');
    return <ButtonMenu>
        {library_cat_data.map((el)=><MenuButton isActive={libraryOpted === el} onClick={()=>setLibraryOpted(el)}>{el}</MenuButton>)}
    </ButtonMenu>
}

const LibraryButtonContainer = memo(LibraryButtonContainerComp);

const LibraryScreen = memo(Library);
export default LibraryScreen;