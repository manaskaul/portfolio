import { useTheme } from "../../hooks/use-theme";
import { ResumeItem, Section, SubSection } from "../../interfaces/resume";
import resumeJson from "../../resume.json";
import "./Resume.css";

export default function Resume() {
  const resume: ResumeItem = JSON.parse(JSON.stringify(resumeJson));
  const {theme} = useTheme();

  const sections = resume.sections.map((section: Section, i: number) => {
    const subSections = section.subsection.map(
      (subSection: SubSection, i: number) => {
        const subSectionDesc = subSection.description.map(
          (desc: string, i: number) => {
            return <li key={i}>{desc}</li>;
          }
        );

        return (
          <div className="sub-heading" key={i}>
            <h3>{subSection.heading}</h3>
            <h4>{subSection.subHeading1}</h4>
            <ul>{subSectionDesc}</ul>
          </div>
        );
      }
    );

    return (
      <div className="sections" key={i}>
        <h2>{section.title}</h2>
        <>{subSections}</>
      </div>
    );
  });

  return (
    <div className="resume">
      <div className="heading">
        <h1>Resume</h1>
        <div className="">
          Full resume can be found{" "}
          <a
            href="./assets/manas_kaul-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </a>
        </div>
        <div className="divider"></div>
      </div>
      <div className="content">
        <div className="summary">
          <h2>Summary</h2>
          <div className="sub-heading">
            <h4>{resume.name}</h4>
            <p>{resume.description}</p>
            <div className="contact-links">
              <div className="contact-item">
                <a
                  href={resume.contact.address.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      "./assets/icons/" + theme + "-" + resume.contact.address.icon + ".svg"
                    }
                    alt="address"
                  />
                  {resume.contact.address.text}
                </a>
              </div>
              <div className="contact-item">
                <a
                  href={resume.contact.email.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={"./assets/icons/" + theme + "-" + resume.contact.email.icon + ".svg"}
                    alt="email"
                  />
                  {resume.contact.email.text}
                </a>
              </div>
              <div className="contact-item">
                <a
                  href={resume.contact.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={
                      "./assets/icons/" + theme + "-" + resume.contact.linkedin.icon + ".svg"
                    }
                    alt="linkedin"
                  />
                  {resume.contact.linkedin.text}
                </a>
              </div>
            </div>
          </div>
        </div>

        <>{sections}</>
      </div>
    </div>
  );
}
