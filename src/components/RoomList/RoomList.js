import React, { Component } from 'react';

import RoomListItem from './RoomListItem';
import { RoomListContainer, RoomListTitle } from './styles';

class RoomList extends Component {
    render() {
		const { roomList } = this.props;

        return (
            <RoomListContainer>
                <RoomListTitle>Video Rooms</RoomListTitle>
                {roomList.map(room => (
                    <RoomListItem key={room.room} room={room} />
                ))}
            </RoomListContainer>
        );
    }
}


export default RoomList;