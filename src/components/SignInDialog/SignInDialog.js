import React from 'react'
import { 
    PopupBG, Dialog, DialogContent, DialogContentText, DialogTitle,
    defaultStyle, transitionStyles
} from '../../styles/styles'


const SignInDialog = ({children, transitionState}) => (
    <React.Fragment>
        <PopupBG />
        <Dialog
            open={true}
            style={{ 
                textAlign: 'center',
                ...defaultStyle,
                ...transitionStyles[transitionState]
            }}
        >
            <DialogTitle>Welcome to this demo for dog owners and walkers</DialogTitle>
            <DialogContent>
                <DialogContentText color="default">please sign in first</DialogContentText>
                {children}
            </DialogContent>
        </Dialog>
    </React.Fragment>
)

export default SignInDialog