import React from "react";
import GoogleMapReact from "google-map-react";
import Icon from "../Icon/Icon";
import dogPic from "../../assets/dog.png";
import dogWalkerPic from "../../assets/dogwalking.png";
import { GridMap } from '../../styles/styles'
import {OWNER, WALKER} from '../../constants/UserTypes'
import { isEmpty } from '../../utils/utils'

const extractUserLocation = (users, currentUser) => {
  const userAddress = users.reduce((location, user) => {
    if (currentUser.uid === user.id) {
      location = user.address
    }
    return location
  }, {})
  return !isEmpty(userAddress) ? {lat: userAddress.lat, lng: userAddress.lng} : undefined
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
      icon={item.type && item.type === "walker" ? dogWalkerPic :dogPic}
      key={item.id}
      onHover={hoveredItem => onHover(hoveredItem)}
      onHoverOut={() => onHoverOut()}
    />
  ))
}

const Map = ({ users, settings, currentUser, onHover, onHoverOut }) => (
  <GridMap>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }}
      defaultCenter={settings.center}
      center={!!currentUser && users.length > 0 ? extractUserLocation(users, currentUser) : undefined}
      defaultZoom={settings.zoom}
    >
      {
        renderByType(OWNER, users, onHover, onHoverOut)
      }
      {
        renderByType(WALKER, users, onHover, onHoverOut)
      }
    </GoogleMapReact>
  </GridMap>
);

export default Map;
