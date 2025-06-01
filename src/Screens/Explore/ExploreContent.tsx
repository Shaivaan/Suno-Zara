import { explore_titles_head } from "@/api/query";
import AlbumCard, { SkeletonAlbumCard } from "@/components/SelfMade/Cards/AlbumCard";
import useZustandStore from "@/Zustand/store";
import { memo } from "react";

type keyType = keyof typeof explore_titles_head
const ExploreParentCarousels = ()=>{
  const titles = Object.keys(explore_titles_head);
  return <>
      {titles.map((title)=><ExploreCarouselMapper title={title as keyType} key={title}/>)}
  </>
}

const ExploreCarouselMapperComp = ({title}:{title : keyType})=>{
    const {exploreScreenData:{carouselData,isLoading}} = useZustandStore();
    const type = explore_titles_head[title as keyType];
    const carouselArrayData = carouselData[type];
    if(isLoading) return <ExploreLoadingCarousels title={title}/>
    if(!carouselArrayData.length) return null;
    return <div>
        <div className="title_carousel">{explore_titles_head[title as keyType]}</div>
        <ExploreCarousel type={type}/>  
    </div>
}


const ExploreCarouselComp = ({type}:AlbumPlaylistCarouseParentType)=>{
    const {exploreScreenData:{carouselData}} = useZustandStore();
    const carouselArrayData = carouselData[type];
    return <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
        {carouselArrayData.map((card)=><AlbumCard {...card} key={card.id}/>)}
    </div>
}

const ExploreLoadingCarousels = ({title}:{title:string})=>{
    const loadeData = new Array(10).fill(10);
    const type = explore_titles_head[title as keyType];

    return <div>
        <div className="title_carousel">{type}</div>
        <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
        {loadeData.map(()=><SkeletonAlbumCard/>)}
    </div>
    </div>
}

const ExploreCarousel = memo(ExploreCarouselComp);
const ExploreCarouselMapper = memo(ExploreCarouselMapperComp);
export default ExploreParentCarousels;