import { connect } from "react-redux";

import {
  getRoomList,
  getRoomIds,
  getUser,
  getPublishers,
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
  doSetPublisherList,
  doRemovePublisher,
  doSetRoomList,
  doSetStream
} from "actions";

import BaseApp from "./BaseApp";

const mapStateToProps = state => ({
  user: getUser(state),
  handles: getHandles(state),
  subscriptions: getSubscriptions(state),
  isRoomListSet: getIsRoomListSet(state),
  roomIds: getRoomIds(state),
  roomList: getRoomList(state),
  publishers: getPublishers(state)
});

export default connect(mapStateToProps, {
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
  onSetPublisherList: doSetPublisherList,
  onRemovePublisher: doRemovePublisher,
  onSetRoomList: doSetRoomList
})(BaseApp);
