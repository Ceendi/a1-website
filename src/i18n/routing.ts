import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["pl", "en"],

  localePrefix: "as-needed",
  // Used when no locale matches
  defaultLocale: "pl",
});
