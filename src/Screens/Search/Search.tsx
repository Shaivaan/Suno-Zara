// import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
// import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import SongsList from "@/components/SelfMade/SongList/SongList";
import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import { Input } from "@/components/ui/input";
import { memo, useState } from "react";

const placholderText = 'Search for songs, artists, albums...';
const button_data = ['songs','artists','albums','playlists'];

const SearchComp=()=>{
    return <div className="flex flex-col gap-5">

       <div className="title_carousel">Search</div>
       <InputContainer/>
       <ButtonCategory/>
       <SongsList/>
       {/* <ArtistResults/> */}
       {/* <AlbumResults/> */}
    </div>
}

const ButtonCategoryComp = ()=>{
    const [category,setCategory] = useState(button_data[0]);
    const toggleCategory = (category:string)=>setCategory(category);

    return <div className="flex justify-end">
        <ButtonMenu>
        {button_data.map((label)=> <MenuButton
         onClick={()=>toggleCategory(label)}
         isActive = {label === category}
         >{label}</MenuButton>)}
    </ButtonMenu>
    </div> 
}

const InputContainerComp = ()=>{
    return  <Input className="p-[1.5rem] rounded-[var(--border-radius-all)]" placeholder={placholderText}/>
}





// const AritistResultComp=()=>{
//     const artist_data = new Array(20).fill(0);
//     return <div className="flex flex-wrap gap-4"
//     >
//         {artist_data.map((_el)=><ArtistCard/>)}
//     </div>
// }

// const AlbumCardComp=()=>{
//     const artist_data = new Array(6).fill(0);
//     return <div className="flex flex-wrap gap-4"
//     >
//         {artist_data.map((_el)=><AlbumCard/>)}
//     </div>
// }

const SearchScreen = memo(SearchComp);
const ButtonCategory = memo(ButtonCategoryComp);
const InputContainer = memo(InputContainerComp);
// const AlbumResults = memo(AlbumCardComp);
// const ArtistResults = memo(AritistResultComp);

export default SearchScreen