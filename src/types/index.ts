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
