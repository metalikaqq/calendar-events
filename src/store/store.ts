import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth/auth";
import event from "./reducers/event/event";
import date from "./reducers/date/date";

const rootReducer = combineReducers({
  auth,
  event,
  date,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
