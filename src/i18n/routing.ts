import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pl", "en"],

  // Used when no locale matches
  defaultLocale: "pl",
  localePrefix: "as-needed",
});
