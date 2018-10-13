import {
    REQUEST_USERS,
    UPDATE_USER,
    RECEIVE_USERS,
    RECEIVE_USER,
    USERS_FAILURE,
    CHANGE_MAP_SETTINGS
} from "../constants/ActionTypes";

const requestUsers = () => ({ type: REQUEST_USERS })
const requestUpdateUser = () => ({ type: UPDATE_USER });
const recieveUsers = users => ({ type: RECEIVE_USERS, users })
const recieveUser = (user, id) => ({ type: RECEIVE_USER, user, id })
const usersFailure = error => ({ type: USERS_FAILURE, error });

export const fetchUsers = firebase => {
    return dispatch => {
        dispatch(requestUsers())
        const usersDbRef = firebase.database().ref("users");
        try{
            usersDbRef.once("value")
            .then(snapshot => {
                dispatch(recieveUsers(snapshot.val()))
            })
        } catch(error){
            dispatch(usersFailure(error))
        }    
    }
}

export const updateUser = (user, id, firebase) => {
    return dispatch => {
        dispatch(requestUpdateUser())
        const userDbRef = firebase.database().ref("users/" + id);
        userDbRef.set({
            ...user
        });
        try {
            userDbRef.once("value")
            .then(snapshot => {
                dispatch(recieveUser(snapshot.val(), id))
            })
        } catch(error){
            dispatch(usersFailure(error))
        }
    }
}

export const changeMapSettings = mapSettings => ({ type: CHANGE_MAP_SETTINGS, mapSettings })