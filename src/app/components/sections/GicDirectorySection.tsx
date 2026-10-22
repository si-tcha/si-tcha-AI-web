import { useWeglot } from "../../hooks/useWeglot";
import { ArrowRight, Sprout, Users, MapPin } from "lucide-react";

export default function GicDirectorySection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section translate="no" id="gics" className="compact-section cowrie-surface py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="cowrie-copy max-w-3xl mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">{t("Field progress", "Sur le terrain")}</span>
        <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-5">{t("Built with rural women.", "Avec les femmes rurales.")}</h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed mb-10">
          {t("One GIC of 10 women farmers has joined our test program in Cameroon’s Hauts-Plateaux department.", "Un GIC de 10 agricultrices participe aux tests dans les Hauts-Plateaux, au Cameroun.")}
        </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: t("1 GIC enrolled", "1 GIC engagé"), body: t("10 women farmers. An initial field diagnosis completed.", "10 agricultrices. Un premier diagnostic réalisé.") },
            { icon: MapPin, title: t("3 GICs targeted", "Objectif : 3 GIC"), body: t("Our launch goal: support 30 women farmers.", "Accompagner 30 agricultrices au lancement.") },
            { icon: Sprout, title: t("Prototype in development", "Prototype en développement"), body: t("App design completed; SMS and satellite integrations underway.", "Design terminé. Intégrations SMS et satellite en cours.") },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-6">
              <Icon className="w-6 h-6 text-primary mb-5" />
              <h3 className="font-bold text-lg mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>

            </div>
          ))}
        </div>
        <a href={lang === "fr" ? "/fr/pilote/" : "/en/pilot/"} className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-8">{t("Explore the pilot", "Découvrir le pilote")} <ArrowRight className="w-4 h-4" /></a>
      </div>
    </section>
  );
}

