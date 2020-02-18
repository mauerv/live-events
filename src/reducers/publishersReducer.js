import { 
    SET_PUBLISHER_LIST,
    SET_PUBLISHER,
 } from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_PUBLISHER_LIST:
            return applySetPublisherList(state, action);
        case SET_PUBLISHER:
            return applySetPublisher(state, action);
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

export const applySetPublisher = (state, action) => {
    return { ...state, [action.payload.id]: action.payload}
}