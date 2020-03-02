import { connect } from "react-redux";

import {
  getRoomList,
  getRoomIds,
  getSubscriptions,
  getIsRoomListSet
} from "selectors";
import {
  doSetSubscription,
  doRemoveSubscription,
  doSetSubscriptionIceState,
  doSetSubscriptionStream,
  doSetRoomList
} from "actions";
import { getJanus, setJanus } from "features/janus/janusSlice";
import {
  getPublishers,
  setPublishers,
  removePublisher
} from "features/publishers/publishersSlice";
import { getHandles, setHandle } from "features/handles/handlesSlice";
import {
  getUser,
  setUsername,
  setActiveRoom,
  setRegistered,
  setPublished,
  setStream
} from "features/user/userSlice";

import BaseApp from "./BaseApp";

const mapStateToProps = state => ({
  janus: getJanus(state),
  user: getUser(state),
  handles: getHandles(state),
  subscriptions: getSubscriptions(state),
  isRoomListSet: getIsRoomListSet(state),
  roomIds: getRoomIds(state),
  roomList: getRoomList(state),
  publishers: getPublishers(state)
});

export default connect(mapStateToProps, {
  setJanus,
  setPublishers,
  removePublisher,
  setUsername,
  setActiveRoom,
  setRegistered,
  setPublished,
  setStream,
  setHandle,
  onSetSubscription: doSetSubscription,
  onRemoveSubscription: doRemoveSubscription,
  onSetSubscriptionIceState: doSetSubscriptionIceState,
  onSetSubscriptionStream: doSetSubscriptionStream,
  onSetRoomList: doSetRoomList
})(BaseApp);
