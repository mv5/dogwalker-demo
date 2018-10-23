import React, { Component } from "react";
import AddressSelect from "../AddressSelect/AddressSelect";
import * as userTypes from "../../constants/UserTypes";
import {
  GridUser,
  FormWrapper,
  CustomCardContent,
  Select,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Typography
} from "../../styles/styles";
import { capitalizeFirstLetter, objectsAreEqual, isEmpty } from "../../utils/utils";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      user: {
        type: currentUser.type || "",
        address: currentUser.address || {},
        phone: currentUser.phone || "",
        name: currentUser.name || currentUser.displayName || "",
        about: currentUser.about || ""
      }
    };
    this.httpTimeout = null;
  }

  componentDidMount(){
    if(isEmpty(this.state.user.address)){
      this.getAddressFromBrowser()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!objectsAreEqual(prevState.user, this.state.user)) {
      if (this.httpTimeout) {
        clearTimeout(this.httpTimeout);
      }
      this.httpTimeout = setTimeout(() => {
        this.props.actions.updateUser(
          this.state.user,
          this.props.currentUser.uid,
          this.props.firebase
        );
        this.httpTimeout = null;
      }, 1000);
    }

    if (prevProps.isFetching && !this.props.isFetching) {
      // finished fetching
      this.props.actions.updateSnackbar({
        open: true,
        message: "Details updated successfully!"
      });
    }
  }

  getAddressFromBrowser(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
        .then(data => data.json())
        .then(json => {
          const addressName = json.results[0].formatted_address
          const address = {
            addressName,
            lat: latitude,
            lng: longitude
          }
          this.handleAddressChange(address)
        })
      })
    }
  }

  handleInputChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [key]: value
      }
    }));
  }

  handleAddressChange(address) {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        address
      }
    }));
    this.props.actions.changeMapSettings({
      zoom: 15,
      center: { lat: address.lat, lng: address.lng }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <GridUser>
        <Typography
          variant="h6"
          color="primary"
          style={{
            margin: "1% 0 0 1%"
          }}
        >
          YOUR DETAILS HERE
        </Typography>
        <CustomCardContent>
          <AddressSelect
            addressName={user.address.addressName}
            onSelect={address => this.handleAddressChange(address)}
            style={{
              flex: "0 0 20%",
              marginBottom: "20px",
              width: window.screen.width > 980 ? "20%" : "100%"
            }}
          >
            {!user.address.addressName && (
              <Typography variant="caption" color="primary">
                *fill your address to get yourself on the map
              </Typography>
            )}
          </AddressSelect>
          <FormWrapper>
            <FormControl
              style={{
                marginBottom: "25px",
                flex: "0 0 10%"
              }}
            >
              <InputLabel htmlFor="type">Choose Type</InputLabel>
              <Select
                value={user.type}
                onChange={e => this.handleInputChange(e)}
                inputProps={{
                  id: "type",
                  name: "type"
                }}
              >
                {Object.keys(userTypes).map(key => (
                  <MenuItem value={userTypes[key]} key={userTypes[key]}>
                    {capitalizeFirstLetter(userTypes[key])}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {(user.type === userTypes.WALKER ||
              user.type === userTypes.SITTER) && (
              <React.Fragment>
                <FormControl
                  style={{
                    marginBottom: "25px"
                  }}
                >
                  <InputLabel htmlFor="phone">Phone</InputLabel>
                  <Input
                    type="number"
                    inputProps={{
                      id: "phone",
                      name: "phone"
                    }}
                    value={user.phone}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormControl>

                <FormControl
                  style={{
                    marginBottom: "25px"
                  }}
                >
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    type="text"
                    inputProps={{
                      id: "name",
                      name: "name"
                    }}
                    value={user.name}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormControl>

                <FormControl
                  style={{
                    flex: "0 0 25%"
                  }}
                >
                  <InputLabel htmlFor="about">About yourself</InputLabel>
                  <Input
                    multiline={true}
                    rows={3}
                    inputProps={{
                      id: "about",
                      name: "about"
                    }}
                    value={user.about}
                    onChange={e => this.handleInputChange(e)}
                  />
                </FormControl>
              </React.Fragment>
            )}
          </FormWrapper>
        </CustomCardContent>
      </GridUser>
    );
  }
}
