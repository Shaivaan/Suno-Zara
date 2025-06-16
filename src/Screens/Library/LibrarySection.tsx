import AlbumCard from "@/components/SelfMade/Cards/AlbumCard"
import { memo } from "react"

const FlexWrapParent = ({children}:ChildrenType)=><div className="flex flex-wrap gap-4">{children}</div>;


const PlaylistSectionComp = ()=>{
    return <FlexWrapParent>
        <AlbumCard name="Liked Song" songCount={2} type="Liked Songs" isLikedSongsAlbum {...{} as any}/>
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