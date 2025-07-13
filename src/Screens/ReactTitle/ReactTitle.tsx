import { useCurrentSongInfo } from "@/hooks/use-musicbar";
import { AppName } from "@/lib/utils";
import { useEffect } from "react";

const ReactTitle = () => {
    const { name } = useCurrentSongInfo();
    useEffect(() => {
        document.title = name || AppName;
    }, [name]);

    return null;
};

export default ReactTitle;