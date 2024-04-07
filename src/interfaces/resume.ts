export interface Resume {
  name: string;
  designation: string;
  description: string;
  contact: Contact[];
  sections: Section[];
}

export interface Contact {
  text: string;
  link: string;
  icon: string;
}

export interface Section {
  title: string;
  subsection: SubSection[];
}

export interface SubSection {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  description: string[];
}
