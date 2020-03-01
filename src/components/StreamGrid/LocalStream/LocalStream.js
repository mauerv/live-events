import { connect } from 'react-redux';

import { 
    doToggleAudio,
    doToggleVideo,
} from '../../../actions';
import { getActiveHandle, getUser } from '../../../selectors';

import BaseLocalStream from './BaseLocalStream';

const mapStateToProps = state => ({
    handle: getActiveHandle(state),
    user: getUser(state),
});

export default connect(
    mapStateToProps,
    {
        onToggleAudio: doToggleAudio,
        onToggleVideo: doToggleVideo,
    }
)(BaseLocalStream);