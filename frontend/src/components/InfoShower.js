import React from 'react'
import '../stylings/info.css'
import { Link } from 'react-router-dom'
import { setShowHandler, removeShowHandler } from '../utils/myFunctions'

function InfoShower({show, setShow, id}) {
  return (
    <div>
      <div className={'show'} id={id} onClick={()=>removeShowHandler(id, show, setShow)}>
            <i className="fa-solid fa-circle-xmark cross"></i>
            <div className='the_info'>
                <Link to={`/post/${id}`}>View post</Link>
                <Link to={''}>{id}</Link>
                <Link to={''}>Report</Link>
                <Link to={''}>Delete</Link>
                <Link to={''}>Edit</Link>
            </div>
        </div>
  </div>
  )
}

export default InfoShower