import React, { Component } from "react";
import firebase from "firebase";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, CssBaseline, Transition, defaultStyle, transitionStyles } from './styles/styles'

import UserManagement from "./components/UserManagement/UserManagement";
import AppHeader from './components/AppHeader/AppHeader'
import Map from "./components/Map/Map";
import UserDetails from "./components/UserDetails/UserDetails"
import AppFooter from "./components/AppFooter/AppFooter"

import { objectToArray } from './utils/utils'

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

const theme = createMuiTheme({
  palette: {
    primary: { main: "#28536B" },
    secondary: { main: '#35393C' },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ]
  }
});

export default class App extends Component {
  state = {
    showDetails: false,
    hoveredUser: {},
    show: "all"
  }

  componentDidMount() {
    this.props.actions.fetchUsers(firebase)
  }

  handleShowDetails = (item) => {
    this.setState({
      showDetails: true,
      hoveredUser: item
    })
  }

  handleHideDetails = () => {
    this.setState({
      showDetails: false,
      hoveredUser: {}
    })
  }

  handleShowSelect(value) {
    this.setState({
      show: value
    })
  }

  render() {
    const { usersData, mapSettings, actions } = this.props
    const { showDetails, hoveredUser, show } = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <UserManagement firebase={firebase}>
            {({ isSignedIn, currentUser }) => {
              return isSignedIn && (
                <Transition
                  in={isSignedIn}
                  timeout={300}
                  mountOnEnter
                  unmountOnExit
                  appear={true}
                >
                 {(state) => (
                  <Grid
                    style={{
                      ...defaultStyle, 
                      ...transitionStyles[state]
                    }}
                  >
                    <AppHeader currentUser={currentUser} />
                    <Map
                      users={objectToArray(usersData.users)}
                      settings={mapSettings}
                      currentUser={currentUser}
                      onHover={item => this.handleShowDetails(item)}
                      onHoverOut={() => this.handleHideDetails()}
                      onSelect={(value) => this.handleShowSelect(value)}
                      show={show}
                    />
                    <UserDetails
                      actions={actions}
                      firebase={firebase}
                      currentUser={currentUser}
                      isFetching={usersData.isFetching}
                    />
                    <AppFooter
                      showDetails={showDetails}
                      hoveredUser={hoveredUser}
                    />
                  </Grid>
                 )}
                </Transition>
              );
            }}
          </UserManagement>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

