import React from "react";
import GoogleMapReact from "google-map-react";
import Icon from "../Icon/Icon";
import dogPic from "../../assets/dog.png";
import dogWalkerPic from "../../assets/dogwalker.png";
import {GridMap} from '../../styles/styles'

const extractUserLocation = (users, currentUser) => {
  const userAddress = users.reduce((location, user) => {
    if(currentUser.uid === user.id){
      return user.address
    } 
  }, {})
  return !!userAddress ? userAddress.coordinates : undefined
}

const extractByType = (type, users) => {
  return users.filter(user => user.type === type)
}

const Map = ({ users, settings, currentUser }) => (
  <GridMap style={{ height: "50vh" }}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }}
      defaultCenter={settings.center}
      center={!!currentUser && users.length > 0 ? extractUserLocation(users, currentUser) : undefined}
      defaultZoom={settings.zoom}
    >
      {extractByType('dog', users).map(dog => (
        dog.address && <Icon lat={dog.address.lat} lng={dog.address.lng} item={dog} icon={dogPic} key={dog.id}/>
      ))}
      {extractByType('walker', users).map(walker => (
        walker.address && <Icon lat={walker.address.lat} lng={walker.address.lng} item={walker} icon={dogWalkerPic} key={walker.id}/>
      ))}
    </GoogleMapReact>
  </GridMap>
);

export default Map;
