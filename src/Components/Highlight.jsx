import profilepic from "../assets/profilepic.jpg";

export default function Highlight() {
  return (
    <div className="highlight-container">
      <div className="highlight-prev">
        <img src={profilepic} alt="" />
      </div>
      <div className="highlight-name">
        <span>Beauty</span>
      </div>
    </div>
  );
}
