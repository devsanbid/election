"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("ne"); // default Nepali
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("election-lang");
    if (saved && (saved === "en" || saved === "ne")) {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem("election-lang", newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ne" : "en");
  }, [lang, setLang]);

  const t = translations[lang] || translations.ne;

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      lang: "ne",
      setLang: () => {},
      toggleLang: () => {},
      t: translations.ne,
    };
  }
  return context;
}
