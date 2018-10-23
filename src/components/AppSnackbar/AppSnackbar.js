import React, { Component } from "react";
import { Snackbar } from "../../styles/styles";

export default class AppSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
      message: props.message || ""
    };
  }

  componentDidUpdate() {
    if ( this.state.open !== this.props.open ) {
      this.setState({
        open: this.props.open,
        message: this.props.message
      });
    }
  }

  closeBar() {
    this.props.close();
  }

  render() {
    const { open, message } = this.state;
    return (
      <Snackbar
        open={open}
        message={<span>{message}</span>}
        autoHideDuration={3000}
        onClose={() => this.closeBar()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        key={message}
      />
    );
  }
}
