import { POST_DETAIL_FAIL, POST_DETAIL_REQUEST, POST_DETAIL_SUCCESS } from "../constants/postConstants"


export  const postDetailReducer = ( state = { post:[] }, action) => {
    switch(action.type){
        case POST_DETAIL_REQUEST:
            return { loading:true, post:[] }


        case POST_DETAIL_SUCCESS:
            return { loading:false, post:action.payload }


        case POST_DETAIL_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
} 