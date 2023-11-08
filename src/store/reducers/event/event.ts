import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventState } from "./types";
import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent";
import AuthService from "../../../API/AuthService";
import EventService from "../../../API/EventService";
import { Key } from "react";

const initialState: EventState = {
  guests: [],
  events: [],
  eventsAsAdmin: [],
  eventsAsGuest: [],
};

// export const fetchGuests = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await AuthService.getUsers()
//       dispatch(setGuests(response.data))
//     } catch (error: any) {
//       return rejectWithValue(error.response.data.message)
//     }
//   }
// )

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (event: IEvent, { rejectWithValue, dispatch }) => {
    try {
      const response = await EventService.createEvents(event)

      console.log(response.data)

      dispatch(fetchEventsForUser(event.author._id as Key))
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

// export const fetchEvents = createAsyncThunk(
//   "event/fetchEvents",
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await EventService.getEvents()
//       dispatch(setEvents(response.data))
//     } catch (error: any) {
//       return rejectWithValue(error.response.data.message)
//     }
//   }
// )

export const fetchEventsForUser = createAsyncThunk(
  "event/fetchEventsForUser",
  async (userId: Key | undefined, { rejectWithValue, dispatch }) => {
    try {

      if (userId) {
        const response = await EventService.getEventsForUser(userId)
        console.log(response.data)
        dispatch(setEvents(response.data))
      }

    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const event = createSlice({
  name: "event",
  initialState,
  reducers: {
    // setGuests(state, action: PayloadAction<IUser[]>) {
    //   state.guests = action.payload;
    // },
    // createEvents(state, action: PayloadAction<IEvent>) {
    //   state.events.push(action.payload);
    // },
    setEvents(state, action: PayloadAction<IEvent[]>) {
      state.events = action.payload;
    },
  },
});

export const {setEvents} = event.actions;
export default event.reducer;
