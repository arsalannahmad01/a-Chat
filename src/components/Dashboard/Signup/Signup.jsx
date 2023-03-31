import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Dashboard.css";
import "./Signup.css";
import logo from "../../../public/icons/chat-icon-logo.png";
import userIcon from '../../../public/icons/signup-user.png'
import emailIcon from '../../../public/icons/email-icon.png'
import passKeyIcon from '../../../public/icons/password-key.png'
import eyeIcon from '../../../public/icons/eye-icon.png'

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false)
  const [isVisible, setIsvisible] = useState(false)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [isPassMatch, setIsPassMatch] = useState(false)

  const isPasswordMatch = (confirmPassword) => {
    if(password != null && confirmPassword) {
      password != confirmPassword ? setIsPassMatch(true) : setIsPassMatch(false)  
    } else {
      setIsPassMatch(false)
    }
  }

  const handleRegister = async() => {
    const res = await axios.post(`http://localhost:8088/api/v1/user/signup`, {username:name, email:email, password:password})
    localStorage.setItem('user', JSON.stringify(res.data.user))
    localStorage.setItem('token', JSON.stringify(res.data.token))
    navigate('/chat')
  }

  useEffect(() => {
    if(email != null && name != null && isPassMatch === true)
      setIsSubmit(true)

  }, [name, isPassMatch, email])

  // console.log("Name:", name);
  // console.log("Email:", email);
  // console.log("ISPASS:", isPassMatch);

  return (
    <div className="register">
      <div className="dash-header">
        <img src={logo} alt="a-chat" width={50} />
        <div className="dash-header-option">
          <p>About</p>
          <button onClick={() => navigate('/dashboard')} >Dashboard</button>
        </div>
      </div>
      <div className="register-body">
        <div className="register-body-left"></div>
        <div className="register-body-right">
          <div className="signup-form">
            <h4>Register</h4>
           
            <label className="signup-form-details" >
              <img src={userIcon} alt="user" width={30} />
              <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </label>
            
            <label className="signup-form-details" >
              <img src={emailIcon} alt="user" width={30} />
              <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            
            <label className="signup-form-details" >
              <img src={passKeyIcon} alt="user" width={30} />
              <input type="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            
            <label className="signup-form-details" >
              <img src={passKeyIcon} alt="user" width={30} />
              <input type={isVisible ? "text" : "password"} placeholder="Confirm password"  onChange={(e) => isPasswordMatch(e.target.value) }/>
              <img src={eyeIcon} alt="eye" width={30} style={{cursor:"pointer"}} onClick={() => isVisible ? setIsvisible(false) : setIsvisible(true)} />
            </label>
            
            {isPassMatch ? <span style={{color:"red", fontSize:"14px"}} >Password dosen't match</span> : ""}
            {isSubmit ? <button className="signup-form-submit" onClick={handleRegister} >Register</button> : <button className="signup-form-submit-disabled" disabled >Register</button>}
            <p>Already registered? <a onClick={() => navigate('/login')} style={{cursor:"pointer", marginBottom:"20px", color:"blue"}} >Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
