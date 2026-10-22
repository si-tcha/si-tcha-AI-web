import { useWeglot } from "../../hooks/useWeglot";
import FarmerDashboard from "./FarmerDashboard";
import { ArrowRight, Zap } from "lucide-react";
import BackgroundArea from "@/assets/area.webp";

export default function HeroSection() {
  const { lang } = useWeglot();
  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-6 grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-10 xl:gap-16 items-center w-full">

        {/* Left: headline */}
        <div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-7"
            style={{ background: "rgba(var(--brand-orange-rgb),0.15)", borderColor: "rgba(var(--brand-orange-rgb),0.3)" }}>
            <Zap className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--primary)" }}>
              {"From buyer demand to better harvests"}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.12] tracking-tight mb-6 max-w-2xl"
            style={{ color: "var(--hero-foreground)" }}>
            {"Sell before you produce."}
          </h1>

          <p className="text-base lg:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: "var(--hero-muted)" }}>
            {"Connect farmers with buyers before planting. Si-Tcha AI brings market coordination, agronomic intelligence, and SMS advice together so cooperatives can plan production around demand and reduce the uncertainty of selling after harvest."}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#investors" className="site-cta inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-95 hover:brightness-110"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "0 8px 24px rgba(var(--brand-orange-rgb),0.35)" }}>
              <span translate="no">{lang === "fr" ? "Devenir partenaire" : "Become a partner"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="site-cta inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ border: "1px solid var(--muted-foreground)", color: "var(--hero-foreground)" }}>
              <span translate="no">{lang === "fr" ? "Nous rejoindre" : "Join us"}</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-8 pt-6"
            style={{ borderTop: "1px solid rgba(var(--text-rgb),0.1)" }}>
            {[{ val: "5", label: "GICs in the pilot" }, { val: "Highlands", label: "Cameroon pilot region" }, { val: "SMS", label: "Reaching basic phones" }].map((s) => (
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

