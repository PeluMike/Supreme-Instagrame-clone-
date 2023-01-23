import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams} from 'react-router-dom'

import { updatePost } from '../actions/postActions'
import { postDetail } from '../actions/postDetailAction'

import '../stylings/createPost.css'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'



function UpdatePost() {

    const [caption, setPostCaption] = useState('')
    const [picture, setPostImage] = useState('')
    const [loadImage, setLoadImage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const updatePostReducer = useSelector(state => state.updatePostReducer)
    const {loading, error, postUpdated} = updatePostReducer

    // getting the post info 
    // const postDetails = useSelector(state => state.postDetails)
	// const { post } = postDetails


    // collecting user token
	const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    async function getPostd(){
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const post = await axios.get(`/posts/post/${id}`, config)
        setPostCaption(post.data.caption)
        setLoadImage(post.data.picture)
    }

	useEffect(()=>{
        getPostd()
	}, [dispatch, navigate])

    
    console.log(caption)
    


    const postUpdateButton = async (e) =>{
        e.preventDefault()
        let formField = new FormData()
        if (picture){
            formField.append('picture', picture)
        }else{
            formField.append('picture', loadImage)
        }
       
        formField.append('caption', caption)
        dispatch(updatePost(formField, id)).then((res)=>{
            navigate(`/post/${id}`)
        })
       
    }
    

  return (
    <div>
        <Header/>
        <div className='home_page_container'>
            <div className='empty3'></div>
            {loading && <Loader />}
            {error && <Message variant='error'>{error}</Message>}
                <div className='Creator_container'>
                    <form onSubmit={postUpdateButton} >
                        <textarea name="caption" cols="30" rows="10" className='postForm forms_restyle' placeholder="What's on your mind..." value={caption} onChange={(e) => setPostCaption(e.target.value)}></textarea>

                        <div className='image_container'>
                            <label htmlFor='picture' className='file-label'>Chose image to upload</label>
                            <input type="file" name='picture' id='picture' className='postImage' defaultValue={picture} onChange={(e) => setPostImage(e.target.files[0])} accept='image/*'/>
                            {picture?<span><img src={picture&& URL.createObjectURL(picture)} className={picture? 'image-preview':'' } alt=''/></span>:<span><img src={loadImage} className={'image-preview'} alt=''/></span>}
                        </div>
                        <br/>
                        <button className='post_submit forms_restyle' type='submit'>POST</button>
                       
                    </form>
                    
                </div>

        </div>
    </div>
    
  )
}

export default UpdatePost