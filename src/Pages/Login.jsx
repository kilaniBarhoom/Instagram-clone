import iphoneScreen from "../assets/iphoneScreen.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import androidScreen from "../assets/androidScreen.png";
import instaIcontext from "../assets/headername.jpg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Styles/Logup.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import { BaseURL } from "../Contexts/Vars";
import { Stack, Typography } from "@mui/material";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const validLogin = (numusermail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(numusermail);
  };

  function handleDataSubmit(data) {
    if (validLogin(data.numusermail)) {
      data.email = data.numusermail;
      delete data.numusermail;
    } else {
      data.userName = data.numusermail;
      delete data.numusermail;
    }

    axios
      .post(`${BaseURL}/users/login`, data)
      .then((response) => {
        const token = response.data.token;
        const userId = response.data.user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        toast.success("Successfully Logged In");
        setTimeout(() => {
          nav("/home");
        }, 2000);
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
        <img src={iphoneScreen} alt="" />
        <img src={androidScreen} alt="" />
      </div>
      <div className="data-container">
        <div className="main-box">
          <header>
            <img src={instaIcontext} alt="" />
          </header>
          <form
            action=""
            onSubmit={handleSubmit((data) => {
              handleDataSubmit(data);
            })}
          >
            <div className="inputs">
              <input
                type="text"
                placeholder="Mobile Number, Email or Username"
                {...register("numusermail")}
              />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
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
            <button type="submit">Login</button>
          </form>
          <div className="OR">
            <span>OR</span>
            <hr />
          </div>
          <div className="facebool-login">
            <span>
              <FacebookIcon />
            </span>
            <span>Login with Facebook</span>
          </div>
          <div className="forgot-pass">
            <span>Forgot password?</span>
          </div>
        </div>
        <div className="second-box">
          <span>Don't have an account? </span>
          <span
            className="signup-change-btn"
            onClick={() => {
              nav("/signup");
            }}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
