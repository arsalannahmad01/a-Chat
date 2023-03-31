import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isJwtExpired } from "jwt-check-expiration";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [isAuth, setAuth] = useState(false);


  useEffect(() => {

    console.log(isJwtExpired(token))

    if (!token || isJwtExpired(token)) {
      console.log("YES TRUE")
      navigate("/login")
    } else {
      console.log("YES FALSE")
      navigate("/chat")
    }

  }, [])


  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
