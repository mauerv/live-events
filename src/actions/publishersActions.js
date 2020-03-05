import { SET_PUBLISHER_LIST, REMOVE_PUBLISHER } from "../constants/actionTypes";

export const doSetPublisherList = (publishers, room) => {
  const publishersWithRoom = publishers.map(p => ({ ...p, room: room }));
  return {
    type: SET_PUBLISHER_LIST,
    payload: publishersWithRoom
  };
};

export const doRemovePublisher = id => ({
  type: REMOVE_PUBLISHER,
  payload: id
});
