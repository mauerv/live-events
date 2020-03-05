import { connect } from "react-redux";

import {
  getRoomList,
  getRoomIds,
  getJanus,
  getUser,
  getPublishers,
  getHandles,
  getSubscriptions,
  getIsRoomListSet
} from "../../selectors";
import {
  doSetHandle,
  doSetSubscription,
  doRemoveSubscription,
  doSetSubscriptionWebrtcState,
  doSetSubscriptionStream,
  doSetUsername,
  doSetActiveRoom,
  doSetRegisteredStatus,
  doSetPublishedStatus,
  doSetPublisherList,
  doRemovePublisher,
  doSetRoomList,
  doSetStream
} from "../../actions";
import { setJanus } from "features/janus/janusSlice";

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
  onSetHandle: doSetHandle,
  onSetSubscription: doSetSubscription,
  onRemoveSubscription: doRemoveSubscription,
  onSetSubscriptionWebrtcState: doSetSubscriptionWebrtcState,
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
