import { memo, useEffect } from "react";
import PlayListHead from "./PlayListHead"
import { useSearchParams } from "react-router-dom";
import SongsList from "@/components/SelfMade/SongList/SongList";
import axios from "axios";
import { get_album_using_id, get_artist_using_id, get_playlist_using_id } from "@/api/api";
import { refactorSongList } from "../Search/utils";
import useZustandStore, { playlist_init_details } from "@/Zustand/store";
import { SongSkeletonParent } from "../Search/Search";
import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
import { ButtonMenu, MenuButton } from "@/components/SelfMade/Wrapper/ButtonMenu";
import FailedFallBack from "@/components/SelfMade/Cards/FailedFallBack";
import CarouselWrapperWithHead from "@/components/SelfMade/CarouselWrapper/CarouselWrapper";
import { useLibraryData } from "@/hooks/use-musicbar";

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
    const {favoriteSongs} = useLibraryData();
    
    const getData = async()=>{
        const api = getApiAccordingly(type) + (id as string);
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
        handleAlbumPlayListScreenData({isLoading:true,isFailedLoading:false});
        if(type !== 'liked_songs') getData();
        else handlePlaylistScreenForLibrary();
    },[type,id])

    const handlePlaylistScreenForLibrary = ()=>{
        handleAlbumPlayListScreenData({
            details:{id:null,name:'Liked Songs',type:'Flagged Songs',image:null,duration:'Static Duration'},
            artistAlbumData : [], 
            data:favoriteSongs
        });
        handleAlbumPlayListScreenData({isLoading:false});
    }
    

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

    {section === 'albums' ? 
    <CarouselWrapperWithHead carouselHeading="Top Albums">{(artistAlbumData as unknown as AlbumsCardType[]).map((card)=><AlbumCard {...card} key={card.id}/>)}</CarouselWrapperWithHead> : <SongsList songs={data}/>}
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