import type { ReactNode } from "react";

interface CarouselType{
    carouselHeading : string
    children:ReactNode
}

const CarouselWrapper = ({children}:ChildrenType)=>{
    return <div className="flex overflow-x-auto overflow-y-hidden gap-4 w-full scroll-smooth py-2">
            {children}
    </div>
}

const CarouselWrapperWithHead = ({carouselHeading,children}:CarouselType)=>{
    return <div>
        <div className="title_carousel">{carouselHeading}</div>
        <CarouselWrapper>{children}</CarouselWrapper>    
    </div>
}


export {CarouselWrapper};
export default CarouselWrapperWithHead;