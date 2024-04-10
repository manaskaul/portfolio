export interface ResumeItem {
  name: string;
  designation: string;
  description: string;
  contact: Contact;
  sections: Section[];
}

export interface Contact {
  address: ContactDetail;
  linkedin: ContactDetail;
  email: ContactDetail;
  phone: ContactDetail;
  github: ContactDetail;
}

export interface ContactDetail {
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
