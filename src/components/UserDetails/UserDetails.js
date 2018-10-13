import React, { Component } from 'react'
import AddressSelect from "../AddressSelect/AddressSelect";
import * as userTypes from '../../constants/UserTypes'
import { GridUser, Select, Input, InputLabel, MenuItem, FormControl } from '../../styles/styles'

export default class UserDetails extends Component {
    state = {
        type: !!this.props.currentUser ? this.props.currentUser.type : '',
        address: !!this.props.currentUser && this.props.currentUser.address ? this.props.currentUser.address : {}
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            this.props.actions.updateUser(this.state, this.props.currentUser.uid, this.props.firebase)
        }
    }

    handleTypeChange(type) {
        this.setState({
            type
        })
    }

    handleAddressChange(address) {
        this.setState({
            address
        })
    }

    render() {
        const { type } = this.state

        return (
            <GridUser>
                <AddressSelect onSelect={address => this.handleAddressChange(address)} />
                <FormControl>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                        value={type}
                        onChange={e => this.handleTypeChange(e.target.value)}
                        inputProps={{
                            id: 'type',
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
            </GridUser>
        )
    }

}

