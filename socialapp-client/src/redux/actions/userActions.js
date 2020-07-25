import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_UI });
        // Attempt to login adn store token in local storage as well as put it in req.header
        const res = await axios.post('/login', userData);
        const token = res.data.token;
        setAuthHeader(token);
        
        // Get all the users data who just logged in, clear any errors if made to this point and redirect to home page
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/'); 
    } catch (err) {
        dispatch({ 
            type: SET_ERRORS,
            payload: err.response.data 
        });
    }
}

export const getUserData = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING_USER });
        const res = await axios.get('/user');
        dispatch({
            type: SET_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            response: err.response.data
        })
    }
}

export const registerUser = (newUser, history) => async (dispatch) => {
    try {
        dispatch({type: LOADING_UI});

        // Attempt to register and then store token in local storage and in req.header
        const res = await axios.post('/register', newUser);
        const token = res.data.token;
        setAuthHeader(token);

        // Get the user whyo just registered data and clear any errors if made to this point adn redirect to home page
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
    } catch (err) {
        dispatch({ 
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch ({ type: LOADING_USER });
        await axios.post('/user/image', formData);
        dispatch(getUserData()); // jsut return the user details with the  new image
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}

export const editUserDetails = (userDetails) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_USER });
        await axios.post('/user', userDetails);
        dispatch(getUserData());
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}


// HELPER FUNCTION
const setAuthHeader = (token) => {
    // Store token in header and in teh local storage
    localStorage.setItem('FBToken', `Bearer ${token}`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}