import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Icon from "../Icon/Icon";
import Cluster from "../Cluster/Cluster"
import dogPic from "../../assets/dog.png";
import dogWalkerPic from "../../assets/dogwalking.png";
import { GridMap, FormControlLabel, FormGroup, FormLabel, FormControl, Checkbox } from '../../styles/styles'
import { isEmpty, objectArraysAreEqual, objectsAreEqual, capitalizeFirstLetter } from '../../utils/utils'
import supercluster from 'points-cluster';
import { defaultClusterSettings, defaultMapSettings } from '../../constants/MapSettings'
import * as userTypes from '../../constants/UserTypes'

export default class Map extends Component {
  state = {
    clusters: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (!objectArraysAreEqual(this.props.users, prevProps.users) ||
        !objectsAreEqual(prevProps.settings, this.props.settings)) {
      this.setClusters(this.props.users, this.props.settings)
    }
  }

  setClusters(users, settings) {
    const usersWithCoord = users.map(user => ({
      ...user,
      ...user.address
    }))
    this.setState({
      clusters: supercluster(usersWithCoord, defaultClusterSettings)(settings)
    })
  }

  extractUserLocation(users, currentUser) {
    const userAddress = users.reduce((location, user) => {
      if (currentUser.uid === user.id) {
        location = user.address
      }
      return location
    }, {})
    return !isEmpty(userAddress) ? { lat: userAddress.lat, lng: userAddress.lng } : undefined
  }

  render() {
    const { users, settings, currentUser, onSelect, show, onHover, onHoverOut, actions } = this.props
    const { clusters } = this.state

    return (
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
            {Object.keys(userTypes).map(key => 
              <FormControlLabel
              control={
                <Checkbox checked={show === userTypes[key]} onChange={() => onSelect(userTypes[key])} value={userTypes[key]} />
              }
              label={capitalizeFirstLetter(userTypes[key] + 's')}
            />
            )}
          </FormGroup>
        </FormControl>

        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }}
          defaultCenter={defaultMapSettings.center}
          center={users.length > 0 ? this.extractUserLocation(users, currentUser) : undefined}
          defaultZoom={defaultMapSettings.zoom}
          zoom={settings.zoom}
          onChange={({ center, zoom, bounds, marginBounds }) => actions.changeMapSettings({zoom, bounds})}
        >
          {clusters.map(({ y: lat, x: lng, numPoints, points }) => (
                numPoints === 1
                  ?
                  points[0].addressName && (show === points[0].type || show === "all") &&
                  <Icon
                    lat={lat}
                    lng={lng}
                    item={points[0]}
                    icon={points[0].type === userTypes.WALKER ? dogWalkerPic : dogPic}
                    key={points[0].id}
                    onHover={hoveredItem => onHover(hoveredItem)}
                    onHoverOut={() => onHoverOut()}
                  />
                  :
                  <Cluster
                    key={points[0].id}
                    lat={lat}
                    lng={lng}
                  >
                    {numPoints}
                  </Cluster>
              ))
          }
        </GoogleMapReact>
      </GridMap>
    )
  }
}

