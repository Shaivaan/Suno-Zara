import { routes } from "@/lib/utils";
import { useLocation } from "react-router-dom"

const useCurrentScreen = ()=>{
    const {pathname} = useLocation();
    switch(pathname){
        case(routes.search) : return 'Search';
        case(routes.genre) : return 'Genre';
        default : return 'Other';
    }
}

export default useCurrentScreen;