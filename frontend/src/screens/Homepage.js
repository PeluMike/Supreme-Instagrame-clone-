import {React, useEffect, useState }from 'react'

import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import '../stylings/Homepage.css'
import ImageSlider from '../components/ImageSlider'
import Footer from '../components/Footer'
import InfoShower from '../components/InfoShower'
import { setShowHandler, removeShowHandler } from '../components/myFunctions'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'


import { listPosts, likeCreate,getPostLikes  } from '../actions/postActions'
import { getUser } from '../actions/userAction'


function Homepage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const postList = useSelector(state => state.postList)
	const { error, loading, posts} = postList

	
	// checking if a user is loged in and redirecting
	const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

	// user info 
	const  userProfile = useSelector(state => state.userProfile)
	const {userDetail} = userProfile


	// getting post likes from the store 
    const postLike = useSelector(state => state.postLike)
	const { likes } = postLike


	const [show, setShow]= useState(false)
	useEffect(() =>{
		if (!userInfo){
            navigate('/login/')
        }else{
			dispatch(listPosts())
			dispatch(getUser())

		}
		setShow(false)
	}, [dispatch, navigate, userInfo])

	const getLikeHandler = (postId) =>{
		dispatch(getPostLikes(postId))
	}
	
	const createLikeHandler = (postID) =>{
		const formdata = new FormData()
		dispatch(likeCreate(postID, formdata)).then(() =>{
			dispatch(listPosts())
		})
	}


	
	// console.log(show)

  return (
    <div>
		<Header/>
      	<div className='home_page_container just_homePage'>
			<div className='empty'></div>

			<div className='Home_body'>
			{loading? <Loader />:
				error?<Message variant='error'>{error}</Message>:
				posts&&
				<div className='pos'>
					{/* {console.log(posts[1].id)} */}
					{posts.map((post, index) => (
						<div className='post post_bb' key={post.id} >

							<InfoShower id={post.id} show={show} setShow={setShow}/>
							
							<div className='post_header'>
								<div className='Poster_details'>
									<img src={post.Poster_pro} alt="" className='pro_img'/>
									<Link to={post.posted_by_me?'/user/profile/': `/user/profile/${post.user}`}>{post.user}</Link>
								</div>
								<div className='post_dots noselect'><h3 to={''} onClick={()=>setShowHandler(post.id, show, setShow)}>...</h3></div>
							</div>

							{/* post image */}
							<ImageSlider Image={post.picture}/>

							{/* icons  */}
							<div className='buttons Post_common'>
								<div className='icons' >
									<Link  to={''} onClick={() => createLikeHandler(post.id)}><i className={post.liked_by_me ===true?"fa-solid fa-heart liked":"far fa-heart"}></i></Link>
									<Link to={`/post/${post.id}`}><i className="fa-regular fa-message"></i></Link>
									<Link to={''}><i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
								</div>
								<div><i className="fa-regular fa-bookmark"></i></div>
							</div>
							
							<p className='count_like Post_common'> 
								{post.liked_by_me?`Liked by you and ${post.like -1} others`:post.like === 1? `${post.like} like`: `${post.like} likes` }
							</p>
							<div className='caption_con'>
								<p className='caption Post_common'>{post.caption}</p>
							</div>
							<Link to={`/post/${post.id}`} className='view_comments Post_common'>{post.post_comments_count === 0? 'No comment. Be the first':post.post_comments_count === 1? `View ${ post.post_comments_count } comment`: `View all ${ post.post_comments_count } comments`}</Link>
							<p className='time_posted Post_common'>{post.date_created}</p>
						</div>
					))}
				</div>
			}
				{/* the user prfofile home page side  */}
				
				<div className='user_home_profile'>
				<div className='user_profile'>
					<img src={userDetail&& userDetail.profile_picture} alt="" className='pro_img'/>
					<div className='usernames'>
					<Link to={''} className='usernames_h3'>{userDetail&& userDetail.username}</Link>
					<h3 className='ii usernames_h3'>{userDetail&& userDetail.first_name} {userDetail&& userDetail.last_name}</h3>
					</div>
					
				</div>
				{/* sugestions follow  */}
				<div className='sugesstion_follow'>
					<h3>Sugesstion for you</h3>
					<div className='user_sugesstions'>
						<img src={process.env.PUBLIC_URL +'/weblogo.png '} alt="" className='pro_img'/>
						<Link to={''} className='usernames_h3'>Pelumike</Link>
					</div>
				</div> 
				<div className='post_footer'>
					<Footer/>
				</div>

				</div>
			</div>
			
      	</div>
    </div>
  )
}

export default Homepage