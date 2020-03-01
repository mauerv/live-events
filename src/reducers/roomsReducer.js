import {
    SET_ROOM_LIST_BEGIN, 
    SET_ROOM_LIST_SUCCESS,
} from 'constants/actionTypes';

export const initialState = {
    rooms: {},
    isSet: false,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ROOM_LIST_BEGIN:
            return { ...state, isSet: false }
        case SET_ROOM_LIST_SUCCESS:
            return applySetRoomListSuccess(state, action);            
        default:
            return state;
    }
}

export const applySetRoomListSuccess = (state, action) => {
    let newState = { ...state };
    action.payload.forEach(room => newState.rooms[room.room] = room);
    newState.isSet = true;
    return newState;
}
