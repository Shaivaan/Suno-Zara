import MusicBar from "@/components/SelfMade/MusicBar/MusicBar"
import Navbar from "@/components/SelfMade/Navbar/Navbar"
import Sidebar from "@/components/SelfMade/Sidebar/Sidebar"
import { cn, routes } from "@/lib/utils"
import { Route, Routes } from "react-router-dom"
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
    return <div className={cn('mt-[var(--navbar-height)] p-2 lg:ml-[var(--side-bar-width)]')}>
        <Routes>
            <Route path={home} element={'Music Home'}/>
            <Route path={library} element={'Music Library'}/>
            <Route path={queue} element={'Music Queue'}/>
            <Route path={search} element={'Music Search'}/>
        </Routes>
    </div>
}