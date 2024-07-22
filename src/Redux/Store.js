import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slices/Modes/Mode";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
