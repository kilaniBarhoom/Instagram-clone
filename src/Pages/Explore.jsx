import "../Styles/Explore.css";
import InboxIcon from "@mui/icons-material/Inbox";
import PostImages from "../Contexts/PostImages";

export default function Explore() {
  return (
    <div className="explore-page-container">
      <div className="explore-content">
        {PostImages.map((post, id) => {
          return (
            <div key={id} className="explore-item">
              <img src={post} alt="" />
              <InboxIcon className="explore-type" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
