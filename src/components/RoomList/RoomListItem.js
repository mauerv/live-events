import React from 'react';

import ParticipantList from '../ParticipantList/ParticipantList'

import {
    RoomContainer,
    RoomTitle,
} from './styles';

const RoomListItem = ({ room, onRoomClick }) => (
    <RoomContainer onClick={() => onRoomClick(room.room)}>
        <RoomTitle>{room.description}</RoomTitle>
        <ParticipantList participants={room.participants} />
    </RoomContainer>  
);

export default RoomListItem;