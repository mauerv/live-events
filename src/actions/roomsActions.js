import {
  SET_ROOM_LIST_BEGIN,
  SET_ROOM_LIST_SUCCESS,
  SET_ROOM_LIST_ERROR
} from "constants/actionTypes";

export const doSetRoomList = janus => dispatch => {
  dispatch({ type: SET_ROOM_LIST_BEGIN });
  janus.attach({
    plugin: "janus.plugin.videoroom",
    success: pluginHandle => {
      pluginHandle.send({
        message: { request: "list" },
        success: roomList => {
          dispatch({
            type: SET_ROOM_LIST_SUCCESS,
            payload: roomList.list
          });
          pluginHandle.detach();
        },
        error: error => dispatch({ type: SET_ROOM_LIST_ERROR })
      });
    }
  });
};
