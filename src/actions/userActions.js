import { 
    SET_USERNAME,
    SET_ACTIVE_ROOM,
    SET_REGISTERED_STATUS,
} from '../constants/actionTypes';

export const doSetUsername = username => ({
    type: SET_USERNAME,
    payload: username,
});

export const doSetActiveRoom = room => ({
    type: SET_ACTIVE_ROOM,
    payload: room,
});

export const doSetRegisteredStatus = status => ({
    type: SET_REGISTERED_STATUS,
    payload: status,
});


