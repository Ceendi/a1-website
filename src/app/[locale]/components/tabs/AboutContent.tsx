import { useTranslations } from "next-intl";

export default function AboutContent() {
  const t = useTranslations("");
  return (
    <div className="w-screen h-screen flex items-center justify-center lg:ml-96">
      <h1 className="text-6xl font-bold">{t("ABOUT_PAGE")}</h1>
    </div>
  );
}
