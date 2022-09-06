import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, OTHER_USERS_DETAIL_FAIL, OTHER_USERS_DETAIL_REQUEST, OTHER_USERS_DETAIL_SUCCESS, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL, GETUSER_FOLLOWERS_REQUEST, GETUSER_FOLLOWERS_SUCCESS, GETUSER_FOLLOWERS_FAIL } from '../constants/userConstants'
import axios from "axios"
import store from "../store"


export const login = (username, password) => async (dispatch) => {
    try{
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const{ data }  = await axios.post(
            "/user/login/",
            {'username': username, 'password': password},
            config
            )
        dispatch({ type: USER_LOGIN_SUCCESS, payload:data })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({ type: USER_LOGIN_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}

export const logout = () => async (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({ type:USER_LOGOUT })

}


export const register = (username, email, password) => async (dispatch) => {
    try{

        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
            
        }

        const{ data }  = await axios.post(
            "/user/register/",
            {'username': username,'email':email, 'password': password},
            config
            )
        dispatch({ type: USER_REGISTER_SUCCESS, payload:data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload:data })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({ type: USER_REGISTER_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}


// user detail action  action 
export const getUser = () => async (dispatch) => {
    try{
        dispatch({ type: USER_DETAIL_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers : { Authorization: `Bearer ${userInfo.token}`}
        }

        const{ data }  = await axios.get("/user/profile/",config)
        dispatch({ type: USER_DETAIL_SUCCESS, payload:data })

    }catch(error){
        dispatch({ type: USER_DETAIL_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}


// other users detail action  action 
export const getOtherUsers = (username) => async (dispatch) => {
    try{

        dispatch({ type: OTHER_USERS_DETAIL_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers : { Authorization: `Bearer ${userInfo.token}`}
        }

        const{ data }  = await axios.get(`/user/profile/${username}`,config)
        dispatch({ type: OTHER_USERS_DETAIL_SUCCESS, payload:data })

    }catch(error){
        dispatch({ type: OTHER_USERS_DETAIL_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}


// follow and unfollow user action 
export const followUser = (username, formdata) => async (dispatch) => {
    try{

        dispatch({ type: FOLLOW_USER_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers : { Authorization: `Bearer ${userInfo.token}`}
        }

        const{ data }  = await axios.post(`/user/follow/${username}/`,formdata, config)
        dispatch({ type: FOLLOW_USER_SUCCESS, payload:data })

    }catch(error){
        dispatch({ type: FOLLOW_USER_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}


// user followers action 
export const getUserFollowers = (username) => async (dispatch) => {
    try{
        dispatch({ type: GETUSER_FOLLOWERS_REQUEST })
        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers : { Authorization: `Bearer ${userInfo.token}`}
        }

        const{ data }  = await axios.get(`/user/followers/${username}/`, config)
        dispatch({ type: GETUSER_FOLLOWERS_SUCCESS, payload:data })

    }catch(error){
        dispatch({ type: GETUSER_FOLLOWERS_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}