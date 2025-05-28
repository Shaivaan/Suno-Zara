import { routes } from "@/lib/utils";
import { AlignJustify, Compass, House, Library, Search } from "lucide-react";

const {home,library,queue,search} = routes;
const sidebar_data = [home,search,queue,library];
const getSidebar = (keyName:string)=>{
    switch(keyName){
        case home: return {title:'Explore',icon:Compass};
        case library : return {title:'Library',icon:Library };
        case queue : return {title:'Queue',icon:AlignJustify};
        case search : return {title:'Search',icon:Search};
        default : return {title:'Home',icon:House};
    }
}

export {sidebar_data,getSidebar};