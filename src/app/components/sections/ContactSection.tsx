import { useRef, useState, type FormEvent } from "react";
import { submitContact } from "../../lib/contact";
import { useWeglot } from "../../hooks/useWeglot";
import { Mail, Phone, ArrowRight, Send, CheckCircle, Loader2, Smartphone } from "lucide-react";


export default function ContactSection() {
  const { lang } = useWeglot();
  const french: Record<string, string> = {
    "Full Name": "Nom complet", "Email Address": "Adresse e-mail", "Organization": "Organisation", "Subject": "Objet", "Message": "Message",
    "Message Sent!": "Message envoyé !", "Send another message": "Envoyer un autre message", "Send Message": "Envoyer le message", "Sending...": "Envoi en cours…",
    "Thank you! Your message has been submitted. The Si-Tcha team will get back to you shortly.": "Merci ! Votre message a été transmis. L’équipe Si-Tcha AI vous répondra prochainement.",
    "Your details will be sent to the Si-Tcha team via Formspree so we can respond to your enquiry.": "Vos informations seront transmises à l’équipe Si-Tcha AI via Formspree pour répondre à votre demande.",
    "Association of Watermelon Farmers of the West": "Association des producteurs de pastèques de l’Ouest",
    "Pilot participation, crop sourcing, or investment": "Participation au pilote, approvisionnement ou investissement",
    "Tell us your role, location, and what you would like to build with Si-Tcha.": "Présentez votre activité, votre localisation et votre projet avec Si-Tcha AI.",
  };
  const t = (text: string) => lang === "fr" ? french[text] || text : text;
  const [form, setForm] = useState({
    name: "", email: "", org: "", subject: "", message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sending = useRef(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending.current) return;
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("_gotcha")?.toString() || "";
    sending.current = true;
    setFormStatus("submitting");

    try {
      await submitContact(form, honeypot);
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
    } finally {
      sending.current = false;
    }
  };

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "var(--contact-background)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            {"Build the next growing season with us"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            {"Let’s turn demand into opportunity."}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-lg mx-auto leading-relaxed">
            {"Represent a farming group? Need a dependable crop supply? Bring agronomic expertise or investment capital? Tell us where you fit, and let’s discuss the next step."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: channels */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-bold text-foreground">{"Talk to the Si-Tcha team"}</h3>

            <a href="mailto:contact@si-tcha.com"
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl transition-all group hover:-translate-y-0.5"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--brand-orange-rgb),0.4)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(var(--brand-orange-rgb),0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ background: "rgba(var(--brand-orange-rgb),0.1)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(var(--brand-orange-rgb),0.2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(var(--brand-orange-rgb),0.1)")}>
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Email</div>
                <div className="font-semibold text-foreground text-sm">contact@si-tcha.com</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </a>

            <a href="https://wa.me/237670463484" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl transition-all group hover:-translate-y-0.5"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--brand-green-rgb),0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(var(--brand-green-rgb),0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(var(--brand-green-rgb),0.06)" }}>
                <Phone className="w-5 h-5" style={{ color: "var(--brand-green)" }} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">WhatsApp</div>
                <div className="font-semibold text-foreground text-sm">+237 670 463 484</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* SMS note */}
            <div className="p-5 rounded-2xl border"
              style={{ background: "rgba(var(--brand-orange-rgb),0.06)", borderColor: "rgba(var(--brand-orange-rgb),0.18)" }}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(var(--brand-orange-rgb),0.15)" }}>
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">Built for basic phones</span>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse ml-auto" style={{ background: "var(--primary)" }} />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{"Internet access should not determine who gets useful farming advice. SMS delivery helps reach rural farmers on the phones they already use."}</p>
            </div>
          </div>

          {/* Right: form */}
          <div translate="no" className="react-interactive bg-card border border-border rounded-2xl p-7 min-h-[580px] flex flex-col">
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center h-full gap-4">
                <CheckCircle className="w-16 h-16 text-emerald-500" />
                <h3 className="text-2xl font-bold text-foreground">{t("Message Sent!")}</h3>
                <p className="text-muted-foreground max-w-xs">
                  {t("Thank you! Your message has been submitted. The Si-Tcha team will get back to you shortly.")}
                </p>
                <button
                  onClick={() => {
                    setForm({ name: "", email: "", org: "", subject: "", message: "" });
                    setFormStatus("idle");
                  }}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-xl transition-all active:scale-[0.98] hover:brightness-110"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  {t("Send another message")}
                </button>
              </div>
            ) : (
              <form action="https://formspree.io/f/mbdewvkb" method="POST" onSubmit={handleSubmit} aria-busy={formStatus === "submitting"} className="flex flex-col gap-5 h-full">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Full Name", type: "text", ph: "Fonkou" },
                    { key: "email", label: "Email Address", type: "email", ph: "fonkou@gic.cm" },
                  ].map(({ key, label, type, ph }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label htmlFor={key} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {t(label)}
                      </label>
                      <input id={key} name={key} type={type} placeholder={t(ph)} required
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="px-4 py-3 rounded-xl text-foreground text-sm transition-all focus:outline-none placeholder:text-muted-foreground/75"
                        style={{ background: "var(--input-background)", border: "1px solid var(--input)" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary)";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(var(--brand-orange-rgb),0.12)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--input)";
                          e.currentTarget.style.boxShadow = "";
                        }}
                      />
                    </div>
                  ))}
                </div>

                {[
                  { key: "org", label: "Organization", ph: "Association of Watermelon Farmers of the West", req: false },
                  { key: "subject", label: "Subject", ph: "Pilot participation, crop sourcing, or investment", req: true },
                ].map(({ key, label, ph, req }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label htmlFor={key} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {t(label)}
                    </label>
                    <input id={key} name={key} type="text" placeholder={t(ph)} required={req}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="px-4 py-3 rounded-xl text-foreground text-sm transition-all focus:outline-none placeholder:text-muted-foreground/75"
                      style={{ background: "var(--input-background)", border: "1px solid var(--input)" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(var(--brand-orange-rgb),0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--input)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5 flex-1">
                  <label htmlFor="message" className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {"Message"}
                  </label>
                  <textarea id="message" name="message" rows={5} required
                    placeholder={t("Tell us your role, location, and what you would like to build with Si-Tcha.")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="px-4 py-3 rounded-xl text-foreground text-sm transition-all focus:outline-none resize-none placeholder:text-muted-foreground/75 flex-1"
                    style={{ background: "var(--input-background)", border: "1px solid var(--input)" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(var(--brand-orange-rgb),0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--input)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  />
                </div>

                {formStatus === 'error' && (
                  <p role="alert" className="text-destructive text-xs text-center">
                    {lang === "fr" ? "Échec de l’envoi. Réessayez ou écrivez à " : "Unable to send your message. Please try again or email us at "}<a href="mailto:contact@si-tcha.com" className="underline">contact@si-tcha.com</a>.
                  </p>
                )}

                <p className="text-xs text-muted-foreground leading-relaxed">{t("Your details will be sent to the Si-Tcha team via Formspree so we can respond to your enquiry.")}</p>
                <button type="submit"
                  disabled={formStatus === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm rounded-xl transition-all active:scale-[0.98] hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    boxShadow: "0 6px 20px rgba(var(--brand-orange-rgb),0.3)",
                  }}>
                  {formStatus === 'submitting' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {formStatus === 'submitting'
                    ? t("Sending...")
                    : t("Send Message")
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


