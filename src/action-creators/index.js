import {
  REQUEST_USERS,
  UPDATE_USER,
  RECEIVE_USERS,
  RECEIVE_USER,
  USERS_FAILURE,
  CHANGE_MAP_SETTINGS,
  RECEIVE_DOG_PARKS
} from "../constants/ActionTypes";

import { DOG_PARKS_URL } from "../constants/FirebaseUrls"

const requestUsers = () => ({ type: REQUEST_USERS });
const requestUpdateUser = () => ({ type: UPDATE_USER });
const recieveUsers = users => ({ type: RECEIVE_USERS, users });
const recieveUser = (user, id) => ({ type: RECEIVE_USER, user, id });
const usersFailure = error => ({ type: USERS_FAILURE, error });
const recieveDogParks = dogParks => ({ type: RECEIVE_DOG_PARKS, dogParks })

export const fetchDogParks = (fetch) => {
  return async dispatch => {
    try {
      const response = await fetch(DOG_PARKS_URL)
      const body = await response.json()
      const dogParks = body.map(locationString => {
        const coordsArray = locationString.split(":")[1].split(",")
        return{
          lat: Number(coordsArray[0]),
          lng: Number(coordsArray[1])
        }
      })
      dispatch(recieveDogParks(dogParks))
    } catch (error){
      console.log('error is ', error)
    }  
  }
}

export const fetchUsers = firebase => {
  return dispatch => {
    dispatch(requestUsers());
    const usersDbRef = firebase.database().ref("users");
    try {
      usersDbRef.once("value").then(snapshot => {
        dispatch(recieveUsers(snapshot.val()));
      });
    } catch (error) {
      dispatch(usersFailure(error));
    }
  };
};

export const updateUser = (user, id, firebase) => {
  return dispatch => {
    dispatch(requestUpdateUser());
    const userDbRef = firebase.database().ref("users/" + id);
    try {
      userDbRef.set({
        ...user
      });

      userDbRef.once("value").then(snapshot => {
        dispatch(recieveUser(snapshot.val(), id));
      });
    } catch (error) {
      dispatch(usersFailure(error));
    }
  };
};

export const changeMapSettings = mapSettings => ({
  type: CHANGE_MAP_SETTINGS,
  mapSettings
});

