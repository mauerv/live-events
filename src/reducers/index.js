import { combineReducers } from 'redux';

import janusReducer from './janusReducer';
import userReducer from './userReducer';

export default combineReducers({
    janus: janusReducer,
    user: userReducer,
});