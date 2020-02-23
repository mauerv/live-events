import React from 'react';

import ParticipantList from '../ParticipantList/ParticipantList'

import {
    RoomContainer,
    RoomTitle,
} from './styles';

const RoomListItem = ({ room, onRoomClick, isActive }) => {
    return (
        <RoomContainer 
            onClick={() => onRoomClick(room.room)} 
            isActive={isActive}
        >
            <RoomTitle>{room.description}</RoomTitle>
            <ParticipantList participants={room.participants} />
        </RoomContainer>  
    )
}

export default RoomListItem;