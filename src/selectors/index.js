export const getRoomList = publishers => { 
    let defaultRooms = [ 1234, 2345, 3456, 4567, 5678 ];
    let roomObj = {};
    defaultRooms.forEach(room => {
        roomObj[room] = {
            room: room,
            description: "lolo",
            participants: [],
        }
    });
    let roomList = [];
    for (const key in publishers) {
        let publisher = publishers[key];
        roomObj[publisher.room].participants.push(publisher);
    }
    for (const key in roomObj) {
        roomList.push(roomObj[key]);
    }
    return roomList;
}