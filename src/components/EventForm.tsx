import { DatePicker, Form, Input, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Button } from "antd/es/radio";
import React, { FC, useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { Key } from "react";
import dayjs from "dayjs";
import { formatDate } from "../utils/date";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import EventFormItem from "./EventFormItem";
import { fetchEventsForUser } from "../store/reducers/event/event";
import { rules } from "../utils/rules";
import { Dayjs } from "dayjs";
import TextArea from "antd/es/input/TextArea";

interface EventFormProps {
  submit: (event: IEvent) => void;
  initialValues: any;
}

const EventForm: FC<EventFormProps> = (props) => {
  const { selectedDate } = useAppSelector((state) => state.date);
  const { users, user } = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();

  const [event, setEvent] = useState<IEvent>({
    author: {
      _id: user?._id,
      username: user?.username,
    },
    date: "",
    description: "",
    guests: [],
    text: "",
  } as IEvent);

  const selectDate = (date: dayjs.Dayjs | null) => {
    console.log(date);

    if (date) {
      setEvent({ ...event, date: formatDate(date.toDate()) });
    }
  };

  const usersFilter = (users: IUser[]) => {
    return users.filter((user) => {
      // const filteredUser = user.username.includes(event.guests[index].username);

      const filteredUser = event.guests.find((guest) => guest._id === user._id);

      if (filteredUser) {
        return false;
      }

      return true;
    });
  };

  const submitForm = () => {
    props.submit(event);

    // if (user) {
    //   dispatch(fetchEventsForUser(user));
    // }

    console.log(event);
  };

  const handleSelectGuests = (_id: Key) => {
    console.log(_id);
    const guest = users.find((user) => user._id === _id);
    console.log(guest);

    if (guest) {
      setEvent({ ...event, guests: [...event.guests, guest] });
    }
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="name of event"
        name="description"
        rules={[
          { required: true, message: "Please enter the name of the event" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && value.length < 20) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Description must have less than 20 characters."
              );
            },
          }),
        ]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="date of event"
        name="date"
        rules={[
          { required: true, message: "past date of event" },
          rules.isDateAfter("select date after today"),
        ]}
      >
        <DatePicker
          onChange={(date) => selectDate(date)}
          value={dayjs(selectedDate)}
        />
      </Form.Item>

      <Form.Item
        label="text of event"
        name="text"
        rules={[{ required: true, message: "past text of event" }]}
      >
        <TextArea
          value={event.text}
          onChange={(e) => setEvent({ ...event, text: e.target.value })}
        />
      </Form.Item>

      {event.guests.length > 0 && (
        <div className="select-guests-text">
          {event.guests.map((guest) => (
            <EventFormItem
              key={guest._id}
              guest={guest}
              event={event}
              setEvent={setEvent}
            />
          ))}
        </div>
      )}

      <Form.Item>
        <Select onChange={(e) => handleSelectGuests(e)}>
          {usersFilter(users).map((user: IUser) => {
            if (user._id !== event.author._id) {
              return (
                <Select.Option
                  key={user._id as string}
                  value={user._id as string}
                >
                  {user.username}
                </Select.Option>
              );
            }
          })}
        </Select>
      </Form.Item>

      <button type="submit">Create</button>
    </Form>
  );
};

export default EventForm;
