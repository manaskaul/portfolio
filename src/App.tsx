import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home-page/HomePage";
import Resume from "./components/resume/Resume";
import NavBar from "./components/nav-bar/NavBar";
import Personal from "./components/personal/Personal";

function App() {
  return (
    <>
      <NavBar />
      <div className="shell">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
          <Route path="/personal" element={<Personal />}></Route>
          <Route path="*" element={<HomePage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
