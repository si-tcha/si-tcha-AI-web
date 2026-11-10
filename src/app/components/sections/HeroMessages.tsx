import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useWeglot } from "../../hooks/useWeglot";

const messages = [
  { fr: ["Vendre avant de produire.", "N’attendez plus la récolte : trouvez vos acheteurs et négociez vos prix avant les premiers semis pour limiter les pertes."], en: ["Sell before you produce.", "Find buyers and negotiate prices before your first seeds are sown, rather than waiting for harvest, to help limit losses."] },
  { fr: ["Surveiller vos parcelles.", "Suivez l’état de vos cultures et les conditions au champ tout au long de la saison grâce à l’agriculture de précision."], en: ["Monitor your plots.", "Track crop health and field conditions throughout the growing season with precision agriculture."] },
  { fr: ["Maîtriser vos finances.", "Estimez chaque dépense de production et faites le bilan de votre récolte : coûts, pertes et bénéfices."], en: ["Manage your finances.", "Estimate every production expense and review your harvest results: costs, losses and profits."] },
  { fr: ["Anticiper les aléas climatiques.", "Adaptez vos semis, l’irrigation et vos interventions aux prévisions météo pour protéger vos cultures et limiter les pertes."], en: ["Anticipate weather risks.", "Adapt sowing, irrigation and field work to weather forecasts to protect your crops and help limit losses."] },
];

export default function HeroMessages() {
  const { lang } = useWeglot();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(value => (value + 1) % messages.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [paused, active]);
  return (
    <div translate="no" className="hero-messages" role="region" aria-label={lang === "fr" ? "Les quatre axes de Si-Tcha AI" : "The four pillars of Si-Tcha AI"} aria-roledescription={lang === "fr" ? "carrousel" : "carousel"}>
      <div className="hero-message-grid" aria-live={paused ? "polite" : "off"}>
        {messages.map((message, index) => {
          const Heading = index === 0 ? "h1" : "h2";
          return <div key={index} className="hero-message" data-active={active === index} aria-hidden={active !== index}>
            <Heading className="hero-message-title font-bold tracking-tight" style={{ color: "var(--hero-foreground)" }}>{message[lang][0]}</Heading>
            <p className="hero-message-body max-w-xl" style={{ color: "var(--hero-muted)" }}>{message[lang][1]}</p>
          </div>;
        })}
      </div>
      <div className="flex items-center gap-2 mb-6">
        {messages.map((message, index) => <button key={index} type="button" className="hero-message-dot" aria-label={`${lang === "fr" ? "Afficher" : "Show"} : ${message[lang][0]}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></button>)}
        <button type="button" className="hero-message-pause" aria-label={lang === "fr" ? (paused ? "Reprendre le défilement" : "Mettre en pause le défilement") : (paused ? "Resume slideshow" : "Pause slideshow")} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
        <span className="text-xs text-muted-foreground" aria-hidden="true">{active + 1} / 4</span>
      </div>
    </div>
  );
}
