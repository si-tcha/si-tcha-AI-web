import { useWeglot } from "../../hooks/useWeglot";
import FarmerDashboard from "./FarmerDashboard";
import { ArrowRight, Zap } from "lucide-react";
import BackgroundArea from "@/assets/area.webp";

export default function HeroSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section translate="no" className="hero-section compact-section relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--background)" }}>
        <img
          src={BackgroundArea}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        {/* Warm gradient overlay matching the logo's orange-to-forest palette */}
        <div className="absolute inset-0"
          style={{
            background: "var(--hero-overlay)"
          }}
        />
        <div className="absolute inset-0"
          style={{
            background: "var(--hero-shade)"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-6 grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-5 lg:gap-10 items-center w-full">

        {/* Left: headline */}
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
            style={{ background: "rgba(var(--brand-orange-rgb),0.15)", borderColor: "rgba(var(--brand-orange-rgb),0.3)" }}>
            <Zap className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--primary)" }}>
              {t("Women-led agritech", "L’agritech au féminin")}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.12] tracking-tight mb-4 max-w-2xl"
            style={{ color: "var(--hero-foreground)" }}>
            {t("Sell before you produce.", "Vendez avant de produire.")}
          </h1>

          <p className="text-base lg:text-lg leading-relaxed mb-5 max-w-xl"
            style={{ color: "var(--hero-muted)" }}>
            {t("Connecting women farmers, buyers and agronomists, even beyond mobile internet.", "Relier agricultrices, acheteurs et agronomes, même sans Internet mobile.")}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#investors" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:brightness-110"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "0 8px 24px rgba(var(--brand-orange-rgb),0.35)" }}>
              {t("Back the pilot", "Soutenir le pilote")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ border: "1px solid var(--muted-foreground)", color: "var(--hero-foreground)" }}>
              {t("Join us", "Nous rejoindre")}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(var(--text-rgb),0.1)" }}>
            {[{ val: "1 GIC", label: t("Test group", "Groupe test") }, { val: "10", label: t("Women farmers", "Agricultrices") }, { val: "3 GICs", label: t("Launch goal", "Objectif") }].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{s.val}</div>
                <div className="text-xs mt-0.5 font-medium" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full min-w-0"><FarmerDashboard /></div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }} />
    </section>
  );
}

