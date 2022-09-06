import {React, useState, useEffect} from 'react'
import Header from '../components/Header'
import '../stylings/Homepage.css'
import '../stylings/PostPage.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import Loader from '../components/Loader'
import Message from '../components/Message'
import ImageSlider from '../components/ImageSlider'
import { setShowHandler, removeShowHandler } from '../components/myFunctions'
import InfoShower from '../components/InfoShower'

import { postDetail } from '../actions/postDetailAction'
import { createComment, getComments } from '../actions/commentActions'
import { getPostLikes, likeCreate } from '../actions/postActions'



function PostPage() {
    const [comment, setComment] = useState('')
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // getting the post from the store 
	const postDetails = useSelector(state => state.postDetails)
	const { error, loading, post} = postDetails

    // getting the post comments from the store 
	const commentList = useSelector(state => state.commentList)
	const {comments} = commentList

    
    // getting user from the store 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    // getting post likes from the store 
    const postLike = useSelector(state => state.postLike)
	const { likes } = postLike

    const [show, setShow]= useState(false)
    useEffect(()=>{
        if(!userInfo){
            navigate('/')
        }else{
            dispatch(postDetail(id))
            dispatch(getComments(id))
            dispatch(getPostLikes(id))
            setShow(false)
        }
    }, [dispatch, navigate, userInfo, id])
   

    // comment data 
    const commentData = new FormData()
    commentData.append('comment', comment)
    const commitSubmutHandler =(e) =>{
        e.preventDefault()
        dispatch(createComment(commentData ,id)).then((response) => {
            dispatch(getComments(id))
            setComment('')
        })
    }


    const createLikeHandler = () =>{
		const formdata = new FormData()
		dispatch(likeCreate(id, formdata)).then(() =>{
            dispatch(getPostLikes(id))
		})
	}
    

  return (
    <div>
        <Header/>
        <div className='home_page_container'>
        <div className='empty'></div>

            {loading?<Loader/>: error?<Message variant='error'>{error}</Message>: 

            <div className='Home_body post_body'>

                <InfoShower id={post.id} show={show} setShow={setShow}/>
                <div className='post_post'>

                    <div className='Poster_details post_user'>
                        <img src={post.Poster_pro} alt="" className='pro_img'/>
                        <Link to ={''}>{post.user}</Link>
                    </div>

                    {/* post image */}
                    <ImageSlider Image={post.picture}/>
                    <div className='buttons Post_common'>
                        <div className='icons' >
                            <Link to={''} onClick={() => createLikeHandler()}><i className={likes&& likes.liked_by_me ===true?"fa-solid fa-heart liked":"far fa-heart"}></i></Link>
                            <Link to={''}><i className="fa-regular fa-message"></i></Link>
                            <Link to={''}><i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                        </div>
                        <div><i className="fa-regular fa-bookmark"></i></div>
                    </div>
                    
                    <p className='count_like Post_common'>{likes&& likes.like} {likes&& likes.like >1? "likes":'like'}</p>
                    <div className='caption_con'>
                        <p className='caption Post_common'>{post.caption}</p>
                    </div>
                    {/* <Link to={''} className='view_comments Post_common'>View all comment</Link> */}
                    <p className='time_posted Post_common'>{post.date_created}</p>
                    
                </div>

                <div className='empty2'></div>

                {/* the user prfofile home page side  */}
                <div className='user_comment'>

                    <div className='iiii'>
                        <div className='post_header'>
                            <div className='Poster_details'>
                                <img src={post.Poster_pro} alt="" className='pro_img'/>
                                <Link to ={''}>{post.user}</Link>
                            </div>
                            <div className='post_dots noselect' ><h3 to={''} onClick={()=>setShowHandler(post.id, show, setShow)} >...</h3></div>
                        </div>
                    </div>
                    
                    {/* comments */}
                    <div className='all_comments'>
                        {
                            comments?
                            (comments).map((comment) =>{
                                return(
                                    <div className='comments' key={comment.id}>
                                        <div className='comment_user'>
                                            <div>
                                                <img src={comment.commemtor_pic} alt="" className='pro_img'/>
                                            </div>
                                            <div>
                                                <p className='comm_user'>{comment.user}</p>
                                            </div>

                                        </div>
                                        <div className='comment'>
                                            <p>{comment.comment}</p>
                                        </div>
                            
                                    </div>
                                )}):<div><br/> <center>No comment Yet</center></div> 
                        }
                        
                    </div>

                    {/* commentinput */}
                    <div className='commentinput'>
                       
                        <input type="text" name="comment" id="" placeholder='add a comment...' value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <button onClick={commitSubmutHandler}>Post</button>
                       
                    </div>
                    <div className='empty2'></div>
                    
                </div>
            </div>
            
            }
            
        </div>
    </div>
  )
}

export default PostPage