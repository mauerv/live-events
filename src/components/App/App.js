import { connect } from 'react-redux';

import { 
    doSetJanus,
    doSetHandle,
    doSetUsername,
    doSetActiveRoom,
    doSetRegisteredStatus,
} from '../../actions';

import BaseApp from './BaseApp';

const mapStateToProps = state => ({
    janus: state.janus,
    user: state.user,
    handles: state.handles,
});

export default connect(
    mapStateToProps,
    { 
        onSetJanus: doSetJanus,
        onSetHandle: doSetHandle,
        onSetUsername: doSetUsername,
        onSetActiveRoom: doSetActiveRoom,
        onSetRegisteredStatus: doSetRegisteredStatus,
    }
)(BaseApp);