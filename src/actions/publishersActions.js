import { 
    SET_PUBLISHER_LIST,
    DELETE_PUBLISHER,
 } from '../constants/actionTypes';

export const doSetPublisherList = (publishers, room) => {
    publishers = publishers.map(p => ({ ...p, room: room }));       
    return {
        type: SET_PUBLISHER_LIST,
        payload: publishers,
    }
};

export const doDeletePublisher = id => ({
    type: DELETE_PUBLISHER,
    payload: id,
});