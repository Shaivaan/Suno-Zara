import { memo } from "react";
import PlayListHead from "./PlayListHead"
import SongsList from "../SongList/SongList";

const PlayListScreenComp = ()=>{
    return <div>
        <PlayListHead/> 
        <div className="mt-4"><SongsList/></div>
    </div>
}

const PlayListScreen = memo(PlayListScreenComp);
export default PlayListScreen;