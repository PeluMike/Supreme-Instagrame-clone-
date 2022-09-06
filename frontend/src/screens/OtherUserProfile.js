import React, { useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'


import { useDispatch, useSelector } from 'react-redux'
import { getOtherUsers, followUser, getUserFollowers } from '../actions/userAction'
import { postsOtherUsers } from '../actions/postActions'


import '../stylings/UserProfile.css'
import Loader from '../components/Loader'
import Message from '../components/Message'


function OtherUserProfile() {
    const otherUsersProfile = useSelector(state => state.otherUsersProfile)
    const {error, otherUsersDetail} = otherUsersProfile


    const otherUserPost = useSelector(state => state.otherUserPost)
    const {Loading, Error, otherUsersPosts} = otherUserPost


    // const userFollow = useSelector(state => state.userFollow)
    // const {follow} = userFollow


    const userFollowerRd = useSelector(state => state.userFollowerRd)
    const {userFollowers} = userFollowerRd


    const dispatch = useDispatch()
    const { username } = useParams()

    useEffect(()=>{
        dispatch(getOtherUsers(username)).then(() =>{
            dispatch(postsOtherUsers(username))
            dispatch(getUserFollowers(username))
        })
    }, [dispatch, username])

    // const openNewTab = (x) =>{
    //     window.open(x)
    // }

    const followUserHandler = () =>{
       dispatch(followUser(username)).then((response) =>{
        dispatch(getUserFollowers(username))
       })
    }


  return (
    <div>
        <Header/>
        <div className='empty'>
        </div>
        <div className='home_page_container'>
            {error?<Message variant='error'>{error}</Message>:
                otherUsersDetail&&
                <div className='profile_container'>
                    {/* user profile  */}
                    <div className='userProfile'>

                        {/* image  */}
                        <div>
                            <img src={otherUsersDetail.profile_picture} alt="" className='pro_img'/>
                        </div>

                        {/* username info */}
                        <div className='all_user_d'>
                            <div className='username_update'>
                                <h2>{otherUsersDetail.username}</h2>
                                <Link to={""} onClick={followUserHandler}>Follow</Link>
                            </div>
                            <div className='Post_follow'>
                                <h5><span>1</span> posts</h5>
                                <h5><span>{userFollowers&& userFollowers.followers_count}</span>{userFollowers&& userFollowers.followers_count > 1? ' followers':' follower'}</h5>
                                <h5><span>{otherUsersDetail.following_count}</span> following</h5>
                            </div>
                            <h3>
                                {otherUsersDetail.first_name && otherUsersDetail.last_name? <span>{otherUsersDetail.first_name} { otherUsersDetail.last_name}</span>  : ''}
                            </h3>
                            <div className='user_bio'>{otherUsersDetail.bio}</div>
                            <Link to={''} className='user_link'>{otherUsersDetail.bio_link}</Link>
                            {userFollowers &&<p>Followed by <span> {userFollowers.followered_by}</span></p>}
                        </div>
                        
                    </div>

                    {/* user posts  */}
                    <div className='pppp'>
                        <center>Posts</center>
                        <br/>
                        <div className='alll_posts'>
                            {Loading? <Loader/>: Error?<Message variant='error'>{error}</Message>:
                                otherUsersPosts&&
                                (otherUsersPosts)?.map((posts, index) =>{
                                    return(
                                        <div key={index}>
                                            <Link to={'/post/' + posts.id} className='profile_post' key={index}>
                                                <img src={posts.picture} alt="" className='post_profile_img'/>
                                            </Link>
                                        
                                        </div>
                                        
                                    )})
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default OtherUserProfile