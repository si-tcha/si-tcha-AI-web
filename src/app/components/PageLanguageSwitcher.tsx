import { Globe } from "lucide-react";

type Language = "fr" | "en";
/** Shared header control for native pages and interactive articles. */
export default function PageLanguageSwitcher({ current, links, onSelect }: {
  current: Language; links?: Partial<Record<Language, string>>; onSelect?: (language: Language) => void;
}) {
  return <div translate="no" className="react-interactive flex items-center gap-1 rounded-full border border-border px-2 py-1" role="group" aria-label={current === "fr" ? "Langue de la page" : "Page language"}>
    <Globe className="w-4 h-4 mr-1" aria-hidden="true" />
    {(["fr", "en"] as const).map(language => {
      const style = `px-2 py-1 rounded-full text-xs font-semibold focus-visible:outline-2 focus-visible:outline-ring ${current === language ? "bg-primary text-primary-foreground" : "text-foreground"}`;
      return onSelect ? <button key={language} type="button" aria-pressed={current === language} onClick={() => onSelect(language)} className={style}>{language.toUpperCase()}</button>
        : <a key={language} href={links?.[language]} hrefLang={language} lang={language} aria-current={current === language ? "page" : undefined} className={style}>{language.toUpperCase()}</a>;
    })}
  </div>;
}
