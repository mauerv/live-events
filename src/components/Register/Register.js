import { connect } from "react-redux";

import { getUser, setRegistered, setUsername } from "features/user/userSlice";

import BaseRegister from "./BaseRegister";

const mapStateToProps = state => ({
  user: getUser(state)
});

export default connect(mapStateToProps, {
  setRegistered,
  setUsername
})(BaseRegister);
