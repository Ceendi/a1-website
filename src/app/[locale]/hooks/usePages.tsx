import React from "react";
import { useLocale, useTranslations } from "next-intl";
import HomeContent from "../components/tabs/HomeContent";
import ProjectsContent from "../components/tabs/ProjectsContent";
import BlogContent from "../components/tabs/BlogContent";
import AboutContent from "../components/tabs/AboutContent";

export interface Page {
  id: string;
  label: string;
  path: string;
  content?: React.ReactNode;
}

export function usePages(): Page[] {
  const t = useTranslations("");
  const locale = useLocale();

  const prefix = locale === "pl" ? "" : `/${locale}`;

  return React.useMemo<Page[]>(
    () => [
      {
        id: "home",
        label: t("HOME"),
        path: locale === "pl" ? "/" : `/${locale}`,
        content: <HomeContent />,
      },
      {
        id: "projects",
        label: t("PROJECTS"),
        path: `${prefix}/projects`,
        content: <ProjectsContent />,
      },
      {
        id: "blog",
        label: t("BLOG"),
        path: `${prefix}/blog`,
        content: <BlogContent />,
      },
      {
        id: "about",
        label: t("ABOUT"),
        path: `${prefix}/about`,
        content: <AboutContent />,
      },
    ],
    [t, prefix, locale]
  );
}
