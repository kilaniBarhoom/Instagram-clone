import { useLocation, useNavigate } from "react-router-dom";
import { userId } from "../Contexts/Vars";

export default function NavIcons({ name, icon, navigate, user, profile }) {
  const loc = useLocation();
  const CurrentPath = loc.pathname;
  const nav = useNavigate();

  const handleClick = () => {
    if (navigate) {
      nav(navigate);
    } else if (profile) {
      nav(`/${userId}`);
    }
  };

  return (
    <li className="sidemenu-item" onClick={handleClick}>
      {name == "More" ? (
        <BasicMenu icon={icon} />
      ) : name == "Create" ? (
        <CreatePostModal user={user} name={name} icon={icon} />
      ) : (
        <>
          {icon}
          <span
            style={{
              color:
                `/${name.toLowerCase()}` == CurrentPath ? "#fff" : "#ffffffc1",
              fontWeight:
                `/${name.toLowerCase()}` == CurrentPath ? "600" : "400",
            }}
          >
            {name}
          </span>
        </>
      )}
    </li>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-hot-toast";
import CreatePostModal from "./CreatePostModal";
import axios from "axios";

function BasicMenu({ icon }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    handleClose();
    toast.success("Successfully Logged Out");
    setTimeout(() => {
      nav("/");
    }, 500);
  };

  return (
    <div
      style={{
        padding: "0 !important",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        border: "none",
      }}
    >
      <Button
        style={{ width: "100%", border: "none", padding: "0", height: "25px" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span
          style={{
            color: "#fff",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontWeight: "400",
          }}
        >
          {icon}
          {/* <span className="sidemenu-item"> */}
          <span id="more-icon-name">More</span>
          {/* </span> */}
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Switch account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
