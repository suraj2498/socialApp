import { SET_POST, SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, DELETE_POST} from '../types';

const initialState = {
    posts: [],
    post: {},
    loading: false
};

export default (state = initialState, action) => {
    switch(action.type){

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        
        case SET_POSTS: 
            return{
                ...state,
                posts: action.payload,
                loading: false
            }

        case SET_POST:
            return{
                ...state,
                post: action.payload,
                loading:false 
            }
        
        case LIKE_POST:
        case UNLIKE_POST:
            // resetting the corresponding post in the posts array with the new like count
            let index = state.posts.findIndex((post) => post.postId === action.payload.postId);
            state.posts[index] = action.payload;
            return{
                ...state
            }
        
        case DELETE_POST:
            // Instantly remove the value from the state and display in the UI
            let postIndex = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(postIndex, 1);
            return {
                ...state
            }

        default: 
            return {
                ...state
            }
    }
} 