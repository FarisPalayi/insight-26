import { type ContactPerson } from "@/types";

export const CONTACTS: ContactPerson[] = [
  {
    name: "Abhinav C",
    role: "Program Coordinator",
    phone: "9847313815",
    initials: "A",
    img: "avatars/abhinav.jpeg"
  },
  {
    name: "Ansiba k",
    role: "Program Coordinator",
    phone: "7510659785",
    initials: "AK",
  },
  {
    name: "Muhammed Faris P",
    role: "Technical Lead",
    phone: "9072402532",
    initials: "MF",
  },
];

export const EMAIL_CONFIG = {
  address: "insightcuc@gmail.com",
  label: "Official Email",
} as const;

export const API_CONFIG = {
  contactEndpoint: "/api/contact",
} as const;

export const FORM_VALIDATION = {
  name: {
    min: 1,
    max: 100,
  },
  email: {
    max: 255,
  },
  subject: {
    min: 1,
    max: 150,
  },
  message: {
    min: 10,
    max: 1000,
  },
} as const;
