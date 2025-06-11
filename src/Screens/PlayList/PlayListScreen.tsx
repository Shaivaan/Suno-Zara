import { memo, useEffect } from "react";
import PlayListHead from "./PlayListHead"
import { useSearchParams } from "react-router-dom";
import SongsList from "@/components/SelfMade/SongList/SongList";
import axios from "axios";
import { get_album_using_id, get_artist_using_id, get_playlist_using_id } from "@/api/api";
import { refactorSongList } from "../Search/utils";
import useZustandStore, { playlist_init_details } from "@/Zustand/store";
import { SongSkeletonParent } from "../Search/Search";
import useScrollToTop from "@/CustomHook/useScroll";
import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import FailedFallBack from "@/components/SelfMade/Cards/FailedFallBack";

const getApiAccordingly = (screen:ScreenType)=>{
    switch (screen){
        case 'album': return get_album_using_id;
        case 'playlist' : return get_playlist_using_id;
        case 'artist' : return get_artist_using_id;
    }
}

const artist_button_container = ['songs','albums'] as ArtistSectionType[];


const PlayListAlbumScreenComp = ()=>{
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') as unknown as ScreenType;
    const id = searchParams.get('id');
    const {albumPlayListScreenData:{isLoading,isFailedLoading},handleAlbumPlayListScreenData} = useZustandStore();
    const scrollToTop = useScrollToTop();
    
    const getData = async()=>{
        const api = getApiAccordingly(type) + id;
        try{
            const res = await axios.get(api);
            const {data}:{data : {data : AlbumPlaylistResponse,success:boolean}} = res;
            if(data.success) handleSuccessRes(data?.data);    
            else handleFail();
        }catch(err){
            handleFail();
        }finally{
            handleAlbumPlayListScreenData({isLoading:false});
        }
    }

    const handleSuccessRes = (data : AlbumPlaylistResponse)=>{
        const {id,name,image,type} = data;
        const isArtist = type === 'artist'
        const imageLink = image[2]?.url;
        const songList = refactorSongList(!isArtist ? data?.songs : data?.topSongs);
        handleAlbumPlayListScreenData({details:{id,name,type,image:imageLink,
            duration:type !== 'artist' ? 'Static Duration' : data.dominantType, 
        },
        artistAlbumData : isArtist ? data.topAlbums : [],
        data:songList});
    }

    const handleFail = ()=>handleAlbumPlayListScreenData({data:[],artistAlbumData:[],details : playlist_init_details,isFailedLoading:true})

    useEffect(()=>{
        scrollToTop();
        handleAlbumPlayListScreenData({isLoading:true,isFailedLoading:false});
        getData();
    },[type,id])
    

    if(isFailedLoading) return <FailedFallBack/>

    return <div>
        <PlayListHead/> 
        <div className="mt-4">{isLoading ? <SongSkeletonParent/> :  <SongsListHandler/>}</div>
    </div>
}

const SongsListHandlerComp = ()=>{
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') as unknown as ScreenType;
    const {albumPlayListScreenData:{data,section,artistAlbumData}} = useZustandStore();
    if( type !== 'artist') return <SongsList songs={data}/>;
    return <div className="flex gap-2 flex-col">
    <ArtistButtonCategory/>

    {section === 'albums' ? <div>
        <div className="title_carousel">Top Albums</div>
        <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
        {(artistAlbumData as unknown as AlbumsCardType[]).map((card)=><AlbumCard {...card} key={card.id}/>)}
        </div>
    </div> : <SongsList songs={data}/>}
    </div>
}

const ArtistButtonCategory = ()=>{
    const {albumPlayListScreenData:{section},handleAlbumPlayListScreenData} = useZustandStore();
    const toggleCategory = (section : ArtistSectionType)=> handleAlbumPlayListScreenData({section});
    return <div className="flex justify-end">    
        <ButtonMenu>
            {artist_button_container.map((label)=> <MenuButton
                onClick={()=>toggleCategory(label)}
                isActive = {label === section}
                key={label}
            >{label}</MenuButton>)}
        </ButtonMenu>
    </div>
}

const PlayListAlbumScreen = memo(PlayListAlbumScreenComp);
const SongsListHandler = memo(SongsListHandlerComp);
export default PlayListAlbumScreen;