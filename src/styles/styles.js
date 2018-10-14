import styled from "styled-components";

import dogsBG from '../assets/dogs-bg.jpg'

import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

export {
    Dialog, DialogContent, DialogContentText, DialogTitle,
    Button, Select, Input, InputLabel, MenuItem, FormControl,
    CardContent, Typography, Tooltip, CssBaseline,
    FormControlLabel, FormLabel, Checkbox, FormGroup
}

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
    @media (max-width: 980px){
        grid-template-areas: 
        "header header"
        "user-details user-details"
        "map footer";
        grid-gap: 15px 20px;
        padding: 2vh 2vw;
    }
`

export const Header = styled(AppBar)`
    grid-area: header;
    border-top-right-radius: 5px;
    padding: 1vh 1vw;
`

export const GridMap = styled.div`
    grid-area: map;
    height: 50vh;
    position: relative
`

export const GridUser = styled(Card)`
    grid-area: user-details;
`

export const PopupBG = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${dogsBG});
`
export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 30%;
`
export const Footer = styled.footer`
    grid-area: footer;
`