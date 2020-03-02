import { combineReducers } from "redux";

import userReducer from "./userReducer";
import handlesReducer from "./handlesReducer";
import publishersReducer from "./publishersReducer";
import roomsReducer from "./roomsReducer";
import subscriptionsReducer from "./subscriptionsReducer";

export default combineReducers({
  user: userReducer,
  handles: handlesReducer,
  publishers: publishersReducer,
  roomData: roomsReducer,
  subscriptions: subscriptionsReducer
});
