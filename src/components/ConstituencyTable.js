"use client";

import { useState, Fragment, useEffect, useRef, useCallback, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { formatNumber, getPartyColor } from "@/lib/dataUtils";
import { translateEntity, translateCandidate, matchesBilingual } from "@/lib/entityMappings";
import { getSymbolUrl } from "@/lib/symbolUrl";

const PHOTO_BASE = "https://result.election.gov.np/Images/candidate";

// Render rows in batches — avoids 165+ simultaneous image requests
const BATCH_SIZE = 30;

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

export default function ConstituencyTable({ constituencies }) {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef(null);

  const searchLower = search.toLowerCase();
  const filtered = useMemo(() => {
    if (!search) return constituencies;
    return constituencies.filter(
      (c) =>
        matchesBilingual(c.district, searchLower, "district") ||
        matchesBilingual(c.province, searchLower, "province") ||
        c.candidates.some(
          (cand) =>
            matchesBilingual(cand.name, searchLower, "candidate") ||
            matchesBilingual(cand.party, searchLower, "party")
        )
    );
  }, [constituencies, search, searchLower]);

  // Reset visible count when search/filter changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [filtered.length]);

  // Infinite scroll — load next batch when sentinel enters viewport
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length]);

  // Only render visible slice
  const visibleData = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Helper to determine tag type & margin info for a constituency
  function getConstituencyTag(c) {
    if (!c.leading || c.candidates.length < 2) return null;
    const first = c.candidates[0]?.votes || 0;
    const second = c.candidates[1]?.votes || 0;
    const margin = first - second;
    const isWinner = c.declared;

    // When no votes have been counted (margin 0 and not declared), return null
    // so the fallback "Counting" badge shows instead of a blank status
    if (margin <= 0 && !isWinner) return null;

    const isClose = margin > 0 && margin < 500;
    return { margin, isWinner, isClose };
  }

  function MarginBadge({ margin }) {
    if (!margin || margin <= 0) return null;
    const cls = margin >= 5000 ? "large-lead" : margin >= 1000 ? "moderate-lead" : "narrow-lead";
    return (
      <span className={`margin-tag ${cls}`}>
        +{formatNumber(margin)}
      </span>
    );
  }

  function WinningTag({ tagInfo }) {
    if (!tagInfo) return null;
    if (tagInfo.isWinner) return <span className="winning-tag winner">{t.winnerTag}</span>;
    if (tagInfo.isClose) return <span className="winning-tag close-fight">🔥 {t.closeFight}</span>;
    if (tagInfo.margin > 0) return <span className="winning-tag is-leading">▲ {t.leadingTag}</span>;
    return null;
  }

  return (
    <div className="constituency-section">
      <div className="constituency-header">
        <h2 className="section-title">{t.constituencyResults}</h2>
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="constituency-table-wrapper">
        <table className="constituency-table">
          <thead>
            <tr>
              <th>{t.constituency}</th>
              <th>{t.leadingCandidate}</th>
              <th>{t.party}</th>
              <th>{t.votesCol}</th>
              <th>{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((c) => (
              <Fragment key={c.key}>
                <tr
                  className={`constituency-row ${c.declared ? "declared" : ""} ${expanded === c.key ? "expanded-row" : ""}`}
                  onClick={() =>
                    setExpanded(expanded === c.key ? null : c.key)
                  }
                >
                  <td className="constituency-name">
                    <span className="district">{translateEntity(c.district, "district", lang)}</span>
                    <span className="const-no">- {c.constituencyNo}</span>
                    <span className="expand-hint">
                      {expanded === c.key ? "▾" : "▸"} {c.candidates.length}
                    </span>
                  </td>
                  <td className="candidate-name">
                    {c.leading ? (
                      <span className="candidate-name-with-photo">
                        <CandidatePhoto candidateId={c.leading.id} name={c.leading.name} size={32} />
                        {translateCandidate(c.leading.name, lang)}
                      </span>
                    ) : "—"}
                  </td>
                  <td>
                    {c.leading && (
                      <span
                        className="party-badge-with-symbol"
                        style={{
                          backgroundColor: getPartyColor(c.leading.party) + "15",
                          borderColor: getPartyColor(c.leading.party) + "40",
                        }}
                      >
                        <SymbolImg
                          symbolCode={c.leading.symbolCode}
                          party={c.leading.party}
                          size={22}
                        />
                        <span
                          className="party-badge-text"
                          style={{ color: getPartyColor(c.leading.party) }}
                        >
                          {(() => { const p = translateEntity(c.leading.party, "party", lang); return p.length > 25 ? p.substring(0, 25) + "…" : p; })()}
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="votes-cell">
                    <span>{c.leading ? formatNumber(c.leading.votes) : "—"}</span>
                    {(() => { const info = getConstituencyTag(c); return info ? <MarginBadge margin={info.margin} /> : null; })()}
                  </td>
                  <td>
                    {(() => {
                      const info = getConstituencyTag(c);
                      return info ? <WinningTag tagInfo={info} /> : null;
                    })()}
                    {!getConstituencyTag(c) && (
                      <span
                        className={`status-badge ${
                          c.declared ? "status-declared" : "status-counting"
                        }`}
                      >
                        {c.declared ? `✅ ${t.declared}` : `⏳ ${t.countingStatus}`}
                      </span>
                    )}
                  </td>
                </tr>
                {/* Expanded: show ALL candidates */}
                {expanded === c.key && c.candidates.length > 0 && (
                  c.candidates.map((cand, i) => (
                    <tr key={`${c.key}-${i}`} className="candidate-expanded-row">
                      <td></td>
                      <td className="candidate-name expanded-candidate">
                        <span className="expanded-rank">#{i + 1}</span>
                        <CandidatePhoto candidateId={cand.id} name={cand.name} size={26} />
                        {translateCandidate(cand.name, lang)}
                      </td>
                      <td>
                        <span
                          className="party-badge-with-symbol party-badge-small"
                          style={{
                            backgroundColor: getPartyColor(cand.party) + "12",
                            borderColor: getPartyColor(cand.party) + "30",
                          }}
                        >
                          <SymbolImg
                            symbolCode={cand.symbolCode}
                            party={cand.party}
                            size={18}
                          />
                          <span
                            className="party-badge-text"
                            style={{ color: getPartyColor(cand.party) }}
                          >
                            {(() => { const p = translateEntity(cand.party, "party", lang); return p.length > 30 ? p.substring(0, 30) + "…" : p; })()}
                          </span>
                        </span>
                      </td>
                      <td className="votes-cell">{formatNumber(cand.votes)}</td>
                      <td></td>
                    </tr>
                  ))
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="constituency-cards">
        {visibleData.map((c) => {
          const tagInfo = getConstituencyTag(c);
          return (
          <div
            key={c.key}
            className={`constituency-card ${c.declared ? "declared" : ""}`}
            onClick={() => setExpanded(expanded === c.key ? null : c.key)}
          >
            <div className="card-top">
              <div className="card-constituency">
                <span className="card-district">{translateEntity(c.district, "district", lang)}</span>
                <span className="card-const-no">#{c.constituencyNo}</span>
              </div>
              {tagInfo ? (
                <WinningTag tagInfo={tagInfo} />
              ) : (
                <span
                  className={`status-badge ${
                    c.declared ? "status-declared" : "status-counting"
                  }`}
                >
                  {c.declared ? t.declared : t.countingStatus}
                </span>
              )}
            </div>
            {c.leading && (
              <div className="card-leading">
                <CandidatePhoto candidateId={c.leading.id} name={c.leading.name} size={36} />
                <div className="card-candidate-info">
                  <span className="card-candidate-name">{translateCandidate(c.leading.name, lang)}</span>
                  <span className="card-party-name">{translateEntity(c.leading.party, "party", lang)}</span>
                </div>
                <div className="card-votes-group">
                  <span className="card-votes">
                    {formatNumber(c.leading.votes)}
                  </span>
                  {tagInfo && <MarginBadge margin={tagInfo.margin} />}
                </div>
              </div>
            )}
            {/* Show ALL candidates on expand (mobile) */}
            {expanded === c.key && c.candidates.length > 0 && (
              <div className="card-expanded">
                {c.candidates.map((cand, i) => (
                  <div key={i} className="card-other-candidate">
                    <CandidatePhoto candidateId={cand.id} name={cand.name} size={24} />
                    <div className="card-expanded-info">
                      <span className="other-name">{translateCandidate(cand.name, lang)}</span>
                      <span className="card-expanded-party">{translateEntity(cand.party, "party", lang)}</span>
                    </div>
                    <span className="other-votes">
                      {formatNumber(cand.votes)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={sentinelRef} className="load-more-sentinel">
          <div className="loading-more-text">{t.loadingText || "Loading..."}</div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="no-results">
          <p>{t.noResults} &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}
