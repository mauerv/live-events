import { 
    SET_SUBSCRIPTION_HANDLE,
} from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_SUBSCRIPTION_HANDLE:
            return applySetSubscriptionHandle(state, action);
        default:
            return state;
    }
}

export const applySetSubscriptionHandle = (state, action) => {
    return {
        ...state, 
        [action.payload.id]: action.payload.handle
    }
};