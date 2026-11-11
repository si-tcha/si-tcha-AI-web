import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useWeglot } from "../hooks/useWeglot";
import type { SeoPage as Page } from "../data/seoPages";
import englishArticle from "../data/ndviArticle.en.html?raw";
import SeoPage from "./SeoPage";

export default function ArticlePage({ page }: { page: Page }) {
  const { lang, ready, error, switchLanguage } = useWeglot();
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
  const switcher = <div translate="no" className="react-interactive flex items-center gap-1 rounded-full border border-border px-2 py-1" role="group" aria-label={lang === "fr" ? "Langue de l’article" : "Article language"}>
    <Globe className="w-4 h-4 mr-1" aria-hidden="true" />
    {(["fr", "en"] as const).map(language => <button key={language} type="button" aria-pressed={current === language} title={error || (lang === "fr" ? "Changer la langue" : "Change language")} onClick={() => { setChosen(language); if (ready) switchLanguage(language); }} className={`px-2 py-1 rounded-full text-xs font-semibold disabled:opacity-50 ${current === language ? "bg-primary text-primary-foreground" : "text-foreground"}`}>{language.toUpperCase()}</button>)}
    {error && <span role="status" className="text-xs">{lang === "fr" ? "Traduction indisponible" : "Translation unavailable"}</span>}
  </div>;
  // Both editorial versions are native: Weglot manages the visitor language,
  // while React renders the matching article without DOM translation conflicts.
  return <div translate="no"><SeoPage page={source} languageSwitcher={switcher} /></div>;
}
