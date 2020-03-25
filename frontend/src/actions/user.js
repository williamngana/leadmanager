import axios from 'axios';
import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOADED_USER,
    LOADING_USER,
    AUTH_ERROR 
} from './types';

//REGISTER USER
export const registerUser = ({ username, password, email }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });
    axios.post("/api/auth/register", body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
      dispatch({
          type: REGISTER_FAIL
      })
    });
};

//LOGIN USER
export const loginUser = ({ username, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ username, password });
    axios.post("/api/auth/login", body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type:LOGIN_FAIL
        })
      });
};

//LOGOUT USER
export const logoutUser = () => (dispatch, getState)  => {
    axios.post("/api/auth/logout/", null, tokenConfig(getState))
    .then(res => {
      dispatch({ type: 'CLEAR_LEADS' });
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
        dispatch({
            type: LOGOUT_FAIL
        })
    });
};
//LOAD THE USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: LOADING_USER });
  
    axios.get("/api/auth/user", tokenConfig(getState))
      .then(res => {
        dispatch({
          type: LOADED_USER,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
            type: AUTH_ERROR,
        })
      });
};

  export const tokenConfig = getState => {
    // Get token from state
    const token = getState().user.token;
  
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
  
    return config;
  };