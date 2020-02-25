import { connect } from 'react-redux';

import BaseStreamGrid from './BaseStreamGrid';

const mapStateToProps = state => ({
    subscriptions: Object.values(state.subscriptions),
});

export default connect(
    mapStateToProps,
)(BaseStreamGrid);