import MusicBar from "@/components/SelfMade/MusicBar/MusicBar"
import Navbar from "@/components/SelfMade/Navbar/Navbar"
import Sidebar from "@/components/SelfMade/Sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"

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
    return <div className="ml-[var(--side-bar-width)] border-1 border-glass-border mt-[var(--navbar-height)] p-2 h-90">
        <Routes>
            <Route path="/" element={'Home'}/>
        </Routes>
    </div>
}