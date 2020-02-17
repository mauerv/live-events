import { connect } from 'react-redux';

import { 
    doSetJanus,
    doSetUsername,
    doSetActiveRoom,
    doSetRegisteredStatus,
} from '../../actions';

import BaseApp from './BaseApp';

const mapStateToProps = state => ({
    janus: state.janus,
    user: state.user,
});

export default connect(
    mapStateToProps,
    { 
        onSetJanus: doSetJanus,
        onSetUsername: doSetUsername,
        onSetActiveRoom: doSetActiveRoom,
        onSetRegisteredStatus: doSetRegisteredStatus,
    }
)(BaseApp);