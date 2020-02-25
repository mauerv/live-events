import { connect } from 'react-redux';

import {
    doSetRegisteredStatus,
    doSetUsername,
} from '../../actions';

import BaseRegister from './BaseRegister';

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    {
        onSetRegisteredStatus: doSetRegisteredStatus,
        onSetUsername: doSetUsername,
    }
)(BaseRegister);