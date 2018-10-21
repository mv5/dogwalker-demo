import { connect } from "react-redux";
import * as actionCreators from "../action-creators";
import { bindActionCreators } from "redux";
import Map from "../components/Map/Map";
import { objectToArray } from "../utils/utils";

const mapStateToProps = state => ({
  mapSettings: state.mapSettings,
  dogParks: state.dogParks,
  users: objectToArray(state.usersData.users)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
