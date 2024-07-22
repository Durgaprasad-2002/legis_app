import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

// Action creators are generated for each case reducer function

export const LawSlice = createSlice({
  name: "Laws",
  initialState,
  reducers: {},
});

export default LawSlice.reducer;
