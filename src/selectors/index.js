export const getRoomList = ({ publishers, rooms, user }) => {  
    let roomList = [];

    for (const key in rooms) {
        rooms[key].participants = [];
    }

    if (rooms[user.activeRoom] !== undefined) {
        rooms[user.activeRoom].participants.push({ display: user.username, id: user.username })
    }

    for (const key in publishers) {
        let publisher = publishers[key];
        rooms[publisher.room].participants.push(publisher);
    }

    for (const key in rooms) {
        roomList.push(rooms[key]);
    }
    
    return roomList;
}

export const getRoomIds = rooms => {
    let roomIds = [];
    for (const key in rooms) {
        roomIds.push(rooms[key].room);
    }
    return roomIds;
}