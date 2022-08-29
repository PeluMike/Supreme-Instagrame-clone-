import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate} from 'react-router-dom'


import Logospiner from '../components/Logospiner'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userAction'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const location = useLocation()
    const redirect = location.search?location.search.split('=')[1]:'/'
    const navigate = useNavigate()

   
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo} = userLogin
    useEffect(() =>{
        if (userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler =  (e) =>{
        e.preventDefault()
        dispatch(login(username, password))
    }

  return (
    <div className='Camp'>

        <div className='Form'></div>
        <Logospiner/>

        {loading && <Loader />}
        {error && <Message variant='error'>{error}</Message>}
        <div className='Form-container'>
            <form onSubmit={submitHandler}>
                <div id='all'>
                    <div>
                        <h1>Sign in</h1>
                        <p className='hh'>Please fill the form to login your account</p>
                    </div>
                
                    <div className='username'>
                        <label htmlFor="Username">Username</label>
                        <br />
                        <input type="text" placeholder='Enter your username...' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <br />

                    
                    <div className='password'>
                        <label htmlFor="Password">Password</label>
                        <br />
                        <input type="password" placeholder='Enter your password...' autoComplete='' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <br />
                    
                    <button type='submit'>Sign Up</button>
                    <p className='_d_'>Don't have an account? <Link to={redirect?`/register?redirect=${redirect}`:'/register/'} className='sign_link'>Register here</Link></p>
                </div>
            </form>
            
        </div>
    
    </div>
  )
}

export default Login