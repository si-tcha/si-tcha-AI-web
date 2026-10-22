export interface ContactMessage {
  name: string;
  email: string;
  org: string;
  subject: string;
  message: string;
}

export const CONTACT_ENDPOINT = "https://formspree.io/f/mbdewvkb";

export async function submitContact(message: ContactMessage, honeypot = "") {
  if (honeypot) return;

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name: message.name.trim(),
      email: message.email.trim(),
      organization: message.org.trim(),
      subject: `[Si-Tcha AI] ${message.subject.trim()}`,
      message: message.message.trim(),
      _gotcha: honeypot,
    }),
    signal: AbortSignal.timeout(20000),
  });

  const result = await response.json();
  if (!response.ok || result.ok !== true || result.errors?.length) {
    throw new Error("The contact service could not accept your message.");
  }
}
