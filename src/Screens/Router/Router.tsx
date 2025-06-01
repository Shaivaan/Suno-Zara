import MusicBar from "@/components/SelfMade/MusicBar/MusicBar"
import Navbar from "@/components/SelfMade/Navbar/Navbar"
import Sidebar from "@/components/SelfMade/Sidebar/Sidebar"
import { cn, routes } from "@/lib/utils"
import { Route, Routes } from "react-router-dom"
import Explore from "../Explore/Explore"
import SearchScreen from "../Search/Search"
import { Queue } from "../Queue/Queue"
// import PlayListScreen from "@/components/SelfMade/PlayList/PlayListScreen"
import LibraryScreen from "../Library/Library"
const {home,library,queue,search} = routes;

export const RouterComp = ()=>{
      // Toggle dark mode by adding/removing 'dark' class to document
  // const toggleDarkMode = () => {
  //   const newIsDark = !isDark;
  //   setIsDark(newIsDark);
  //   if (newIsDark) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // };

    return <>
        <Navbar/>
        <Sidebar/>
        <MusicBar/>
        <DynamicRoute/>
    </>
}

const DynamicRoute = ()=>{
    return <div className={cn('mt-[var(--navbar-height)] mb-[100px] p-4 lg:ml-[var(--side-bar-width)]')}>
        <Routes>
            <Route path={home} element={<Explore/>}/>
            <Route path={search} element={<SearchScreen/>}/>
            <Route path={queue} element={<Queue isScreen/>}/>
            <Route path={library} element={<LibraryScreen/>}/>
        </Routes>
    </div>
}