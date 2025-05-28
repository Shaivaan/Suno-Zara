import { routes } from "@/lib/utils";
import { AlignJustify, House, Library, Search } from "lucide-react";

const {home,library,queue,search} = routes;
const sidebar_data = [home,search,queue,library];
const getSidebar = (keyName:string)=>{
    switch(keyName){
        case home: return {title:'Home',icon:House};
        case library : return {title:'Library',icon:Search};
        case queue : return {title:'Queue',icon:AlignJustify};
        case search : return {title:'Search',icon:Library};
        default : return {title:'Home',icon:House};
    }
}

export {sidebar_data,getSidebar};