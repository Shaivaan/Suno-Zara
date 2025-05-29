// import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
// import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import FavIcon from "@/components/SelfMade/Icons/FavIcon";
import { LazyAvatar } from "@/components/SelfMade/LazyAvatar/LazyAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { memo, useState } from "react";

const placholderText = 'Search for songs, artists, albums...';
const button_data = ['songs','artists','albums','playlists'];
const table_columns = ['#','title','artist','album','duration'];

const SearchComp=()=>{
    return <div className="flex flex-col gap-5">
       <div className="title_carousel">Search</div>
       <InputContainer/>
       <ButtonCategory/>
       <SongsResult/>
       {/* <ArtistResults/> */}
       {/* <AlbumResults/> */}
    </div>
}

const ButtonCategoryComp = ()=>{
    const [category,setCategory] = useState(button_data[0]);
    const toggleCategory = (category:string)=>setCategory(category);

    return <div className="flex justify-end">
        <div className="w-fit border-b-glass-border rounded-[var(--border-radius-all)] border-1 flex gap-0.5 overflow-hidden">
        {button_data.map((label)=> <Button
         variant={'ghost'} 
         onClick={()=>toggleCategory(label)}
         className={cn("capitalize rounded-none",
            label === category && 'border-b-[var(--accent-purple)] border-b-1 bg-glass-bg rounded-t-sm'
        )}
         >{label}</Button>)}
    </div>
    </div> 
}

const InputContainerComp = ()=>{
    return  <Input className="p-[1.5rem] rounded-[var(--border-radius-all)]" placeholder={placholderText}/>
}



const songMockData = {
    title:'Bulley Tum Bin 2',
    artist:'Arijit Singh',
    album : 'Sanam Puri',
    duration:'3:59'
}

const SongResultsComp = ()=>{
    const songs = Array(20).fill(0);
    return <div className="flex flex-col gap-2.5">
        <SongsHead/>
        <Separator/>
        {songs.map((_song)=><SongItem/>)}
    </div>
}

const SongsHead=()=>{
    return <div className="grid-container-songs">
      {table_columns.map((el)=><div key={el} className={cn("capitalize label-text")}>{el}</div>)}
    </div>
}

const SongItem = ()=>{
    const {album,artist,duration,title} = songMockData;
    return <div className="grid-container-songs song_row group/song">
        <div className="label-text text-[0.9rem]">1</div>
        <div className="flex gap-4 items-center">
            <div className="relative">
                <LazyAvatar className="rounded-[var(--border-radius-all)] group-hover/song:opacity-40"/>
                <Play className="absolute top-2 right-2 opacity-0 group-hover/song:opacity-100 icons-hover" size={'1rem'}/>
                <FavIcon className="absolute top-2 right-12 opacity-0 group-hover/song:opacity-100" isFlagged/>
            </div>
            <div className="text-[0.94rem]">{title}</div>
        </div>
        <div className="label-text text-[0.9rem]">{artist}</div>
        <div className="label-text text-[0.9rem]">{album}</div>
        <div className="label-text text-[0.9rem]">{duration}</div>
    </div>
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
const SongsResult = memo(SongResultsComp);
// const AlbumResults = memo(AlbumCardComp);
// const ArtistResults = memo(AritistResultComp);

export default SearchScreen