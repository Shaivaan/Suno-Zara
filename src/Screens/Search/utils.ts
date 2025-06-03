function refactorSongList (data: SongResType[]):SongListType[]{
    const songList:SongListType[] = data.map((song)=>{
        const {id,name,image,album,artists,duration,url} = song;
        const imageLink = image[2]?.url;
        const albumName = album?.name;
        const artistName = artists?.primary[0]?.name
        return {
            id,
            album:albumName,
            artists:artistName,
            duration,
            image:imageLink,
            name,
            url
        }
    })
    return songList;
}


function refactorArtistList(data:ArtistResType[]):ArtistCardType[] {
    const refactorData:ArtistCardType[] =  data.map(({id,image,name})=>{
        const imageLink = image[2].url;
        return {
            image:imageLink,
            name,
            artistid:id,
            follower_count:0,
            is_followed:true
        }
    })
    return refactorData;
}

function refactorAlbumList(data: AlbumResType[]):AlbumsCardType[]{
    const refactorData:AlbumsCardType[] = data.map(({explicitContent,id,image,language,name,type,url})=>{
        return {
            id,
            explicitContent,
            image,
            language,
            name,
            songCount:0,
            type,
            url
        }
    });
    return refactorData;
}

export {refactorSongList,refactorArtistList,refactorAlbumList};