import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../../API/AuthService";
import EventService from "../../../API/EventService";
import { Key } from "react";
import { IDate } from "./types";
import { Dayjs } from "dayjs";

const initialState: IDate = {
  selectedDate: new Date().toISOString(),
};

export const date = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = date.actions;

export default date.reducer;