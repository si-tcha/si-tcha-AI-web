import { useEffect, useState } from "react";
import PageLanguageSwitcher from "./PageLanguageSwitcher";
import { useWeglot } from "../hooks/useWeglot";
import type { SeoPage as Page } from "../data/seoPages";
import englishArticle from "../data/ndviArticle.en.html?raw";
import SeoPage from "./SeoPage";

export default function ArticlePage({ page }: { page: Page }) {
  const { lang, ready, switchLanguage } = useWeglot();
  const [chosen, setChosen] = useState<"fr" | "en" | null>(null);
  const current = chosen ?? (ready ? lang : page.lang);
  useEffect(() => { document.documentElement.lang = current; }, [current]);
  const source = current === "en" ? {
    ...page, lang: "en" as const,
    title: "Understanding NDVI and chlorophyll | Si-Tcha AI",
    heading: "From green leaves to satellite imagery: understanding NDVI with Si-Tcha AI",
    intro: "A green leaf can tell us a lot about a plant. But how can we observe a whole field from home? Explore the link between chlorophyll, satellite images and NDVI in simple terms.",
    articleHtml: englishArticle, cta: "Talk to Si-Tcha AI",
  } : page;
  const switcher = <PageLanguageSwitcher current={current} onSelect={language => { setChosen(language); if (ready) switchLanguage(language); }} />;
  // Both editorial versions are native: Weglot manages the visitor language,
  // while React renders the matching article without DOM translation conflicts.
  return <div translate="no"><SeoPage page={source} languageSwitcher={switcher} /></div>;
}
