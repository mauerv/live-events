import { connect } from 'react-redux';

import { 
    doToggleAudio,
    doToggleVideo,
} from '../../../actions';
import { getActiveHandle } from '../../../selectors';

import BaseLocalStream from './BaseLocalStream';

const mapStateToProps = state => ({
    handle: getActiveHandle(state),
    user: state.user,
});

export default connect(
    mapStateToProps,
    {
        onToggleAudio: doToggleAudio,
        onToggleVideo: doToggleVideo,
    }
)(BaseLocalStream);