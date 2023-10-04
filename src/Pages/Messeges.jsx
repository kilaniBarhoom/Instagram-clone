import "../Styles/Messeges.css";
import Messege from "../Components/Messege";
import Images from "../Contexts/Images";

import messegeImg from "../assets/messegeImg.jpg";

import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";

export default function Messeges() {
  const [messeges, setMesseges] = useState("");
  return (
    <div className="messeges-page-container">
      <div className="messeges-list">
        <div className="messeges-header">
          <div className="top">
            <span>
              <span>kilani.jsx</span>
              <KeyboardArrowDownOutlinedIcon />
            </span>
            <CreateOutlinedIcon style={{ cursor: "pointer" }} />
          </div>
          <div className="bottom">
            <span>Messeges</span>
            <span className="requests">Requests</span>
          </div>
        </div>
        <div className="messeges-followers">
          {Images.map((img, ind) => {
            return (
              <Messege
                key={ind}
                src={img}
                userName="userName"
                messege="messege"
                time="time"
              />
            );
          })}
        </div>
      </div>
      <div className="chat-messege-displayer">
        {messeges ? (
          <></>
        ) : (
          <div className="no-chosen-messege">
            <div className="image-messege">
              <img src={messegeImg} alt="" />
            </div>
            <div className="no-chosen-body">
              <h3>Your Messeges</h3>
              <p>Send private photos and messages to a friend or group</p>
              <button className="send-messege-btn">Send Messege</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
