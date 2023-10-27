// import iphoneScreen from "../assets/iphoneScreen.png";
import FacebookIcon from "@mui/icons-material/Facebook";
// import androidScreen from "../assets/androidScreen.png";
import instaIcontext from "../assets/headername.jpg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Styles/Logup.css";
import axios from "axios";
import { BaseURL } from "../Contexts/Vars";
import { Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { toast } from "react-hot-toast";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  function validLogin(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(data.email)) {
      return true;
    } else {
      toast.error("Wrong Email");
    }
  }

  function handleDataSubmit(data) {
    if (!validLogin(data)) {
      return;
    }
    axios
      .post(`${BaseURL}/users/signup`, data)
      .then((response) => {
        toast.success("Account Created Successfully");
        setTimeout(() => {
          nav("/");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  const [showPass, setShowPass] = useState(false);

  const handleChange = (event) => {
    setShowPass(event.target.checked);
  };

  return (
    <div className="logup-container">
      <div className="screens-container">
{/*         <img src={iphoneScreen} alt="" />
        <img src={androidScreen} alt="" /> */}
      </div>
      <div className="data-container">
        <div className="main-box">
          <header>
            <img src={instaIcontext} alt="" />
          </header>
          <p>Sign up to see photos and videeos from your friends</p>
          <div className="facebool-login">
            <span>
              <FacebookIcon />
            </span>
            <span>Login with Facebook</span>
          </div>
          <div className="OR">
            <span>OR</span>
            <hr />
          </div>
          <form
            action=""
            onSubmit={handleSubmit((data) => {
              handleDataSubmit(data);
            })}
          >
            <div className="inputs">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="Username"
                {...register("userName")}
                autoComplete="off"
              />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                autoComplete="off"
              />
              <Stack direction="row" gap={1}>
                <Checkbox
                  sx={{ color: "#fff", margin: 0, padding: 0 }}
                  checked={showPass}
                  onChange={handleChange}
                  inpsutprops={{ "aria-label": "controlled" }}
                />
                <Typography>Show Password</Typography>
              </Stack>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>
            By signing up, you agree to our Terms, Data Policy and Cookies
            Police
          </p>
        </div>
        <div className="second-box">
          <span>Have an account? </span>
          <span className="signup-change-btn" onClick={() => nav("/")}>
            Log In
          </span>
        </div>
      </div>
    </div>
  );
}
