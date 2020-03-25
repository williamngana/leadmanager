import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOADED_USER,
    LOADING_USER,
    AUTH_ERROR } 
    from '../actions/types.js';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case LOADING_USER:
            return {
                ...state,
                isLoading: true
            };
        case LOADED_USER:
            return {
                ...state,
                isAuthenticated:true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:    
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false            
                
            };
        default:
            return state;
    }
}