import userReducer, { initialState as userInitialState } from '../reducers/userReducer';
import { 
    doSetUsername,
    doSetActiveRoom, 
} from './userActions';

describe('User actions', () => {
    it('properly sets username', () => {
        expect(userReducer(userInitialState, doSetUsername("m")))
            .toEqual({ ...userInitialState, username: "m" });
    });

    it('properly sets active room', () => {
        expect(userReducer(userInitialState, doSetActiveRoom(1234)))
            .toEqual({ ...userInitialState, activeRoom: 1234 });
    });
});