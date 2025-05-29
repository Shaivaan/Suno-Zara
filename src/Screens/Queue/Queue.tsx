import SongsList from "@/components/SelfMade/SongList/SongList";
import {
  ButtonMenu,
  MenuButton,
} from "@/components/SelfMade/Wrapper/ButtonMenu";
import { Dot } from "lucide-react";
import { memo, useState } from "react";

const queue_button_data = ["all", "recently added", "recently played"];

const QueueComp = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="title_carousel">Queue</div>
      <QueueButtonContainer/>
      <SongsList/>
    </div>
  );
};

const QueueButtonContainerComp = () => {
  const [queueOption, setQueueOption] = useState(queue_button_data[0]);
  return (
    <div className="flex justify-end gap-5 items-center text-[0.9rem]">
      <div className="flex justify-center items-center">
        <div>23 Songs</div>
        <Dot/>
        <div>2hr 47min</div>
      </div>   
      <ButtonMenu>
        {queue_button_data.map((el) => (
          <MenuButton isActive={queueOption === el} onClick={() => setQueueOption(el)} key={el}>{el}</MenuButton>
        ))}
      </ButtonMenu>
    </div>
  );
};


const QueueScreen = memo(QueueComp);
const QueueButtonContainer = memo(QueueButtonContainerComp);
export default QueueScreen;
