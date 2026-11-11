import { useWeglot } from "../../hooks/useWeglot";
import ResponsiveCard from "./ResponsiveCard";
import type { ElementType } from "react";
import { Droplets, ScanLine, ShoppingBasket, Leaf, Users, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "@/assets/logo.png";
import AboutImage from "@/assets/AboutImage.webp";

const iconMap: Record<string, ElementType> = { Droplets, ScanLine, ShoppingBasket, Leaf };

export default function AboutSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section translate="no" id="about" className="forest-section py-24 px-6"
      style={{ background: "var(--section-background)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            {t("Our approach", "Notre approche")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
            {t("Grow better. Protect what matters.", "Produire mieux. Préserver l’essentiel.")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 text-base">
            {t("Our ambition: help farmers protect their crops while using water and inputs more wisely. Field observations, satellite monitoring and advice by SMS support targeted decisions, alongside better access to buyers.", "Notre ambition : aider les agriculteurs à protéger leurs cultures tout en raisonnant l’usage de l’eau et des intrants. Observations au champ, suivi satellite et conseils par SMS éclairent les interventions, en complément de l’accès aux acheteurs.")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
  { icon: "ScanLine", label: t("Observe before acting", "Observer avant d’agir"), desc: t("Use field observations and satellite insights to locate changes, then verify their cause before intervening.", "Croiser observations au champ et données satellites pour repérer les changements, puis vérifier leur cause avant d’intervenir.") },
  { icon: "Droplets", label: t("Use water wisely", "Raisonner l’usage de l’eau"), desc: t("Combine forecasts, soil moisture checks and crop needs to guide irrigation and avoid unnecessary watering.", "Croiser prévisions météo, humidité du sol et besoins des cultures pour guider l’irrigation et éviter les apports inutiles.") },
  { icon: "Leaf", label: t("Target inputs", "Cibler les intrants"), desc: t("Base fertiliser and treatment decisions on confirmed needs and agronomic advice, rather than blanket applications.", "Fonder les apports d’engrais et les traitements sur des besoins confirmés et un conseil agronomique, plutôt que sur des applications systématiques.") },
  { icon: "ShoppingBasket", label: t("Limit waste", "Limiter le gaspillage"), desc: t("Align production with buyer demand and identify field problems earlier to help reduce unsold harvests and crop losses.", "Aligner la production sur les besoins des acheteurs et repérer les problèmes au champ pour contribuer à réduire les invendus et les pertes.") },
].map((pillar) => {
              const Icon = iconMap[pillar.icon];
              return (
                <ResponsiveCard key={pillar.label} group="approach" className="approach-accordion" header={<div className="flex items-center gap-3"><Icon className="w-5 h-5 shrink-0 text-primary" /><h3 className="text-sm font-semibold">{pillar.label}</h3></div>}>
                  <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </ResponsiveCard>
              );
            })}
          </div>
        </div>

        {/* Right: ecosystem diagram */}
        <div className="ecosystem-illustration flex items-center justify-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-border"
            style={{ background: "linear-gradient(135deg, rgba(var(--brand-green-rgb),0.05), rgba(var(--brand-orange-rgb),0.08))" }}>
            <img
              src={AboutImage}
              alt="Farmer planting crops — cooperative agriculture"
              className="w-full h-full object-cover opacity-30" loading="lazy"
            />
            {/* Dot-grid overlay */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, var(--brand-green) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }} />

            {/* Ecosystem nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-56 h-56">
                {/* SVG connectors */}
                {[
                  { angle: -90 }, { angle: 30 }, { angle: 150 }
                ].map(({ angle }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x2 = 50 + 43 * Math.cos(rad);
                  const y2 = 50 + 43 * Math.sin(rad);
                  return (
                    <svg key={i} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <line x1="50" y1="50" x2={x2} y2={y2}
                        stroke="var(--primary)" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                    </svg>
                  );
                })}

                {/* Center hub — uses the brand logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-2xl overflow-hidden"
                    style={{ background: "#103D22", boxShadow: "0 8px 32px rgba(var(--brand-green-rgb),0.5)" }}>
                    <ImageWithFallback
                      src={logoImage}
                      alt="Si-Tcha AI"
                      translate="no"
                      className="w-14 h-14 object-cover rounded-full" loading="lazy"
                    />
                  </div>
                </div>

                {/* Satellite nodes */}
                {[
                  { label: [t("Farmers", "Agriculteurs"), t("Buyers", "Acheteurs"), t("Agronomists", "Agronomes")][0], icon: Users, angle: -90, bg: "#103D22" },
                  { label: [t("Farmers", "Agriculteurs"), t("Buyers", "Acheteurs"), t("Agronomists", "Agronomes")][1], icon: TrendingUp, angle: 30, bg: "#BE490B" },
                  { label: [t("Farmers", "Agriculteurs"), t("Buyers", "Acheteurs"), t("Agronomists", "Agronomes")][2], icon: Leaf, angle: 150, bg: "#1C5B3B" },
                ].map(({ label, icon: NodeIcon, angle, bg }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 43 * Math.cos(rad);
                  const y = 50 + 43 * Math.sin(rad);
                  return (
                    <div key={i} className="absolute"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                      <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-lg"
                        style={{ background: bg }}>
                        <NodeIcon className="w-5 h-5 mb-0.5" style={{ color: "var(--on-brand)" }} />
                        <span className="text-[8px] font-semibold" style={{ color: "var(--on-brand)" }}>{label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
