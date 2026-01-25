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

export interface Sponsor {
  name: string;
  logo?: string;
  website?: string;
}

export interface SponsorTier {
  name: string;
  icon: React.ReactNode;
  sponsors: Sponsor[];
  accentColor: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

