import { explore_titles_head } from "@/api/query";
import AlbumCard, { SkeletonAlbumCard } from "@/components/SelfMade/Cards/AlbumCard";
import ArtistCard, { ArtistSkeletonCardComp } from "@/components/SelfMade/Cards/ArtistCard";
import CarouselWrapperWithHead, { CarouselWrapper } from "@/components/SelfMade/CarouselWrapper/CarouselWrapper";
import useZustandStore from "@/Zustand/store";
import { memo } from "react";
import {v4} from 'uuid';
const {trending_artist} = explore_titles_head;

type keyType = keyof typeof explore_titles_head
const ExploreParentCarousels = ()=>{
  const titles = Object.keys(explore_titles_head);
  return <>
      {titles.map((title)=><ExploreCarouselMapper title={title as keyType} key={title}/>)}
  </>
}

const ExploreCarouselMapperComp = ({title}:{title : keyType})=>{
    const {exploreScreenData:{carouselData}} = useZustandStore();
    const type = explore_titles_head[title as keyType];
    const carouselArrayData = carouselData[type];
    if(!carouselArrayData?.length) return <ExploreLoadingCarousels title={title}/>
    if(type === trending_artist) return <AlbumArtistCarousel/>;

    return <div>
        <div className="title_carousel">{explore_titles_head[title as keyType]}</div>
        <ExploreCarousel type={type}/>  
    </div>
}


const ExploreCarouselComp = ({type}:AlbumPlaylistCarouseParentType)=>{
    const {exploreScreenData:{carouselData}} = useZustandStore();
    const carouselArrayData = carouselData[type];
    return <CarouselWrapper>
        {(carouselArrayData as unknown as AlbumsCardType[]).map((card)=><AlbumCard {...card} key={card.id}/>)}
    </CarouselWrapper>
}

const ExploreLoadingCarousels = ({title}:{title:string})=>{
    const loadeData = new Array(10).fill(10);
    const type = explore_titles_head[title as keyType];

    return <CarouselWrapperWithHead carouselHeading={type}>
        {loadeData.map((_elem,indx)=><SkeletonAlbumCard key={indx}/>)}
    </CarouselWrapperWithHead>
}


const AlbumArtistCarouselComp = ()=>{
    return <div>
        <div className="title_carousel">{trending_artist}</div>
        <AlbumArtistCardParent/>  
    </div>
}
const AlbumArtistCardParentComp = ()=>{
    const {exploreScreenData:{carouselData,isLoading}} = useZustandStore();
    const artistData = carouselData[trending_artist] as ArtistCardType[];
    const loadArray = new Array(10).fill(10);
    return <CarouselWrapper>
        {isLoading && loadArray.map((_el)=><ArtistSkeletonCardComp key={v4()}/>)}
        {!isLoading && artistData.map((artist) => <ArtistCard key={v4()} {...artist}/>)}
    </CarouselWrapper>
}

const ExploreCarousel = memo(ExploreCarouselComp);
const ExploreCarouselMapper = memo(ExploreCarouselMapperComp);
const AlbumArtistCarousel = memo(AlbumArtistCarouselComp);
const AlbumArtistCardParent = memo(AlbumArtistCardParentComp);
export default ExploreParentCarousels;