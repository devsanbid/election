"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useLanguage } from "@/lib/LanguageContext";
import { sanitizeName, formatNumber, getPartyColor } from "@/lib/dataUtils";
import { translateCandidate, translateEntity, translateSymbolName } from "@/lib/entityMappings";
import { getSymbolUrl } from "@/lib/symbolUrl";

const fetcher = (url) => fetch(url).then((res) => res.json());
const PHOTO_BASE = "https://result.election.gov.np/Images/candidate";

function CandidatePhoto({ candidateId, name, size = 32 }) {
  const [failed, setFailed] = useState(false);
  if (!candidateId || failed) {
    return (
      <div
        className="candidate-photo-placeholder"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {(name || "?").charAt(0)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${PHOTO_BASE}/${candidateId}.jpg`}
      alt={name || "Candidate"}
      className="candidate-photo"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function SymbolImg({ symbolCode, party, size = 24 }) {
  const [failed, setFailed] = useState(false);
  if (!symbolCode || failed) {
    return (
      <div
        className="symbol-dot"
        style={{
          backgroundColor: getPartyColor(party),
          width: size * 0.5,
          height: size * 0.5,
        }}
      ></div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getSymbolUrl(symbolCode)}
      alt={party}
      className="symbol-img"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

// Sarlahi-4 candidate IDs
const GAGAN_ID = 341549;
const AMARESH_ID = 340974;
const SARLAHI_DISTRICT = "सर्लाही";
const SARLAHI_CONST = "4";

// Candidate profile data
const PROFILES = {
  [GAGAN_ID]: {
    nameEn: "Gagan Kumar Thapa",
    nameNe: "गगन कुमार थापा",
    title: { en: "Nepali Congress Leader", ne: "नेपाली काँग्रेस नेता" },
    color: "#1565C0", // Congress blue
    bgGradient: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
  },
  [AMARESH_ID]: {
    nameEn: "Amaresh Kumar Singh",
    nameNe: "अमरेश कुमार सिह",
    title: { en: "Rastriya Swatantra Party", ne: "राष्ट्रिय स्वतन्त्र पार्टी" },
    color: "#2196F3", // RSP blue
    bgGradient: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)",
  },
};

// VS-specific translation strings for this page
const VS_STRINGS = {
  en: {
    vsTitle: "Gagan Kumar Thapa vs Amaresh Kumar Singh",
    vsSubtitle: "Sarlahi-4 • Madhesh Pradesh Battle of Election 2082",
    allCandidates: "All Candidates in Sarlahi-4",
  },
  ne: {
    vsTitle: "गगन कुमार थापा vs अमरेश कुमार सिह",
    vsSubtitle: "सर्लाही-४ • मधेश प्रदेशको निर्वाचन २०८२ प्रतिस्पर्धा",
    allCandidates: "सर्लाही-४ का सबै उम्मेदवारहरू",
  },
};

function CandidateCard({ candidate, profile, lang, isLeading, t }) {
  if (!candidate) return null;

  const name = lang === "en" ? profile.nameEn : profile.nameNe;
  const title = lang === "en" ? profile.title.en : profile.title.ne;
  const partyName = translateEntity(sanitizeName(candidate.PoliticalPartyName), "party", lang);

  return (
    <div className="vs-card" style={{ "--card-accent": profile.color }}>
      {isLeading && (
        <div className="vs-leading-badge" style={{ background: profile.bgGradient }}>
          {t.leading} ✓
        </div>
      )}
      <div className="vs-card-avatar" style={{ background: profile.bgGradient }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${PHOTO_BASE}/${candidate.CandidateID}.jpg`}
          alt={name}
          className="vs-avatar-photo"
          width={90}
          height={90}
          fetchPriority="high"
          loading="eager"
        />
      </div>
      <h2 className="vs-card-name">{name}</h2>
      <p className="vs-card-title">{title}</p>
      <div className="vs-card-stats">
        <div className="vs-stat">
          <span className="vs-stat-label">{t.partyLabel}</span>
          <span className="vs-stat-value" style={{ color: profile.color }}>{partyName}</span>
        </div>
        <div className="vs-stat">
          <span className="vs-stat-label">{t.symbol}</span>
          <span className="vs-stat-value">{translateSymbolName(candidate.SymbolName, lang)}</span>
        </div>
        <div className="vs-stat vs-stat-votes">
          <span className="vs-stat-label">{t.totalVotesReceived}</span>
          <span className="vs-stat-value vs-vote-count" style={{ color: profile.color }}>
            {formatNumber(candidate.TotalVoteReceived || 0)}
          </span>
        </div>
      </div>
      {candidate.SYMBOLCODE && (
        <div className="vs-symbol-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getSymbolUrl(candidate.SYMBOLCODE)}
            alt={candidate.SymbolName || "Symbol"}
            width={64}
            height={64}
          />
        </div>
      )}
    </div>
  );
}

export default function GaganVsAmareshPage() {
  const { t, lang, toggleLang } = useLanguage();
  const vs = VS_STRINGS[lang] || VS_STRINGS.en;

  const { data, error, isLoading, isValidating } = useSWR(
    "/api/election?type=candidates",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
      dedupingInterval: 15000,
      keepPreviousData: true,
    }
  );

  const candidates = data?.data || [];

  // Extract Gagan and Amaresh + all Sarlahi-4 candidates
  const { gagan, amaresh, sarlahi4Candidates } = useMemo(() => {
    let gagan = null;
    let amaresh = null;
    const sarlahi4 = [];

    for (const c of candidates) {
      const dist = (c.DistrictName || "").replace(/[\n\r]+/g, " ").trim();
      const constId = String(c.SCConstID);

      if (c.CandidateID === GAGAN_ID) gagan = c;
      if (c.CandidateID === AMARESH_ID) amaresh = c;

      if (dist === SARLAHI_DISTRICT && constId === SARLAHI_CONST) {
        sarlahi4.push(c);
      }
    }

    // Sort: Gagan first, then Amaresh, then rest by votes descending
    sarlahi4.sort((a, b) => {
      if (a.CandidateID === GAGAN_ID) return -1;
      if (b.CandidateID === GAGAN_ID) return 1;
      if (a.CandidateID === AMARESH_ID) return -1;
      if (b.CandidateID === AMARESH_ID) return 1;
      return (b.TotalVoteReceived || 0) - (a.TotalVoteReceived || 0);
    });

    return { gagan, amaresh, sarlahi4Candidates: sarlahi4 };
  }, [candidates]);

  const gaganVotes = gagan ? Number(gagan.TotalVoteReceived) || 0 : 0;
  const amareshVotes = amaresh ? Number(amaresh.TotalVoteReceived) || 0 : 0;
  const totalVotes = gaganVotes + amareshVotes;
  const gaganPct = totalVotes > 0 ? ((gaganVotes / totalVotes) * 100).toFixed(1) : 50;
  const amareshPct = totalVotes > 0 ? ((amareshVotes / totalVotes) * 100).toFixed(1) : 50;
  const diff = Math.abs(gaganVotes - amareshVotes);
  const leader = gaganVotes > amareshVotes ? "gagan" : amareshVotes > gaganVotes ? "amaresh" : null;

  if (error) {
    return (
      <div className="vs-page">
        <div className="error-screen">
          <div className="error-content">
            <h2>{t.errorTitle}</h2>
            <p>{t.errorMsg}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              {t.retry}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vs-page">
      {/* Header */}
      <header className="vs-header">
        <div className="vs-header-inner">
          <Link href="/" className="vs-back-link">{t.backToResults}</Link>
          <div className="vs-header-center">
            <span className="vs-trending-badge">{t.trending}</span>
            <h1 className="vs-page-title">{vs.vsTitle}</h1>
            <p className="vs-page-subtitle">{vs.vsSubtitle}</p>
          </div>
          <div className="vs-header-right">
            <button className="lang-toggle" onClick={toggleLang}>
              <span className="lang-icon">🌐</span>
              <span className="lang-text">{t.language}</span>
            </button>
            {isValidating && <span className="refresh-spinner"></span>}
          </div>
        </div>
      </header>

      <main className="vs-main">
        {isLoading ? (
          <div className="loading-screen">
            <div className="loader"></div>
            <p>{t.loadingText}</p>
          </div>
        ) : (
          <>
            {/* VS Battle Section */}
            <section className="vs-battle">
              <CandidateCard
                candidate={gagan}
                profile={PROFILES[GAGAN_ID]}
                lang={lang}
                isLeading={leader === "gagan"}
                t={t}
              />

              <div className="vs-center">
                <div className="vs-badge">{t.vsLabel}</div>
                {totalVotes > 0 && (
                  <div className="vs-diff">
                    {t.leadingBy}
                    <strong>{formatNumber(diff)}</strong>
                  </div>
                )}
                <div className="vs-live-dot">
                  <span className="live-dot"></span>
                  {t.watchLive}
                </div>
              </div>

              <CandidateCard
                candidate={amaresh}
                profile={PROFILES[AMARESH_ID]}
                lang={lang}
                isLeading={leader === "amaresh"}
                t={t}
              />
            </section>

            {/* Vote Bar */}
            {totalVotes > 0 && (
              <section className="vs-vote-bar-section">
                <div className="vs-vote-bar">
                  <div
                    className="vs-vote-fill vs-vote-fill-left"
                    style={{
                      width: `${gaganPct}%`,
                      background: PROFILES[GAGAN_ID].bgGradient,
                    }}
                  >
                    <span>{formatNumber(gaganVotes)} ({gaganPct}%)</span>
                  </div>
                  <div
                    className="vs-vote-fill vs-vote-fill-right"
                    style={{
                      width: `${amareshPct}%`,
                      background: PROFILES[AMARESH_ID].bgGradient,
                    }}
                  >
                    <span>{formatNumber(amareshVotes)} ({amareshPct}%)</span>
                  </div>
                </div>
              </section>
            )}

            {/* All Sarlahi-4 Candidates */}
            <section className="vs-all-candidates">
              <h2 className="section-title">{vs.allCandidates}</h2>

              {/* Desktop Table */}
              <div className="vs-table-wrapper vs-desktop-only">
                <table className="vs-table">
                  <thead>
                    <tr>
                      <th>{t.rank}</th>
                      <th>{t.candidate}</th>
                      <th>{t.partyLabel}</th>
                      <th>{t.symbol}</th>
                      <th>{t.votesCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sarlahi4Candidates.map((c, idx) => {
                      const name = sanitizeName(c.CandidateName);
                      const party = sanitizeName(c.PoliticalPartyName);
                      const isFeatured = c.CandidateID === GAGAN_ID || c.CandidateID === AMARESH_ID;
                      const pColor = getPartyColor(party);
                      return (
                        <tr
                          key={c.CandidateID}
                          className={isFeatured ? "vs-featured-row" : ""}
                        >
                          <td className="vs-rank">{idx + 1}</td>
                          <td className="vs-cand-name">
                            <CandidatePhoto candidateId={c.CandidateID} name={name} size={30} />
                            {translateCandidate(name, lang)}
                            {isFeatured && <span className="vs-star">⭐</span>}
                          </td>
                          <td>
                            <span
                              className="party-badge-with-symbol"
                              style={{
                                backgroundColor: pColor + "15",
                                borderColor: pColor + "40",
                              }}
                            >
                              <SymbolImg symbolCode={c.SYMBOLCODE} party={party} size={22} />
                              <span className="party-badge-text" style={{ color: pColor }}>
                                {(() => { const p = translateEntity(party, "party", lang); return p.length > 25 ? p.substring(0, 25) + "…" : p; })()}
                              </span>
                            </span>
                          </td>
                          <td className="vs-symbol-cell">
                            {translateSymbolName(c.SymbolName, lang) || "—"}
                          </td>
                          <td className="vs-votes-cell">
                            {formatNumber(c.TotalVoteReceived || 0)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="vs-mobile-cards">
                {sarlahi4Candidates.map((c, idx) => {
                  const name = sanitizeName(c.CandidateName);
                  const party = sanitizeName(c.PoliticalPartyName);
                  const isFeatured = c.CandidateID === GAGAN_ID || c.CandidateID === AMARESH_ID;
                  const pColor = getPartyColor(party);
                  return (
                    <div
                      key={c.CandidateID}
                      className={`vs-mobile-card ${isFeatured ? "vs-mobile-featured" : ""}`}
                      style={{ "--card-accent": pColor }}
                    >
                      <div className="vs-mobile-card-top">
                        <span className="vs-mobile-rank" style={isFeatured ? { background: pColor, color: "#fff" } : {}}>
                          #{idx + 1}
                        </span>
                        <div className="vs-mobile-card-name">
                          <span className="vs-mobile-cand">
                            <CandidatePhoto candidateId={c.CandidateID} name={name} size={28} />
                            {translateCandidate(name, lang)}
                            {isFeatured && <span className="vs-star">⭐</span>}
                          </span>
                        </div>
                        <span className="vs-mobile-votes" style={{ color: pColor }}>
                          {formatNumber(c.TotalVoteReceived || 0)}
                        </span>
                      </div>
                      <div className="vs-mobile-card-bottom">
                        <span
                          className="party-badge-with-symbol"
                          style={{
                            backgroundColor: pColor + "15",
                            borderColor: pColor + "40",
                          }}
                        >
                          <SymbolImg symbolCode={c.SYMBOLCODE} party={party} size={20} />
                          <span className="party-badge-text" style={{ color: pColor }}>
                            {translateEntity(party, "party", lang)}
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <footer className="footer">
              <p>
                {t.dataSource}{" "}
                <a href="https://result.election.gov.np" target="_blank" rel="noopener noreferrer">
                  Election Commission Nepal
                </a>{" "}
                • {t.autoRefresh}
              </p>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
