import { createSlice } from "@reduxjs/toolkit";

const handlesSlice = createSlice({
  name: "handles",
  initialState: {},
  reducers: {
    setHandle(state, action) {
      state[action.payload.room] = action.payload.handle;
    }
  }
});

export const getHandles = state => state.handles;
export const getActiveHandle = state => state.handles[state.user.activeRoom];

export const { setHandle } = handlesSlice.actions;

export default handlesSlice.reducer;
