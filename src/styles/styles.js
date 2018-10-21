import styled from "styled-components";

import dogsBG from "../assets/dogs-bg.jpg";

import {
  AppBar,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  CardContent,
  Typography,
  Tooltip,
  CssBaseline,
  Avatar,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Snackbar
} from "@material-ui/core";

import Transition from "react-transition-group/Transition";

export {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Tooltip,
  CssBaseline,
  Avatar,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Snackbar,
  Transition
};

export const beforeTransitionStyle = {
  transition: `opacity 1000ms ease-in-out`,
  opacity: 0
};

export const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
};

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "header header"
    "user-details map"
    " . footer";
  grid-gap: 25px 40px;
  padding: 2vh 5vw;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "user-details"
      "map"
      "footer";
    grid-gap: 15px 20px;
    padding: 2vh 2vw;
  }
`;

export const Header = styled(AppBar)`
  grid-area: header;
  border-top-right-radius: 20px;
  padding: 1vh 1vw;
`;
export const SignOutContainer = styled.div`
  position: absolute;
  right: 5vw;
  top: 2vh;
  z-index: 9999;
  @media (max-width: 980px) {
    right: 2vw;
  }
`;

export const GridMap = styled.div`
  grid-area: map;
  min-height: 50vh;
  height: 100%;
  position: relative;
`;

export const GridUser = styled(Card)`
  grid-area: user-details;
`;

export const MapButtonContainer = styled.div`
  position: absolute;
  bottom: 7%;
  fontSize: 0.7vw;
  width: 13%;
  left: 5%;
  display: flex;
  flex-direction: column;
`

export const CustomCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-around;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

export const PopupBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${dogsBG});
`;
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 40%;
`;
export const Footer = styled.footer`
  grid-area: footer;
`;
