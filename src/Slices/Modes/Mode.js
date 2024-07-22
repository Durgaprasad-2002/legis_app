import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeMode: (state) => {
      if (state.value == false) {
        state.value = true;
      } else {
        state.value = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMode } = counterSlice.actions;

export default counterSlice.reducer;
