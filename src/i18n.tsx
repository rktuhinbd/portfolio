import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { bn } from "./translations.bn";
export type Language = "en" | "bn";
export function translate(text: string, language: Language) {
  if (language === "en") return text;
  const key = text.trim(),
    translated = bn[text] || bn[key];
  return translated ? text.replace(key, translated) : text;
}
const LocaleContext = createContext({
  language: "en" as Language,
  setLanguage: (() => {}) as (language: Language) => void,
  t: (text: string) => text,
});
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "bn" ? "bn" : "en";
    } catch {
      return "en";
    }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Storage can be disabled without affecting translation. */
    }
    document.title =
      language === "bn"
        ? "মোঃ রেজাউল করিম — সিনিয়র মোবাইল ইঞ্জিনিয়ার"
        : "Md. Rejaul Karim — Senior Mobile Engineer";
  }, [language]);
  return (
    <LocaleContext.Provider
      value={{ language, setLanguage, t: (text) => translate(text, language) }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
export const useLocale = () => useContext(LocaleContext);
