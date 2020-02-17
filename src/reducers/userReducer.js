import { 
    SET_USERNAME,
    SET_ACTIVE_ROOM,
    SET_REGISTERED_STATUS,
} from '../constants/actionTypes';

const initialState = {
    username: "",
    activeRoom: 2345,
    registered: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USERNAME: 
            return { ...state, username: action.payload };
        case SET_ACTIVE_ROOM:
            return { ...state, activeRoom: action.payload };
        case SET_REGISTERED_STATUS:
            return { ...state, registered: action.payload };
        default:
            return state;
    }
}
