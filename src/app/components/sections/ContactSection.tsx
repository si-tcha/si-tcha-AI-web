import { useRef, useState, type FormEvent } from "react";
import { Mail, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { submitContact } from "../../lib/contact";
import { useWeglot } from "../../hooks/useWeglot";

export default function ContactSection() {
  const { lang } = useWeglot();
  const t = (en: string, fr: string) => lang === "fr" ? fr : en;
  const [form, setForm] = useState({ name: "", email: "", org: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sending = useRef(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const honeypot = new FormData(event.currentTarget).get("_gotcha")?.toString() || "";
    sending.current = true;
    setStatus("submitting");
    try { await submitContact(form, honeypot); setStatus("success"); }
    catch { setStatus("error"); }
    finally { sending.current = false; }
  }
  const fields = [
    { key: "name", label: t("Full name", "Nom complet"), type: "text", required: true, autocomplete: "name" },
    { key: "email", label: t("Email", "E-mail"), type: "email", required: true, autocomplete: "email" },
    { key: "org", label: t("Organization (optional)", "Organisation (facultatif)"), type: "text", required: false, autocomplete: "organization" },
    { key: "subject", label: t("Subject", "Objet"), type: "text", required: true, autocomplete: "off" },
  ] as const;
  return (
    <section id="contact" className="compact-section px-6" style={{ background: "var(--contact-background)" }}>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-6 lg:gap-10 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Let’s work together</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2 mb-3">Build the next season with us.</h2>
          <p className="text-muted-foreground mb-5">Farmer, buyer, agronomist or investor? Let’s talk.</p>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 text-sm">
            <a href="mailto:contact@si-tcha.com" className="flex items-center gap-2 font-semibold break-all"><Mail className="w-4 h-4 shrink-0 text-primary" />contact@si-tcha.com</a>
            <a href="https://wa.me/237670463484" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold"><Phone className="w-4 h-4 shrink-0 text-primary" />WhatsApp</a>
          </div>
        </div>
        <div translate="no" className="react-interactive bg-card border border-border rounded-2xl p-5">
          {status === "success" ? (
            <div role="status" className="min-h-60 flex flex-col items-center justify-center text-center gap-4">
              <CheckCircle className="w-10 h-10 text-secondary" />
              <h3 className="text-xl font-bold">{t("Message sent", "Message envoyé")}</h3>
              <p className="text-sm text-muted-foreground">{t("Thank you. Our team will reply soon.", "Merci. Notre équipe vous répondra prochainement.")}</p>
              <button type="button" className="text-primary font-semibold" onClick={() => { setForm({ name:"", email:"", org:"", subject:"", message:"" }); setStatus("idle"); }}>{t("Send another message", "Envoyer un autre message")}</button>
            </div>
          ) : (
            <form action="https://formspree.io/f/mbdewvkb" method="POST" onSubmit={handleSubmit} aria-busy={status === "submitting"} className="space-y-3">
              <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Leave empty</label><input id="contact-website" name="_gotcha" tabIndex={-1} autoComplete="off" /></div>
              <div className="grid grid-cols-2 gap-3">
                {fields.map(field => <div key={field.key} className="min-w-0"><label htmlFor={field.key} className="block text-xs font-semibold mb-1.5">{field.label}</label><input id={field.key} name={field.key} type={field.type} autoComplete={field.autocomplete} required={field.required} value={form[field.key]} onChange={event => setForm({ ...form, [field.key]: event.target.value })} className="w-full min-w-0 rounded-lg border border-input bg-input-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring" /></div>)}
              </div>
              <div><label htmlFor="message" className="block text-xs font-semibold mb-1.5">{t("Your message", "Votre message")}</label><textarea id="message" name="message" rows={3} required value={form.message} onChange={event => setForm({ ...form, message:event.target.value })} className="w-full rounded-lg border border-input bg-input-background px-3 py-2 text-sm resize-y focus-visible:outline-2 focus-visible:outline-ring" /></div>
              {status === "error" && <p role="alert" className="text-xs text-destructive">{t("Please retry or email contact@si-tcha.com.", "Réessayez ou écrivez à contact@si-tcha.com.")}</p>}
              <p className="text-xs text-muted-foreground">{t("Sent via Formspree to answer your enquiry.", "Transmis via Formspree pour répondre à votre demande.")}</p>
              <button disabled={status === "submitting"} type="submit" className="w-full flex justify-center items-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold disabled:opacity-70">{status === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}{status === "submitting" ? t("Sending…", "Envoi…") : t("Send message", "Envoyer le message")}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
