import { 
    SET_USERNAME,
    SET_ACTIVE_ROOM,
    SET_REGISTERED_STATUS,
} from '../constants/actionTypes';

export const doSetUsername = username => {
    return {
        type: SET_USERNAME,
        payload: username,
    }
};

export const doSetActiveRoom = room => {
    return {
        type: SET_ACTIVE_ROOM,
        payload: room,
    }
};

export const doSetRegisteredStatus = status => {
    return {
        type: SET_REGISTERED_STATUS,
        payload: status,
    }
}


