import { AppName } from "@/lib/utils";
import { Music } from "lucide-react";
import { memo } from "react";

const NavbarComp = ()=>{
    return <div className={`px-4 bg-glass-bg border-glass-border border-b-1 flex justify-between backdrop-blur-[40px] z-[var(--navbar-z-index)] fixed top-0 w-full items-center h-[var(--navbar-height)]`}>
        <Logo/>
        <div className="flex gap-4" >
            <div>{AppName}</div>
            <div>{AppName}</div>
        </div>
    </div>
}

const Logo = ()=>{
    return <div className="flex gap-3 items-center">
        <div className="gradient-bg rounded-[var(--border-radius-all)] p-1.5 border-1"><Music size={'1rem'}/></div>
        <div className="gradient-bg text-clip text-[1.3rem] font-medium">{AppName}</div>
    </div>
}

const Navbar = memo(NavbarComp);
export default Navbar;