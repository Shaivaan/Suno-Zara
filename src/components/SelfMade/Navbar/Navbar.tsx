import { Button } from "@/components/ui/button";
import { AppName, cn } from "@/lib/utils";
import useZustandStore from "@/Zustand/store";
import { Menu, Music } from "lucide-react";
import { memo } from "react";

const NavbarComp = ()=>{
    const {toggleMobileMenu} = useZustandStore();
    return <div className={cn(`px-4 bg-glass-bg border-glass-border border-b-1 flex justify-between backdrop-blur-[40px] sm:z-[41] lg:z-[var(--navbar-z-index)] fixed top-0 w-full items-center h-[var(--navbar-height)]`)}>
        <div className="flex gap-2">
        <Button onClick={toggleMobileMenu} variant={"ghost"} className="cursor-pointer lg:hidden"><Menu/></Button>
        <Logo/>
        </div>
        <div className="flex gap-4" >
            <div>{AppName}</div>
            <div>{AppName}</div>
        </div>
    </div>
}

const Logo = ()=>{
    return <div className="flex gap-3 items-center">
        <div className="gradient-bg rounded-[var(--border-radius-all)] p-1.5 border-1"><Music size={'1rem'}/></div>
        <div className="gradient-bg text-clip text-[1.3rem] font-bold">{AppName}</div>
    </div>
}

const Navbar = memo(NavbarComp);
export default Navbar;