import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST } from '../types';
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