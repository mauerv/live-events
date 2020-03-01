import { getRoomIds } from './index';
import { initialState as roomsInitialState } from 'reducers/roomsReducer';

let state = {
    roomData: roomsInitialState,
}

state.roomData.rooms = {
    "a": { room: 1234 },
    "b": { room: 2345 },
}

describe("selector testing", () => {
    it("should return the room ids from roomData", () => {
        expect(getRoomIds(state)).toEqual([1234, 2345]);
    });
}); 