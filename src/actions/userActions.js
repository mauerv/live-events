import {
  SET_USERNAME,
  SET_ACTIVE_ROOM,
  SET_REGISTERED_STATUS,
  SET_PUBLISHED_STATUS,
  TOGGLE_AUDIO,
  TOGGLE_VIDEO
} from "constants/actionTypes";

export const doSetUsername = username => ({
  type: SET_USERNAME,
  payload: username
});

export const doSetActiveRoom = room => ({
  type: SET_ACTIVE_ROOM,
  payload: room
});

export const doSetRegisteredStatus = status => ({
  type: SET_REGISTERED_STATUS,
  payload: status
});

export const doSetPublishedStatus = status => ({
  type: SET_PUBLISHED_STATUS,
  payload: status
});

export const doToggleAudio = () => ({ type: TOGGLE_AUDIO });

export const doToggleVideo = () => ({ type: TOGGLE_VIDEO });
