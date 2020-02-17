import { SET_JANUS } from '../constants/actionTypes';

export const doSetJanus = janus => {
    return {
        type: SET_JANUS,
        payload: janus,
    }
};

