import { useTranslations } from "next-intl";

export default function ProjectsContent() {
  const t = useTranslations("");
  return (
    <div className="w-screen h-screen flex items-center justify-center lg:ml-48 lg:mr-48">
      <h1 className="text-6xl font-bold">{t("PROJECTS_PAGE")}</h1>
    </div>
  );
}
