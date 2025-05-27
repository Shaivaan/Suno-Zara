import { memo } from "react";

const MusicBarComp = ()=>{
    return <div className={`p-4 fixed bottom-0 w-full border-t-1 border-glass-border bg-glass-bg backdrop-blur-[40px] z-[var(--navbar-z-index)] h-25`}>

    </div>
};

const MusicBar = memo(MusicBarComp);
export default MusicBar;