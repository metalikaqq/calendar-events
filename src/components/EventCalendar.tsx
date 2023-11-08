import { Calendar } from "antd";
import React, { FC, useRef } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";
import dayjs from "dayjs";
import { setSelectedDate } from "../store/reducers/date/date";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Dayjs } from "dayjs";

interface IEventCalendarProps {
  events: IEvent[];
  updateInitialDate: (date: Dayjs) => void;
  setModalEventVisible: (visible: boolean) => void;
}

const EventCalendar: FC<IEventCalendarProps> = ({ events, updateInitialDate, setModalEventVisible }) => {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => state.date);
  const lastClickTime = useRef<number>(0);

  function dateCellRender(value: any) {
    const formattedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((event) => event.date === formattedDate);

    return (
      <div>
        {currentDayEvents.map((event, index) => {
          if (event.role === "admin") {
            return (
              <div
                key={event._id}
                className="calendar-event-admin"
              >
                <div>
                  {event.description.length > 7
                    ? `${event.description.slice(0, 7)}...`
                    : event.description}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={event._id}
                className="calendar-event-guest"
              >
                <div>
                  {event.description.length > 12
                    ? `${event.description.slice(0, 12)}...`
                    : event.description}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }

  function handleDateClick(date: dayjs.Dayjs) {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime.current;

    if (timeDiff < 300) {
      // Less than 300ms, consider it as a double-click
      updateInitialDate(date);
      console.log(date);
      setModalEventVisible(true);
    }

    lastClickTime.current = currentTime;
  }

  return (
    <Calendar cellRender={dateCellRender} onSelect={handleDateClick} />
  );
};

export default EventCalendar;

