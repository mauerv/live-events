import { connect } from 'react-redux';

import { getUser } from 'selectors';

import {
    doSetRegisteredStatus,
    doSetUsername,
} from 'actions';

import BaseRegister from './BaseRegister';

const mapStateToProps = state => ({
    user: getUser(state),
});

export default connect(
    mapStateToProps,
    {
        onSetRegisteredStatus: doSetRegisteredStatus,
        onSetUsername: doSetUsername,
    }
)(BaseRegister);