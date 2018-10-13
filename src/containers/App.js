import { connect } from "react-redux";
import * as actionCreators from "../action-creators";
import { bindActionCreators } from "redux";
import App from "../App";

const mapStateToProps = state => ({
  usersData: state.usersData,
  mapSettings: state.mapSettings
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
