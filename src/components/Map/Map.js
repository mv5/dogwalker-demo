import React from "react";
import GoogleMapReact from "google-map-react";
import Icon from "../Icon/Icon";
import dogPic from "../../assets/dog.png";
import dogWalkerPic from "../../assets/dogwalking.png";
import { GridMap } from '../../styles/styles'
import * as types from '../../constants/UserTypes'

const extractUserLocation = (users, currentUser) => {
  const userAddress = users.reduce((location, user) => {
    if (currentUser.uid === user.id) {
      return user.address
    }
  }, {})
  return !!userAddress ? {lat: userAddress.lat, lng: userAddress.lng} : undefined
}

const extractByType = (type, users) => {
  return users.filter(user => user.type === type)
}

const Map = ({ users, settings, currentUser, onHover }) => (
  <GridMap>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }}
      defaultCenter={settings.center}
      center={!!currentUser && users.length > 0 ? extractUserLocation(users, currentUser) : undefined}
      defaultZoom={settings.zoom}
    >
      {extractByType(types.OWNER, users).map(owner => (
        owner.address &&
        <Icon
          lat={owner.address.lat}
          lng={owner.address.lng}
          item={owner} 
          icon={dogPic}
          key={owner.id}
          onHover={item => onHover(item)}
        />
      ))}
      {extractByType(types.WALKER, users).map(walker => (
        walker.address &&
        <Icon
          lat={walker.address.lat}
          lng={walker.address.lng}
          item={walker}
          icon={dogWalkerPic}
          key={walker.id}
          onHover={item => onHover(item)}
        />
      ))}
    </GoogleMapReact>
  </GridMap>
);

export default Map;
