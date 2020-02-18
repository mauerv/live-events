import { combineReducers } from 'redux';

import janusReducer from './janusReducer';
import userReducer from './userReducer';
import handlesReducer from './handlesReducer';
import publishersReducer from './publishersReducer';

export default combineReducers({
    janus: janusReducer,
    user: userReducer,
    handles: handlesReducer,
    publishers: publishersReducer,
});