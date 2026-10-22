import { useWeglot } from "../../hooks/useWeglot";
import type { ElementType } from "react";
import { Wifi, MessageSquare, FileCheck, Shield, Leaf, Users, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "@/assets/logo.png";
import AboutImage from "@/assets/AboutImage.webp";

const iconMap: Record<string, ElementType> = {
  Wifi,
  MessageSquare,
  FileCheck,
  Shield,
};

export default function AboutSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section translate="no" id="about" className="compact-section py-24 px-6"
      style={{ background: "var(--section-background)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* Left: copy */}
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            {t("Our approach", "Notre approche")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
            {t("A market first. Better decisions next.", "Un débouché d’abord. Des choix éclairés ensuite.")}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-base">
            {t("We are building an offline-first platform that brings buyers, agronomists and farming groups together.", "Nous développons une plateforme accessible hors ligne, reliant acheteurs, agronomes et GIC.")}
          </p>

          <div className="grid grid-cols-2 gap-3.5">
            {[
  { icon: "Wifi", label: t("Buyer connections", "Débouchés"), desc: t("Discuss demand before planting.", "Identifier la demande avant de semer.") },
  { icon: "MessageSquare", label: t("Advice by SMS", "Conseils par SMS"), desc: t("Designed for basic phones.", "Pour les téléphones simples.") },
  { icon: "FileCheck", label: t("Satellite insights", "Suivi satellite"), desc: t("Track crops, weather and soil conditions.", "Suivre cultures, météo et sols.") },
  { icon: "Shield", label: t("Stronger GICs", "GIC renforcés"), desc: t("Support organization and access to funding programs.", "Faciliter l’organisation et l’accès aux financements.") },
].map((pillar) => {
              const Icon = iconMap[pillar.icon];
              return (
                <div key={pillar.label}
                  className="flex gap-3.5 p-4 rounded-xl border border-border bg-card transition-all hover:border-primary/40">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(var(--brand-orange-rgb),0.12)" }}>
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{pillar.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{pillar.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: ecosystem diagram */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-[300px] aspect-square rounded-3xl overflow-hidden border border-border"
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
