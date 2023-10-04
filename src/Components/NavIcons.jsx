import { useLocation, useNavigate } from "react-router-dom";

export default function NavIcons({
  name,
  icon,
  navigate,
  create,
  setOpenCreate,
}) {
  const loc = useLocation();
  const CurrentPath = loc.pathname;
  const nav = useNavigate();

  const handleClick = () => {
    if (navigate) {
      nav(navigate);
    }
    if (create == true) {
      setOpenCreate((val) => !val);
    }
  };

  return (
    <li className="sidemenu-item" onClick={handleClick}>
      {icon}
      <span
        style={{
          color: `/${name.toLowerCase()}` == CurrentPath ? "#fff" : "#ffffffc1",
          fontWeight: `/${name.toLowerCase()}` == CurrentPath ? "600" : "400",
        }}
      >
        {name}
      </span>
    </li>
  );
}
