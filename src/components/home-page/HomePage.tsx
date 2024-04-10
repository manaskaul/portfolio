import Footer from "../footer/Footer";
import TypingText from "../typing-text/TypingText";
import "./HomePage.css";

const arr = ["Engineer", "Developer"];

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="main-content">
        <img
          src="./assets/images/IMG_1423.jpeg"
          alt="email"
          className="profile-pic"
        />
        <div className="profile-text">
          <div className="name">Manas Kaul</div>
          <div className="heading">
            <span>
              I'm a <TypingText textList={arr} />
            </span>
          </div>
          <div className="sub-heading">
            I'm passionate and results-driven with expertise in building dynamic
            web applications using Angular and TypeScript and robust and
            reliable backend systems using Java. I thrive on turning ideas into
            reality and creating user-friendly experiences that leave a lasting
            impact.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
