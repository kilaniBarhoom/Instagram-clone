import "../Styles/Messeges.css";
import Messege from "../Components/Messege";
import messegeImg from "../assets/messegeImg.jpg";
import { BaseURL, token } from "../Contexts/Vars";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SendAMessegeModal from "../Modals/SendAMessegeModal";
import axios from "axios";

export default function Messeges() {
  const [messeges, setMesseges] = useState("");
  const [users, setUsers] = useState("");
  const nav = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${BaseURL}/users`)
      .then((res) => {
        setUsers(res.data.users.slice(0, 20));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="messeges-page-container">
      <div className="messeges-list">
        <div className="messeges-header">
          <div className="top">
            <KeyboardBackspaceIcon
              className="back-btn"
              onClick={() => nav("/")}
            />
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
          {users ? (
            users.map(({ avatar, userName }, ind) => {
              return (
                <Messege
                  key={ind}
                  src={avatar}
                  userName={userName}
                  messege="messege"
                  time="time"
                />
              );
            })
          ) : (
            <></>
          )}
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
              <h3>Your Messages</h3>
              <p>Send private photos and messages to a friend or group</p>
              <button onClick={handleOpen} className="send-messege-btn">
                Send Messege
              </button>
              <SendAMessegeModal
                open={open}
                handleClose={handleClose}
                users={users}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
