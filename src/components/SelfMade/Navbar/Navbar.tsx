import { AppName } from "@/lib/utils";
import { memo } from "react";

const NavbarComp = ()=>{
    return <div className={`px-4 bg-glass-bg border-glass-border border-b-1 flex justify-between backdrop-blur-[40%] z-[var(--navbar-z-index)] fixed top-0 w-full items-center h-[var(--navbar-height)]`}>
        <div>{AppName}</div>
        <div className="flex gap-4" >
            <div>{AppName}</div>
            <div>{AppName}</div>
        </div>
    </div>
}

const Navbar = memo(NavbarComp);
export default Navbar;