import { POST_DETAIL_FAIL, POST_DETAIL_REQUEST, POST_DETAIL_SUCCESS } from "../constants/postConstants"
import axios from "axios"
import store from "../store"

// const { id } = useParams()
export const postDetail = (id) => async (dispatch) => {
    try{

        const userInfo = store.getState().userLogin.userInfo;
        const config = {
            headers : { Authorization: `Bearer ${userInfo.token}`}
        }

        dispatch({ type: POST_DETAIL_REQUEST })
        const data  = await axios.get(`/posts/post/${id}/`, config)
        dispatch({ type: POST_DETAIL_SUCCESS, payload:data.data })

    }catch(error){
        dispatch({ type: POST_DETAIL_FAIL , payload:error.response && error.response.data.message ? error.response.data.message: error.message, })
    }
}