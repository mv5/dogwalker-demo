import styled, {keyframes} from "styled-components";
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

import dogsBG from '../assets/dogs-bg.jpg'

export { 
    Dialog, DialogContent, DialogContentText, DialogTitle, 
    Button, Select, Input, InputLabel, MenuItem, FormControl 
}

const slideDown = keyframes`
    from {
        left: 0;
    }

    to{
        left: 50%;
    }
`

export const Grid = styled.div`
    display: grid;
    grid-template-areas: 
        "header header"
        "user-details map"
        "footer footer";
    grid-gap: 25px 40px;
    padding: 0 5vw;

`

export const Header = styled.header`
    grid-area: header
`

export const GridMap = styled.div`
    grid-area: map
`

export const GridUser = styled.div`
    grid-area: user-details
`

export const PopupBG = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${dogsBG});
`
