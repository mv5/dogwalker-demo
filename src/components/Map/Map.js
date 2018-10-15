import React from "react";
import GoogleMapReact from "google-map-react";
import Icon from "../Icon/Icon";
import dogPic from "../../assets/dog.png";
import dogWalkerPic from "../../assets/dogwalking.png";
import { GridMap, FormControlLabel, FormGroup, FormLabel, FormControl, Checkbox } from '../../styles/styles'
import { OWNER, WALKER } from '../../constants/UserTypes'
import { isEmpty } from '../../utils/utils'

const extractUserLocation = (users, currentUser) => {
  const userAddress = users.reduce((location, user) => {
    if (currentUser.uid === user.id) {
      location = user.address
    }
    return location
  }, {})
  return !isEmpty(userAddress) ? { lat: userAddress.lat, lng: userAddress.lng } : undefined
}

const extractByType = (type, users) => {
  return users.filter(user => user.type === type)
}

const renderByType = (type, users, onHover, onHoverOut) => {
  return extractByType(type, users).map(item => (
    item.address &&
    <Icon
      lat={item.address.lat}
      lng={item.address.lng}
      item={item}
      icon={item.type && item.type === "walker" ? dogWalkerPic : dogPic}
      key={item.id}
      onHover={hoveredItem => onHover(hoveredItem)}
      onHoverOut={() => onHoverOut()}
    />
  ))
}

const Map = ({ users, settings, currentUser, onHover, onHoverOut, onSelect, show }) => (
  <GridMap>
    <FormControl
      component="fieldset"
      style={{
        position: "absolute",
        zIndex: "9999",
        top: "5%",
        left: "5%",
      }}
    >
      <FormLabel component="legend">Show</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={show === "all"} onChange={() => onSelect('all')} value="all" />
          }
          label="All"
        />
        <FormControlLabel
          control={
            <Checkbox checked={show === "dogs"} onChange={() => onSelect('dogs')} value="dogs" />
          }
          label="Dogs"
        />
        <FormControlLabel
          control={
            <Checkbox checked={show === "walkers"} onChange={() => onSelect('walkers')} value="walkers" />
          }
          label="Walkers"
        />
      </FormGroup>
    </FormControl>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }}
      defaultCenter={settings.center}
      center={!!currentUser && users.length > 0 ? extractUserLocation(users, currentUser) : undefined}
      defaultZoom={settings.zoom}
    >
      {(show === "dogs" || show === "all") &&
        renderByType(OWNER, users, onHover, onHoverOut)
      }
      {(show === "walkers" || show === "all") &&
        renderByType(WALKER, users, onHover, onHoverOut)
      }
    </GoogleMapReact>
  </GridMap>
);

export default Map;
