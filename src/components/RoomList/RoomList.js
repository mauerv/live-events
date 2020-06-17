import React from "react";

import RoomListItem from "./RoomListItem";
import { RoomListContainer, RoomListTitle } from "./styles";

const RoomList = ({ roomList, onRoomClick, activeRoom, publishing }) => (
  <RoomListContainer>
    <RoomListTitle>Video Rooms</RoomListTitle>
    {roomList.map(room => (
      <RoomListItem
        key={room.room}
        room={room}
        onRoomClick={onRoomClick}
        isActive={activeRoom === room.room}
        publishing={publishing}
      />
    ))}
  </RoomListContainer>
);

export default RoomList;
