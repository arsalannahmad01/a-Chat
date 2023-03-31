import React, { useEffect, useState } from "react";
import "./Header.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios'
import logo from "../../../public/icons/chat-icon-logo.png";
import pic from "../../../public/images/profile.jpg";
import profileIcon from "../../../public/icons/profile-icon.png";
import signoutIcon from "../../../public/icons/signout-icon.png";
import cameraIcon from '../../../public/icons/camera.png'
import DProfile from "../../../public/icons/profile-icon.png";
import {storage} from '../../../actions/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'


const Main = () => {

  const token = JSON.parse(localStorage.getItem('token'))

  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [displayProfile, setDisplayProfile] = useState(false);
  const [displayProfileDetails, setDisplayProfileDetails] = useState(false);
  const [left, setLeft] = useState(window.innerWidth - 100);
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setLeft(window.innerWidth - window.innerWidth);
  }, [window.innerWidth]);

  function profileOptionDisplay() {
    displayProfileDetails
      ? setDisplayProfileDetails(false)
      : setDisplayProfileDetails(false);
    displayProfile ? setDisplayProfile(false) : setDisplayProfile(true);
  }

  function profileDetailsDisplay() {
    displayProfileDetails
      ? setDisplayProfileDetails(false)
      : setDisplayProfileDetails(true);
    displayProfile ? setDisplayProfile(false) : setDisplayProfile(true);
  }

  const uploadMedia = async(file) => {

    const imageRef = ref(storage, `profile/${ v4() + file.name}`)
    await uploadBytes(imageRef, file)

    const res = await getDownloadURL(imageRef)
    setProfile(res)
  }

  const handleProfilePic = async () => {
    await axios.put(`http://localhost:8088/api/v1/authuser/update/profile-pic/${user._id}`, {profilePic:profile}, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }) 
  }

  const handleSignOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }




  return (
    <>
      <div className="header">
        <span className="logo">
          <img src={logo} alt="logo" width="100%" />
        </span>
        <div className="profile">
          <span className="profile-pic">
            <img src={ user.profilePic ? user.profilePic : DProfile} alt="pic" onClick={profileOptionDisplay} />
          </span>
          {displayProfile ? (
            <div className="profile-content">
              <ul>
                <li onClick={profileDetailsDisplay}>
                  <img src={profileIcon} alt="profile" width={20} />
                  Profile
                </li>
                <li href="">
                  <img src={profileIcon} alt="profile" width={20} />
                  Item 2
                </li>
                <li>
                  <img src={profileIcon} alt="profile" width={20} />
                  Item 3
                </li>
                <li onClick={handleSignOut} >
                  <img src={signoutIcon} alt="signout" width={20} />
                  Sign Out
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          {displayProfileDetails ? (
            <div className="profile-details">
                {profile != null ? 
                    <img className="profile-details-pic" src={profile} alt="profile"  width={55} />
                  :
                  <label className="profile-upload" > 
                    <img className="profile-upload-pic" src={cameraIcon} alt="upload" />
                    <input type="file" onChange={(e) => uploadMedia(e.target.files[0])} />
                  </label>  
                }

                {profile != null ? <button style={{cursor:"pointer"}}  onClick={handleProfilePic} ></button> : ""}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Main;
