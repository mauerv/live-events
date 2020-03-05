import {
  SET_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
  SET_SUBSCRIPTION_WEBRTC_STATE,
  SET_SUBSCRIPTION_STREAM
} from "../constants/actionTypes";

export const doSetSubscription = (id, handle) => ({
  type: SET_SUBSCRIPTION,
  payload: { id, handle }
});

export const doRemoveSubscription = id => ({
  type: REMOVE_SUBSCRIPTION,
  payload: id
});

export const doSetSubscriptionWebrtcState = (id, webrtcState) => ({
  type: SET_SUBSCRIPTION_WEBRTC_STATE,
  payload: { id, webrtcState }
});

export const doSetSubscriptionStream = (id, stream) => ({
  type: SET_SUBSCRIPTION_STREAM,
  payload: { id, stream }
});
