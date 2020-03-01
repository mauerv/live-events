import { createSlice } from "@reduxjs/toolkit";

const janusSlice = createSlice({
  name: "janus",
  initialState: null,
  reducers: {
    setJanus(state, action) {
      return action.payload;
    }
  }
});

export const { setJanus } = janusSlice.actions;

export default janusSlice.reducer;
