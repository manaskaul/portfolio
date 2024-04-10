import { MutableRefObject, useRef } from "react";
import { useTheme } from "../../contexts/theme-context";
import Footer from "../footer/Footer";
import TypingText from "../typing-text/TypingText";
import "./HomePage.css";

const arr = ["Engineer", "Developer"];

export default function HomePage() {
  const { toggleTheme } = useTheme();
  const easterEggRef: MutableRefObject<HTMLImageElement | null> = useRef(null);

  const easterEgg = () => {
    let clicks = 0;
    let timeoutId: number;

    return () => {
      if (++clicks >= 3) {
        if (easterEggRef.current) {
          easterEggRef.current.style.transform = clicks % 2 == 0 ? "rotate(-40deg)" : "rotate(40deg)";
        }
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clicks = 0;
      }, 1500);

      if (clicks >= 9) {
        toggleTheme();
        clicks = 0;
      }
    };
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <div>
          <img src="./assets/images/IMG_1423.jpeg" className="profile-pic" />
        </div>
        <div className="profile-text">
          <div className="name">
            Manas Kaul
            <img
              src="./assets/images/egg.png"
              className="egg"
              onClick={easterEgg()}
              ref={easterEggRef}
            ></img>
          </div>
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
