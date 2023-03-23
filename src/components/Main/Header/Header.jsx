import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../public/icons/chat-icon-logo.png";
import pic from "../../../public/images/profile.jpg";
import profileIcon from "../../../public/icons/profile-icon.png";
import signoutIcon from "../../../public/icons/signout-icon.png";
import "./Header.css";

const Main = () => {
  const [displayProfile, setDisplayProfile] = useState(false);
  const [displayProfileDetails, setDisplayProfileDetails] = useState(false);
  const [left, setLeft] = useState(window.innerWidth - 100);

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


  return (
    <>
      <div className="header">
        <span className="logo">
          <img src={logo} alt="logo" width="100%" />
        </span>
        <div className="profile">
          <span className="profile-pic">
            <img src={pic} alt="pic" onClick={profileOptionDisplay} />
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
                <li>
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
              <h4>ARSALAN</h4>
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
