import React from 'react'
import '../stylings/UpdateProfile.css'
import Header from '../components/Header'
import {Link} from 'react-router-dom'
// import Footer from '../components/Footer'

function UpdateProfile() {
  return (
    <div>
        <div>
            <Header/>
            <div className='edit_profile_container'>
                
                <div className='update_container'>
                    <div className='edit_links'>
                        <div>
                            <Link to={""} className="active">Edit Profile</Link>
                        </div>
                        <div>
                            <Link to={""}>Change Password</Link>
                        </div>
                    </div>
                    <div className='links_content'>
                        <div className='edit_profile'>
                            {/* profile img  */}
                            <div className='the_form'>
                                <label htmlFor="file">Profile Image</label>
                                
                                <input type="file" name='profile_img'/>
                            </div>
                           
                            {/* first name */}
                            <div className='the_form'>
                                <label htmlFor="text">First Name</label>
                                <input type="text" name='firstName'/>
                            </div>

                            {/* last name */}

                            <div className='the_form'>
                                <label htmlFor="text">Last Name</label>
                                <input type="text" name='lastName'/>
                            </div>
                            
                            {/* website */}
                            <div className='the_form'>
                                <label htmlFor="text">Website Link</label>
                                <input type="link" name='website'/>
                            </div>

                            {/* website */}
                            <div className='the_form'>
                                <div><label htmlFor="text">Bio</label></div>
                                <textarea name='bio'/>
                            </div>
                           
                            {/* website */}

                            <div className='the_form'>
                                <label htmlFor="number">Phone number</label>
                                <input type="number" name='number'/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                

            </div>
            

        </div>
    </div>
  )
}

export default UpdateProfile