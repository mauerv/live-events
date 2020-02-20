import { 
    SET_SUBSCRIPTION_HANDLE, 
} from '../constants/actionTypes';

export const doSetSubscriptionHandle = (id, handle) => {
    return {
        type: SET_SUBSCRIPTION_HANDLE,
        payload: {
            id: id,
            handle: handle,
        },
    }
}
