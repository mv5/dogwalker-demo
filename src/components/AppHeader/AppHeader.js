import React from "react";
import { Header, Typography } from '../../styles/styles'

const AppHeader = ({ currentUser }) => (
  <Header
    position="relative"
    color="primary"
  >
    <Typography
      color="inherit"
      variant="h3"
      gutterBottom={true}
    >
      Walkie Doggy
    </Typography>

    <Typography
      variant="h6"
      color="inherit"
    >
      Welcome {currentUser.name || currentUser.displayName}! 
    </Typography>
  </Header>
);

export default AppHeader
