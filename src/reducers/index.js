import { combineReducers } from 'redux';

import janusReducer from './janusReducer';

export default combineReducers({
    janus: janusReducer,
});