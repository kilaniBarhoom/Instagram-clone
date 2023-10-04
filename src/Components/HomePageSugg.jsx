import "../Styles/Homepagesugg.css";
import { useState } from "react";

export default function HomePageSugg({ src, username, content }) {
  const [req, setReq] = useState("Follow");
  return (
    <div className="home-sugg-container">
      <div className="left">
        <div className="profile-img" style={{ border: "none" }}>
          <img
            style={{ width: "100%", borderRadius: "50%" }}
            src={src}
            alt=""
          />
        </div>
        <div className="name-followedby">
          <div className="username">
            <span>{username}</span>
          </div>
          <div className="content-line">
            <span className="content">{content}</span>
          </div>
        </div>
      </div>
      <div className="right">
        <span
          onClick={() =>
            setReq((req) => (req == "Follow" ? "Requested" : "Follow"))
          }
        >
          {req}
        </span>
      </div>
    </div>
  );
}
