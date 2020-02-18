import { combineReducers } from 'redux';

import janusReducer from './janusReducer';
import userReducer from './userReducer';
import handlesReducer from './handlesReducer';
import publishersReducer from './publishersReducer';
import roomsReducer from './roomsReducer';

export default combineReducers({
    janus: janusReducer,
    user: userReducer,
    handles: handlesReducer,
    publishers: publishersReducer,
    rooms: roomsReducer,
});