import { Avatar } from "@mui/material";

export default function Messege({ src, userName }) {
  return (
    <div className="messege-container">
      <div className="profile-img" style={{ border: "none" }}>
        <Avatar
          sx={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "50%",
          }}
          src={src}
          alt="no pic"
        />
      </div>
      <div className="right">
        <div className="username">
          <span>{userName}</span>
        </div>
        <div className="messege-line">
          <span id="messege">hi kilani . </span>
          <span id="time-sent"> 12h</span>
        </div>
      </div>
    </div>
  );
}
