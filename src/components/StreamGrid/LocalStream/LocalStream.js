import { connect } from "react-redux";

import { getActiveHandle } from "features/handles/handlesSlice";
import { getUser, toggleAudio, toggleVideo } from "features/user/userSlice";

import BaseLocalStream from "./BaseLocalStream";

const mapStateToProps = state => ({
  handle: getActiveHandle(state),
  user: getUser(state)
});

export default connect(mapStateToProps, {
  toggleAudio,
  toggleVideo
})(BaseLocalStream);
