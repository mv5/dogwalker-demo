import React from "react";
import {Header} from '../../styles/styles'

const AppHeader = ({ userName, currentUser }) => (
  <Header>
    <h1>My App</h1>
    <p>Welcome {userName}! You are now signed-in!</p>
    <p>{currentUser.type}</p>
    <p>{currentUser.address.addressName}</p>
  </Header>
);

export default AppHeader
