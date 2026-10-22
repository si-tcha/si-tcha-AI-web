import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Sun, Moon, Globe, ChevronDown, Menu, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import logoImage from "@/assets/logo.png";
import { navLinks } from "../../data/navigation";
import { useWeglot } from "../../hooks/useWeglot";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const { lang, ready, error, switchLanguage } = useWeglot();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const labels: Record<string, string> = lang === "fr"
    ? { Home: "Accueil", About: "À propos", Investors: "Investisseurs", Partners: "Partenaires", Contact: "Contact" } : {};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav translate="no" className={`react-interactive fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <ImageWithFallback
            src={logoImage}
            alt="Si-Tcha AI logo — windswept tree at sunset"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span data-brand translate="no" className={`font-bold text-lg tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-foreground"
          }`}>
            Si-Tcha AI
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Investors", "Partners", "Contact"].map((item) => (
            <a key={item} style={{ color: "var(--foreground)" }} href={navLinks[item] || "#"}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-foreground"
              }`}>
              {labels[item] || item}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language */}
          <div className="relative">
            <button
              disabled={!ready}
              title={error || (!ready ? "Loading translations…" : "Change language")}
              translate="no"
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                scrolled
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang.toUpperCase()}
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div translate="no" className="absolute right-0 top-full mt-1.5 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[80px]">
                {(["en", "fr"] as const).map((l) => (
                  <button key={l}
                    onClick={() => { switchLanguage(l); setLangOpen(false); }}
                    className={`block w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-muted ${
                      lang === l ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >{l.toUpperCase()}</button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
              scrolled
                ? "border-border hover:bg-muted"
                : "border-border hover:bg-muted"
            }`}
          >
            {theme === "light"
              ? <Moon className={`w-3.5 h-3.5 ${scrolled ? "text-foreground" : "text-foreground"}`} />
              : <Sun  className={`w-3.5 h-3.5 ${scrolled ? "text-foreground" : "text-foreground"}`} />
            }
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-foreground"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-5 flex flex-col gap-4 shadow-lg">
          {["Home", "About", "Investors", "Partners", "Contact"].map((item) => (
            <a key={item} href={navLinks[item] || "#"} onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {labels[item] || item}
            </a>
          ))}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <button
              disabled={!ready}
              title={error || (!ready ? "Loading translations…" : "Change language")}
              translate="no"
              onClick={() => switchLanguage(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === "en" ? "Français" : "English"}
            </button>
            <button
              onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

