import { SET_JANUS } from '../constants/actionTypes';

export const doSetJanus = janus => ({
    type: SET_JANUS,
    payload: janus,
});
