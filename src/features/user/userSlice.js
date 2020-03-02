import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  username: "",
  activeRoom: 1234,
  registered: false,
  published: false,
  stream: null,
  publishAudio: true,
  publishVideo: true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setActiveRoom(state, action) {
      state.activeRoom = action.payload;
    },
    setRegistered(state, action) {
      state.registered = action.payload;
    },
    setPublished(state, action) {
      state.published = action.payload;
    },
    setStream(state, action) {
      state.stream = action.payload;
    },
    toggleAudio(state) {
      state.publishAudio = !state.publishAudio;
    },
    toggleVideo(state) {
      state.publishVideo = !state.publishVideo;
    }
  }
});

export const getUser = state => state.user;

export const {
  setUsername,
  setActiveRoom,
  setRegistered,
  setPublished,
  setStream,
  toggleAudio,
  toggleVideo
} = userSlice.actions;

export default userSlice.reducer;
