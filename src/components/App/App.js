import { connect } from "react-redux";

import {
  getRoomList,
  getRoomIds,
  getUser,
  getPublishers,
  getSubscriptions,
  getIsRoomListSet
} from "selectors";
import {
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
  doSetRoomList
} from "actions";

import BaseApp from "./BaseApp";

const mapStateToProps = state => ({
  user: getUser(state),
  subscriptions: getSubscriptions(state),
  isRoomListSet: getIsRoomListSet(state),
  roomIds: getRoomIds(state),
  roomList: getRoomList(state),
  publishers: getPublishers(state)
});

export default connect(mapStateToProps, {
  onSetSubscription: doSetSubscription,
  onRemoveSubscription: doRemoveSubscription,
  onSetSubscriptionIceState: doSetSubscriptionIceState,
  onSetSubscriptionStream: doSetSubscriptionStream,
  onSetUsername: doSetUsername,
  onSetActiveRoom: doSetActiveRoom,
  onSetRegisteredStatus: doSetRegisteredStatus,
  onSetPublishedStatus: doSetPublishedStatus,
  onSetPublisherList: doSetPublisherList,
  onRemovePublisher: doRemovePublisher,
  onSetRoomList: doSetRoomList
})(BaseApp);
