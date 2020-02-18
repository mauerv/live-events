import { connect } from 'react-redux';

import { getRoomList } from '../../selectors';
import { 
    doSetJanus,
    doSetHandle,
    doSetUsername,
    doSetActiveRoom,
    doSetRegisteredStatus,
    doSetPublisherList,
    doSetPublisher,
    doSetRoomList,
} from '../../actions';

import BaseApp from './BaseApp';

const mapStateToProps = state => ({
    janus: state.janus,
    user: state.user,
    handles: state.handles,
    roomList: getRoomList(state.publishers),
});

export default connect(
    mapStateToProps,
    { 
        onSetJanus: doSetJanus,
        onSetHandle: doSetHandle,
        onSetUsername: doSetUsername,
        onSetActiveRoom: doSetActiveRoom,
        onSetRegisteredStatus: doSetRegisteredStatus,
        onSetPublisherList: doSetPublisherList,
        onSetPublisher: doSetPublisher,
        onSetRoomList: doSetRoomList,
    }
)(BaseApp);