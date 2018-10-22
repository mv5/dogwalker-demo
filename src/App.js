import React, { Component } from "react";
import firebase from "firebase";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { THEME, Grid, CssBaseline, Fade } from "./styles/styles";

import UserManagement from "./components/UserManagement/UserManagement";
import AppHeader from "./components/AppHeader/AppHeader";
import Map from "./containers/Map";
import UserDetails from "./containers/UserDetails";
import AppFooter from "./components/AppFooter/AppFooter";
import AppSnackbar from "./containers/AppSnackbar";
import Loader from "./components/Loader/Loader";

// Initialize Firebase
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const theme = createMuiTheme(THEME);

export default class App extends Component {
  state = {
    showDetails: false,
    hoveredUser: {}
  };

  componentDidMount() {
    this.props.actions.fetchUsers(firebase);
    this.props.actions.fetchDogParks(fetch);
  }

  handleShowDetails = item => {
    this.setState({
      showDetails: true,
      hoveredUser: item
    });
  };

  handleHideDetails = () => {
    this.setState({
      showDetails: false,
      hoveredUser: {}
    });
  };

  render() {
    const { showDetails, hoveredUser } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <UserManagement
            firebase={firebase}
            updateSnackbar={this.props.actions.updateSnackbar}
          >
            {({ isSignedIn, loaded, currentUser, signOut }) => {
              if(!loaded){
                return <Loader />;
              }

              return (
                isSignedIn && (
                  <Fade in={isSignedIn} timeout={300}>
                    <Grid>
                      <AppHeader isSignedIn={isSignedIn} signOut={signOut} />
                      <Map
                        currentUserAddress={currentUser.address}
                        onHover={item => this.handleShowDetails(item)}
                        onHoverOut={() => this.handleHideDetails()}
                      />
                      <UserDetails
                        firebase={firebase}
                        currentUser={currentUser}
                      />
                      <AppFooter
                        showDetails={showDetails}
                        hoveredUser={hoveredUser}
                      />
                      <AppSnackbar />
                    </Grid>
                  </Fade>
                )
              );
            }}
          </UserManagement>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
