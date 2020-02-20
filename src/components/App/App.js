import { connect } from 'react-redux';

import { 
    getRoomList,
    getRoomIds,
} from '../../selectors';
import { 
    doSetJanus,
    doSetHandle,
    doSetSubscriptionHandle,
    doSetUsername,
    doSetActiveRoom,
    doSetRegisteredStatus,
    doSetPublisherList,
    doDeletePublisher,
    doSetRoomList,
} from '../../actions';

import BaseApp from './BaseApp';

const mapStateToProps = state => ({
    janus: state.janus,
    user: state.user,
    handles: state.handles,
    subscriptions: state.subscriptions,
    roomIds: getRoomIds(state.rooms),
    roomList: getRoomList(state),
});

export default connect(
    mapStateToProps,
    { 
        onSetJanus: doSetJanus,
        onSetHandle: doSetHandle,
        onSetSubscriptionHandle: doSetSubscriptionHandle,
        onSetUsername: doSetUsername,
        onSetActiveRoom: doSetActiveRoom,
        onSetRegisteredStatus: doSetRegisteredStatus,
        onSetPublisherList: doSetPublisherList,
        onDeletePublisher: doDeletePublisher,
        onSetRoomList: doSetRoomList,
    }
)(BaseApp);