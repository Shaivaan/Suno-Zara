import { search_albums_api, search_artists_api, search_playlist_api, search_songs_api } from "@/api/api";
import { refactorAlbumList, refactorArtistList, refactorSongList } from "@/Screens/Search/utils";
import useZustandStore from "@/Zustand/store";
import axios from "axios";

const useSearch = ()=> {
        const {handleSearchScreenData,searchScreenData:{activeSection,isLoading}} = useZustandStore();
        const getResults = async(query:string)=>{
            try{
                const {data} = await axios.get(getSearchApi(activeSection) + query);
                const searchData = refactorHandleFn(activeSection,data?.data?.results || []);
                handleSearchScreenData({[getStoreKey(activeSection)]:searchData});
            }catch(err){

            }finally{
                const loading = {...isLoading,[activeSection]:false};
                handleSearchScreenData({isLoading:loading});
            }
        } 
        return {getResults};
}

const getSearchApi = (activeSection:ActiveSectionType)=>{
    switch(activeSection){
        case 'songs': return search_songs_api;
        case 'albums' : return search_albums_api;
        case 'artists' : return search_artists_api;
        case 'playlists': return search_playlist_api;
    }
};
const getStoreKey = (activeSection:ActiveSectionType)=>{
    switch(activeSection){
        case 'songs': return 'songData';
        case 'albums' : return 'albumsData';
        case 'artists' : return 'artistData';
        case 'playlists': return 'playlistData';
    }
}

const refactorHandleFn=(activeSection:ActiveSectionType,data:any)=>{
    switch(activeSection){
        case 'songs': return refactorSongList(data);
        case 'albums' : return refactorAlbumList(data);
        case 'artists' : return refactorArtistList(data);
        case 'playlists': return data;
    }
}

export default useSearch;