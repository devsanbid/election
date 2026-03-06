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
          {/* Nepal Flag SVG */}
          <svg className="nepal-flag" viewBox="0 0 100 120" width="32" height="38" aria-label="Nepal Flag">
            <defs>
              <clipPath id="flagClip">
                <polygon points="0,0 100,40 60,60 100,100 0,120" />
              </clipPath>
            </defs>
            <polygon points="0,0 100,40 60,60 100,100 0,120" fill="#003893" stroke="#003893" strokeWidth="2"/>
            <polygon points="5,4 92,40 60,58 92,96 5,116" fill="#DC143C"/>
            {/* Moon */}
            <circle cx="38" cy="30" r="12" fill="#fff"/>
            <circle cx="42" cy="28" r="10" fill="#DC143C"/>
            {/* Sun / star shape */}
            <polygon points="38,60 40,70 35,63 41,63 36,70" fill="#fff" transform="scale(1.5) translate(-8,-18)"/>
          </svg>
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
          <div className="header-controls">
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
      {/* VS links in a separate scrollable strip */}
      <div className="vs-nav-strip">
        <Link href="/vs" className="vs-nav-link">
          🔥 {lang === "ne" ? "बालेन vs ओली" : "Balen vs Oli"}
        </Link>
        <Link href="/vs/gagan-vs-amaresh" className="vs-nav-link">
          🔥 {lang === "ne" ? "गगन vs अमरेश" : "Gagan vs Amaresh"}
        </Link>
        <Link href="/vs/mahendra-vs-nagindra" className="vs-nav-link">
          🔥 {lang === "ne" ? "महेन्द्र vs नगीन्द्र" : "Mahendra vs Nagindra"}
        </Link>
      </div>
    </header>
  );
}
