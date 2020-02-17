import { combineReducers } from 'redux';

import janusReducer from './janusReducer';
import userReducer from './userReducer';
import handlesReducer from './handlesReducer';

export default combineReducers({
    janus: janusReducer,
    user: userReducer,
    handles: handlesReducer,
});