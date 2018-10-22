import React, { Component } from "react";
import {
  Avatar,
  Popover,
  SignOutContainer,
  MenuItem
} from "../../styles/styles";
import AccountCircle from "@material-ui/icons/AccountCircle.js";

export default class SignOut extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
          <SignOutContainer>
            <Avatar
              style={{ cursor: "pointer" }}
              color="secondary"
              onClick={this.handleClick}
            >
              <AccountCircle />
            </Avatar>
          </SignOutContainer>
          <Popover
            id="simple-popper"
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <MenuItem onClick={() => this.props.signOut()}>Sign out</MenuItem>
          </Popover>
        </React.Fragment>
    );
  }
}
