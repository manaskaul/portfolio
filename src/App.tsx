import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home-page/HomePage";
import Resume from "./components/resume/Resume";
import NavBar from "./components/nav-bar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/resume" element={<Resume />}></Route>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
