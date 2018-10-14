import React, { Component } from "react";
import firebase from "firebase";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, CssBaseline } from './styles/styles'

import UserManagement from "./components/UserManagement/UserManagement";
import AppHeader from './components/AppHeader/AppHeader'
import Map from "./components/Map/Map";
import UserDetails from "./components/UserDetails/UserDetails"
import AppFooter from "./components/AppFooter/AppFooter"

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
    primary: { main: "#2196f3" },
    secondary: { main: '#1de9b6' },
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
    hoveredUser: {}
  }

  handleShowDetails = (item = {}) => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
      hoveredUser: item
    }))
  }

  componentDidMount() {
    this.props.actions.fetchUsers(firebase)
  }

  objectToArray(object) {
    return !!object ? Object.keys(object).map(key => ({ id: key, ...object[key] })) : []
  }

  render() {
    const { usersData, mapSettings, actions } = this.props
    const { showDetails, hoveredUser } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <UserManagement firebase={firebase}>
          {({ isSignedIn, currentUser }) => {
            return isSignedIn && (
              <Grid>
                <AppHeader currentUser={currentUser} />
                <Map
                  users={this.objectToArray(usersData.users)}
                  settings={mapSettings}
                  currentUser={currentUser}
                  onHover={item => this.handleShowDetails(item)}
                />
                <UserDetails actions={actions} firebase={firebase} currentUser={currentUser} />
                <AppFooter showDetails={showDetails} hoveredUser={hoveredUser}/>
              </Grid>
            );
          }}
        </UserManagement>
      </MuiThemeProvider>
    )
  }
}
