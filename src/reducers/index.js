import { combineReducers } from "redux";

import janusReducer from "features/janus/janusSlice";
import publishersReducer from "features/publishers/publishersSlice";
import userReducer from "features/user/userSlice";
import handlesReducer from "features/handles/handlesSlice";

import roomsReducer from "./roomsReducer";
import subscriptionsReducer from "./subscriptionsReducer";

export default combineReducers({
  janus: janusReducer,
  user: userReducer,
  handles: handlesReducer,
  publishers: publishersReducer,
  roomData: roomsReducer,
  subscriptions: subscriptionsReducer
});
