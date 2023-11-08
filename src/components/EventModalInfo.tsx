import React, { FC, useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/date";
import { IEvent } from "../models/IEvent";
import { useAppSelector } from "../hooks/redux";
import classNames from "classnames";
import { UsergroupAddOutlined } from "@ant-design/icons";

interface EventModalInfoProps {
  initialValues: any;
  index: number;
  setIndex: (index: number) => void;
}

const EventModalInfo: FC<EventModalInfoProps> = ({
  initialValues,
  index,
  setIndex,
}) => {
  const { events: eventsData } = useAppSelector((state) => state.event);

  // console.log("sdsdsdsd", eventsData);

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const filteredEvents = useRef<IEvent[]>(
    eventsData.filter(
      (event) => event.date === formatDate(initialValues.date.toDate())
    )
  ).current;

  // setFilteredEvents();

  useEffect(() => {
    setSelectedEvent(filteredEvents[index]);

    // return () => {
    //   console.log("EventModalInfo unmounted");
    // };
  }, [index]);

  const handleSelectEvent = (event: IEvent) => () => {
    const eventIndex = filteredEvents.findIndex((e) => e._id === event._id);

    setIndex(eventIndex);
    setSelectedEvent(event);
  };

  if (selectedEvent) {
    console.log("AUTHOR", selectedEvent.author.username);
  }

  return (
    <div className="event-modal">
      <div className="event-modal-events">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <button
              onClick={handleSelectEvent(event)}
              className={classNames(
                "event-modal-event-btn",
                {"event-modal-event-btn-active":event._id === selectedEvent?._id},
                {"event-modal-event-btn-admin": event.role === "admin"},
                {"event-modal-event-btn-guest": event.role === "guest"}
              )}
              key={event._id}
            >
              {event.description}
            </button>
          ))
        ) : (
          <div className="event-modal-info-no-events">
            <p className="event-modal-info-no-events-text">No events</p>

            <UsergroupAddOutlined style={{ fontSize: "200px" }} />
          </div>
        )}
      </div>

      {filteredEvents.length > 0 && (
        <div className="event-modal-info">
          <div>
            <p className="event-modal-info-des">Name of Event:</p>
            <p className="event-modal-info-name">
              {selectedEvent?.description}
            </p>
          </div>

          <div className="black-line" />

          <p className="event-modal-info-des">Author:</p>

          <div className="event-modal-date">
            <div className="event-modal-author-img" />

            <p className="event-modal-author-name">
              {selectedEvent?.author.username}
            </p>
          </div>

          <div className="black-line" />

          <p className="event-modal-info-des">Date:</p>

          <div className="event-modal-date">
            <div className="event-modal-date-img" />

            <p className="event-modal-author-name">{selectedEvent?.date}</p>
          </div>

          {selectedEvent?.guests && selectedEvent.guests.length > 0 && (
            <>
              <div className="black-line" />
              <p className="event-modal-info-guests-text">Guests:</p>
              <div className="event-modal-info-guests-container">
                <div className="event-modal-guests-img" />

                {selectedEvent.guests.map((guest) => (
                  <p className="event-modal-info-guests-name" key={guest._id}>
                    {guest.username}
                  </p>
                ))}
              </div>
            </>
          )}

          <div className="black-line" />

          <p className="event-modal-info-des">Text:</p>

          <div className="event-modal-text">
            <div className="event-modal-text-img" />
            <p className="event-modal-info-text">{selectedEvent?.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModalInfo;
