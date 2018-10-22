import React from "react";
import { Header, Typography } from "../../styles/styles";
import SignOut from "../SignOut/SignOut";

const AppHeader = ({ isSignedIn, signOut}) => (
  <Header position="relative" color="primary">
    <Typography color="inherit" variant="h5" gutterBottom={true}>
      WALKIE DOGGY
    </Typography>
    {isSignedIn &&
        <SignOut signOut={() => signOut()}/>
    }
  </Header>
);

export default AppHeader;
