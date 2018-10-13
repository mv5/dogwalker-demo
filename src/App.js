import React, { Component } from "react";
import firebase from "firebase";
import { Grid } from './styles/styles'

import UserManagement from "./components/UserManagement/UserManagement";
import AppHeader from './components/AppHeader/AppHeader'
import Map from "./components/Map/Map";
import UserDetails from "./components/UserDetails/UserDetails"

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


export default class App extends Component {
  componentDidMount() {
    this.props.actions.fetchUsers(firebase)
  }

  objectToArray(object) {
    return !!object ? Object.keys(object).map(key => ({ id: key, ...object[key] })) : []
  }

  render() {
    const { usersData, mapSettings, actions } = this.props

    return (

      <UserManagement firebase={firebase}>
        {({ isSignedIn, currentUser }) => {
          return isSignedIn && (
            <Grid>
              <AppHeader userName={currentUser.displayName} currentUser={currentUser} />
              <Map users={this.objectToArray(usersData.users)} settings={mapSettings} currentUser={currentUser} />
              <UserDetails actions={actions} firebase={firebase} currentUser={currentUser} />
            </Grid>
          );
        }}
      </UserManagement>

    )
  }
}

