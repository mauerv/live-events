import { connect } from 'react-redux';

import { getRoomList, getRoomIds } from '../../selectors';
import { 
    doSetJanus,
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
    doSetStream,
} from '../../actions';

import BaseApp from './BaseApp';

const mapStateToProps = state => ({
    janus: state.janus,
    user: state.user,
    handles: state.handles,
    subscriptions: state.subscriptions,
    isRoomListSet: state.roomData.isSet,
    roomIds: getRoomIds(state.roomData),
    roomList: getRoomList(state),
    publishers: state.publishers,
});

export default connect(
    mapStateToProps,
    { 
        onSetJanus: doSetJanus,
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
        onSetRoomList: doSetRoomList,
    }
)(BaseApp);