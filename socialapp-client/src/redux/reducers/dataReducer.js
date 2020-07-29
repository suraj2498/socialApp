import { SET_POST, SET_POSTS, LIKE_POST, UNLIKE_POST, 
        LOADING_DATA, DELETE_POST, MAKE_POST, SUBMIT_COMMENT} from '../types';

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
            if(state.post.postId === action.payload.postId)
                state.post = action.payload;
            return{
                ...state
            }

        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments]
                }
            }
        
        case DELETE_POST:
            // Instantly remove the value from the state and display in the UI
            let postIndex = state.posts.findIndex(post => post.postId === action.payload);
            state.posts.splice(postIndex, 1);
            return {
                ...state
            }

        case MAKE_POST: 
        return{
            ...state,
            posts: [
                action.payload,
                ...state.posts
            ]
        }

        default: 
            return {
                ...state
            }
    }
} 