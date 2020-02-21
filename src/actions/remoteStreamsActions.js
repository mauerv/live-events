import { 
    SET_REMOTE_STREAM,
    REMOVE_REMOTE_STREAM, 
} from '../constants/actionTypes';

export const doSetRemoteStream = (stream, id) => ({
    type: SET_REMOTE_STREAM,
    payload: { stream, id },
});

export const doRemoveRemoteStream = id => ({
    type: REMOVE_REMOTE_STREAM,
    payload: id,
});