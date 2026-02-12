import { type ContactFormValues } from "./contact.schema";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY!;

export class ContactServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactServiceError";
  }
}

export const contactService = {
  sendMessage(data: ContactFormValues) {
    return emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name: data.name,
        email: data.email,
        reply_to: data.email, // THIS enables “Reply directly”
        subject: data.subject,
        message: data.message,
        time: new Date().toLocaleString(),
        name_initial: data.name.trim().charAt(0).toUpperCase(),
      },
      PUBLIC_KEY
    );
  },
};
