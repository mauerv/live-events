import { combineReducers } from "redux";

import janusReducer from "features/janus/janusSlice";
import publishersReducer from "features/publishers/publishersSlice";

import userReducer from "./userReducer";
import handlesReducer from "./handlesReducer";
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
