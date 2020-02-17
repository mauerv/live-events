import { SET_HANDLE } from '../constants/actionTypes';

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_HANDLE:        
            return { ...state, [action.payload.room]: action.payload.handle }
        default:
            return state;
    }
}