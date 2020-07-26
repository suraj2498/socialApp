import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, LOADING_UI, MAKE_POST,
         SET_ERRORS, CLEAR_ERRORS, SET_POST, STOP_LOADING_UI } from '../types';
import axios from 'axios';

// Get all posts
export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING_DATA});
        const res = await axios.get('/posts'); 
        dispatch({
            type: SET_POSTS,
            payload: res.data
        });  
    } catch (err) {
        dispatch({
            type: SET_POSTS,
            payload: []
        });
    }
}

// Make a post
export const makePost = (newPost) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_UI });
        const res = await axios.post('/posts', newPost);
        dispatch({
            type: MAKE_POST,
            payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS});   
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getPost = (postId) => async (dispatch) => {
    try {
        dispatch({ type: LOADING_UI });
        const res = await axios.get(`/posts/${postId}`);
        dispatch({
            type: SET_POST,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });  
    } catch (err) {
        console.error(err);
    }
}

// Like a post
export const likePost = (postId) => async (dispatch) => {
    try {
        const res = await axios.get(`/posts/${postId}/like`);
        dispatch({
            type: LIKE_POST,
            payload: res.data
        });   
    } catch (err) {
        console.error(err.response.data);
    }
}

// Unlike a post
export const unlikePost = (postId) => async (dispatch) => {
    try {
        const res = await axios.get(`/posts/${postId}/unlike`);
        dispatch({
            type: UNLIKE_POST,
            payload: res.data
        });   
    } catch (err) {
        console.error(err.response.data);
    }
}

// Delete a post
export const deletePost = (postId) => async (dispatch) => {
    try {
        await axios.delete(`/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
    } catch (err) {
        console.error(err);
    }
}