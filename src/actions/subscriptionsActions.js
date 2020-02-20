import { 
    SET_SUBSCRIPTION_HANDLE, 
    REMOVE_SUBSCRIPTION_HANDLE,
} from '../constants/actionTypes';

export const doSetSubscriptionHandle = (id, handle) => ({
    type: SET_SUBSCRIPTION_HANDLE,
    payload: {
        id: id,
        handle: handle,
    },
});

export const doRemoveSubscriptionHandle = id => ({
    type: REMOVE_SUBSCRIPTION_HANDLE,
    payload: id,
});