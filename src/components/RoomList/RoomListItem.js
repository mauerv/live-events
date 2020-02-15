import React, { Component } from 'react';

import ParticipantList from '../ParticipantList/ParticipantList'

import {
    RoomContainer,
    RoomTitle,
} from './styles';

class RoomListItem extends Component {
    render() {
        const { room } = this.props;
        if (room.participants !== undefined) {
            return (
                <RoomContainer>
                    <RoomTitle>{room.description}</RoomTitle>
                    <ParticipantList participants={room.participants} />
                </RoomContainer>
            );
        } else {
            return (
                <RoomContainer>
                    <RoomTitle>{room.description}</RoomTitle>
                </RoomContainer>
            );
        }
    }    
}  

export default RoomListItem;