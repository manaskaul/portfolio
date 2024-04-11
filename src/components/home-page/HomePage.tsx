import { MutableRefObject, useRef, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import Footer from "../footer/Footer";
import TypingText from "../typing-text/TypingText";
import "./HomePage.css";

const arr = ["an Engineer", "a Developer"];

export default function HomePage() {
  const { toggleTheme } = useTheme();
  const easterEggRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
  const [hasSeenDarkSide, setHasSeenDarkSide] = useState(false);

  const easterEgg = () => {
    let clicks = 0;
    let timeoutId: number;

    return () => {
      clicks++
      
      if (easterEggRef.current) {
        easterEggRef.current.style.transform = clicks % 2 == 0 ? "rotate(-40deg)" : "rotate(40deg)";
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clicks = 0;
      }, 1500);

      if (clicks >= 7) {
        toggleTheme();
        clicks = 0;
        if (!hasSeenDarkSide) {
          console.log("Ranger, welcome to the dark side!")
          setHasSeenDarkSide(true);
        }
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
              I'm <TypingText textList={arr} />
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
