import { combineReducers } from 'redux';

import janusReducer from './janusReducer';
import userReducer from './userReducer';
import handlesReducer from './handlesReducer';
import publishersReducer from './publishersReducer';
import roomsReducer from './roomsReducer';
import subscriptionsReducer from './subscriptionsReducer';

export default combineReducers({
    janus: janusReducer,
    user: userReducer,
    handles: handlesReducer,
    publishers: publishersReducer,
    rooms: roomsReducer,
    subscriptions: subscriptionsReducer,
});