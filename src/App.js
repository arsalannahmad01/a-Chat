import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Chat from "./components/Main/Chat/Chat";
import Login from "./components/Dashboard/Login/Login";
import Signup from "./components/Dashboard/Signup/Signup";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProtectedRoute from "./ProtectedRoute";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          {/* <Route exact path="/" element={<ProtectedRoute Component={Dashboard} />} /> */}

          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* <Route exact path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} /> */}
          
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/login" element={<ProtectedRoute Component={Login} />} /> */}

          <Route exact path="/register" element={<Signup />} />
          {/* <Route exact path="/register" element={<ProtectedRoute Component={Signup} />} /> */}

          {/* <Route exact path="/chat" element={<Chat />} /> */}
          <Route exact path="/chat" element={<ProtectedRoute Component={Chat} />} />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
