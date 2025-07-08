import AlbumCard from "@/components/SelfMade/Cards/AlbumCard"
import ArtistCard from "@/components/SelfMade/Cards/ArtistCard";
import { useLibraryData } from "@/hooks/use-musicbar";
import { memo } from "react"

const FlexWrapParent = ({children}:ChildrenType)=><div className="flex flex-wrap gap-4">{children}</div>;


const PlaylistSectionComp = ()=>{
    const {favSongNumber, favPlaylist} = useLibraryData();
    return <FlexWrapParent>
        <div className="flex flex-wrap gap-4">
            <AlbumCard name="Liked Songs" songCount={favSongNumber} type="liked songs" isLikedSongsAlbum {...{} as any}/>
            {favPlaylist.map((data)=><AlbumCard {...data} key={data.id}/>)}
        </div>
    </FlexWrapParent>
}

const ArtistSectionComp = ()=>{
    const {favArtist} = useLibraryData();
    if(!favArtist.length) return <FallBackEmptyUI title="Artists"/>
    return  <div className="flex flex-wrap gap-4">
        {favArtist.map((data)=><ArtistCard {...data} key={data.artistid}/>)}
    </div>
}

const AlbumSectionComp = ()=>{
    const {favAlbums} = useLibraryData();
    if(!favAlbums.length) return <FallBackEmptyUI title="Albums"/>

    return <div className="flex flex-wrap gap-4">
        {favAlbums.map((data)=><AlbumCard {...data} key={data.id}/>)}
    </div>
}

const FallBackEmptyUI = ({title}:{title: string})=>{
    return <div>No {title} Saved Yet — Start Collecting Your Favorites!</div>
}

const PlaylistSection = memo(PlaylistSectionComp);
const ArtistSection = memo(ArtistSectionComp);
const AlbumSection = memo(AlbumSectionComp);
export {PlaylistSection,ArtistSection, AlbumSection};