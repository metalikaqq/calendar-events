import { Button, Layout, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import EventCalendar from "../../components/EventCalendar";
import EventForm from "../../components/EventForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createEvent } from "../../store/reducers/event/event";
import { IEvent } from "../../models/IEvent";
import { fetchUsers } from "../../store/reducers/auth/auth";
import Event from "../Event/Event";
import HomeItem from "./HomeItem";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { formatDate } from "../../utils/date";
import EventModalInfo from "../../components/EventModalInfo";

const Home = () => {
  const dispatch = useAppDispatch();
  const { events: eventsData } = useAppSelector((state) => state.event);

  const [modalVisible, setModalVisible] = useState(false);
  const { guests, events } = useAppSelector((state) => state.event);
  const { users } = useAppSelector((state) => state.auth);
  const [modalEventVisible, setModalEventVisible] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>(eventsData);

  const [initialValues, setInitialValues] = useState<any>({
    date: dayjs(new Date()),
    // Add other form field initial values here if needed
  });

  const [index, setIndex] = useState<number>(0);
  

  const updateInitialDate = (date: Dayjs) => {
    setInitialValues({
      date,
    });
  };

  return (
    <Layout>
      <EventCalendar
        setModalEventVisible={setModalEventVisible}
        events={events}
        updateInitialDate={updateInitialDate}
      />
      <Row justify="center">
        <Button onClick={() => setModalVisible(true)}>Create event</Button>
      </Row>
      <Modal
        title="Event"
        open={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        <EventForm
          submit={(event) => {
            if (event.author) {
              dispatch(createEvent(event));
              setModalVisible(false);
            }
          }}
          initialValues={initialValues}
        />
      </Modal>

      <Modal
        open={modalEventVisible}
        footer={null}
        onCancel={() => {
          setModalEventVisible(false);
          setIndex(0);
        }}
        destroyOnClose
        // afterClose={() => {
        //   setFilteredEvents(eventsData);
        // }}
      >
        <EventModalInfo 
          index={index} 
          setIndex={setIndex} 
          initialValues={initialValues}
        />
      </Modal>
    </Layout>
  );
};

export default Home;
