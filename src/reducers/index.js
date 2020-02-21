import { combineReducers } from 'redux';

import janusReducer from './janusReducer';
import userReducer from './userReducer';
import handlesReducer from './handlesReducer';
import publishersReducer from './publishersReducer';
import roomsReducer from './roomsReducer';
import subscriptionsReducer from './subscriptionsReducer';
import remoteStreamsReducer from './remoteStreamsReducer';

export default combineReducers({
    janus: janusReducer,
    user: userReducer,
    handles: handlesReducer,
    publishers: publishersReducer,
    roomData: roomsReducer,
    subscriptions: subscriptionsReducer,
    remoteStreams: remoteStreamsReducer,
});