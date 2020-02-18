import { 
    SET_PUBLISHER_LIST,
    DELETE_PUBLISHER,
 } from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_PUBLISHER_LIST:
            return applySetPublisherList(state, action);
        case DELETE_PUBLISHER:
            return applyDeletePublisher(state, action);
        default:
            return state;
    }
}

export const applySetPublisherList = (state, action) => {
    let newState = { ...state };
    action.payload.forEach(publisher => {
        newState[publisher.id] = publisher;
    });
    return newState;
}

export const applyDeletePublisher = (state, action) => {
    let newState = { ...state };
    delete newState[action.payload];
    return newState;
}