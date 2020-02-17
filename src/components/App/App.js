import { connect } from 'react-redux';

import { doSetJanus } from '../../actions';

import BaseApp from './BaseApp';

const mapStateToProps = state => ({
    janus: state.janus,
});

export default connect(
    mapStateToProps,
    { onSetJanus: doSetJanus }
)(BaseApp);