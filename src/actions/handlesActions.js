import { SET_HANDLE } from '../constants/actionTypes';

export const doSetHandle = (room, handle) => ({
    type: SET_HANDLE,
    payload: {
        room: room,
        handle: handle,
    },
});