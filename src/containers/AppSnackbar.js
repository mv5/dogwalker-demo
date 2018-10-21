import { connect } from "react-redux";
import { closeSnackbar } from "../action-creators";
import { bindActionCreators } from "redux";
import AppSnackbar from "../components/AppSnackbar/AppSnackbar";

const mapStateToProps = state => ({
  open: state.snackbar.open,
  message: state.snackbar.message
});

const mapDispatchToProps = dispatch => ({
    close: bindActionCreators(closeSnackbar, dispatch)
});
  

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSnackbar);
