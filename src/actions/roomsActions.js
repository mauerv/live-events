import { Janus } from 'janus-gateway';

import { 
    SET_ROOM_LIST_BEGIN,
    SET_ROOM_LIST_SUCCESS,
    SET_ROOM_LIST_ERROR,
} from '../constants/actionTypes';

export const doSetRoomList = handle => dispatch => {
    dispatch({ type: SET_ROOM_LIST_BEGIN });
    handle.send({
        "message": { "request": "list" },
        success: roomList => {
            dispatch({ 
                type: SET_ROOM_LIST_SUCCESS,
                payload: roomList.list,
            });
        },
        error: error => dispatch({ type: SET_ROOM_LIST_ERROR }),
    })
}
