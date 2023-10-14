import SideMenu from "./Components/SideMenu";
import Home from "./Pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Explore from "./Pages/Explore";
import Messeges from "./Pages/Messeges";
import Suggested from "./Pages/Suggested";
import Profile from "./Pages/Profile";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Images from "./Contexts/Images";
import PostImages from "./Contexts/PostImages";
import profilePic from "./assets/profilepic.jpg";

import { useForm } from "react-hook-form";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedHome from "./Routes/ProtectedHome";
import ProtectedAuth from "./Routes/ProtectedAuth";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { BaseURL, token, userId } from "./Contexts/Vars";

export default function App() {
  const [openCreate, setOpenCreate] = useState(false);
  const [user, setUser] = useState([]);

  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    axios
      .get(`${BaseURL}/users`)
      .then((res) => {
        setUser(res.data.users.find((user) => user.id == userId));
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="app-container">
      <Toaster />

      {path !== "/login" || path !== "/signup" ? (
        <SideMenu user={user} setOpenCreate={setOpenCreate} />
      ) : (
        <></>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuth>
              <Signup />
            </ProtectedAuth>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedHome>
              <Home />
            </ProtectedHome>
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/messeges" element={<Messeges />} />
        <Route path="/suggested" element={<Suggested />} />
        <Route path=":userid" element={<Profile />} />
      </Routes>
    </div>
  );
}
