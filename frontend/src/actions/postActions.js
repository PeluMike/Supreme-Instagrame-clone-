import { POST_LIST_FAIL, POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_CREATE_FAIL, POST_CREATE_REQUEST, POST_CREATE_SUCCESS, USER_POSTS_FAIL, USER_POSTS_REQUEST, USER_POSTS_SUCCESS, OTHER_USERS_POSTS_FAIL, OTHER_USERS_POSTS_REQUEST, OTHER_USERS_POSTS_SUCCESS, GET_LIKE_FAIL, GET_LIKE_REQUEST, GET_LIKE_SUCCESS, CREATE_LIKE_REQUEST, CREATE_LIKE_SUCCESS, CREATE_LIKE_FAIL, POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL } from "../constants/postConstants"

import axios from "axios"
import store from "../store"

// getting posts apis 
export const listPosts = () => async(dispatch, ) => {
    try {
        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }

        dispatch({ type: POST_LIST_REQUEST })
        const { data } = await axios.get("/posts/", config)
        dispatch({ type: POST_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: POST_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, })
    }
}


// createing post api
export const createPost = (formField) => async(dispatch) => {
    try {

        dispatch({ type: POST_CREATE_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            "/posts/create/post/",
            formField,
            config
        )
        dispatch({ type: POST_CREATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: POST_CREATE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, })
    }
}

// updating post
export const updatePost = (formField, id) => async(dispatch) => {
    try {

        dispatch({ type: POST_CREATE_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/posts/update/${id}/`,
            formField,
            config
        )
        dispatch({ type: POST_CREATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: POST_CREATE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, })
    }
}


// authenticated user posts api
export const postsUser = () => async(dispatch) => {
    try {

        dispatch({ type: USER_POSTS_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            "/posts/userposts/",
            config
        )
        dispatch({ type: USER_POSTS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: USER_POSTS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, })
    }
}


// other user posts
export const postsOtherUsers = (username) => async(dispatch) => {
    try {

        dispatch({ type: OTHER_USERS_POSTS_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/posts/otherusersposts/${username}/`,
            config
        )
        dispatch({ type: OTHER_USERS_POSTS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: OTHER_USERS_POSTS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, })
    }
}



// liking posts
export const likeCreate = (postID, formdata) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_LIKE_REQUEST })
        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/posts/like/${postID}/`,
            formdata,
            config
        )
        dispatch({ type: CREATE_LIKE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_LIKE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, })
    }
}



// getting likes for a post
export const getPostLikes = (postID) => async(dispatch) => {
    try {

        dispatch({ type: GET_LIKE_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/posts/likes/${postID}/`,
            config
        )
        dispatch({ type: GET_LIKE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_LIKE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, })
    }
}