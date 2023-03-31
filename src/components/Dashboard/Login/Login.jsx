import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Dashboard.css";
import "../Signup/Signup.css";
import logo from "../../../public/icons/chat-icon-logo.png";
import userIcon from "../../../public/icons/signup-user.png";
import emailIcon from "../../../public/icons/email-icon.png";
import passKeyIcon from "../../../public/icons/password-key.png";
import eyeIcon from "../../../public/icons/eye-icon.png";
import Spinner from "../../../public/icons/spinner.gif";

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsvisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginSpiner, setLoginSpinner] = useState(false);

  const handleLogin = async () => {
    setLoginSpinner(true);
    const res = await axios.post(
      `https://achat-ra84.onrender.com/api/v1/user/login`,
      {
        email: email,
        password: password,
      }
    );

    if (res.data.user && res.data.token) {
      setLoginSpinner(false);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      navigate("/chat");
    } else {
      setLoginSpinner(false);
      alert(res.data);
    }
  };

  return (
    <div className="register">
      <div className="dash-header">
        <img src={logo} alt="a-chat" width={50} />
        <div className="dash-header-option">
          <p>About</p>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      </div>
      <div className="register-body">
        <div className="register-body-left"></div>
        <div className="register-body-right">
          <div className="signup-form">
            <h4>Login</h4>

            <label className="signup-form-details">
              <img src={emailIcon} alt="user" width={30} />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="signup-form-details">
              <img src={passKeyIcon} alt="user" width={30} />
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={eyeIcon}
                alt="eye"
                width={30}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  isVisible ? setIsvisible(false) : setIsvisible(true)
                }
              />
            </label>

            {loginSpiner ? (
              <button className="spinner-btn">
                <img src={Spinner} alt="login" width={45} />
              </button>
            ) : (
              <button className="signup-form-submit" onClick={handleLogin}>
                Login
              </button>
            )}

            <p>
              Need an account?{" "}
              <a
                onClick={() => navigate("/register")}
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                  color: "blue",
                }}
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
