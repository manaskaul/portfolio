import "./HomePage.css";
import Footer from "./footer/Footer";
import MainContent from "./main-content/MainContent";

export default function HomePage() {
  return (
    <div className="home-page">
      <MainContent />
      <Footer />
    </div>
  );
}
