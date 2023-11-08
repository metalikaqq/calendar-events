import React, {FC} from "react";
import { IEvent } from "../../models/IEvent";

interface HomeItemProps {
  event: IEvent,
}

const HomeItem:FC<HomeItemProps> = ({event}) => {
  return (
    <div>
      {event.guests.length > 0 && event.guests.map((guest) => (
        <div key={guest._id}>{`${guest.username} ${event.date}`}</div>
      ))}
    </div>
  );
};

export default HomeItem;