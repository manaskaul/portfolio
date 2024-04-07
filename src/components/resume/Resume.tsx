import "./Resume.css";
import resumeJson from "../../resume.json";
import { Contact, Resume, Section, SubSection } from "../../interfaces/resume";

// export function LeftNav({ resume }) {
//   const leftNavLinks = ["Manas Kaul"];
//   resume.sections.forEach((resumeSection) => {
//     leftNavLinks.push(resumeSection.title);
//   });

//   const leftNavLinksList = leftNavLinks.map((linkText, idx) => {
//     const scrollPos = `#${linkText}`;

//     return (
//       <a href={scrollPos} key={idx}>
//         {linkText}
//       </a>
//     );
//   });

//   return (
//     <div className="left-nav">
//       <ul
//         style={{
//           marginTop: "40px",
//           display: "flex",
//           flexDirection: "column",
//           padding: "0",
//         }}
//       >
//         {leftNavLinksList}
//       </ul>
//     </div>
//   );
// }

// export function RightContent({ resume: any }) {
//   return (
//     <div className="right-content">
//       <Header resume={resume} />
//       <Section resume={resume} />
//     </div>
//   );
// }

// export function Header({ resume }) {
//   return (
//     <div id="Manas Kaul">
//       <p
//         style={{
//           fontSize: "25px",
//           fontWeight: "bold",
//         }}
//       >
//         {resume.designation}
//       </p>
//       <p>{resume.description}</p>
//     </div>
//   );
// }

// export function Section({ resume }) {
//   let allResume = resume.sections.map((resumeSection, idx) => {
//     let subSections = resumeSection.subsection.map((subSec, idx) => {
//       let subSectionDesc = subSec.description.map((desc, idx) => {
//         return (
//           <div key={idx}>
//             <li>{desc}</li>
//           </div>
//         );
//       });

//       return (
//         <div
//           style={{
//             marginLeft: "25px",
//           }}
//           key={idx}
//         >
//           <span>
//             <span
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//               }}
//             >
//               {subSec.heading}
//             </span>{" "}
//             | <span>{subSec.subHeading1}</span>
//           </span>
//           <div>{subSec.subHeading2}</div>
//           <ul>{subSectionDesc}</ul>
//         </div>
//       );
//     });

//     return (
//       <div key={idx} id={resumeSection.title}>
//         <div
//           style={{
//             fontSize: "20px",
//             fontWeight: "bold",
//             marginBottom: "12px",
//           }}
//         >
//           {resumeSection.title}
//         </div>
//         {subSections}
//         <br />
//       </div>
//     );
//   });
//   return <>{allResume}</>;
// }

export default function Resume() {
  const resume: Resume = JSON.parse(JSON.stringify(resumeJson));
  console.log({ resume });

  const contactList = resume.contact.map((c: Contact, i: number) => {
    return (
      <>
        <li key={i}>
          <a href={c.link} target="_blank" rel="noopener noreferrer">
            {c.text}
          </a>
        </li>
      </>
    );
  });

  const sections = resume.sections.map((section: Section, i: number) => {
    const subSections = section.subsection.map(
      (subSection: SubSection, i: number) => {
        const subSectionDesc = subSection.description.map(
          (desc: string, i: number) => {
            return (
              <>
                <li key={i}>{desc}</li>
              </>
            );
          }
        );

        return (
          <div className="sub-heading" key={i}>
            <h4>{subSection.heading}</h4>
            <p>{subSection.subHeading1}</p>
            <p>{subSection.subHeading2}</p>
            <ul>{subSectionDesc}</ul>
          </div>
        );
      }
    );

    return (
      <div className="sections" key={i}>
        <h3>{section.title}</h3>
        <>{subSections}</>
      </div>
    );
  });

  return (
    <div className="resume">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vel
        quas alias expedita! Voluptates nihil corporis perferendis doloremque
        qui expedita facilis, sit totam ex reprehenderit quos, amet veritatis
        sed corrupti! Voluptatibus ad eligendi enim quod repudiandae doloremque,
        beatae non reprehenderit minus distinctio hic nobis voluptatum
        temporibus? Temporibus voluptates similique ad!
      </p>
      <div className="summary">
        <h3>Summary</h3>
        <div className="sub-heading">
          <h4>{resume.name}</h4>
          <p>{resume.description}</p>
          <ul>{contactList}</ul>
        </div>
      </div>

      {/* <div className="sections">
        <h3>Heading</h3>
        <div className="sub-heading">
          <h4>Sub-Heading</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe odit
            repellendus maiores dicta illo impedit ratione quis, veniam
            similique maxime?
          </p>
        </div>
      </div> */}

      <>{sections}</>

      {/* <LeftNav resume={resume} />
      <RightContent resume={resume} /> */}
    </div>
  );
}
