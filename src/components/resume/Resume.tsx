import { useTheme } from "../../hooks/use-theme";
import { ResumeItem, Section, SubSection } from "../../interfaces/resume";
import resumeJson from "../../resume.json";
import "./Resume.css";

export default function Resume() {
  const resume: ResumeItem = JSON.parse(JSON.stringify(resumeJson));
  const { theme } = useTheme();

  return (
    <div className="resume-page">
      <div className="resume-grid">
        {/* Left Sticky Sidebar */}
        <aside className="resume-sidebar glass">
          <div className="sidebar-profile">
            <h1 className="name">{resume.name}</h1>
            <h2 className="title">{resume.designation}</h2>
            <p className="description">{resume.description}</p>
          </div>
          
          <div className="sidebar-contact">
            {Object.values(resume.contact).map((contact: any, idx: number) => (
              <a 
                key={idx}
                href={contact.link} 
                className="contact-btn"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img
                  src={`./assets/icons/${theme}-${contact.icon}.svg`}
                  alt={contact.icon}
                  className="contact-icon"
                />
                <span>{contact.text}</span>
              </a>
            ))}
            
            <a 
              href="./assets/manas_kaul-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              Download Full Resume
            </a>
          </div>
        </aside>

        {/* Right Scrollable Content */}
        <main className="resume-content">
          {resume.sections.map((section: Section, index: number) => {
            const isSkills = section.title.toLowerCase() === "skills";

            // Group subsections properly: if heading exists, it starts a new group.
            const groups: any[] = [];
            if (!isSkills) {
              section.subsection.forEach((sub) => {
                if (sub.heading) {
                  groups.push({ company: sub.heading, roles: [sub] });
                } else if (groups.length > 0) {
                  groups[groups.length - 1].roles.push(sub);
                } else {
                  groups.push({ company: null, roles: [sub] });
                }
              });
            }

            return (
              <section className="resume-section" key={index}>
                <h3 className="section-title">{section.title}</h3>
                
                {isSkills ? (
                  <div className="skills-grid">
                    {section.subsection.map((sub: SubSection, subIdx: number) => (
                      <div key={subIdx} className="skill-category glass">
                        <h4 className="item-heading">{sub.heading || sub.subHeading1}</h4>
                        <div className="skill-tags">
                          {sub.description.map((desc: string, i: number) => (
                            <span key={i} className="skill-tag">{desc}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="timeline">
                    {groups.map((group, gIdx) => (
                      <div key={gIdx} className="timeline-item glass">
                        {group.company && <h4 className="company-heading">{group.company}</h4>}
                        <div className="roles-container">
                          {group.roles.map((role: SubSection, rIdx: number) => (
                            <div key={rIdx} className="role-block">
                              <h5 className="item-subheading">{role.subHeading1}</h5>
                              
                              {/* Render generic role descriptions if any exist */}
                              {role.description && role.description.length > 0 && (
                                <ul className="item-list">
                                  {role.description.map((desc: string, i: number) => (
                                    <li key={i}>{desc}</li>
                                  ))}
                                </ul>
                              )}

                              {/* Render specific nested projects if they exist */}
                              {role.projects && role.projects.length > 0 && (
                                <div className="projects-container">
                                  {role.projects.map((proj: any, pIdx: number) => (
                                    <div key={pIdx} className="project-block">
                                      <h6 className="project-name">{proj.name}</h6>
                                      <ul className="item-list">
                                        {proj.description.map((desc: string, i: number) => (
                                          <li key={i}>{desc}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
