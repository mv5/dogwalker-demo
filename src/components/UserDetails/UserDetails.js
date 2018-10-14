import React, { Component } from 'react'
import AddressSelect from "../AddressSelect/AddressSelect";
import * as userTypes from '../../constants/UserTypes'
import {
    GridUser, FormWrapper,
    Select, Input, InputLabel, MenuItem, FormControl, CardContent,
    Snackbar, Typography
} from '../../styles/styles'

export default class UserDetails extends Component {
    constructor(props) {
        super(props)
        const { currentUser } = props
        this.state = {
            user: {
                type: !!currentUser && currentUser.type ? currentUser.type : '',
                address: !!currentUser && currentUser.address ? currentUser.address : {},
                phone: !!currentUser && currentUser.phone ? currentUser.phone : '',
                name: !!currentUser && currentUser.name ? currentUser.name
                    : currentUser.displayName ? currentUser.displayName : '',
                about: !!currentUser && currentUser.about ? currentUser.about : '',
            },
            showSnackbar: false,
            message: "Signed In successfully!"
        }
        this.snackbarTimeOut = null
        this.httpTimeout = null
    }




    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.user) !== JSON.stringify(this.state.user)) {
            if (this.httpTimeout) {
                clearTimeout(this.httpTimeout)
            }
            this.httpTimeout = setTimeout(() => {
                this.props.actions.updateUser(this.state.user, this.props.currentUser.uid, this.props.firebase)
            }, 1000)
        }

        if (prevProps.isFetching && !this.props.isFetching) {
            if (!this.snackbarTimeOut) {
                this.setState({
                    showSnackbar: true
                })
            }
        } else if (!this.props.isFetching && this.state.showSnackbar) {
            if (this.snackbarTimeOut) {
                clearTimeout(this.snackbarTimeOut)
            }
            this.snackbarTimeOut = setTimeout(() => {
                this.setState({
                    showSnackbar: false,
                    message: "Details updated successfully!"
                })
            }, 3000)
        }
    }



    handleInputChange(e) {
        const key = e.target.name
        const value = e.target.value

        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [key]: value
            }
        }))
    }

    handleAddressChange(address) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                address
            }
        }))
    }

    render() {
        const { user, showSnackbar, message } = this.state

        return (
            <GridUser>
                <Typography
                    variant="title"
                    color="primary"
                    style={{
                        margin: "2% 0 0 2%"
                    }}
                >
                    ENTER YOUR DETAILS
                </Typography>
                <CardContent
                    style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <AddressSelect
                        address={user.address}
                        onSelect={address => this.handleAddressChange(address)}

                    />
                    <FormWrapper>
                        <FormControl
                            style={{
                                marginBottom: '25px'
                            }}
                        >
                            <InputLabel htmlFor="type">Choose Type</InputLabel>
                            <Select
                                value={user.type}
                                onChange={e => this.handleInputChange(e)}
                                inputProps={{
                                    id: 'type',
                                    name: 'type'
                                }}
                            >
                                {Object.keys(userTypes).map(key =>
                                    <MenuItem
                                        value={userTypes[key]}
                                        key={userTypes[key]}
                                    >
                                        {userTypes[key].toUpperCase()}
                                    </MenuItem >
                                )}
                            </Select>
                        </FormControl>
                        {user.type === "walker" &&
                            <React.Fragment>
                                <FormControl
                                    style={{
                                        marginBottom: '25px'
                                    }}
                                >
                                    <InputLabel htmlFor="phone">Phone</InputLabel>
                                    <Input
                                        type="number"
                                        inputProps={{
                                            id: 'phone',
                                            name: 'phone'
                                        }}
                                        value={user.phone}
                                        onChange={e => this.handleInputChange(e)}

                                    />
                                </FormControl>

                                <FormControl
                                    style={{
                                        marginBottom: '25px'
                                    }}
                                >
                                    <InputLabel htmlFor="name">Name</InputLabel>
                                    <Input
                                        type="text"
                                        inputProps={{
                                            id: 'name',
                                            name: 'name'
                                        }}
                                        value={user.name}
                                        onChange={e => this.handleInputChange(e)}

                                    />
                                </FormControl>

                                <FormControl>
                                    <InputLabel htmlFor="about">About yourself</InputLabel>
                                    <Input
                                        multiline={true}
                                        rows={3}
                                        inputProps={{
                                            id: 'about',
                                            name: 'about'
                                        }}
                                        value={user.about}
                                        onChange={e => this.handleInputChange(e)}

                                    />
                                </FormControl>
                            </React.Fragment>
                        }
                    </FormWrapper>

                    <Snackbar
                        open={showSnackbar}
                        message={<span>{message}</span>}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    />
                </CardContent>
            </GridUser>
        )
    }

}

