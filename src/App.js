import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Profile from "./components/Profile/Profile";

function App() {
  const [user, setuser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    setuser(token)
  },[])
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        {!user ? (
          <Route exact path="/*" element={<Login/>}></Route>
        ) : (
          <Route path="/*" element={<Home user={user} />}></Route>
        )}
        <Route path="*/profile/*" element={<Profile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
