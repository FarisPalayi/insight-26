import type { Timestamp } from "firebase/firestore";

export type EventData = {
  id: string,
  name: string,
  fancyName: string,
  guidelines: string[],
}

export interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

// Updated Sponsor type to include logo
export interface Sponsor {
  name: string;
  website: string;
  logo?: string; // URL to logo image
}

export interface SponsorTier {
  id?: string;
  name: string;
  icon: React.ReactNode | string; // Can be ReactNode or string (for Firebase)
  description: string;
  accentColor: string;
  sponsors: Sponsor[];
  order?: number;
} 

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  initials: string;
  img?: string;
}

  
export interface Update {
  id: string;
  title: string;
  body: string;
  type: "info" | "important";
  isPublished: boolean;
  createdAt: Timestamp;
}