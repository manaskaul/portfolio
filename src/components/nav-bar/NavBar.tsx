import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import resumeJson from "../../resume.json";

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="nav-bar">
      <div className="navigation glass">
        <div className="left-nav">
          <Link to={"/"} className="name">
            {resumeJson.name}
          </Link>
          <Link to={"/"} className="designation">
            {resumeJson.designation}
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
