import { Button } from "@/components/ui/button";
import { AppName, cn, localStorageKeys } from "@/lib/utils";
import useZustandStore from "@/Zustand/store";
import { AudioWaveform, Menu, Moon, Sun } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { LazyAvatar } from "../LazyAvatar/LazyAvatar";
import { MusicBarButton } from "../MusicBar/MusicBar";
import useLocalStorage from "@/hooks/use-localstorage";
const shadCnImage = "https://github.com/shadcn.png";

const NavbarComp = ()=>{
    const {toggleMobileMenu} = useZustandStore();    
    return <div className={cn(`px-4 bg-glass-bg border-glass-border border-b-1 flex justify-between backdrop-blur-[40px] sm:z-[41] lg:z-[var(--navbar-z-index)] fixed top-0 w-full items-center h-[var(--navbar-height)]`)}>
        <div className="flex gap-2">
        <Button onClick={toggleMobileMenu} variant={"ghost"} className="cursor-pointer lg:hidden"><Menu/></Button>
        <Logo/>
        </div>
        <div className="flex gap-5 items-center">
            <ThemeHandler/>    
            <LazyAvatar image={shadCnImage}/>
        </div>
    </div>
}

const ThemeHandlerComp = ()=>{
    const {setData:setTheme,getData:getTheme} = useLocalStorage(localStorageKeys.theme);
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = getTheme();
        return savedTheme ? savedTheme === 'dark' : true;
  });
    const theme = useMemo(()=>isDark ? 'Dark' : "Light" ,[isDark]);

      useEffect(() => {
        if (isDark) document.documentElement.classList.remove('light');
        else document.documentElement.classList.add('light');
      }, [isDark]);   

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? 'dark' : 'light');
  };
    
    return <MusicBarButton tooltip={`${theme} Mode`} onClick={toggleTheme} className="cursor-pointer icons-hover">
        {isDark ? <Moon /> : < Sun/>}
    </MusicBarButton>
}

const Logo = ()=>{
    return <div className="flex gap-3 items-center">
        <div className="gradient-bg rounded-[var(--border-radius-all)] p-1.5 border-1"><AudioWaveform size={'1rem'}/></div>
        <div className="gradient-bg text-clip text-[1.3rem] font-bold">{AppName}</div>
    </div>
}

const Navbar = memo(NavbarComp);
const ThemeHandler = memo(ThemeHandlerComp);
export default Navbar;