import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ} from '../types';

// Inital state is for the user reducers and will be joined with other inital states via the store
const initialState = {
    loading: false,
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [] 
};

export default (state = initialState, action) => {

    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        
            case SET_UNAUTHENTICATED:
                return initialState;

            case SET_USER: 
                return{ 
                    ...action.payload,
                    authenticated: true,
                    loading: false
                };

            case LOADING_USER: 
                return{
                    ...state,
                    loading:true
                }
            
            case MARK_NOTIFICATIONS_READ:
                state.notifications.forEach(not => not.read = true);
                return {
                    ...state
                }
            
            case LIKE_POST:
                return{
                    ...state,
                    // Adds the info for the user who liked post to likes array
                    likes: [
                        ...state.likes,
                        {
                            userHandle: state.credentials.handle,
                            postId: action.payload.postId
                        }
                    ]
                };
                
            case UNLIKE_POST:
                return {
                    // Filter the likes array and remove user who unliked post
                    ...state,
                    likes: state.likes.filter((like) => like.postId !== action.payload.postId)
                }
            
            default: 
                return {
                    ...state
                };
    }
}