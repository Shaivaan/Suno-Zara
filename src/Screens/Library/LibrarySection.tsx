import { memo } from "react"

const PlaylistSectionComp = ()=>{
    return <div>Playlist Section</div>
}

const ArtistSectionComp = ()=>{
    return <div>Artist Section</div>
}

const AlbumSectionComp = ()=>{
    return <div>Album Section</div>
}


const PlaylistSection = memo(PlaylistSectionComp);
const ArtistSection = memo(ArtistSectionComp);
const AlbumSection = memo(AlbumSectionComp);
export {PlaylistSection,ArtistSection, AlbumSection};