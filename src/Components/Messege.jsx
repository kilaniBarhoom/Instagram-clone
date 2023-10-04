export default function Messege({ src }) {
  return (
    <div className="messege-container">
      <div className="profile-img" style={{ border: "none" }}>
        <img style={{ width: "100%", borderRadius: "50%" }} src={src} alt="" />
      </div>
      <div className="right">
        <div className="username">
          <span>Kilani</span>
        </div>
        <div className="messege-line">
          <span id="messege">hi kilani</span> . <span id="time-sent">12h</span>
        </div>
      </div>
    </div>
  );
}
