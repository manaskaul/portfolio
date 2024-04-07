import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="navigation">
        <div className="left-nav">
          <Link to={"/"} className="name">
            Manas Kaul
          </Link>
          <Link to={"/"} className="designation">
            Full Stack Developer
          </Link>
        </div>
        <div className="end-nav">
          <Link to={"/resume"}>Resume</Link>
          <div className="seperator"></div>
          <Link to={"/personal"}>Personal</Link>
        </div>
      </div>
    </div>
  );
}
