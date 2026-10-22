import { seoPages, type SeoPage as Page } from "../data/seoPages";
import logo from "@/assets/logo.png";

export default function SeoPage({ page }: { page: Page }) {
  const french = page.lang === "fr";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <nav aria-label={french ? "Navigation principale" : "Main navigation"} className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 font-bold"><img src={logo} width="40" height="40" alt="Si-Tcha AI" className="rounded-full" />Si-Tcha AI</a>
          <div className="flex gap-5 text-sm"><a href="/">{french ? "Accueil" : "Home"}</a><a href={page.alternate} hrefLang={french ? "en" : "fr"} lang={french ? "en" : "fr"}>{french ? "English" : "Français"}</a><a href="/#contact">Contact</a></div>
        </nav>
      </header>
      <main id="main-content" className="cowrie-surface max-w-5xl mx-auto px-6 py-16">
        <nav aria-label={french ? "Fil d'Ariane" : "Breadcrumb"} className="text-sm text-muted-foreground mb-8"><a href="/">{french ? "Accueil" : "Home"}</a><span aria-hidden="true"> / </span><span aria-current="page">{page.title.split(" — ")[0]}</span></nav>
        <article className="relative z-10 max-w-3xl">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Si-Tcha AI · {french ? "Cameroun" : "Cameroon"}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{page.heading}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{page.intro}</p>
          {page.sections.map(section => <section key={section.title} className="mb-9"><h2 className="text-2xl font-bold mb-3">{section.title}</h2><p className="text-muted-foreground leading-relaxed">{section.body}</p></section>)}
          <a href="/#contact" className="inline-block bg-primary text-primary-foreground rounded-xl px-6 py-4 font-semibold">{page.cta}</a>
        </article>
        <aside className="relative z-10 mt-16 pt-8 border-t border-border"><h2 className="text-xl font-bold mb-5">{french ? "Explorer le projet" : "Explore the project"}</h2><ul className="grid sm:grid-cols-2 gap-4">{seoPages.filter(item => item.lang === page.lang && item.path !== page.path).map(item => <li key={item.path}><a className="text-primary underline underline-offset-4" href={item.path}>{item.title.split(" — ")[0]}</a></li>)}</ul></aside>
      </main>
      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground"><p>Si-Tcha AI SARL · Yaoundé, {french ? "Cameroun" : "Cameroon"}</p><a href="mailto:contact@si-tcha.com">contact@si-tcha.com</a><span> · </span><a href="tel:+237670463484">+237 670 463 484</a></footer>
    </div>
  );
}
