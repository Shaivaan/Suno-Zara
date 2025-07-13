import { useCurrentSongInfo } from "@/hooks/use-musicbar";
import { AppName } from "@/lib/utils";
import useZustandStore from "@/Zustand/store";
import { useEffect, useMemo } from "react";

const ReactTitle = () => {
    const { name } = useCurrentSongInfo();
    const isPlaying = useZustandStore((state)=>state.musicPlayerData.isPlaying);
    const title = useMemo(()=> isPlaying && name ? ('Now Playing : ' + name) : (AppName + ' | Stream Free') ,[name,isPlaying])
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
};

export default ReactTitle;