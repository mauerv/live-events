import { 
    SET_PUBLISHER_LIST,
    SET_PUBLISHER,
 } from '../constants/actionTypes';

export const doSetPublisherList = publishers => ({
    type: SET_PUBLISHER_LIST,
    payload: publishers,
});

export const doSetPublisher = publisher => ({
    type: SET_PUBLISHER,
    payload: publisher,
});