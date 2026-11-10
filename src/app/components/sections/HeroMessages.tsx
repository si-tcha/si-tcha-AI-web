import { useEffect, useState } from "react";
import { useWeglot } from "../../hooks/useWeglot";

const messages = [
  { fr: ["Vendre avant de produire.", "N’attendez plus la récolte : trouvez vos acheteurs et négociez vos prix avant les premiers semis pour limiter les pertes."], en: ["Sell before you produce.", "Find buyers and negotiate prices before your first seeds are sown, rather than waiting for harvest, to help limit losses."] },
  { fr: ["Surveiller vos parcelles.", "Suivez l’état de vos cultures et les conditions au champ tout au long de la saison grâce à l’agriculture de précision."], en: ["Monitor your plots.", "Track crop health and field conditions throughout the growing season with precision agriculture."] },
  { fr: ["Maîtriser vos finances.", "Estimez chaque dépense de production et faites le bilan de votre récolte : coûts, pertes et bénéfices."], en: ["Manage your finances.", "Estimate every production expense and review your harvest results: costs, losses and profits."] },
  { fr: ["Anticiper les aléas climatiques.", "Adaptez vos semis, l’irrigation et vos interventions aux prévisions météo pour protéger vos cultures et limiter les pertes."], en: ["Anticipate weather risks.", "Adapt sowing, irrigation and field work to weather forecasts to protect your crops and help limit losses."] },
];

export default function HeroMessages() {
  const { lang } = useWeglot();
  const [frame, setFrame] = useState({ index: 0, title: messages[0][lang][0], body: messages[0][lang][1] });
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let index = 0, titleLength = 0, bodyLength = 0;
    let phase: "title" | "body" | "hold" | "eraseBody" | "eraseTitle" = "title";
    const publish = () => setFrame({ index, title: messages[index][lang][0].slice(0, titleLength), body: messages[index][lang][1].slice(0, bodyLength) });
    const schedule = (delay: number) => { timer = setTimeout(tick, delay); };
    const tick = () => {
      if (document.hidden) { schedule(250); return; }
      const [title, body] = messages[index][lang];
      if (phase === "title") {
        titleLength++;
        publish();
        if (titleLength >= title.length) { phase = "body"; schedule(350); }
        else schedule(34);
      } else if (phase === "body") {
        bodyLength++;
        publish();
        if (bodyLength >= body.length) { phase = "hold"; schedule(5500); }
        else schedule(/[,:;]/.test(body[bodyLength - 1]) ? 100 : 16);
      } else if (phase === "hold") {
        phase = "eraseBody"; schedule(0);
      } else if (phase === "eraseBody") {
        bodyLength = Math.max(0, bodyLength - 4); publish();
        if (bodyLength === 0) { phase = "eraseTitle"; schedule(180); }
        else schedule(20);
      } else {
        titleLength = Math.max(0, titleLength - 2); publish();
        if (titleLength === 0) { index = (index + 1) % messages.length; phase = "title"; schedule(250); }
        else schedule(25);
      }
    };
    const restart = () => {
      clearTimeout(timer);
      index = 0; titleLength = 0; bodyLength = 0; phase = "title";
      if (preference.matches) setFrame({ index: 0, title: messages[0][lang][0], body: messages[0][lang][1] });
      else { publish(); schedule(250); }
    };
    restart();
    preference.addEventListener("change", restart);
    return () => { clearTimeout(timer); preference.removeEventListener("change", restart); };
  }, [lang]);
  return (
    <div translate="no" className="hero-messages" aria-live="off">
      <div className="hero-type-title-slot">
        {messages.map((message, index) => <div key={index} className="hero-message-title hero-type-measure font-bold tracking-tight" aria-hidden="true">{message[lang][0]}</div>)}
        <h1 className="hero-message-title font-bold tracking-tight" aria-label={messages[frame.index][lang][0]} style={{ color: "var(--hero-foreground)" }}><span aria-hidden="true">{frame.title}</span></h1>
      </div>
      <div className="hero-type-body-slot max-w-xl">
        {messages.map((message, index) => <div key={index} className="hero-message-body hero-type-measure" aria-hidden="true">{message[lang][1]}</div>)}
        <p className="hero-message-body" aria-label={messages[frame.index][lang][1]} style={{ color: "var(--hero-muted)" }}><span aria-hidden="true">{frame.body}</span></p>
      </div>
    </div>
  );
}
