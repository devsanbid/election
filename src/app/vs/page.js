"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useLanguage } from "@/lib/LanguageContext";
import { sanitizeName, formatNumber, getPartyColor } from "@/lib/dataUtils";
import { translateCandidate, translateEntity } from "@/lib/entityMappings";

const fetcher = (url) => fetch(url).then((res) => res.json());
const SYMBOL_BASE = "/api/symbol";

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
      src={`${SYMBOL_BASE}?code=${symbolCode}`}
      alt={party}
      className="symbol-img"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

// Jhapa-5 candidate IDs from ECN API
const BALEN_ID = 339653;
const KP_OLI_ID = 340111;
const JHAPA_5_DISTRICT = "झापा";
const JHAPA_5_CONST = 5;

// Candidate profile data (supplemental to API)
const PROFILES = {
  [BALEN_ID]: {
    nameEn: "Balen Shah",
    nameNe: "वालेन्द्र शाह",
    title: { en: "Former Mayor of Kathmandu", ne: "काठमाडौं महानगरको पूर्व मेयर" },
    photo: "/candidates/balen-shah.png",
    color: "#2196F3", // RSP blue
    bgGradient: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)",
  },
  [KP_OLI_ID]: {
    nameEn: "KP Sharma Oli",
    nameNe: "के.पी शर्मा ओली",
    title: { en: "Former Prime Minister", ne: "पूर्व प्रधानमन्त्री" },
    photo: "/candidates/kp-oli.jpg",
    color: "#E53935", // UML color
    bgGradient: "linear-gradient(135deg, #E53935 0%, #B71C1C 100%)",
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
          src={profile.photo}
          alt={name}
          className="vs-avatar-photo"
          width={90}
          height={90}
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
          <span className="vs-stat-label">{t.age}</span>
          <span className="vs-stat-value">{candidate.AGE_YR}</span>
        </div>
        <div className="vs-stat">
          <span className="vs-stat-label">{t.symbol}</span>
          <span className="vs-stat-value">{candidate.SymbolName}</span>
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
            src={`/api/symbol?code=${candidate.SYMBOLCODE}`}
            alt={candidate.SymbolName || "Symbol"}
            width={64}
            height={64}
          />
        </div>
      )}
    </div>
  );
}

export default function VSPage() {
  const { t, lang, toggleLang } = useLanguage();

  const { data, error, isLoading, isValidating } = useSWR(
    "/api/election?type=candidates",
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
      dedupingInterval: 3000,
    }
  );

  const candidates = data?.data || [];

  // Extract Balen and KP Oli + all Jhapa-5 candidates
  const { balen, kpOli, jhapa5Candidates } = useMemo(() => {
    let balen = null;
    let kpOli = null;
    const jhapa5 = [];

    for (const c of candidates) {
      const dist = (c.DistrictName || "").replace(/[\n\r]+/g, " ").trim();
      const constId = c.SCConstID;

      if (c.CandidateID === BALEN_ID) balen = c;
      if (c.CandidateID === KP_OLI_ID) kpOli = c;

      if (dist === JHAPA_5_DISTRICT && constId === JHAPA_5_CONST) {
        jhapa5.push(c);
      }
    }

    // Sort: Balen first, then KP Oli, then rest by votes descending
    jhapa5.sort((a, b) => {
      // Pin Balen Shah at top
      if (a.CandidateID === BALEN_ID) return -1;
      if (b.CandidateID === BALEN_ID) return 1;
      // Pin KP Oli second
      if (a.CandidateID === KP_OLI_ID) return -1;
      if (b.CandidateID === KP_OLI_ID) return 1;
      // Rest by votes descending
      return (b.TotalVoteReceived || 0) - (a.TotalVoteReceived || 0);
    });

    return { balen, kpOli, jhapa5Candidates: jhapa5 };
  }, [candidates]);

  const balenVotes = balen ? Number(balen.TotalVoteReceived) || 0 : 0;
  const oliVotes = kpOli ? Number(kpOli.TotalVoteReceived) || 0 : 0;
  const totalVotes = balenVotes + oliVotes;
  const balenPct = totalVotes > 0 ? ((balenVotes / totalVotes) * 100).toFixed(1) : 50;
  const oliPct = totalVotes > 0 ? ((oliVotes / totalVotes) * 100).toFixed(1) : 50;
  const diff = Math.abs(balenVotes - oliVotes);
  const leader = balenVotes > oliVotes ? "balen" : oliVotes > balenVotes ? "oli" : null;

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
            <h1 className="vs-page-title">{t.vsTitle}</h1>
            <p className="vs-page-subtitle">{t.vsSubtitle}</p>
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
                candidate={balen}
                profile={PROFILES[BALEN_ID]}
                lang={lang}
                isLeading={leader === "balen"}
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
                candidate={kpOli}
                profile={PROFILES[KP_OLI_ID]}
                lang={lang}
                isLeading={leader === "oli"}
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
                      width: `${balenPct}%`,
                      background: PROFILES[BALEN_ID].bgGradient,
                    }}
                  >
                    <span>{formatNumber(balenVotes)} ({balenPct}%)</span>
                  </div>
                  <div
                    className="vs-vote-fill vs-vote-fill-right"
                    style={{
                      width: `${oliPct}%`,
                      background: PROFILES[KP_OLI_ID].bgGradient,
                    }}
                  >
                    <span>{formatNumber(oliVotes)} ({oliPct}%)</span>
                  </div>
                </div>
              </section>
            )}

            {/* All Jhapa-5 Candidates */}
            <section className="vs-all-candidates">
              <h2 className="section-title">{t.allCandidates}</h2>

              {/* Desktop Table */}
              <div className="vs-table-wrapper vs-desktop-only">
                <table className="vs-table">
                  <thead>
                    <tr>
                      <th>{t.rank}</th>
                      <th>{t.candidate}</th>
                      <th>{t.partyLabel}</th>
                      <th>{t.symbol}</th>
                      <th>{t.age}</th>
                      <th>{t.votesCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jhapa5Candidates.map((c, idx) => {
                      const name = sanitizeName(c.CandidateName);
                      const party = sanitizeName(c.PoliticalPartyName);
                      const isFeatured = c.CandidateID === BALEN_ID || c.CandidateID === KP_OLI_ID;
                      const pColor = getPartyColor(party);
                      return (
                        <tr
                          key={c.CandidateID}
                          className={isFeatured ? "vs-featured-row" : ""}
                        >
                          <td className="vs-rank">{idx + 1}</td>
                          <td className="vs-cand-name">
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
                            {c.SymbolName || "—"}
                          </td>
                          <td>{c.AGE_YR}</td>
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
                {jhapa5Candidates.map((c, idx) => {
                  const name = sanitizeName(c.CandidateName);
                  const party = sanitizeName(c.PoliticalPartyName);
                  const isFeatured = c.CandidateID === BALEN_ID || c.CandidateID === KP_OLI_ID;
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
                            {translateCandidate(name, lang)}
                            {isFeatured && <span className="vs-star">⭐</span>}
                          </span>
                          <span className="vs-mobile-age">{t.age}: {c.AGE_YR}</span>
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
