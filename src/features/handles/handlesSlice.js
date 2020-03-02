import { createSlice } from "@reduxjs/toolkit";

const handlesSlice = createSlice({
  name: "handles",
  initialState: {},
  reducers: {
    setHandle(state, action) {
      console.log(action);
      let newState = { ...state };
      newState[action.payload.room] = action.payload.handle;
      return newState;
    }
  }
});

export const getHandles = state => state.handles;
export const getActiveHandle = state => state.handles[state.user.activeRoom];

export const { setHandle } = handlesSlice.actions;

export default handlesSlice.reducer;
