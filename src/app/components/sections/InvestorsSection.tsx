import { useWeglot } from "../../hooks/useWeglot";
import { ArrowRight } from "lucide-react";

export default function InvestorsSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section translate="no" id="investors" className="compact-section py-24 px-6" style={{ background: "var(--section-background)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("Investors & partners", "Investisseurs & partenaires")}</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-6">{t("Help rural women grow their businesses.", "Faites grandir l’entrepreneuriat rural féminin.")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t("We connect market access, agronomic advice and rural entrepreneurship. Our next milestone: turn the prototype into a working field service.", "Marchés, conseil agronomique et entrepreneuriat. Prochaine étape : tester notre application sur le terrain.")}</p>

            <a href={lang === "fr" ? "/fr/investisseurs/" : "/en/investors/"} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold">{t("Discuss the next milestone", "Échanger avec nous")} <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="space-y-4">
            {[
              { title: t("Field validation", "Validation terrain"), body: t("1 GIC and 10 women farmers enrolled. Initial diagnosis completed.", "1 GIC, 10 agricultrices. Diagnostic initial réalisé.") },
              { title: t("Product development", "Développement produit"), body: t("App design completed. Offline-first, SMS and satellite integrations in progress.", "Design terminé. Mode hors ligne, SMS et satellite en cours.") },
              { title: t("Commercial next steps", "Prochains objectifs"), body: t("Buyer discussions underway. First pre-harvest contracts and GIC funding are the next goals.", "Acheteurs en discussion. Viser les premiers contrats avant récolte et financements GIC.") },
            ].map(({ title, body }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

