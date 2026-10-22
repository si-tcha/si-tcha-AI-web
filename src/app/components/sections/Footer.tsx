import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "@/assets/logo.png";
import { navLinks } from "../../data/navigation";
import { seoPages } from "../../data/seoPages";
import { useWeglot } from "../../hooks/useWeglot";

const pageLabels: Record<string, string> = {
  "farmers-groups": "Farmers & GICs", "agriculteurs-gic": "Agriculteurs et GIC",
  buyers: "Buyers", acheteurs: "Acheteurs", agronomists: "Agronomists", agronomes: "Agronomes",
  investors: "Investors", investisseurs: "Investisseurs", project: "Our project", projet: "Notre projet",
  pilot: "The pilot", pilote: "Le pilote",
};

export default function Footer() {
  const { lang } = useWeglot();
  return (
    <footer className="compact-footer py-10 px-6" style={{ background: "var(--footer-background)", color: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <ImageWithFallback
                src={logoImage}
                alt="Si-Tcha AI logo"
                translate="no"
                className="w-9 h-9 rounded-full object-cover"
                loading="lazy"
              />
              <span data-brand translate="no" className="font-bold text-lg" style={{ color: "#FFFFFF" }}>Si-Tcha AI</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.72)" }}>
              {"Sell before you produce. Built with rural women in Cameroon."}
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#F3A261" }} />
              <span className="text-xs" style={{ fontFamily: '"DM Mono", monospace', color: "rgba(255,255,255,0.72)" }}>
                Built for rural access
              </span>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.72)" }}>
              {"Sitemap"}
            </div>
            <div className="flex flex-col gap-2.5">
              {["Home", "About", "Investors", "Partners", "Contact"].map((link) => (
                <a key={link} href={navLinks[link] || "#"}
                  className="text-sm transition-colors"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F3A261")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)")}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.72)" }}>
              {"Contact"}
            </div>
            <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
              <a href="mailto:contact@si-tcha.com">contact@si-tcha.com</a>
              <a href="tel:+237670463484">+237 670 463 484</a>
              <span className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Yaoundé, Cameroon<br />République du Cameroun
              </span>
            </div>
          </div>
        </div>

        <div translate="no" lang={lang} className="react-interactive mb-10 pt-8 border-t border-white/10">
          <p className="font-semibold mb-4">{lang === "fr" ? "Découvrir Si-Tcha AI" : "Explore Si-Tcha AI"}</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
            {seoPages.filter(page => page.lang === lang && !["/en/pilot/", "/fr/pilote/"].includes(page.path)).map(page => (
              <li key={page.path}>
                <a className="hover:underline underline-offset-4" href={page.path} hrefLang={lang}>
                  {pageLabels[page.path.split("/")[2]]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.72)" }}>{"© 2026 Si-Tcha AI SARL. All rights reserved."}</span>
          <span className="text-xs" style={{ fontFamily: '"DM Mono", monospace', color: "rgba(255,255,255,0.72)" }}>
            {"Our roots nourish the future."}
          </span>
        </div>
      </div>
    </footer>
  );
}
