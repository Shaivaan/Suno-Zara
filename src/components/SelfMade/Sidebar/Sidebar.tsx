import { memo } from "react";
const SidebarComp = ()=>{
    return <div className={`border-r-1 border-glass-border h-screen screen top-[var(--navbar-height)] fixed w-[var(--side-bar-width)] bg-glass-bg z-[var(--navbar-z-index)]`}>
        
    </div>  
};

const Sidebar = memo(SidebarComp);
export default Sidebar;