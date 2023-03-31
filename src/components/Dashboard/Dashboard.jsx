import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Dashboard.css'
import logo from '../../public/icons/chat-icon-logo.png'
import Login from './Login/Login'
import Signup from './Signup/Signup'

const Dashboard = () => {
  const navigate = useNavigate()
  const [loginRegister, setLoginRegister] = useState("register")


  return (
    <div className='dashboard' >
      <div className='dash-header' >
        <img src={logo} alt="a-chat" width={50} />
        <div className='dash-header-option' >
          <p>About</p>
          <button onClick={() => navigate('/login')} >Login</button>
          <button onClick={() => navigate('/register')} >Register</button>
        </div>
      </div>
      <div className='dash-body' >
        <div className='dash-body-left' ></div>
        <div className='dash-body-right' >
        </div>
      </div>
      <div className='dash-footer' ></div>
    </div>
  )
}

export default Dashboard