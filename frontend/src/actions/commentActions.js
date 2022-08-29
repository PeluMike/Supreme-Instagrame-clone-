import { COMMENT_CREATE_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS } from '../constants/commentConstant'
import axios from "axios"
import store from "../store"


export const createComment = (commentData, id) => async (dispatch) => {
    try{

        dispatch({ type: COMMENT_CREATE_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers:{
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const{ data }  = await axios.post(
            `/posts/create/post/${id}/comment/`,
            commentData,
            config
            )
        dispatch({ type: COMMENT_CREATE_SUCCESS, payload:data })

    }catch(error){
        dispatch({ type: COMMENT_CREATE_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}


export const getComments = (id) => async (dispatch) => {
    try{

        dispatch({ type: COMMENT_LIST_REQUEST })

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const{ data }  = await axios.get(
            `/posts/${id}/comments/`,
            config
            )
        dispatch({ type: COMMENT_LIST_SUCCESS, payload:data })

    }catch(error){
        dispatch({ type: COMMENT_LIST_FAIL , payload:error.response && error.response.data.detail ? error.response.data.detail: error.message, })
    }
}