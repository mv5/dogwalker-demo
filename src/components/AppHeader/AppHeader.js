import React from "react";

const AppHeader = ({ userName, currentUser }) => (
  <div>
    <h1>My App</h1>
    <p>Welcome {userName}! You are now signed-in!</p>
    <p>{currentUser.type}</p>
    <p>{currentUser.address.addressName}</p>
  </div>
);

export default AppHeader
