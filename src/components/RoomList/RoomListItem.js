import React from 'react';

import ParticipantList from '../ParticipantList/ParticipantList'

import {
    RoomContainer,
    RoomTitle,
} from './styles';

const RoomListItem = ({ 
    room, 
    onRoomClick, 
    isActive,
    publishing,
}) => {
    return (
        <RoomContainer 
            onClick={() => onRoomClick(room.room)} 
            isActive={isActive}
            publishing={publishing}
        >
            <RoomTitle>{room.description}</RoomTitle>
            <ParticipantList participants={room.participants} />
        </RoomContainer>  
    )
}

export default RoomListItem;