import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="divider"></div>
      <div className="footer">
        <div className="footer-link">
          <div className="title">Email</div>
          <div className="sub-title">
            <a
              href="mailto:manas.kaul2@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./assets/icons/email.svg" alt="email" />
              manas.kaul2
            </a>
          </div>
        </div>
        <div className="footer-link">
          <div className="title">GitHub</div>
          <div className="sub-title">
            <a
              href="https://github.com/manaskaul"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./assets/icons/github.svg" alt="github" />
              manaskaul
            </a>
          </div>
        </div>
        <div className="footer-link">
          <div className="title">LinkedIn</div>
          <div className="sub-title">
            <a
              href="https://www.linkedin.com/in/manas-kaul/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./assets/icons/linkedin.svg" alt="linkedIn" />
              manas-kaul
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
