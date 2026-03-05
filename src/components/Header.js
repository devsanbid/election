"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header({ timestamp, isLoading }) {
  const { t, lang, toggleLang } = useLanguage();

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString(lang === "ne" ? "ne-NP" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <span className="live-badge">
            <span className="live-dot"></span>
            {t.live}
          </span>
          <div className="header-title">
            <h1>{t.siteTitle}</h1>
            <p className="header-subtitle">{t.siteSubtitle}</p>
          </div>
        </div>
        <div className="header-right">
          <div className="header-actions">
            <Link href="/vs" className="vs-nav-link">
              🔥 {lang === "ne" ? "बालेन vs ओली" : "Balen vs Oli"}
            </Link>
            <button className="lang-toggle" onClick={toggleLang} title={lang === "ne" ? "Switch to English" : "नेपालीमा हेर्नुहोस्"}>
              <span className="lang-icon">🌐</span>
              <span className="lang-text">{t.language}</span>
            </button>
            <div className="update-info">
              <span className="update-label">{t.lastUpdated}</span>
              <span className="update-time">{formattedTime}</span>
              {isLoading && <span className="refresh-spinner"></span>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
