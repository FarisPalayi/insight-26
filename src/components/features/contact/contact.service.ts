import { API_CONFIG } from "./contact.constants";
import { type ContactFormValues } from "./contact.schema";

export class ContactServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactServiceError";
  }
}

export const contactService = {
  async sendMessage(data: ContactFormValues): Promise<void> {
    try {
      const response = await fetch(API_CONFIG.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ContactServiceError(
          "Failed to send message",
        );
      }
    } catch (error) {
      if (error instanceof ContactServiceError) {
        throw error;
      }
      throw new ContactServiceError("Network error occurred");
    }
  },
};
