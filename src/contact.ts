export const CONTACT_ENDPOINT =
  "https://formsubmit.co/ajax/rejaul.karim.pro@gmail.com";
export function isValidEndpoint(endpoint: string) {
  return (
    endpoint === CONTACT_ENDPOINT ||
    /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)
  );
}
export type ContactFields = {
  name: string;
  email: string;
  message: string;
  website: string;
};
export async function sendContact(
  endpoint: string,
  fields: ContactFields,
  transport: typeof fetch = fetch,
): Promise<"submitted" | "activation-required"> {
  if (!isValidEndpoint(endpoint))
    throw new Error(
      "Message delivery is unavailable. Please use the email link above.",
    );
  if (fields.website)
    throw new Error("Unable to send this message. Please try again.");
  if (
    !fields.name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ||
    fields.message.trim().length < 10
  )
    throw new Error(
      "Please enter your name, a valid email and a message of at least 10 characters.",
    );
  const controller = new AbortController(),
    timeout = setTimeout(() => controller.abort(), 15000);
  const formsubmit = endpoint === CONTACT_ENDPOINT;
  const body = {
    name: fields.name.trim(),
    email: fields.email.trim(),
    message: fields.message.trim(),
    ...(formsubmit
      ? {
          _honey: fields.website,
          _subject: "New portfolio enquiry — Rejaul Karim",
          _template: "table",
          _url: "https://rktuhinbd.github.io/portfolio/",
        }
      : { _gotcha: fields.website }),
  };
  try {
    const response = await transport(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok)
      throw new Error(
        response.status === 429
          ? "Too many requests. Please wait a moment and try again."
          : "Your message could not be sent. Please try again or use the email link.",
      );
    const data = await response.json();
    if (
      formsubmit &&
      typeof data.message === "string" &&
      /activat|confirm.*email/i.test(data.message)
    )
      return "activation-required";
    const accepted = formsubmit
      ? data.success === true || data.success === "true"
      : data.ok === true;
    if (!accepted)
      throw new Error(
        "Delivery could not be confirmed. Please try again or use the email link.",
      );
    return "submitted";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError")
      throw new Error(
        "The request timed out. Delivery is unconfirmed; please check before retrying.",
      );
    if (error instanceof TypeError)
      throw new Error(
        "Connection failed. Please check your internet connection and try again.",
      );
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
