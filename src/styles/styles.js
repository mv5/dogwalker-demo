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
  Snackbar,
  Popover,
  Fade
} from "@material-ui/core";

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
  Popover,
  Fade
};

export const THEME = {
  palette: {
    primary: { main: "#28536B" },
    secondary: { main: "#35393C" }
  },
  typography: {
    fontFamily: ["Roboto"],
    useNextVariants: true
  },
  mapTopMargin: "5%",
  mobileMapTopMargin: "2%"
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1;
  grid-template-rows: auto;
  grid-template-areas:
    "header"
    "user-details"
    "map"
    "footer";
  grid-gap: 25px 40px;
  padding: 2vh 5vw;
  @media (max-width: 980px) {
    grid-gap: 15px 20px;
    padding: 2vh 2vw;
  }
`;

export const Header = styled(AppBar)`
  grid-area: header;
  padding: 1vh 1vw;
`;

export const SignOutContainer = styled.div`
  position: absolute;
  right: 2vw;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  transition: opacity 1000ms ease-in-out;
  @media (max-width: 980px) {
    right: 2vw;
  }
`;

export const GridMap = styled.div`
  grid-area: map;
  min-height: 50vh;
  height: 100%;
  width: 100%;
  position: relative;
  @media (max-width: 980px){
    min-height: 70vh;
  }
`;

export const GridUser = styled(Card)`
  grid-area: user-details;
  overflow: visible !important;
`;

export const MapButtonContainer = styled.div`
  position: absolute;
  top: ${THEME.mapTopMargin};
  font-size: 0.7vw;
  width: 10%;
  left: 10%;
  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    top:  ${THEME.mobileMapTopMargin};
    left: 35%;
    width: 25%;
    font-size: 3vw;
  }
`;

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
  @media (max-width: 980px){
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right center;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex: 0 0 70%;
  justify-content: space-between;
  @media (max-width: 980px){
    flex-direction: column;
  }
`;

export const FormControlWrapper = styled.div`
  position: absolute;
  z-index: 9999;
  top: ${THEME.mapTopMargin};
  left: 1%;
  background: rgba(256, 256, 256, 1);
  padding: 10px 10px 0 10px;
  border-radius: 5px;
  @media (max-width: 980px){
    padding: 5px 5px 0 5px;
    top:  ${THEME.mobileMapTopMargin};
  }
`;

export const CustomFormControlLabel = styled(FormControlLabel)`
@media (max-width: 980px){
  margin-right: 5px !important;
}
`

export const CustomCheckbox = styled(Checkbox)`
@media (max-width: 980px){
  padding-right: 5px !important;
}
`

export const Footer = styled.footer`
  grid-area: footer;
`;
