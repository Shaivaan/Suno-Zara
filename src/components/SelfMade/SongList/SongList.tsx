import { Play } from "lucide-react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import FavIcon from "../Icons/FavIcon";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
const table_columns = ['#','title','artist','album','duration'];

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


const SongItem = ({isPlaying=false}:{isPlaying?:boolean})=>{
    const {album,artist,duration,title} = songMockData;
    return <div className={cn("grid-container-songs song_row group/song",isPlaying && 'playing')}>
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
const SongsList = memo(SongResultsComp);
export default SongsList
