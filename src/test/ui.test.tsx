import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { ContactForm } from "../App";
import { technologies } from "../content";
import { CONTACT_ENDPOINT } from "../contact";
afterEach(() => localStorage.clear());
describe("portfolio interactions", () => {
  it.each(technologies)(
    "opens and closes $name with focus restoration",
    async (tech) => {
      render(<App />);
      const trigger = screen
        .getAllByRole("button", { name: `Explore ${tech.name}` })
        .at(-1)!;
      trigger.focus();
      fireEvent.click(trigger);
      expect(screen.getByRole("dialog")).toHaveAccessibleName(tech.name);
      expect(document.body.style.overflow).toBe("hidden");
      fireEvent.click(
        screen.getByRole("button", { name: "Close technology details" }),
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
      expect(trigger).toHaveFocus();
    },
  );
  it("closes on Escape cancel and backdrop, and contains keyboard focus", () => {
    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: "Explore Jetpack Compose" }),
    );
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Tab" });
    expect(
      screen.getByRole("button", { name: "Close technology details" }),
    ).toHaveFocus();
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: true, cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore Jetpack Compose" }),
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("has valid anchors, résumé download and Medium links", () => {
    render(<App />);
    for (const link of document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    ))
      expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Download PDF" }).getAttribute("href"),
    ).toMatch(/resume.pdf$/);
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "download",
    );
    expect(screen.getByRole("link", { name: "Medium" })).toHaveAttribute(
      "href",
      "https://medium.com/@rktuhinbd",
    );
  });
  it("shows the complete 10 Minute School tenure and both roles without disclosure", () => {
    render(<App />);
    const job = screen.getByText("AUG 2021 — JUN 2025").closest("li")!;
    expect(within(job).getByText("Promoted · May 2023")).toBeVisible();
    expect(within(job).getByText("Associate Software Engineer")).toBeVisible();
    expect(
      within(job).getByText("Specialist, Engineering (Android)"),
    ).toBeVisible();
    expect(job.querySelector("details")).toBeNull();
  });
  it("toggles mobile navigation and closes after choosing a destination", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(
      within(screen.getByRole("navigation")).getByRole("link", {
        name: "Projects",
      }),
    );
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
  it("switches all major sections and forms to Bengali and persists the choice", () => {
    render(<App />);
    const brand = screen.getByRole("link", { name: "Rejaul Karim home" });
    expect(brand).toHaveTextContent("rk.");
    fireEvent.click(screen.getByRole("button", { name: "Switch to Bengali" }));
    expect(document.documentElement.lang).toBe("bn");
    expect(localStorage.getItem("portfolio-language")).toBe("bn");
    expect(screen.getByRole("link", { name: "পরিচিতি" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "আপনার পরিকল্পনার কথা জানান।" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("আপনার নাম")).toBeInTheDocument();
    expect(screen.getByText("আগস্ট ২০২১ — জুন ২০২৫")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "রেজাউল করিম — প্রথম পাতা" }),
    ).toHaveTextContent("rk.");
    fireEvent.click(screen.getByRole("button", { name: "Switch to English" }));
    expect(document.documentElement.lang).toBe("en");
  });
  it("provides honest clipboard feedback", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(
      screen.getByRole("button", { name: "Copy email address" }),
    );
    expect(
      await screen.findByText("Email address copied."),
    ).toBeInTheDocument();
  });
});
describe("contact form UI", () => {
  it("is enabled by default with the recipient already configured", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });
  it("submits once and resets only after acknowledgement", async () => {
    let resolve!: (value: unknown) => void;
    const fetcher = vi.fn().mockImplementation(
      () =>
        new Promise((r) => {
          resolve = r;
        }),
    );
    vi.stubGlobal("fetch", fetcher);
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "Test Person" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "A test enquiry about an app." },
    });
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    fireEvent.submit(screen.getByRole("form"));
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher.mock.calls[0][0]).toBe(CONTACT_ENDPOINT);
    resolve({ ok: true, json: async () => ({ success: true }) });
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("submitted"),
    );
    expect(screen.getByLabelText("Message")).toHaveValue("");
    vi.unstubAllGlobals();
  });
  it("retains content if activation is required", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: false,
          message: "Please activate your form",
        }),
      }),
    );
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "Test Person" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Please discuss my mobile project." },
    });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "activation is pending",
      ),
    );
    expect(screen.getByLabelText("Message")).toHaveValue(
      "Please discuss my mobile project.",
    );
    vi.unstubAllGlobals();
  });
  it("retains the message and offers retry on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "Test Person" },
    });
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Please discuss my mobile project." },
    });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("could not be sent"),
    );
    expect(screen.getByLabelText("Message")).toHaveValue(
      "Please discuss my mobile project.",
    );
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
    vi.unstubAllGlobals();
  });
});
