import { connect } from "react-redux";
import * as actionCreators from "../action-creators";
import { bindActionCreators } from "redux";
import UserDetails from "../components/UserDetails/UserDetails";

const mapStateToProps = state => ({
    isFetching: state.usersData.isFetching
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
