import { ImageWithFallback } from "../figma/ImageWithFallback";
import AuCieffaLogo from "@/assets/au-cieffa.jpg";
import AfribaPayLogo from "@/assets/afribapay.jpg";
import LeTextoLogo from "@/assets/letexto.png";
import MinaderLogo from "@/assets/minader.jpg";

const partners = [
  {
    name: "AU CIEFFA / AU GO-GAL",
    logo: AuCieffaLogo,
    role: "Support & mentorship",
    description: "Support and mentorship helping Si-Tcha develop its approach, build strategic connections, and prepare for its next stage of growth.",
  },
  {
    name: "AfribaPay",
    logo: AfribaPayLogo,
    role: "Financial & payments partner",
    description: "Payment APIs covering 16 African countries enable farmers to receive harvest proceeds directly through the app and pay for seeds, agricultural inputs, and production machinery. The integration supports clear bookkeeping and helps cooperative groups manage and redistribute funds.",
  },
  {
    name: "MINADER",
    logo: MinaderLogo,
    role: "Strategic & institutional partner",
    description: "Cameroon’s Ministry of Agriculture and Rural Development helps GICs navigate the administrative procedures needed to access funding and grants through agricultural programs and projects that support farmers and advance the sector.",
  },
  {
    name: "LeTexto",
    logo: LeTextoLogo,
    role: "SMS delivery partner",
    description: "SMS routing supports the delivery of agronomic insights and alerts to farmers on basic mobile phones, helping useful information reach rural communities without mobile internet.",
  },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="cowrie-surface py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our partner ecosystem</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">The partnerships behind every growing season.</h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-2xl mx-auto leading-relaxed">From mentorship and farmer communication to payments and access to funding programs, our partners help connect production with markets and stronger cooperative finances.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {partners.map(({ name, logo, role, description }) => (
            <article key={name} className="bg-card border border-border rounded-2xl p-7">
              <div className="w-48 h-24 rounded-xl bg-white border border-border/50 p-3 mb-6 flex items-center justify-center">
                <ImageWithFallback src={logo} alt={`${name} logo`} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{role}</p>
              <h3 className="font-bold text-xl mb-3">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


