import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="nav-bar">
      <div className="navigation glass">
        <div className="left-nav">
          <Link to={"/"} className="name">
            Manas Kaul
          </Link>
          <Link to={"/"} className="designation">
            Software Dev Engineer II
          </Link>
        </div>
        <div className="end-nav">
          <Link 
            to={"/resume"} 
            className={location.pathname === "/resume" ? "active" : ""}
          >
            Resume
          </Link>
          <div className="seperator"></div>
          <Link 
            to={"/personal"}
            className={location.pathname === "/personal" ? "active" : ""}
          >
            Personal
          </Link>
        </div>
      </div>
    </div>
  );
}
