import {
  SET_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
  SET_SUBSCRIPTION_WEBRTC_STATE,
  SET_SUBSCRIPTION_STREAM
} from "../constants/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION:
      return applySetSubscription(state, action);
    case REMOVE_SUBSCRIPTION:
      return applyRemoveSubscription(state, action);
    case SET_SUBSCRIPTION_STREAM:
      return applySetSubscriptionStream(state, action);
    case SET_SUBSCRIPTION_WEBRTC_STATE:
      return applySetSubscriptionWebrtcState(state, action);
    default:
      return state;
  }
};

export const applySetSubscription = (state, action) => {
  let subscriptionState = {
    handle: action.payload.handle,
    stream: null,
    webrtcState: "connecting"
  };
  return { ...state, [action.payload.id]: subscriptionState };
};

export const applyRemoveSubscription = (state, action) => {
  let newState = { ...state };
  delete newState[action.payload];
  return newState;
};

export const applySetSubscriptionStream = (state, action) => {
  let newState = { ...state };
  if (newState[action.payload.id] !== undefined) {
    newState[action.payload.id].stream = action.payload.stream;
  }

  return newState;
};

export const applySetSubscriptionWebrtcState = (state, action) => {
  let newState = { ...state };
  if (newState[action.payload.id] !== undefined) {
    newState[action.payload.id].webrtcState = action.payload.webrtcState;
  }
  return newState;
};
