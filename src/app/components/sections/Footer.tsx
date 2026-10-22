import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "@/assets/logo.png";
import { navLinks } from "../../data/navigation";
import { seoPages } from "../../data/seoPages";

export default function Footer() {
  return (
    <footer className="py-16 px-6" style={{ background: "var(--footer-background)", color: "#FFFFFF" }}>
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
              {"Sell before you produce. Connecting buyer demand, farmer organization, and agronomic intelligence in Cameroon."}
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
              {["Home", "Pilot", "About", "Investors", "Partners", "Contact"].map((link) => (
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

        <div className="mb-10 pt-8 border-t border-white/10">
          <p className="font-semibold mb-4">Explore Si-Tcha AI / Découvrir le projet</p>
          <div className="grid sm:grid-cols-2 gap-6">{(["en", "fr"] as const).map(lang => <div key={lang} lang={lang} translate="no"><p className="text-xs uppercase tracking-widest mb-3">{lang === "fr" ? "Français" : "English"}</p><ul className="space-y-2 text-sm">{seoPages.filter(page => page.lang === lang).map(page => <li key={page.path}><a className="hover:underline" href={page.path} hrefLang={lang}>{page.title.split(" — ")[0]}</a></li>)}</ul></div>)}</div>
        </div>
        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.72)" }}>{"© 2026 Si-Tcha AI SARL. All rights reserved."}</span>
          <span className="text-xs" style={{ fontFamily: '"DM Mono", monospace', color: "rgba(255,255,255,0.72)" }}>
            {"Rooted in Cameroon. Built for rural opportunity."}
          </span>
        </div>
      </div>
    </footer>
  );
}
