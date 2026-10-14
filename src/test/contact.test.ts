import { describe, it, expect, vi } from "vitest";
import { CONTACT_ENDPOINT, isValidEndpoint, sendContact } from "../contact";
const fields = {
  name: " Test Person ",
  email: "test@example.com",
  message: "A test enquiry about a mobile application.",
  website: "",
};
describe("contact delivery", () => {
  it("only accepts the intended recipient or a public Formspree form URL", () => {
    expect(isValidEndpoint(CONTACT_ENDPOINT)).toBe(true);
    expect(isValidEndpoint("https://formspree.io/f/abc123")).toBe(true);
    for (const endpoint of [
      "",
      "https://evil.example/f/test",
      "https://formsubmit.co/ajax/other@example.com",
      "https://formspree.io/f/test?redirect=evil",
    ])
      expect(isValidEndpoint(endpoint)).toBe(false);
  });
  it("never sends to an invalid destination", async () => {
    const fetcher = vi.fn();
    await expect(sendContact("", fields, fetcher)).rejects.toThrow(
      "unavailable",
    );
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("rejects invalid and honeypot submissions before network access", async () => {
    const fetcher = vi.fn();
    await expect(
      sendContact(CONTACT_ENDPOINT, { ...fields, email: "bad" }, fetcher),
    ).rejects.toThrow("valid email");
    await expect(
      sendContact(CONTACT_ENDPOINT, { ...fields, website: "spam" }, fetcher),
    ).rejects.toThrow("Unable");
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("posts to the intended recipient and distinguishes submission from inbox delivery", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          success: "true",
          message: "The form was submitted successfully.",
        }),
      });
    await expect(sendContact(CONTACT_ENDPOINT, fields, fetcher)).resolves.toBe(
      "submitted",
    );
    const [url, request] = fetcher.mock.calls[0];
    expect(url).toBe(CONTACT_ENDPOINT);
    expect(request.method).toBe("POST");
    expect(JSON.parse(request.body)).toEqual(
      expect.objectContaining({
        name: "Test Person",
        email: "test@example.com",
        message: fields.message,
        _honey: "",
        _subject: "New portfolio enquiry — Rejaul Karim",
      }),
    );
    expect(JSON.parse(request.body)).not.toHaveProperty("_captcha");
  });
  it("does not disguise activation as delivery", async () => {
    await expect(
      sendContact(
        CONTACT_ENDPOINT,
        fields,
        vi
          .fn()
          .mockResolvedValue({
            ok: true,
            json: async () => ({
              success: false,
              message:
                "Please activate your form using the email confirmation.",
            }),
          }),
      ),
    ).resolves.toBe("activation-required");
  });
  it("supports an optional configured Formspree endpoint", async () => {
    await expect(
      sendContact(
        "https://formspree.io/f/test",
        fields,
        vi
          .fn()
          .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
      ),
    ).resolves.toBe("submitted");
  });
  it("does not report success on HTTP errors or an unconfirmed body", async () => {
    for (const response of [
      { ok: false, status: 500 },
      { ok: true, json: async () => ({ success: false }) },
    ])
      await expect(
        sendContact(
          CONTACT_ENDPOINT,
          fields,
          vi.fn().mockResolvedValue(response),
        ),
      ).rejects.toThrow();
  });
  it("explains rate limits, offline and timeouts", async () => {
    await expect(
      sendContact(
        CONTACT_ENDPOINT,
        fields,
        vi.fn().mockResolvedValue({ ok: false, status: 429 }),
      ),
    ).rejects.toThrow("Too many");
    await expect(
      sendContact(
        CONTACT_ENDPOINT,
        fields,
        vi.fn().mockRejectedValue(new TypeError("network")),
      ),
    ).rejects.toThrow("Connection failed");
    const err = new Error("abort");
    err.name = "AbortError";
    await expect(
      sendContact(CONTACT_ENDPOINT, fields, vi.fn().mockRejectedValue(err)),
    ).rejects.toThrow("timed out");
  });
});
