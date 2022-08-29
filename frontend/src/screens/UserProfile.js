import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'


import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../actions/userAction'
import { postsUser } from '../actions/postActions'


import '../stylings/UserProfile.css'
import Loader from '../components/Loader'
import Message from '../components/Message'


function UserProfile() {
    const userProfile = useSelector(state => state.userProfile)
    const {error, userDetail} = userProfile

    const userPost = useSelector(state => state.userPost)
    const {loading, Error, userPosts} = userPost

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUser()).then(() =>{
            dispatch(postsUser())
        })
        
    }, [dispatch])

  return (
    <div>
        <Header/>
        <div className='empty'>
        </div>
        <div className='home_page_container'>
            { error?<Message variant='error'>{error}</Message>:
                userDetail &&
                <div className='profile_container'>
                    {/* user profile  */}
                    <div className='userProfile'>

                        {/* image  */}
                        <div>
                            <img src={userDetail.profile_picture} alt="" className='pro_img'/>
                        </div>

                        {/* username info */}
                        <div className='all_user_d'>
                            <div className='username_update'>
                                <h2>{userDetail.username}</h2>
                                <Link to={"/user/profile/update/"}>Update Profile</Link>
                            </div>
                            <div className='Post_follow'>
                                <h5><span>{userDetail.post_count}</span> posts</h5>
                                <h5><span>{userDetail.followers_count}</span>{userDetail?.followers_count > 1? ' followers':' follower'}</h5>
                                <h5><span>{userDetail.following_count}</span> following</h5>
                            </div>
                            <h3>
                                {userDetail.first_name && userDetail.last_name? <span>{userDetail?.first_name} { userDetail.last_name}</span>  : ''}
                            </h3>
                            <div className='user_bio'>{userDetail.bio}</div>
                            <Link to={''} className='user_link'>{userDetail?.bio_link}</Link>
                            <p>Followed by <span>pelumi, oludamsam</span></p>
                        </div>
                        
                    </div>

                    {/* user posts  */}
                    <div className='pppp'>
                        <center>Posts</center>
                        <br/>
                            <div className='alll_posts'>
                                {loading? <Loader/>: Error?<Message variant='error'>{Error}</Message>:
                                    userPosts?
                                    (userPosts).map((posts, index) =>{
                                        return(
                                            
                                            <div key={index}>
                                                <Link to={'/post/' + posts.id} className='profile_post' >
                                                    <img src={posts.picture} alt="" className='post_profile_img'/>
                                                </Link>
                                            </div>
                                        
                                            
                                        )}): <div>No post yet</div>}
                            </div>
                           
                        
                        
                    </div>
                </div>
            
            }

            

        </div>
    </div>
  )
}

export default UserProfile