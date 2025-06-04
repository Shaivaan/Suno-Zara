import { memo, useEffect } from "react";
import PlayListHead from "./PlayListHead"
import { useSearchParams } from "react-router-dom";
import SongsList from "@/components/SelfMade/SongList/SongList";
import axios from "axios";
import { get_album_using_id, get_playlist_using_id } from "@/api/api";
import { refactorSongList } from "../Search/utils";
import useZustandStore from "@/Zustand/store";
import { SongSkeletonParent } from "../Search/Search";
import useScrollToTop from "@/CustomHook/useScroll";

const PlayListAlbumScreenComp = ()=>{
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') as unknown as 'album' | 'playlist';
    const id = searchParams.get('id');
    const {albumPlayListScreenData:{data,isLoading},handleAlbumPlayListScreenData} = useZustandStore();
    const scrollToTop = useScrollToTop();
    
    const getData = async()=>{
        const api = type === 'album' ? get_album_using_id + id : get_playlist_using_id + id;
        try{
            const res = await axios.get(api);
            const {data}:{data : {data : AlbumPlaylistResponse}} = res;
            handleSuccessRes(data?.data);    
        }catch(err){
            
        }finally{
            handleAlbumPlayListScreenData({isLoading:false});
        }
    }

    const handleSuccessRes = (data : AlbumPlaylistResponse)=>{
        if(!data?.id) return;
        const {id,name,image,type} = data;
        const imageLink = image[2]?.url;
        const songList = refactorSongList(data?.songs || []);
        handleAlbumPlayListScreenData({details:{id,name,type,image:imageLink,duration :'Static Duration'},data:songList});

    }

    useEffect(()=>{
        scrollToTop();
        handleAlbumPlayListScreenData({isLoading:true});
        getData();
    },[])
    

    return <div>
        <PlayListHead/> 
        <div className="mt-4">{isLoading ? <SongSkeletonParent/> :  <SongsList songs={data}/>}</div>
    </div>
}

const PlayListAlbumScreen = memo(PlayListAlbumScreenComp);
export default PlayListAlbumScreen;