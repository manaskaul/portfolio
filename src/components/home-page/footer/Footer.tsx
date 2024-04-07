import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-link">
        <div className="title">Email</div>
        <div className="sub-title">
          <img src="./assets/icons/email.svg" alt="email" />
          <a
            href="mailto:manas.kaul2@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            manas.kaul2@gmail.com
          </a>
        </div>
      </div>
      <div className="footer-link">
        <div className="title">GitHub</div>
        <div className="sub-title">
          <img src="./assets/icons/github.svg" alt="github" />
          <a
            href="https://github.com/manaskaul"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/manaskaul
          </a>
        </div>
      </div>
      <div className="footer-link">
        <div className="title">LinkedIn</div>
        <div className="sub-title">
          <img src="./assets/icons/linkedin.svg" alt="linkedIn" />
          <a
            href="https://www.linkedin.com/in/kaul-manas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.linkedin.com/in/kaul-manas/
          </a>
        </div>
      </div>
    </div>
  );
}
