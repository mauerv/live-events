import { 
    SET_SUBSCRIPTION_HANDLE,
    REMOVE_SUBSCRIPTION_HANDLE,
} from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_SUBSCRIPTION_HANDLE:
            return applySetSubscriptionHandle(state, action);
        case REMOVE_SUBSCRIPTION_HANDLE:
            return applyRemoveSubscriptionHandle(state, action);
        default:
            return state;
    }
}

export const applySetSubscriptionHandle = (state, action) => ({
    ...state, 
    [action.payload.id]: action.payload.handle
});

export const applyRemoveSubscriptionHandle = (state, action) => {
    let newState = { ...state };
    delete newState[action.payload];
    return newState;
};

export const applyRemoveRemoteStream = (state, action) => {
    let newState = { ...state };
    delete newState[action.payload];
    return newState;
}
