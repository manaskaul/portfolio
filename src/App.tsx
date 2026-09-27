import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Initialize Google Analytics with a placeholder Measurement ID
ReactGA.initialize("G-XS2CS56XL0");
import "./App.css";
import HomePage from "./components/home-page/HomePage";
import NavBar from "./components/nav-bar/NavBar";
import Personal from "./components/personal/Personal";
import Resume from "./components/resume/Resume";
import { ThemeProvider } from "./contexts/theme-context";
function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  return (
    <>
      <ThemeProvider>
        <NavBar />
        <div className="shell">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/resume" element={<Resume />}></Route>
            <Route path="/personal" element={<Personal />}></Route>
            <Route path="*" element={<HomePage />}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
