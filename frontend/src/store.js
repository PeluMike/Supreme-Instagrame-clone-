import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { postReducer, createPostReducer, userPostsReducer, otherUsersPostsReducer, likeReducer, createLikeReducer } from './reducers/postReducer'
import { postDetailReducer } from './reducers/postDetailsReducer'
import { userLoginReducer, userRegisterReducer, userDetailReducer, otherUsersDetailReducer, FollowUserReducer, GetUserFollowerReducer } from './reducers/userReducer'
import { createCommentReducer, CommentListReducer } from './reducers/commentReducer'

const reducer = combineReducers({
    postList:postReducer,
    postDetails:postDetailReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    postCreate: createPostReducer,
    userProfile: userDetailReducer,
    commentCreate: createCommentReducer,
    commentList: CommentListReducer,
    otherUsersProfile: otherUsersDetailReducer,
    userPost: userPostsReducer,
    otherUserPost: otherUsersPostsReducer,
    postLike: likeReducer,
    createLike: createLikeReducer,
    userFollow: FollowUserReducer,
    userFollowerRd: GetUserFollowerReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleWare = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))


export default store