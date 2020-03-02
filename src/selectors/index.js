import { createSelector } from "@reduxjs/toolkit";
import { getPublishers } from "features/publishers/publishersSlice";

export const getUser = state => state.user;

export const getHandles = state => state.handles;

export const getSubscriptions = state => state.subscriptions;

export const getIsRoomListSet = state => state.roomData.isSet;

export const getRoomData = state => state.roomData;

export const getRoomList = createSelector(
  [getPublishers, getRoomData, getUser],
  (publishers, roomData, user) => {
    let roomList = [];
    let newRoomData = { ...roomData };

    for (const key in newRoomData.rooms) {
      newRoomData.rooms[key].participants = [];
    }

    if (newRoomData.rooms[user.activeRoom] !== undefined) {
      newRoomData.rooms[user.activeRoom].participants.push({
        display: user.username,
        id: user.username
      });
    }

    for (const key in publishers) {
      let publisher = publishers[key];
      newRoomData.rooms[publisher.room].participants.push(publisher);
    }

    for (const key in newRoomData.rooms) {
      roomList.push(newRoomData.rooms[key]);
    }

    return roomList;
  }
);

export const getRoomIds = createSelector(getRoomData, roomData =>
  Object.values(roomData.rooms).map(room => room.room)
);

export const getActiveHandle = state => state.handles[state.user.activeRoom];
