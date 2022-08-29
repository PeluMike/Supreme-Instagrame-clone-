import { USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, OTHER_USERS_DETAIL_FAIL, OTHER_USERS_DETAIL_REQUEST, OTHER_USERS_DETAIL_SUCCESS, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAIL, GETUSER_FOLLOWERS_REQUEST, GETUSER_FOLLOWERS_SUCCESS, GETUSER_FOLLOWERS_FAIL } from '../constants/userConstants'

export  const userLoginReducer = ( state = { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading:true }


        case USER_LOGIN_SUCCESS:
            return { loading:false, userInfo:action.payload }


        case USER_LOGIN_FAIL:
            return { loading:false, error:action.payload }


        case USER_LOGOUT:
            return {}

        default:
            return state 
    }
} 


// REGISTER REDUCER 
export  const userRegisterReducer = ( state = { }, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading:true }


        case USER_REGISTER_SUCCESS:
            return { loading:false, userInfo:action.payload }


        case USER_REGISTER_FAIL:
            return { loading:false, error:action.payload }


        case USER_LOGOUT:
            return {}

        default:
            return state 
    }
} 


// user details 
export  const userDetailReducer = ( state = {userDetail:[]}, action) => {
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return { loading:true }


        case USER_DETAIL_SUCCESS:
            return { loading:false, userDetail:action.payload }


        case USER_DETAIL_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
} 


// OTHER USERS 
export  const otherUsersDetailReducer = ( state = {otherUsersDetail:[]}, action) => {
    switch(action.type){
        case OTHER_USERS_DETAIL_REQUEST:
            return { loading:true }


        case OTHER_USERS_DETAIL_SUCCESS:
            return { loading:false, otherUsersDetail:action.payload }


        case OTHER_USERS_DETAIL_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
}


// FOLLOW AND UNFOLLOW
export  const FollowUserReducer = ( state = { }, action) => {
    switch(action.type){
        case FOLLOW_USER_REQUEST:
            return { loading:true }


        case FOLLOW_USER_SUCCESS:
            return { loading:false, follow:action.payload }


        case FOLLOW_USER_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
}


// FOLLOW AND UNFOLLOW
export  const GetUserFollowerReducer = ( state = {userFollowers:[] }, action) => {
    switch(action.type){
        case GETUSER_FOLLOWERS_REQUEST:
            return { loading:true }


        case GETUSER_FOLLOWERS_SUCCESS:
            return { loading:false, userFollowers:action.payload }


        case GETUSER_FOLLOWERS_FAIL:
            return { loading:false, error:action.payload }

        default:
            return state 
    }
}