import { connect } from 'react-redux';

import { 
    getRoomList,
    getRoomIds,
    getRemoteStreamList,
} from '../../selectors';
import { 
    doSetJanus,
    doSetHandle,
    doSetSubscriptionHandle,
    doRemoveSubscriptionHandle,
    doSetUsername,
    doSetActiveRoom,
    doSetRegisteredStatus,
    doSetPublisherList,
    doRemovePublisher,
    doSetRoomList,
    doSetStream,
    doSetRemoteStream,
    doRemoveRemoteStream,
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
    streamList: getRemoteStreamList(state.remoteStreams),
    publishers: state.publishers,
});

export default connect(
    mapStateToProps,
    { 
        onSetJanus: doSetJanus,
        onSetHandle: doSetHandle,
        onSetSubscriptionHandle: doSetSubscriptionHandle,
        onRemoveSubscriptionHandle: doRemoveSubscriptionHandle,
        onSetUsername: doSetUsername,
        onSetActiveRoom: doSetActiveRoom,
        onSetRegisteredStatus: doSetRegisteredStatus,
        onSetStream: doSetStream,
        onSetPublisherList: doSetPublisherList,
        onRemovePublisher: doRemovePublisher,
        onSetRoomList: doSetRoomList,
        onSetRemoteStream: doSetRemoteStream,
        onRemoveRemoteStream: doRemoveRemoteStream,
    }
)(BaseApp);