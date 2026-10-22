import { useWeglot } from "../../hooks/useWeglot";
import { Users, ShoppingBasket, Leaf } from "lucide-react";

export default function AudienceSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  return (
    <section translate="no" className="compact-section cowrie-surface py-24 px-6 bg-background" aria-labelledby="audience-title">
      <div className="max-w-7xl mx-auto">
        <div className="cowrie-copy max-w-3xl mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">{t("Who it is for", "Pour qui ?")}</span>
          <h2 id="audience-title" className="text-3xl lg:text-4xl font-bold mt-2">{t("Your role. Our shared opportunity.", "À chacun son rôle.")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, role: t("Farmers & GICs", "Agriculteurs & GIC"), title: t("Plan your next season.", "Préparez votre saison."), body: t("Join the pilot to shape advice, buyer connections and support for your group.", "Testez les conseils et les débouchés avec votre GIC."), cta: t("Join the pilot", "Rejoindre le pilote") },
            { icon: ShoppingBasket, role: t("Buyers", "Acheteurs"), title: t("Source earlier.", "Anticipez vos achats."), body: t("Share your crop, volume and delivery needs before planting.", "Précisez vos produits, volumes et délais avant les semis."), cta: t("Share your needs", "Partager vos besoins") },
            { icon: Leaf, role: t("Agronomists", "Agronomes"), title: t("Guide field decisions.", "Éclairez les décisions."), body: t("Help turn field observations and satellite insights into practical advice.", "Transformez les données du terrain et du satellite en conseils utiles."), cta: t("Contribute your expertise", "Contribuer") },
          ].map(({ icon: Icon, role, title, body, cta }, index) => (
            <article key={role} className="border border-border rounded-2xl p-7 bg-card flex flex-col">
              <Icon className="w-6 h-6 text-primary mb-5" />
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{role}</p>
              <h3 className="text-xl font-bold mb-4">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{body}</p>
              <a href={(lang === "fr" ? ["/fr/agriculteurs-gic/", "/fr/acheteurs/", "/fr/agronomes/"] : ["/en/farmers-groups/", "/en/buyers/", "/en/agronomists/"])[index]} className="text-sm font-semibold text-primary">{cta} →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

