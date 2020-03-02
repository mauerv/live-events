import { createSlice } from "@reduxjs/toolkit";

const publishersSlice = createSlice({
  name: "publishers",
  initialState: {},
  reducers: {
    setPublishers: {
      reducer(state, action) {
        action.payload.forEach(publisher => {
          state[publisher.id] = publisher;
        });
      },
      prepare(publishers, room) {
        const publishersWithRoom = publishers.map(p => ({ ...p, room: room }));
        return { payload: publishersWithRoom };
      }
    },
    removePublisher(state, action) {
      delete state[action.payload];
    }
  }
});

export const getPublishers = state => state.publishers;

export const { setPublishers, removePublisher } = publishersSlice.actions;

export default publishersSlice.reducer;
