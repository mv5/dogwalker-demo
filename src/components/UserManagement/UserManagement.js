import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Button } from '../../styles/styles'
import SignInDialog from '../../components/SignInDialog/SignInDialog'
import Loader  from '../../components/Loader/Loader'

export default class UserManagement extends Component {
  state = {
    loaded: false,
    isSignedIn: false,
    currentUser: null,
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
    this.unregisterAuthObserver = this.props.firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        this.syncUserData(user)
      } else {
        this.setState({ isSignedIn: !!user, loaded: true });
      }
    });
  }

  syncUserData(user) {
    return this.props.firebase
      .database()
      .ref("/users/" + user.uid)
      .on("value", snapshot => {
        const userData = snapshot.val() ? snapshot.val() : {}
        this.setState({ isSignedIn: !!user, loaded: true, currentUser: { ...user, ...userData } });
      })
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isSignedIn, loaded } = this.state;

    if (loaded) {
      return (
        <React.Fragment>
          {isSignedIn ? (
            <div
              style={{
                position: "absolute",
                right: "5vw",
                top: "2vh",
                zIndex: "9999"
              }}
            >
              <Button variant="contained" color="secondary" onClick={() => this.signOut()}>Sign Out</Button>
            </div>
          ) : (
              <SignInDialog>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={this.props.firebase.auth()}
                />
              </SignInDialog>
            )}
          {this.props.children(this.state)}
        </React.Fragment>
      );
    } else {
      return <Loader />
    }
  }
}
