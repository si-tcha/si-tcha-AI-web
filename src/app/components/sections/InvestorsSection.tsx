import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWeglot } from "../../hooks/useWeglot";

export default function InvestorsSection() {
  const { lang } = useWeglot();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section ref={sectionRef} data-revealed={revealed} translate="no" id="investors" className="py-16 px-6" style={{ background: "var(--section-background)", scrollMarginTop: "4rem" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("Investors & partners", "Investisseurs & partenaires")}</span>
          <h2 className="investor-heading investor-reveal text-3xl lg:text-4xl font-bold mt-2 mb-5">
            {t("Invest in agriculture.", "Investir dans l’agriculture.")}<br />
            <span className="text-primary">{t("Start with the market.", "Commencer par le marché.")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">{t("Connect buyer demand, agronomic advice and farming groups. Help us bring a service built for rural realities to the field.", "Relier la demande des acheteurs, le conseil agronomique et les GIC. Construisons un service adapté aux réalités rurales.")}</p>
          <a href={lang === "fr" ? "/fr/investisseurs/" : "/en/investors/"} className="site-cta inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold">{t("Become a partner", "Devenir partenaire")} <ArrowRight className="w-4 h-4 shrink-0" /></a>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: t("Market access", "Des débouchés"), body: t("Connect buyers and farmers before planting.", "Rapprocher acheteurs et producteurs avant les semis.") },
            { title: t("Rural access", "Un accès rural"), body: t("Combine satellite insights and advice by SMS.", "Associer suivi satellite et conseils par SMS.") },
            { title: t("Next steps", "Les prochaines étapes"), body: t("Develop the app, buyer partnerships and GIC support.", "Développer l’application, les partenariats acheteurs et l’accompagnement des GIC.") },
            { title: t("Measurable impact", "Un impact mesurable"), body: t("Track sales, farmer margins and post-harvest losses.", "Suivre les ventes, les marges agricoles et les pertes après récolte.") },
          ].map(({ title, body }, index) => (
            <div key={index} style={{ animationDelay: `${index * 80}ms` }} className="investor-reveal bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
