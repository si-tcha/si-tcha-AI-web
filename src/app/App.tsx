import { useEffect, useState } from "react";
import Navbar from "./components/sections/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import PartnersSection from "./components/sections/PartnersSection";
import ContactSection from "./components/sections/ContactSection";
import AudienceSection from "./components/sections/AudienceSection";
import InvestorsSection from "./components/sections/InvestorsSection";
import Footer from "./components/sections/Footer";
import SeoPage from "./components/SeoPage";
import { seoPages } from "./data/seoPages";

export default function App({ path = "/" }: { path?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const page = seoPages.find(page => page.path === `${path.replace(/\/$/, "")}/`);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (!page) return;
    document.documentElement.lang = page.lang;
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://si-tcha.com${page.path}`);
  }, [page]);
  if (page) return <SeoPage page={page} />;

  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-background p-3">Skip to content</a>
      <Navbar theme={theme} setTheme={setTheme} />
      <main id="main-content">
      <HeroSection />
      <AboutSection />
      <AudienceSection />
      <InvestorsSection />
      <PartnersSection />
      <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
