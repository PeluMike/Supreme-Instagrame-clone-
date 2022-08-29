import React from 'react'
import {Link} from 'react-router-dom'
import '../stylings/footer.css'
function Footer() {
  return (
    <div>
        <div className='footer_links'>
            <Link to={''}>About</Link>
            
            <Link to={''}>Help</Link>
            
            <Link to={''}>API</Link>
           
            <Link to={''}>Jobs</Link>
            
            <Link to={''}>Terms</Link>
           
            <Link to={''}>Locations</Link>
            
            <Link to={''}>Language</Link>
        </div>
        <div className='copyright'>
           <h1>&copy; Supreme by Pelumi Mike </h1> 
        </div>
        
    </div>
  ) 
}

export default Footer