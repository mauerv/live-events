import React from "react";

import ParticipantList from "../ParticipantList/ParticipantList";

import { RoomContainer, RoomTitle } from "./styles";

const RoomListItem = ({ room, onRoomClick, isActive, publishing }) => {
  return (
    <RoomContainer
      onClick={() => onRoomClick(room.room)}
      isActive={isActive}
      publishing={publishing === "publishing"}
    >
      <RoomTitle isActive={isActive}>{room.description}</RoomTitle>
      <ParticipantList
        participants={room.participants}
        isActive={isActive}
        publishing={publishing}
      />
    </RoomContainer>
  );
};

export default RoomListItem;
