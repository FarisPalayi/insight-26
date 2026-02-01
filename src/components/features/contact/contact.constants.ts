import { type ContactPerson } from "@/types";

export const CONTACTS: ContactPerson[] = [
  {
    name: "Contact Person 1",
    role: "Event Coordinator",
    phone: "+919876543210",
    initials: "CP",
  },
  {
    name: "Contact Person 2",
    role: "Technical Lead",
    phone: "+919876543211",
    initials: "TL",
  },
  {
    name: "Contact Person 3",
    role: "Registration Head",
    phone: "+919876543212",
    initials: "RH",
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
