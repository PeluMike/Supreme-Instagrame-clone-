import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../actions/postActions'
import { useNavigate} from 'react-router-dom'


import '../stylings/createPost.css'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'



function CreatPost() {

    const [caption, setPostCaption] = useState('')
    const [picture, setPostImage] = useState('')

    const postCreate = useSelector(store => store.postCreate)
    const {loading, error} = postCreate
    
    const navigate = useNavigate()
    const dispatch = useDispatch()


    // checking if a user is loged in and redirecting
	const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
	useEffect(()=>{
		if (!userInfo){
            navigate('/login/')
        }
	}, [dispatch, navigate, userInfo])


    const postCreateButton = async (e) =>{
        e.preventDefault()
        if (!picture){
            return console.log('You must upload an Image')
        }
        let formField = new FormData()
        formField.append('caption', caption)
        formField.append('picture', picture)
        dispatch(createPost(formField)).then(() =>{
            navigate('/')
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
                    <form onSubmit={postCreateButton} >
                        <textarea name="caption" cols="30" rows="10" className='postForm forms_restyle' placeholder="What's on your mind..." value={caption} onChange={(e) => setPostCaption(e.target.value)}></textarea>

                        <div className='image_container'>
                            <label htmlFor='picture' className='file-label'>Chose image to upload</label>
                            <input type="file" name='picture' id='picture' className='postImage' defaultValue={picture} onChange={(e) => setPostImage(e.target.files[0])} accept='image/*'/>
                            <span><img src={picture? URL.createObjectURL(picture): ''} className={picture? 'image-preview':'' } alt=''/></span>
                        </div>
                        <br/>
                        <button className='post_submit forms_restyle' type='submit'>POST</button>
                       
                    </form>
                    
                </div>

        </div>
    </div>
    
  )
}

export default CreatPost