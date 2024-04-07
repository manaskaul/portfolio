import "./MainContent.css";

export default function MainContent() {
  return (
    <div className="main-content">
      <div className="profile-pic"></div>
      <img
        src="./assets/images/IMG_1423.jpeg"
        alt="email"
        className="profile-pic-new"
      />
      <div className="profile-text">
        <div className="name">Manas Kaul</div>
        <div className="heading">A Bit About Me</div>
        <div className="sub-heading">
          I'm a passionate and results-driven Full Stack Engineer with expertise
          in building dynamic web applications using Angular and TypeScript and
          robust and reliable backend systems using Java. I thrive on turning
          ideas into reality and creating user-friendly experiences that leave a
          lasting impact.
        </div>
      </div>
    </div>
  );
}
