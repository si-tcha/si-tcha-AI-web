import { useWeglot } from "../../hooks/useWeglot";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import AuCieffaLogo from "@/assets/au-cieffa.jpg";
import AfribaPayLogo from "@/assets/afribapay.jpg";
import LeTextoLogo from "@/assets/letexto.png";
import MinaderLogo from "@/assets/minader.jpg";


export default function PartnersSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  const partners = [
    {
      name: "AU-CIEFFA",
      logo: AuCieffaLogo,
      description: t("Mentorship and support for our development.", "Mentorat et accompagnement du projet."),
    },
    {
      name: "AfribaPay",
      logo: AfribaPayLogo,
      description: t("Payment APIs for harvest proceeds, purchases and cooperative accounts, covering 16 African countries.", "API de paiement : récoltes, achats et comptes coopératifs dans 16 pays africains."),
    },
    {
      name: "MINADER",
      logo: MinaderLogo,
      description: t("Guidance on administrative steps and public agricultural funding programs.", "Appui aux démarches et aux programmes de financement agricole."),
    },
    {
      name: "LeTexto",
      logo: LeTextoLogo,
      description: t("SMS infrastructure for advice and alerts on basic phones.", "Conseils et alertes par SMS sur téléphone simple."),
    },
  ];
  return (
    <section translate="no" id="partners" className="compact-section cowrie-surface py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="cowrie-copy text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">{t("Our partners", "Nos partenaires")}</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">{t("Expertise that moves us forward.", "Des expertises complémentaires.")}</h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-2xl mx-auto leading-relaxed">{t("Mentorship, payments, public programs and rural communication.", "Mentorat, paiements, programmes publics et SMS.")}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
          {partners.map(({ name, logo, description }) => (
            <article key={name} className="bg-card border border-border rounded-2xl p-7">
              <div className="w-32 h-14 rounded-xl bg-white border border-border/50 p-2 mb-3 flex items-center justify-center">
                <ImageWithFallback src={logo} alt={`${name} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
              <h3 className="font-bold text-xl mb-3">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

