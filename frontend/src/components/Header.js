import React from 'react'
import '../stylings/navbar.css'
import Logospiner from './Logospiner'
import {Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { logout} from '../actions/userAction'



function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
    const logOutHandler = () =>{
        dispatch(logout())
        navigate('/login/')

    }

  return (
    <div className='header'>
        <div className='nav-conatainer'>
            <div className='nav_logo_name'>
                <div className='nav_logo'>
                <Logospiner/>
                </div>
                <div><h3>Supreme</h3></div>
                
            </div>
           
            
            <nav>
                <ul className='nav_tags'>
                    <li><Link to="/home/">Home</Link></li>
                    <li><Link to="/post/create/">Create Post</Link></li>
                    <li><Link to="/user/profile/">Your Profile</Link></li>
                    <li><Link to="">Notification</Link></li>
                </ul>

                <ul className='nav_tags_icon'>
                    <li><Link to="/home/"><i className="fa-solid fa-house"></i></Link></li>
                    <li><Link to="/post/create/"><i className="fa-solid fa-plus"></i></Link></li>
                    <li><Link to="/user/profile/"><i className="fa-solid fa-user"></i></Link></li>
                    <li><Link to=""><i className="fa-solid fa-bell"></i></Link></li>
                </ul>
            </nav>
            <div className='nav-user-profile'>
                <div><img src={userInfo && userInfo.profile_picture} alt="" width={'70px'}/></div>
                <div className='user_nav_profile'> <Link to={'/user/profile/'}>{userInfo && userInfo.username}</Link></div>
                {userInfo? <div><button onClick={logOutHandler}>Logout</button></div>: ''}
                
            </div>
        </div>
        
    </div>
  )
}

export default Header