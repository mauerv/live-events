import { combineReducers } from "redux";

import userReducer from "./userReducer";
import publishersReducer from "./publishersReducer";
import roomsReducer from "./roomsReducer";
import subscriptionsReducer from "./subscriptionsReducer";

export default combineReducers({
  user: userReducer,
  publishers: publishersReducer,
  roomData: roomsReducer,
  subscriptions: subscriptionsReducer
});
