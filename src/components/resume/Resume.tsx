import { ResumeItem, Section, SubSection } from "../../interfaces/resume";
import resumeJson from "../../resume.json";
import "./Resume.css";

export default function Resume() {
  const resume: ResumeItem = JSON.parse(JSON.stringify(resumeJson));

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
            <p>{subSection.subHeading1}</p>
            <p>{subSection.subHeading2}</p>
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
    <>
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
      <div className="resume">
        <p>
          I'm a Full-Stack Engineer at XPO, where I build dynamic web
          applications using Angular and TypeScript and robust and reliable
          backend systems using Java. I have a Bachelor of Technology degree in
          Computer Science from Dhirubhai Ambani Institute of Information and
          Communication Technology (DAIICT), one of the top engineering colleges
          in India.
        </p>
        <div className="summary">
          <h3>Summary</h3>
          <div className="sub-heading">
            <h4>{resume.name}</h4>
            <p>{resume.description}</p>
            {/* <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/manas-kaul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/manas-kaul/
                </a>
              </li>
              <li>
                <a
                  href="mailto:manas.kaul2@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  manas.kaul2@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/v5uvRSUg74GRqNcC8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pune, Maharashtra
                </a>
              </li>
            </ul> */}
          </div>
        </div>

        <>{sections}</>
      </div>
    </>
  );
}
