import AlbumCard from "@/components/SelfMade/Cards/AlbumCard"
import { useLibraryData } from "@/hooks/use-musicbar";
import { memo } from "react"

const FlexWrapParent = ({children}:ChildrenType)=><div className="flex flex-wrap gap-4">{children}</div>;


const PlaylistSectionComp = ()=>{
    const {favSongNumber} = useLibraryData();
    return <FlexWrapParent>
        <AlbumCard name="Liked Song" songCount={favSongNumber} type="liked_songs" isLikedSongsAlbum {...{} as any}/>
    </FlexWrapParent>
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