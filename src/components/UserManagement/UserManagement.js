import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Fade } from "../../styles/styles";
import SignInDialog from "../../components/SignInDialog/SignInDialog";

export default class UserManagement extends Component {
  state = {
    loaded: false,
    isSignedIn: false,
    currentUser: null
  };

  // FirebaseUI config.
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = this.props.firebase
      .auth()
      .onAuthStateChanged(user => {
        if (!!user) {
          this.props.updateSnackbar({
            open: true,
            message: "Signed in successfully!"
          });
          this.syncUserData(user);
        } else {
          this.setState({
            isSignedIn: false,
            loaded: true,
            queueTransition: true
          });
        }
      });
  }

  syncUserData(user) {
    this.props.firebase
      .database()
      .ref("/users/" + user.uid)
      .on("value", snapshot => {
        const userData = snapshot.val() || {};
        this.setState({
          isSignedIn: true,
          loaded: true,
          currentUser: { ...user, ...userData },
          queueTransition: true
        });
      });
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isSignedIn, loaded } = this.state;

    return (
      <React.Fragment>
        {!isSignedIn && loaded && (
          <Fade in={!isSignedIn} timeout={300}>
            <React.Fragment>
              <SignInDialog>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={this.props.firebase.auth()}
                />
              </SignInDialog>
            </React.Fragment>
          </Fade>
        )}
        {this.props.children({ ...this.state, signOut: this.signOut })}
      </React.Fragment>
    );
  }
}
