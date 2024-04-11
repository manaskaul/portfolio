import "./Footer.css";
import resumeJson from "../../resume.json";
import { useTheme } from "../../hooks/use-theme";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <>
      <div className="divider"></div>
      <div className="footer">
        <div className="footer-link">
          <div className="title">Email</div>
          <div className="sub-title">
            <a
              href={resumeJson.contact.email.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  "./assets/icons/" +
                  theme +
                  "-" +
                  resumeJson.contact.email.icon +
                  ".svg"
                }
                alt="email"
              />
              {resumeJson.contact.email.text}
            </a>
          </div>
        </div>
        <div className="footer-link">
          <div className="title">LinkedIn</div>
          <div className="sub-title">
            <a
              href={resumeJson.contact.linkedin.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  "./assets/icons/" +
                  theme +
                  "-" +
                  resumeJson.contact.linkedin.icon +
                  ".svg"
                }
                alt="linkedIn"
              />
              {resumeJson.contact.linkedin.text}
            </a>
          </div>
        </div>
        <div className="footer-link">
          <div className="title">GitHub</div>
          <div className="sub-title">
            <a
              href={resumeJson.contact.github.icon}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={
                  "./assets/icons/" +
                  theme +
                  "-" +
                  resumeJson.contact.github.icon +
                  ".svg"
                }
                alt="github"
              />
              {resumeJson.contact.github.link}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
