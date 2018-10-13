import React, { Component } from 'react'
import AddressSelect from "../AddressSelect/AddressSelect";
import * as userTypes from '../../constants/UserTypes'

export default class UserDetails extends Component {
    state = {
        type: !!this.props.currentUser ? this.props.currentUser.type : '',
        address: !!this.props.currentUser && this.props.currentUser.address ? this.props.currentUser.address : {}
    }

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
            this.props.actions.updateUser(this.state, this.props.currentUser.uid, this.props.firebase)
        }
    }

    handleTypeChange(type) {
        this.setState({
          type  
        })
    }

    handleAddressChange(address){
        this.setState({
            address
        })
    }

    render() {
        const { type } = this.state

        return (
            <div>
                <AddressSelect onSelect={address => this.handleAddressChange(address)}/>
                <select defaultValue={type} onChange={e => this.handleTypeChange(e.target.value)}>
                    {Object.keys(userTypes).map(key =>
                        <option value={userTypes[key]} key={userTypes[key]}>{userTypes[key].toUpperCase()}</option>
                    )}
                </select>
            </div>
        )
    }

}

