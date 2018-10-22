import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Icon from "../Icon/Icon";
import Cluster from "../Cluster/Cluster";
import dogPic from "../../assets/dog.png";
import catPic from "../../assets/cat.png";
import housePic from "../../assets/house.png";
import dogWalkerPic from "../../assets/dogwalking.png";
import {
  GridMap,
  CustomFormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  CustomCheckbox,
  Button,
  MapButtonContainer,
  FormControlWrapper
} from "../../styles/styles";
import {
  objectArraysAreEqual,
  objectsAreEqual,
  capitalizeFirstLetter
} from "../../utils/utils";
import supercluster from "points-cluster";
import {
  defaultClusterSettings,
  defaultMapSettings
} from "../../constants/MapSettings";
import * as userTypes from "../../constants/UserTypes";

export default class Map extends Component {
  state = {
    clusters: [],
    dogParks: [],
    show: "all"
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !objectArraysAreEqual(this.props.users, prevProps.users) ||
      !objectsAreEqual(prevProps.mapSettings, this.props.mapSettings)
    ) {
      this.setClusters(this.props.users, this.props.mapSettings);
    }

    if (!objectArraysAreEqual(this.props.dogParks, prevProps.dogParks)) {
      this.setState({
        dogParks: this.props.dogParks
      });
    }
  }

  setClusters(users, settings) {
    const usersWithCoord = users.filter(user => user.address).map(user => ({
      ...user,
      ...user.address
    }));
    this.setState({
      clusters: supercluster(usersWithCoord, defaultClusterSettings)(settings)
    });
  }

  setIconByType(item) {
    switch (item.type) {
      case userTypes.WALKER:
        return dogWalkerPic;
      case userTypes.SITTER:
        return housePic;
      case userTypes.CAT_OWNER:
        return catPic;
      case userTypes.DOG_OWNER:
      default:
        return dogPic;
    }
  }

  handleShowSelect(value) {
    this.setState({
      show: value
    });
  }

  onMapLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
  }

  getClosestPark(userLatLng) {
    let prevDistance;
    return this.props.dogParks.reduce((closest, park) => {
      const parkLatLng = new this.maps.LatLng(park.lat, park.lng);
      let currDistance = this.maps.geometry.spherical.computeDistanceBetween(
        parkLatLng,
        userLatLng
      );
      if (prevDistance && currDistance > prevDistance) {
        return closest;
      } else {
        prevDistance = currDistance;
        return parkLatLng;
      }
    }, {});
  }

  calculateRoute() {
    if (this.props.currentUserAddress) {
      const { lat, lng } = this.props.currentUserAddress;
      const userLatLng = new this.maps.LatLng(lat, lng);

      const closestPark = this.getClosestPark(userLatLng);

      const directionsService = new this.maps.DirectionsService();
      const directionsDisplay = new this.maps.DirectionsRenderer();

      directionsDisplay.setMap(this.map);

      const request = {
        origin: userLatLng,
        destination: closestPark,
        travelMode: "WALKING"
      };
      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(result);
        }
      });
    } else {
      this.props.actions.updateSnackbar({
        open: true,
        message: "you must provide your address for this to work..."
      });
    }
  }

  render() {
    const {
      mapSettings,
      currentUserAddress,
      onHover,
      onHoverOut,
      actions
    } = this.props;
    const { clusters, show, dogParks } = this.state;

    return (
      <GridMap>
        <FormControlWrapper>
          <FormControl component="fieldset">
            <FormLabel component="legend">Show</FormLabel>
            <FormGroup>
              <CustomFormControlLabel
                control={
                  <CustomCheckbox
                    checked={show === "all"}
                    onChange={() => this.handleShowSelect("all")}
                    value="all"
                  />
                }
                label="All"
              />
              {Object.keys(userTypes).map(key => (
                <CustomFormControlLabel
                  control={
                    <CustomCheckbox
                      checked={show === userTypes[key]}
                      onChange={() => this.handleShowSelect(userTypes[key])}
                      value={userTypes[key]}
                    />
                  }
                  label={capitalizeFirstLetter(userTypes[key] + "s")}
                />
              ))}
            </FormGroup>
          </FormControl>
        </FormControlWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }}
          defaultCenter={defaultMapSettings.center}
          center={mapSettings.center}
          defaultZoom={defaultMapSettings.zoom}
          zoom={mapSettings.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}
          onChange={({ center, zoom, bounds, marginBounds }) =>
            actions.changeMapSettings({ zoom, bounds })
          }
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {clusters.map(
            ({ y: lat, x: lng, numPoints, points }) =>
              numPoints === 1 ? (
                points[0].addressName &&
                (show === points[0].type || show === "all") && (
                  <Icon
                    lat={lat}
                    lng={lng}
                    item={points[0]}
                    icon={this.setIconByType(points[0])}
                    key={points[0].id}
                    onHover={hoveredItem => onHover(hoveredItem)}
                    onHoverOut={() => onHoverOut()}
                  />
                )
              ) : (
                <Cluster key={points[0].id} lat={lat} lng={lng}>
                  {numPoints}
                </Cluster>
              )
          )}
        </GoogleMapReact>

        <MapButtonContainer>
          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={dogParks.length <= 0}
            onClick={() => this.calculateRoute()}
          >
            {dogParks.length <= 0
              ? "Loading dog parks..."
              : "Show route to nearest dog park"}
          </Button>
          {dogParks.length > 0 && (
            <span
              style={{
                fontSize: "0.5vw"
              }}
            >
              *only available in Tel-Aviv at the moment
            </span>
          )}
        </MapButtonContainer>
      </GridMap>
    );
  }
}
