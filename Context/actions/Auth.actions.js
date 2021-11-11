import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    axios.post(`${baseURL}user/login`, {
        email: user.email,
        password: user.password,
      })
      .then(function (response) {
        console.log(response)
        if (response.data.data.userEmailAndToken) {
            const token = response.data.data.userEmailAndToken.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
      })
      .catch(function (error) {
        console.log(error);
        logoutUser(dispatch)
      });
};

export const getUserProfile = (email) => {
    fetch(`${baseURL}user/byEmail/${email}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => {});
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}