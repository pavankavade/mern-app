import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save To local Storage
      const { token } = res.data;

      //Set token to ls
      localStorage.setItem("jwtToken", token);

      //Set token Auth header
      setAuthToken(token);

      //DEcode token to get user data
      const decoded = jwt_decode(token);

      //SEt current uesr
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log out user

export const logoutUser = () => dispatch => {
  //remove token from localstorage
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requiest
  setAuthToken(false);
  //set the current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
