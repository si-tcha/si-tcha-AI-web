import { useEffect, useState } from "react";

type Language = "en" | "fr";
interface WeglotClient {
  initialized: boolean;
  initialize(options: Record<string, unknown>): void;
  getCurrentLang(): string;
  switchTo(language: string): void;
  on(event: string, callback: () => void): void;
  off(event: string, callback: () => void): boolean;
}

declare global {
  interface Window { Weglot?: WeglotClient }
}

let loading: Promise<WeglotClient> | undefined;

function loadWeglot(): Promise<WeglotClient> {
  if (loading) return loading;
  const apiKey = import.meta.env.VITE_WEGLOT_API_KEY?.trim();
  if (!apiKey) return Promise.reject(new Error("Translation is unavailable: configure VITE_WEGLOT_API_KEY."));

  loading = new Promise<WeglotClient>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.weglot.com/weglot.min.js";
    script.async = true;
    const timeout = window.setTimeout(() => reject(new Error("Translation service timed out. Please reload to retry.")), 15000);
    const fail = () => {
      window.clearTimeout(timeout);
      reject(new Error("Translation service could not load. Please reload to retry."));
    };
    script.onerror = fail;
    script.onload = () => {
      const client = window.Weglot;
      if (!client) return fail();
      const complete = () => {
        window.clearTimeout(timeout);
        client.off("initialized", complete);
        resolve(client);
      };
      if (client.initialized) return complete();
      client.on("initialized", complete);
      try {
        client.initialize({
          api_key: apiKey,
          hide_switcher: true,
          // Weglot adds translate="no" to <html> itself. Matching that
          // attribute globally would exclude the entire page from translation.
          excluded_blocks: [{ value: 'nav [translate="no"]' }],
          // Observe React content added after load, including menus and form messages.
          dynamics: [{ value: "#root" }],
        });
      } catch {
        client.off("initialized", complete);
        fail();
      }
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function useWeglot() {
  const [lang, setLang] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let client: WeglotClient | undefined;
    const syncLanguage = () => {
      if (active && client) setLang(client.getCurrentLang() === "fr" ? "fr" : "en");
    };
    loadWeglot().then((loaded) => {
      if (!active) return;
      client = loaded;
      client.on("languageChanged", syncLanguage);
      syncLanguage();
      setReady(true);
    }).catch((reason: Error) => {
      if (active) setError(reason.message);
    });
    return () => {
      active = false;
      client?.off("languageChanged", syncLanguage);
    };
  }, []);

  const switchLanguage = (language: Language) => {
    if (!ready) return;
    try {
      window.Weglot?.switchTo(language);
    } catch {
      setError("Unable to change language. Please reload to retry.");
    }
  };

  return { lang, ready, error, switchLanguage };
}
