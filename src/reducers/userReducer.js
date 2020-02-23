import { 
    SET_USERNAME,
    SET_ACTIVE_ROOM,
    SET_REGISTERED_STATUS,
    SET_STREAM,
    TOGGLE_AUDIO,
} from '../constants/actionTypes';

const initialState = {
    username: "",
    activeRoom: 1234,
    registered: false,
    stream: null,
    publishAudio: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USERNAME: 
            return { ...state, username: action.payload };
        case SET_ACTIVE_ROOM:
            return { ...state, activeRoom: action.payload };
        case SET_REGISTERED_STATUS:
            return { ...state, registered: action.payload };
        case SET_STREAM:
            return applySetStream(state, action);
        case TOGGLE_AUDIO:
            return { ...state, publishAudio: !state.publishAudio };
        default:
            return state;
    }
}

export const applySetStream = (state, action) => {
    return { ...state, stream: action.payload };
}