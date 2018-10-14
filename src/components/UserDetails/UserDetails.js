import React, { Component } from 'react'
import AddressSelect from "../AddressSelect/AddressSelect";
import * as userTypes from '../../constants/UserTypes'
import {
    GridUser, FormWrapper,
    Select, Input, InputLabel, MenuItem, FormControl, CardContent
} from '../../styles/styles'

export default class UserDetails extends Component {
    state = {
        type: !!this.props.currentUser && this.props.currentUser.type ? this.props.currentUser.type : '',
        address: !!this.props.currentUser && this.props.currentUser.address
            ? this.props.currentUser.address : {},
        phone: !!this.props.currentUser && this.props.currentUser.phone ? this.props.currentUser.phone : '',
        name: !!this.props.currentUser && this.props.currentUser.name ? this.props.currentUser.name
            : this.props.currentUser.displayName ? this.props.currentUser.displayName : '',
        about: !!this.props.currentUser && this.props.currentUser.about ? this.props.currentUser.about : '',
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            this.props.actions.updateUser(this.state, this.props.currentUser.uid, this.props.firebase)
        }
    }

    handleInputChange(e) {
        const key = e.target.name
        const value = e.target.value

        this.setState({
            [key]: value
        })
    }

    handleAddressChange(address) {
        this.setState({
            address
        })
    }

    render() {
        const { type, address, phone, name, about } = this.state

        return (
            <GridUser>
                <CardContent
                    style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <AddressSelect
                        address={address}
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
                                value={type}
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
                        {type === "walker" &&
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
                                        value={phone}
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
                                        value={name}
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
                                        value={about}
                                        onChange={e => this.handleInputChange(e)}

                                    />
                                </FormControl>
                            </React.Fragment>
                        }
                    </FormWrapper>
                </CardContent>
            </GridUser>
        )
    }

}

