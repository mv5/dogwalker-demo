import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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
        const userData = snapshot.val() ? snapshot.val() : undefined
        this.setState({ isSignedIn: !!user, loaded: true, currentUser: {...user, ...userData} });
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
            <div>
              <button onClick={() => this.signOut()}>Sign Out</button>
            </div>
          ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={this.props.firebase.auth()}
              />
            )}
          {this.props.children(this.state)}
        </React.Fragment>
      );
    } else {
      return <p>loading...</p>;
    }
  }
}
