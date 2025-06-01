import { explore_titles_head } from "@/api/query";
import AlbumCard from "@/components/SelfMade/Cards/AlbumCard";
import useZustandStore from "@/Zustand/store";
import { memo } from "react";

type keyType = keyof typeof explore_titles_head
const ExploreParentCarousels = ()=>{
  const titles = Object.keys(explore_titles_head);
  return <>
      {titles.map((title)=><ExploreCarouselMapper title={title as keyType}/>)}
  </>
}

const ExploreCarouselMapperComp = ({title}:{title : keyType})=>{
    const {exploreScreenData} = useZustandStore();
    const type = explore_titles_head[title as keyType];
    const carouselArrayData = exploreScreenData[type];
    if(!carouselArrayData.length) return null;
    return <div>
        <div className="title_carousel">{explore_titles_head[title as keyType]}</div>
        <ExploreCarousel type={type}/>  
    </div>
}


const ExploreCarouselComp = ({type}:AlbumPlaylistCarouseParentType)=>{
    const {exploreScreenData} = useZustandStore();
    const carouselArrayData = exploreScreenData[type];
    return <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
        {carouselArrayData.map((card)=><AlbumCard {...card}/>)}
    </div>
}

const ExploreCarousel = memo(ExploreCarouselComp);
const ExploreCarouselMapper = memo(ExploreCarouselMapperComp);
export default ExploreParentCarousels;