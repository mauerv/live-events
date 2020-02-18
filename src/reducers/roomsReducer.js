import { 
    SET_ROOM_LIST_BEGIN,
    SET_ROOM_LIST_SUCCESS,
    SET_ROOM_LIST_ERROR, 
} from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ROOM_LIST_SUCCESS:
            return applySetRoomListSuccess(state, action);            
        default:
            return state;
    }
}


export const applySetRoomListSuccess = (state, action) => {
    let newState = {};
    action.payload.forEach(room => newState[room.room] = room);
    return newState;
}