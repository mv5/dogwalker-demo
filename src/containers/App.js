import { connect } from "react-redux";
import * as actionCreators from "../action-creators";
import { bindActionCreators } from "redux";
import App from "../App";

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(App);
