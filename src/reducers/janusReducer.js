import { SET_JANUS } from '../constants/actionTypes';

const initialState = null;

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_JANUS: 
            return action.payload;
        default:
            return state;
    }
}