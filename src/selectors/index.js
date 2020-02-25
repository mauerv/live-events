export const getRoomList = ({ publishers, roomData, user }) => {  
    let roomList = [];

    for (const key in roomData.rooms) {
        roomData.rooms[key].participants = [];
    }

    if (roomData.rooms[user.activeRoom] !== undefined) {
        roomData.rooms[user.activeRoom].participants.push({ display: user.username, id: user.username })
    }

    for (const key in publishers) {
        let publisher = publishers[key];
        roomData.rooms[publisher.room].participants.push(publisher);
    }

    for (const key in roomData.rooms) {
        roomList.push(roomData.rooms[key]);
    }
    
    return roomList;
}

export const getRoomIds = roomData => {
    let roomIds = [];
    for (const key in roomData.rooms) {
        roomIds.push(roomData.rooms[key].room);
    }
    return roomIds;
}

export const getActiveHandle = state => {
    return state.handles[state.user.activeRoom];
}