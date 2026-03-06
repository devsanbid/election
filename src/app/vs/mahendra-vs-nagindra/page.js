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

// Kalikot-1 candidate IDs
const MAHENDRA_ID = 340992;
const NAGINDRA_ID = 340619;
const KALIKOT_DISTRICT = "कालिकोट";
const KALIKOT_CONST = "1";

// Candidate profile data
const PROFILES = {
  [MAHENDRA_ID]: {
    nameEn: "Mahendra Bahadur Shahi",
    nameNe: "महेन्द्र बहादुर शाही",
    title: { en: "Nepal Communist Party (Maoist)", ne: "नेपाली कम्युनिष्ट पार्टी" },
    color: "#E53935", // Communist red
    bgGradient: "linear-gradient(135deg, #E53935 0%, #B71C1C 100%)",
  },
  [NAGINDRA_ID]: {
    nameEn: "Sri Nagindra Shahi",
    nameNe: "श्री नगीन्द्र शाही",
    title: { en: "CPN (Unified Marxist-Leninist)", ne: "नेपाल कम्युनिष्ट पार्टी (एमाले)" },
    color: "#1565C0", // UML blue
    bgGradient: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
  },
};

// VS-specific translation strings
const VS_STRINGS = {
  en: {
    vsTitle: "Mahendra Bahadur Shahi vs Sri Nagindra Shahi",
    vsSubtitle: "Kalikot-1 • Karnali Pradesh Battle of Election 2082",
    allCandidates: "All Candidates in Kalikot-1",
  },
  ne: {
    vsTitle: "महेन्द्र बहादुर शाही vs श्री नगीन्द्र शाही",
    vsSubtitle: "कालिकोट-१ • कर्णाली प्रदेशको निर्वाचन २०८२ प्रतिस्पर्धा",
    allCandidates: "कालिकोट-१ का सबै उम्मेदवारहरू",
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

export default function MahendraVsNagindraPage() {
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

  const { mahendra, nagindra, kalikot1Candidates } = useMemo(() => {
    let mahendra = null;
    let nagindra = null;
    const kalikot1 = [];

    for (const c of candidates) {
      const dist = (c.DistrictName || "").replace(/[\n\r]+/g, " ").trim();
      const constId = String(c.SCConstID);

      if (c.CandidateID === MAHENDRA_ID) mahendra = c;
      if (c.CandidateID === NAGINDRA_ID) nagindra = c;

      if (dist === KALIKOT_DISTRICT && constId === KALIKOT_CONST) {
        kalikot1.push(c);
      }
    }

    kalikot1.sort((a, b) => {
      if (a.CandidateID === MAHENDRA_ID) return -1;
      if (b.CandidateID === MAHENDRA_ID) return 1;
      if (a.CandidateID === NAGINDRA_ID) return -1;
      if (b.CandidateID === NAGINDRA_ID) return 1;
      return (b.TotalVoteReceived || 0) - (a.TotalVoteReceived || 0);
    });

    return { mahendra, nagindra, kalikot1Candidates: kalikot1 };
  }, [candidates]);

  const mahendraVotes = mahendra ? Number(mahendra.TotalVoteReceived) || 0 : 0;
  const nagindraVotes = nagindra ? Number(nagindra.TotalVoteReceived) || 0 : 0;
  const totalVotes = mahendraVotes + nagindraVotes;
  const mahendraPct = totalVotes > 0 ? ((mahendraVotes / totalVotes) * 100).toFixed(1) : 50;
  const nagindraPct = totalVotes > 0 ? ((nagindraVotes / totalVotes) * 100).toFixed(1) : 50;
  const diff = Math.abs(mahendraVotes - nagindraVotes);
  const leader = mahendraVotes > nagindraVotes ? "mahendra" : nagindraVotes > mahendraVotes ? "nagindra" : null;

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
            <section className="vs-battle">
              <CandidateCard
                candidate={mahendra}
                profile={PROFILES[MAHENDRA_ID]}
                lang={lang}
                isLeading={leader === "mahendra"}
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
                candidate={nagindra}
                profile={PROFILES[NAGINDRA_ID]}
                lang={lang}
                isLeading={leader === "nagindra"}
                t={t}
              />
            </section>

            {totalVotes > 0 && (
              <section className="vs-vote-bar-section">
                <div className="vs-vote-bar">
                  <div
                    className="vs-vote-fill vs-vote-fill-left"
                    style={{
                      width: `${mahendraPct}%`,
                      background: PROFILES[MAHENDRA_ID].bgGradient,
                    }}
                  >
                    <span>{formatNumber(mahendraVotes)} ({mahendraPct}%)</span>
                  </div>
                  <div
                    className="vs-vote-fill vs-vote-fill-right"
                    style={{
                      width: `${nagindraPct}%`,
                      background: PROFILES[NAGINDRA_ID].bgGradient,
                    }}
                  >
                    <span>{formatNumber(nagindraVotes)} ({nagindraPct}%)</span>
                  </div>
                </div>
              </section>
            )}

            <section className="vs-all-candidates">
              <h2 className="section-title">{vs.allCandidates}</h2>

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
                    {kalikot1Candidates.map((c, idx) => {
                      const name = sanitizeName(c.CandidateName);
                      const party = sanitizeName(c.PoliticalPartyName);
                      const isFeatured = c.CandidateID === MAHENDRA_ID || c.CandidateID === NAGINDRA_ID;
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

              <div className="vs-mobile-cards">
                {kalikot1Candidates.map((c, idx) => {
                  const name = sanitizeName(c.CandidateName);
                  const party = sanitizeName(c.PoliticalPartyName);
                  const isFeatured = c.CandidateID === MAHENDRA_ID || c.CandidateID === NAGINDRA_ID;
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
