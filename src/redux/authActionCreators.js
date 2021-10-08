import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (token, userId) => {
    return ({
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    })
}

export const authLoading = isLoading => {
    return ({
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    })
}

export const authFailed = errorMessage => {
    return ({
        type: actionTypes.AUTH_FAILED,
        payload: errorMessage,
    })
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    } else {
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    }

    const API_KEY = 'AIzaSyBNDEEgP5BH7VEh2BrEG_3zmlizkjoFKmk';
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            dispatch(authLoading(false));
            //console.log(err.response.data.error.message);
            dispatch(authFailed(err.response.data.error.message))
        });
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return ({
        type: actionTypes.AUTH_LOGOUT,
    })
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
        }
    }
}
