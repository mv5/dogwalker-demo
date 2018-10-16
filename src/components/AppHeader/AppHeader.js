import React from "react";
import { Header, Typography } from '../../styles/styles'

const AppHeader = ({ currentUser }) => (
  <Header
    position="relative"
    color="primary"
  >
    <Typography
      color="inherit"
      variant="h5"
      gutterBottom={true}
    >
      WALKIE DOGGY
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
