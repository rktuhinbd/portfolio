import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  FiArrowUpRight,
  FiArrowLeft,
  FiArrowRight,
  FiX,
  FiMenu,
  FiDownload,
  FiEye,
  FiLayers,
  FiActivity,
  FiSmartphone,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiSend,
  FiCode,
  FiAward,
  FiSettings,
} from "react-icons/fi";
import {
  SiKotlin,
  SiFlutter,
  SiJetpackcompose,
  SiAndroid,
} from "react-icons/si";
import {
  profile,
  technologies,
  experience,
  projects,
  stackGroups,
  type Technology,
} from "./content";
import { CONTACT_ENDPOINT, isValidEndpoint, sendContact } from "./contact";
import { LocaleProvider, useLocale } from "./i18n";
function MediumIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="6.5" cy="12" rx="5.5" ry="6" />
      <ellipse cx="16" cy="12" rx="3" ry="5.7" />
      <ellipse cx="22" cy="12" rx="1" ry="5" />
    </svg>
  );
}
const base = import.meta.env.BASE_URL;
const nav = [
  ["about", "About Me"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["resume", "Résumé"],
  ["contact", "Contact"],
];
const icons = {
  compose: SiJetpackcompose,
  architecture: FiLayers,
  kotlin: SiKotlin,
  flutter: SiFlutter,
  flow: FiActivity,
  about: FiCode,
};
function Tags({ items }: { items: string[] }) {
  const { t } = useLocale();
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{t(item)}</span>
      ))}
    </div>
  );
}
function Label({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span>{n}</span>
      <small>— {children}</small>
    </div>
  );
}
function Glass({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      document.documentElement.dataset.motion === "off"
    )
      return;
    const el = event.currentTarget,
      r = el.getBoundingClientRect(),
      x = (event.clientX - r.left) / r.width,
      y = (event.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 5}deg`);
  }
  return (
    <div
      className={`glass ${className}`}
      style={style}
      onPointerMove={move}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--rx", "0deg");
        e.currentTarget.style.setProperty("--ry", "0deg");
      }}
    >
      {children}
    </div>
  );
}
function Dots({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      visible = false,
      dirty = true;
    const pointer = {
      x: -9999,
      y: -9999,
    };
    const parent = canvas.parentElement!;
    function resize() {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
      draw();
    }
    function draw() {
      if (!visible && !dirty) return;
      ctx!.clearRect(0, 0, width, height);
      for (let y = 12; y < height; y += 30)
        for (let x = 12; x < width; x += 30) {
          const dx = x - pointer.x,
            dy = y - pointer.y,
            d = Math.hypot(dx, dy),
            force = !paused && d < 150 ? 1 - d / 150 : 0;
          ctx!.fillStyle = `rgba(92,139,247,${0.12 + force * 0.65})`;
          ctx!.beginPath();
          ctx!.arc(
            x + (d ? dx / d : 0) * force * 12,
            y + (d ? dy / d : 0) * force * 12,
            0.8 + force,
            0,
            Math.PI * 2,
          );
          ctx!.fill();
        }
      dirty = false;
    }
    function move(e: globalThis.PointerEvent) {
      if (paused || e.pointerType !== "mouse") return;
      const r = parent.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    }
    function leave() {
      pointer.x = -9999;
      pointer.y = -9999;
      dirty = true;
      draw();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) {
        dirty = true;
        draw();
      }
    });
    intersection.observe(parent);
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    resize();
    return () => {
      observer.disconnect();
      intersection.disconnect();
      cancelAnimationFrame(frame);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [paused]);
  return <canvas ref={ref} className="dots" aria-hidden="true" />;
}
function SkillDialog({
  skill,
  onClose,
}: {
  skill: Technology | null;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const dialog = useRef<HTMLDialogElement>(null),
    source = useRef<HTMLElement | null>(null),
    origin = useRef("none"),
    closing = useRef(false),
    animation = useRef<Animation | null>(null);
  useEffect(() => {
    if (!skill || !dialog.current) return;
    const element = dialog.current;
    source.current = document.activeElement as HTMLElement | null;
    const from = source.current?.getBoundingClientRect();
    element.showModal();
    closing.current = false;
    const to = element.getBoundingClientRect(),
      old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const isPhone = source.current?.classList.contains("tech-phone");
    const scale = isPhone && from ? Math.min(0.8, from.width / to.width) : 0.82;
    const dx = from ? from.left + from.width / 2 - (to.left + to.width / 2) : 0;
    const dy = from
      ? from.top + from.height / 2 - (to.top + to.height / 2)
      : 30;
    origin.current = `translate(${dx}px,${dy}px) rotate(${isPhone ? -25 : 0}deg) scale(${scale})`;
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      element.animate
    ) {
      animation.current = element.animate(
        [
          {
            transform: origin.current,
            opacity: 0.2,
          },
          {
            transform: "translate(0,0) rotate(0deg) scale(1)",
            opacity: 1,
          },
        ],
        {
          duration: 680,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "both",
        },
      );
    }
    return () => {
      animation.current?.cancel();
      element.close();
      document.body.style.overflow = old;
      source.current?.focus({
        preventScroll: true,
      });
    };
  }, [skill?.id]);
  function close() {
    if (closing.current) return;
    closing.current = true;
    const element = dialog.current;
    if (
      !element?.animate ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      onClose();
      return;
    }
    animation.current?.cancel();
    element.classList.add("closing");
    animation.current = element.animate(
      [
        {
          transform: "none",
          opacity: 1,
        },
        {
          transform: origin.current,
          opacity: 0,
        },
      ],
      {
        duration: 380,
        easing: "cubic-bezier(.4,0,.2,1)",
        fill: "both",
      },
    );
    animation.current.finished.then(onClose).catch(() => {});
  }
  if (!skill) return null;
  const Icon = icons[skill.id as keyof typeof icons];
  return (
    <dialog
      ref={dialog}
      className="skill-dialog"
      aria-labelledby="skill-title"
      aria-describedby="skill-description"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="dialog-content"
        style={
          {
            "--accent": skill.color,
          } as CSSProperties
        }
      >
        <button
          className="icon-button close"
          aria-label={t("Close technology details")}
          onClick={close}
        >
          <FiX />
        </button>
        {skill.id === "about" ? (
          <img
            className="dialog-portrait"
            src={`${base}assets/portrait.webp`}
            alt={t("Md. Rejaul Karim")}
          />
        ) : (
          <Icon className="dialog-icon" />
        )}
        <p className="mono blue">{t(skill.label)}</p>
        <h2 id="skill-title">{t(skill.name)}</h2>
        <p id="skill-description">{t(skill.description)}</p>
        <div className="evidence">
          <span className="mono">{t("IN PRACTICE")}</span>
          <p>{t(skill.evidence)}</p>
        </div>
        <Tags items={skill.tags} />
        <div className="dialog-metric">
          <strong>{t(skill.metric)}</strong>
          <span>{t(skill.metricLabel)}</span>
        </div>
      </div>
    </dialog>
  );
}
function magneticMove(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const el = event.currentTarget,
    rect = el.getBoundingClientRect();
  // Compensate for the current translation so the magnetic target stays stable.
  const transform = getComputedStyle(el).transform,
    matrix = new DOMMatrixReadOnly(
      transform === "none" ? undefined : transform,
    );
  const dx = event.clientX - (rect.left - matrix.m41 + rect.width / 2),
    dy = event.clientY - (rect.top - matrix.m42 + rect.height / 2);
  const strength = el.classList.contains("email-card") ? 0.3 : 0.35;
  el.style.transform = `translate(${dx * strength}px,${dy * strength}px)`;
}
function magneticLeave(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.transform = "translate(0px,0px)";
}
export function ContactForm({
  endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || CONTACT_ENDPOINT,
}: {
  endpoint?: string;
}) {
  const { t } = useLocale();
  const [status, setStatus] = useState<
      "idle" | "sending" | "success" | "error" | "pending"
    >("idle"),
    [message, setMessage] = useState("");
  const sending = useRef(false);
  const configured = isValidEndpoint(endpoint);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setStatus("sending");
    setMessage("Sending your message…");
    try {
      const result = await sendContact(endpoint, {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
        website: String(data.get("website") || ""),
      });
      if (result === "activation-required") {
        setStatus("pending");
        setMessage(
          "Email activation is pending. The site owner must confirm FormSubmit’s activation email before messages can be delivered.",
        );
      } else {
        setStatus("success");
        setMessage("Thanks! Your message was submitted. I’ll reply by email.");
        form.reset();
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again or use the email link.",
      );
    } finally {
      sending.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label={t("Send a message")}
    >
      <div className="form-heading">
        <h3>{t("Tell me what you\u2019re building.")}</h3>
        <FiArrowUpRight />
      </div>
      <div className="form-row">
        <label>
          {t("Your name")}
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder={t("Your name")}
            disabled={status === "sending"}
          />
        </label>
        <label>
          {t("Email address")}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder={t("you@company.com")}
            disabled={status === "sending"}
          />
        </label>
      </div>
      <label>
        {t("Message")}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder={t("A project, a role, or an idea\u2026")}
          disabled={status === "sending"}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          {t("Leave this blank")}
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-footer">
        <p>
          {configured
            ? t(
                "Your name, email and message are sent via FormSubmit so I can reply.",
              )
            : t(
                "Message delivery is unavailable. Please use the email link above.",
              )}
        </p>
        <button
          className="button primary"
          type="submit"
          disabled={!configured || status === "sending"}
        >
          {t(status === "sending" ? "Sending…" : "Send message")}
          <FiSend />
        </button>
      </div>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {t(message)}
      </p>
    </form>
  );
}
export default function App() {
  return (
    <LocaleProvider>
      <Portfolio />
    </LocaleProvider>
  );
}
function Portfolio() {
  const { language, setLanguage, t } = useLocale();
  const [skill, setSkill] = useState<Technology | null>(null),
    [menu, setMenu] = useState(false),
    [active, setActive] = useState(""),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState("");
  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const carousel = useRef<HTMLDivElement>(null),
    copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
  }, [paused]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setPaused(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      {
        rootMargin: "-15% 0px -65% 0px",
      },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError("");
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopyError(
        "Copy unavailable. Select the email address or use the email link.",
      );
    }
  }
  const reveal = paused
    ? {}
    : {
        initial: {
          opacity: 0,
          y: 24,
        },
        whileInView: {
          opacity: 1,
          y: 0,
        },
        viewport: {
          once: true,
          amount: 0.08,
        },
        transition: {
          duration: 0.75,
        },
      };
  return (
    <MotionConfig reducedMotion={paused ? "always" : "user"}>
      <a className="skip" href="#main">
        {t("Skip to content")}
      </a>
      <header className="header">
        <a className="brand" href="#hero" aria-label={t("Rejaul Karim home")}>
          {t("rk")}
          <span>.</span>
        </a>
        <nav aria-label={t("Primary")} className={menu ? "nav open" : "nav"}>
          {nav.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenu(false)}
            >
              {t(label)}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            onClick={() => setLanguage(language === "en" ? "bn" : "en")}
            aria-label={
              language === "en" ? "Switch to Bengali" : "Switch to English"
            }
          >
            <span lang="en" className={language === "en" ? "selected" : ""}>
              {t("EN")}
            </span>
            <span aria-hidden="true">/</span>
            <span lang="bn" className={language === "bn" ? "selected" : ""}>
              বাংলা
            </span>
          </button>
          <a className="button primary header-cta" href="#contact">
            {t("Let\u2019s talk ")}
            <FiArrowUpRight />
          </a>
          <button
            className="icon-button mobile-menu"
            aria-label={t(menu ? "Close navigation" : "Open navigation")}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="hero" className="hero">
          <motion.div className="hero-copy" {...reveal}>
            <p className="hero-eyebrow mono">{t("MD. REJAUL KARIM")}</p>
            <h1>
              {t("Rejaul")}
              <br /> {t("Karim")}
              <span>.</span>
            </h1>
            <p className="role">{t(profile.role)}</p>
            <ul className="hero-stack">
              <li>
                <FiSmartphone />
                {t("Kotlin + Jetpack Compose")}
              </li>
              <li>
                <FiLayers />
                {t("Clean Architecture + MVVM")}
              </li>
              <li>
                <FiActivity />
                {t("Flutter + Mobile Systems")}
              </li>
            </ul>
            <div className="hero-buttons">
              <a className="button primary" href="#projects">
                {t("See my work ")}
                <FiArrowUpRight />
              </a>
              <a className="button button-outline" href="#resume">
                {t("Download CV")}
              </a>
            </div>
            <div className="hero-social">
              <button
                aria-label={t("Explore Kotlin")}
                onClick={() => setSkill(technologies[2])}
              >
                <SiKotlin
                  style={{
                    color: "#a775ff",
                  }}
                />
              </button>
              <button
                aria-label={t("Explore Android and Compose")}
                onClick={() => setSkill(technologies[0])}
              >
                <SiAndroid
                  style={{
                    color: "#85c887",
                  }}
                />
              </button>
              <button
                aria-label={t("Explore Flutter")}
                onClick={() => setSkill(technologies[3])}
              >
                <SiFlutter
                  style={{
                    color: "#5daaff",
                  }}
                />
              </button>
              <span className="divider" />
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label={t("GitHub")}
              >
                <FiGithub />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={t("LinkedIn")}
              >
                <FiLinkedin />
              </a>
              <a
                href="https://medium.com/@rktuhinbd"
                target="_blank"
                rel="noreferrer"
                aria-label={t("Medium")}
              >
                <MediumIcon />
              </a>
            </div>
          </motion.div>
          <div
            className="collage"
            aria-label={t("Explore my technology stack")}
          >
            <div className="collage-grid">
              {technologies.map((tech, index) => {
                const Icon = icons[tech.id as keyof typeof icons];
                return (
                  <div
                    key={tech.id}
                    className={`phone-position position-${index}`}
                  >
                    <button
                      className={`tech-phone phone-${tech.id}`}
                      onClick={() => setSkill(tech)}
                      style={
                        {
                          "--accent": tech.color,
                          "--delay": `${index * -1.1}s`,
                        } as CSSProperties
                      }
                      aria-label={`Explore ${t(tech.name)}`}
                    >
                      {tech.id === "about" ? (
                        <>
                          <img
                            src={`${base}assets/portrait.webp`}
                            alt=""
                            className="phone-portrait"
                          />
                          <div className="phone-profile">
                            <span className="mono blue">
                              {t("BEHIND THE CODE")}
                            </span>
                            <h3>
                              {t("Rejaul")}
                              <br /> {t("Karim.")}
                            </h3>
                            <p>{t("Senior Mobile Engineer")}</p>
                            <span className="phone-hint">
                              {t("Get to know me ")}
                              <FiArrowUpRight />
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="phone-top mono">
                            {t(tech.label)}
                          </span>
                          <Icon className="phone-icon" />
                          <h3>{t(tech.name)}</h3>
                          <p>{t(tech.short)}</p>
                          <div className="phone-stat">
                            <strong>{t(tech.metric)}</strong>
                            <span>{t(tech.metricLabel)}</span>
                          </div>
                          <span className="phone-hint">
                            {t("Explore stack ")}
                            <FiArrowUpRight />
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div
          className="ticker"
          aria-label={t(
            "Kotlin, Compose, Flutter, Clean Architecture, Coroutines, Room, Hilt, GitHub Actions",
          )}
        >
          <div>
            {[0, 1].map((n) => (
              <span key={n} aria-hidden={n === 1}>
                {[
                  "KOTLIN",
                  "JETPACK COMPOSE",
                  "FLUTTER",
                  "MVVM",
                  "CLEAN ARCHITECTURE",
                  "COROUTINES",
                  "ROOM",
                  "HILT",
                  "GITHUB ACTIONS",
                ].map((s) => (
                  <span className="ticker-item" key={s}>
                    {t(s)}
                    <i>◆</i>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <section id="about" className="section dotted">
          <Dots paused={paused} />
          <div className="container">
            <Label n="01">{t("ABOUT ME")}</Label>
            <div className="about-grid">
              <motion.div {...reveal}>
                <h2>
                  {t("Thoughtful ")}
                  <em>{t("code.")}</em>
                  <br /> {t("Real-world")}
                  <br /> {t("mobile impact.")}
                </h2>
                <div className="body-copy">
                  <p>
                    {t("I\u2019m a Senior Mobile Engineer based in ")}
                    <strong>{t("Dhaka, Bangladesh")}</strong>
                    {t(
                      ", with 8+ years building Android and cross-platform products people rely on.",
                    )}
                  </p>
                  <p>
                    {t(
                      "From learning experiences to banking and hardware-integrated POS systems, I bring ",
                    )}
                    <strong>
                      {t(
                        "Kotlin, Jetpack Compose, Flutter, and Clean Architecture",
                      )}
                    </strong>
                    {t(" together to solve real product challenges.")}
                  </p>
                  <p>
                    {t("Most recently at ")}
                    <strong>{t("VALT")}</strong>
                    {t(
                      ", I modernized Android POS/KDS systems and built reusable infrastructure across a 12-device hardware fleet.",
                    )}
                  </p>
                </div>
              </motion.div>
              <Glass className="profile-card">
                <div className="profile-heading">
                  <img
                    src={`${base}assets/portrait.webp`}
                    alt="Md. Rejaul Karim"
                    width="100"
                    height="100"
                  />
                  <div>
                    <h3>{t(profile.name)}</h3>
                    <p className="mono">
                      {t("Android \xB7 Flutter \xB7 Architecture")}
                    </p>
                    <span className="location-pill">
                      {t("Dhaka, Bangladesh")}
                    </span>
                  </div>
                </div>
                <p>
                  <strong>{t("Hi, I\u2019m Rejaul.")}</strong>
                </p>
                <p>
                  {t(
                    "I care about clear architecture, smooth interfaces, and the details that make mobile products dependable.",
                  )}
                </p>
                <p>
                  {t(
                    "I\u2019ve worked across EdTech, FinTech, consumer apps, and POS, turning complex requirements into production-ready experiences.",
                  )}
                </p>
                <dl>
                  <div>
                    <dt>{t("Location")}</dt>
                    <dd>{t("Dhaka, BD")}</dd>
                  </div>
                  <div>
                    <dt>{t("Focus")}</dt>
                    <dd>{t("Mobile engineering")}</dd>
                  </div>
                  <div>
                    <dt>{t("Experience")}</dt>
                    <dd>{t("8+ years")}</dd>
                  </div>
                </dl>
                <div className="profile-stats">
                  <div>
                    <strong>{t("100K+")}</strong>
                    <span>{t("active users served*")}</span>
                  </div>
                  <div>
                    <strong>{t("30+")}</strong>
                    <span>{t("UI components built*")}</span>
                  </div>
                </div>
                <small className="metric-note">
                  {t("*At 10 Minute School")}
                </small>
              </Glass>
            </div>
            <div className="mobile-skills" aria-label={t("Technology details")}>
              {technologies
                .filter((t) => t.id !== "about")
                .map((tech) => (
                  <button key={tech.id} onClick={() => setSkill(tech)}>
                    {t(tech.name)}
                    <FiArrowUpRight />
                  </button>
                ))}
            </div>
          </div>
        </section>
        <section id="experience" className="section">
          <div className="container">
            <Label n="02">{t("EXPERIENCE")}</Label>
            <motion.h2 {...reveal}>
              {t("Where I\u2019ve been")}
              <br /> <em>{t("building.")}</em>
            </motion.h2>
            <p className="mono blue subsection-title">
              {t("// WORK EXPERIENCE")}
            </p>
            <ol className="timeline">
              {experience.map((job) => (
                <li
                  className={`timeline-item ${job.earlier ? "has-progression" : ""}`}
                  key={job.company}
                >
                  <div className="tenure">
                    <span className="period mono">
                      {t(job.earlier ? "AUG 2021 — JUN 2025" : job.period)}
                    </span>
                    {job.earlier && (
                      <span className="tenure-caption">{t("Full tenure")}</span>
                    )}
                  </div>
                  <div className="job">
                    {job.earlier ? (
                      <>
                        <h3 className="company-title">{t(job.company)}</h3>
                        <p className="company">{t(job.location)}</p>
                        <p className="progression-label mono">
                          {t("Career progression")}
                        </p>
                        <div className="role-progression">
                          <div className="progression-step">
                            <span className="promotion-badge">
                              {t("Promoted \xB7 May 2023")}
                            </span>
                            <h4>{t(job.role)}</h4>
                            <p className="mono period">{t(job.period)}</p>
                            <ul>
                              {job.points.map((point) => (
                                <li key={point}>{t(point)}</li>
                              ))}
                            </ul>
                            <Tags items={job.tags} />
                          </div>
                          <div className="progression-step">
                            <h4>{t(job.earlier.role)}</h4>
                            <p className="mono period">
                              {t(job.earlier.period)}
                            </p>
                            <ul>
                              {job.earlier.points.map((point) => (
                                <li key={point}>{t(point)}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3>{t(job.role)}</h3>
                        <p className="company">
                          {t(job.company)}
                          <span>{t(job.location)}</span>
                        </p>
                        <ul>
                          {job.points.map((point) => (
                            <li key={point}>{t(point)}</li>
                          ))}
                        </ul>
                        <Tags items={job.tags} />
                      </>
                    )}
                  </div>
                  {job.milestone && (
                    <aside className="milestone">
                      <span className="mono">{t("CAREER MILESTONE")}</span>
                      <h4>{t(job.milestone)}</h4>
                      <p>{t(job.metric!)}</p>
                    </aside>
                  )}
                </li>
              ))}
            </ol>
            <p className="mono blue subsection-title">{t("// EDUCATION")}</p>
            <div className="education">
              <span className="mono period">2013 — 2018</span>
              <div>
                <h3>{t("BSc, Computer Science & Software Engineering")}</h3>
                <p>
                  {t("American International University Bangladesh (AIUB)")}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="section dotted">
          <Dots paused={paused} />
          <div className="container">
            <Label n="03">{t("SELECTED WORK")}</Label>
            <motion.h2 {...reveal}>
              {t("Selected ")}
              <em>{t("projects,")}</em>
              <br /> {t("built for real life.")}
            </motion.h2>
            <p className="section-intro">
              {t(
                "A few of the mobile products I\u2019ve helped bring to life.",
              )}
            </p>
            <div
              className="project-grid"
              ref={carousel}
              tabIndex={0}
              aria-label={t("Selected projects, scroll horizontally on mobile")}
            >
              {projects.map((project, i) => (
                <Glass
                  className="project-card"
                  key={t(project.name)}
                  style={
                    {
                      "--accent": project.color,
                    } as CSSProperties
                  }
                >
                  <article>
                    <div className="project-visual">
                      <div className="project-visual-top">
                        <FiSmartphone />
                        <span className="mono">
                          0{i + 1}
                          {t(" / MOBILE ENGINEERING")}
                        </span>
                      </div>
                      <strong>{t(project.result)}</strong>
                      <span>{t(project.resultLabel)}</span>
                      <div className="project-visual-bottom">
                        <span>{t(project.name)}</span>
                        <FiArrowUpRight />
                      </div>
                    </div>
                    <p className="mono project-category">
                      {t(project.category)}
                    </p>
                    <h3>{t(project.name)}</h3>
                    <p className="project-description">
                      {t(project.description)}
                    </p>
                    <Tags items={project.tags} />
                    {project.url ? (
                      <a
                        className="button white"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t(project.link)}
                        <FiArrowUpRight />
                      </a>
                    ) : (
                      <p className="private-note">
                        <FiCode />
                        {t(project.link)}
                      </p>
                    )}
                  </article>
                </Glass>
              ))}
            </div>
            <div className="carousel-controls">
              <button
                className="icon-button"
                aria-label={t("Previous project")}
                onClick={() =>
                  carousel.current?.scrollBy({
                    left: -carousel.current.clientWidth,
                    behavior: paused ? "instant" : "smooth",
                  })
                }
              >
                <FiArrowLeft />
              </button>
              <span>{t("Swipe to explore")}</span>
              <button
                className="icon-button"
                aria-label={t("Next project")}
                onClick={() =>
                  carousel.current?.scrollBy({
                    left: carousel.current.clientWidth,
                    behavior: paused ? "instant" : "smooth",
                  })
                }
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </section>
        <section id="resume" className="section">
          <div className="container">
            <Label n="04">{t("R\xC9SUM\xC9")}</Label>
            <div className="resume-grid">
              <motion.div {...reveal}>
                <h2>
                  {t("The short")}
                  <br /> <em>{t("version")}</em> —<br /> {t("or the PDF.")}
                </h2>
                <p className="section-intro">
                  {t(
                    "Eight years of mobile engineering, in a little more detail. Explore my experience, skills, and training.",
                  )}
                </p>
                <div className="resume-buttons">
                  <a
                    className="button white"
                    href={`${base}resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiEye />
                    {t("View r\xE9sum\xE9")}
                  </a>
                  <a
                    className="button button-outline"
                    href={`${base}resume.pdf`}
                    download="MD_REJAUL_KARIM_Senior_Mobile_Engineer_Resume.pdf"
                  >
                    <FiDownload />
                    {t("Download PDF")}
                  </a>
                </div>
              </motion.div>
              <div className="stack-grid">
                {stackGroups.map((group, i) => (
                  <Glass
                    className={`stack-card stack-${i}`}
                    key={t(group.title)}
                  >
                    <p className="mono blue">
                      {i === 0 ? (
                        <FiSmartphone />
                      ) : i === 1 ? (
                        <FiSettings />
                      ) : (
                        <FiAward />
                      )}
                      {t(group.label)}
                    </p>
                    <h3>{t(group.title)}</h3>
                    <Tags items={group.items} />
                  </Glass>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="section dotted contact">
          <Dots paused={paused} />
          <div className="container">
            <Label n="05">{t("GET IN TOUCH")}</Label>
            <motion.h2 {...reveal}>
              {t("Have a mobile")}
              <br /> <em>{t("idea?")}</em>
              <br /> {t("Let\u2019s build it.")}
            </motion.h2>
            <div className="contact-links">
              <div
                className="email-card"
                onPointerMove={magneticMove}
                onPointerLeave={magneticLeave}
              >
                <a href={`mailto:${profile.email}`}>
                  <FiArrowUpRight />
                  <span>{profile.email}</span>
                </a>
                <button onClick={copy} aria-label={t("Copy email address")}>
                  {copied ? <FiCheck /> : <FiCopy />}
                  <span>{t(copied ? "COPIED" : "COPY")}</span>
                </button>
              </div>
              <p className="copy-feedback" role="status">
                {t(copied ? "Email address copied." : copyError)}
              </p>
              <div className="social-cards">
                <a
                  onPointerMove={magneticMove}
                  onPointerLeave={magneticLeave}
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>01</span>
                  {t("GitHub")}
                  <FiArrowUpRight />
                </a>
                <a
                  onPointerMove={magneticMove}
                  onPointerLeave={magneticLeave}
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>02</span>
                  {t("LinkedIn")}
                  <FiArrowUpRight />
                </a>
                <a
                  onPointerMove={magneticMove}
                  onPointerLeave={magneticLeave}
                  href="https://medium.com/@rktuhinbd"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>03</span>
                  <MediumIcon />
                  {t("Medium")}
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
            <ContactForm />
            <footer>
              <span>
                © {new Date().getFullYear()}
                {t(" \xB7 MD. REJAUL KARIM \xB7 DHAKA")}
              </span>
              <span>
                {t("BUILT WITH ")}
                <b>{t("CARE.")}</b>
                {t(" SHIPPED WITH PURPOSE.")}
              </span>
              <a href="#hero">
                {t("Back to top ")}
                <FiArrowUpRight />
              </a>
            </footer>
          </div>
        </section>
      </main>
      <SkillDialog skill={skill} onClose={() => setSkill(null)} />
    </MotionConfig>
  );
}
