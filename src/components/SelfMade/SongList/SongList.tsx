import { Pause, Play } from "lucide-react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import FavIcon from "../Icons/FavIcon";
import { memo } from "react";
import { cn, routes, stopPropagation } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { secondsToMMSS } from "@/Screens/Explore/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import useMusicBar, { useCurrentSongCheck, useLibraryData, useLikeFlag, usePlaySong } from "@/hooks/use-musicbar";
const table_columns = ['#','title','artist','album','duration'];

const SongResultsComp = ({songs}:{songs :SongListType[]})=>{
    if(!songs.length) return null;
    return <div className="flex flex-col gap-2.5">
        <SongsHead/>
        <Separator/>
        {songs.map((song,indx:number)=><SongItem song={song} indx={indx+1} key={song.id}/>)}
    </div>
}

const SongsHead=()=>{
    return <div className="grid-container-songs">
      {table_columns.map((el)=><div key={el} className={cn("capitalize label-text")}>{el}</div>)}
    </div>
}


const SongItem = ({song,indx}:{song:SongListType} & {indx:number})=>{
    const {album,artists,duration,image,name,artistId,albumId, id} = song;
    const isCurrentSongPlaying = useCurrentSongCheck(id);
    const {markSongFav} = useLibraryData();
    const {isPlaying} = useMusicBar();
    const {handleSongAndQueue} = usePlaySong(id);
    const playSong = () => handleSongAndQueue(); 
    const isFlagged = useLikeFlag(song?.id,'song');
    const likeSong = (event:React.MouseEvent)=>{
       stopPropagation(event);
       markSongFav(song.id,isFlagged);
    };

    return <div className={cn("grid-container-songs song_row group/song",isCurrentSongPlaying && 'playing')} onClick={playSong}>
        <div className="label-text text-[0.9rem]">{indx}</div>
        <div className="flex gap-4 items-center">
            <div className="relative">
                <LazyAvatar image={image} className="rounded-[var(--border-radius-all)] size-8 group-hover/song:opacity-40"/>
                {!isCurrentSongPlaying || !isPlaying ?
                 <Play className="absolute top-2 right-2 opacity-0 group-hover/song:opacity-100 icons-hover" size={'1rem'}/> :
                 <Pause className="absolute top-2 right-2 opacity-0 group-hover/song:opacity-100 icons-hover" size={'1rem'}/>
                }
                
                <div onClick={likeSong} className="absolute top-2 right-12 opacity-0 group-hover/song:opacity-100"><FavIcon className="size-[1.2rem]" isFlagged={isFlagged}/></div>
                
            </div>
            <div className="text-[0.94rem]">{name}</div>
        </div>
        <Link onClick={stopPropagation} className="underline" to={routes.genre + `?id=${artistId}&type=artist`}><div className="label-text text-[0.9rem]">{artists}</div></Link> 
        <Link onClick={stopPropagation} className="underline" to={routes.genre + `?id=${albumId}&type=album`}><div className="label-text text-[0.9rem]">{album}</div></Link>
        <div className="label-text text-[0.9rem]">{secondsToMMSS(duration)}</div>
    </div>
}

const SongItemSkeleton = ()=><Skeleton className="h-10 w-full !rounded-[var(--border-radius-all)]"/>
const SongsList = memo(SongResultsComp);
export default SongsList;
export {SongItemSkeleton};