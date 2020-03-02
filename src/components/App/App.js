import { connect } from "react-redux";

import {
  getRoomList,
  getRoomIds,
  getUser,
  getHandles,
  getSubscriptions,
  getIsRoomListSet
} from "selectors";
import {
  doSetHandle,
  doSetSubscription,
  doRemoveSubscription,
  doSetSubscriptionIceState,
  doSetSubscriptionStream,
  doSetUsername,
  doSetActiveRoom,
  doSetRegisteredStatus,
  doSetPublishedStatus,
  doSetRoomList,
  doSetStream
} from "actions";
import { getJanus, setJanus } from "features/janus/janusSlice";
import {
  getPublishers,
  setPublishers,
  removePublisher
} from "features/publishers/publishersSlice";

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
  onSetHandle: doSetHandle,
  onSetSubscription: doSetSubscription,
  onRemoveSubscription: doRemoveSubscription,
  onSetSubscriptionIceState: doSetSubscriptionIceState,
  onSetSubscriptionStream: doSetSubscriptionStream,
  onSetUsername: doSetUsername,
  onSetActiveRoom: doSetActiveRoom,
  onSetRegisteredStatus: doSetRegisteredStatus,
  onSetPublishedStatus: doSetPublishedStatus,
  onSetStream: doSetStream,
  onSetRoomList: doSetRoomList
})(BaseApp);
