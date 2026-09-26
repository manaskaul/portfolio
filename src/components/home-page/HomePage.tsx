import { MutableRefObject, useRef, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import Footer from "../footer/Footer";
import TypingText from "../typing-text/TypingText";
import "./HomePage.css";

const arr = ["an Engineer", "an Architect", "a Designer", "a Developer"];

export default function HomePage() {
  const { toggleTheme } = useTheme();
  const easterEggRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
  const [hasSeenDarkSide, setHasSeenDarkSide] = useState(false);
  const clickCount = useRef(0);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEggClick = () => {
    clickCount.current += 1;

    // Wiggle on each click
    if (easterEggRef.current) {
      easterEggRef.current.style.transform =
        clickCount.current % 2 === 0 ? "rotate(-40deg)" : "rotate(40deg)";
    }

    // Reset counter after 1.5s of inactivity
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      clickCount.current = 0;
      if (easterEggRef.current) easterEggRef.current.style.transform = "rotate(0deg)";
    }, 1500);

    // 3 clicks → toggle theme
    if (clickCount.current >= 3) {
      toggleTheme();
      clickCount.current = 0;
      if (timeoutId.current) clearTimeout(timeoutId.current);
      if (easterEggRef.current) easterEggRef.current.style.transform = "rotate(0deg)";
      if (!hasSeenDarkSide) {
        console.log("🥚 You found it. Welcome to the other side.");
        setHasSeenDarkSide(true);
      }
    }
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <div>
          <img src="./assets/images/IMG_1423.webp" className="profile-pic" />
        </div>
        <div className="profile-text">
          <div className="name">
            Manas Kaul
            <img
              src="./assets/images/egg.png"
              className="egg"
              onClick={handleEggClick}
              ref={easterEggRef}
            ></img>
          </div>
          <div className="heading">
            <span>
              I'm <TypingText textList={arr} />
            </span>
          </div>
          <div className="sub-heading">
            Architecting the future through precise engineering and fluid design.
            I specialize in the orchestration of high-performance, full-stack
            applications where architectural integrity meets intuitive,
            high-fidelity experiences to solve complex problems with elegance.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
