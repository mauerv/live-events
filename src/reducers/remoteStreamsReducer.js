import { 
    SET_REMOTE_STREAM,
    REMOVE_REMOTE_STREAM, 
} from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_REMOTE_STREAM:
            return { ...state, [action.payload.id]: action.payload.stream }
        case REMOVE_REMOTE_STREAM:
            return applyRemoveRemoteStream(state, action);
        default:
            return state;
    }
}

export const applyRemoveRemoteStream = (state, action) => {
    let newState = { ...state };
    delete newState[action.payload];
    return newState;
}

