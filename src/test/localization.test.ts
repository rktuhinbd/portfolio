import { describe, it, expect } from "vitest";
import { bn } from "../translations.bn";
import { translate } from "../i18n";
describe("Bengali language consistency", () => {
  it("uses Bengali script throughout translated UI copy", () => {
    for (const value of Object.values(bn))
      expect(value).not.toMatch(/[A-Za-z]/);
  });
  it("transliterates technology and social labels without changing English mode", () => {
    for (const key of [
      "Jetpack Compose",
      "Kotlin",
      "Flutter",
      "GitHub",
      "LinkedIn",
      "Medium",
      "Kotlin + Jetpack Compose",
      "Clean Architecture + MVVM",
    ]) {
      expect(translate(key, "bn")).not.toMatch(/[A-Za-z]/);
      expect(translate(key, "en")).toBe(key);
    }
  });
});
