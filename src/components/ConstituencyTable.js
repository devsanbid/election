"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { formatNumber, getPartyColor } from "@/lib/dataUtils";

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

export default function ConstituencyTable({ constituencies }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = constituencies.filter(
    (c) =>
      c.district.toLowerCase().includes(search.toLowerCase()) ||
      c.province.toLowerCase().includes(search.toLowerCase()) ||
      c.candidates.some(
        (cand) =>
          cand.name.toLowerCase().includes(search.toLowerCase()) ||
          cand.party.toLowerCase().includes(search.toLowerCase())
      )
  );

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
            {filtered.map((c) => (
              <>
                <tr
                  key={c.key}
                  className={`constituency-row ${c.declared ? "declared" : ""} ${expanded === c.key ? "expanded-row" : ""}`}
                  onClick={() =>
                    setExpanded(expanded === c.key ? null : c.key)
                  }
                >
                  <td className="constituency-name">
                    <span className="district">{c.district}</span>
                    <span className="const-no">- {c.constituencyNo}</span>
                    <span className="expand-hint">
                      {expanded === c.key ? "▾" : "▸"} {c.candidates.length}
                    </span>
                  </td>
                  <td className="candidate-name">
                    {c.leading ? c.leading.name : "—"}
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
                          {c.leading.party.length > 25
                            ? c.leading.party.substring(0, 25) + "…"
                            : c.leading.party}
                        </span>
                      </span>
                    )}
                  </td>
                  <td className="votes-cell">
                    {c.leading ? formatNumber(c.leading.votes) : "—"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        c.declared ? "status-declared" : "status-counting"
                      }`}
                    >
                      {c.declared ? `✅ ${t.declared}` : `⏳ ${t.countingStatus}`}
                    </span>
                  </td>
                </tr>
                {/* Expanded: show ALL candidates */}
                {expanded === c.key && c.candidates.length > 0 && (
                  c.candidates.map((cand, i) => (
                    <tr key={`${c.key}-${i}`} className="candidate-expanded-row">
                      <td></td>
                      <td className="candidate-name expanded-candidate">
                        <span className="expanded-rank">#{i + 1}</span>
                        {cand.name}
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
                            {cand.party.length > 30
                              ? cand.party.substring(0, 30) + "…"
                              : cand.party}
                          </span>
                        </span>
                      </td>
                      <td className="votes-cell">{formatNumber(cand.votes)}</td>
                      <td></td>
                    </tr>
                  ))
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="constituency-cards">
        {filtered.map((c) => (
          <div
            key={c.key}
            className={`constituency-card ${c.declared ? "declared" : ""}`}
            onClick={() => setExpanded(expanded === c.key ? null : c.key)}
          >
            <div className="card-top">
              <div className="card-constituency">
                <span className="card-district">{c.district}</span>
                <span className="card-const-no">#{c.constituencyNo}</span>
              </div>
              <span
                className={`status-badge ${
                  c.declared ? "status-declared" : "status-counting"
                }`}
              >
                {c.declared ? t.declared : t.countingStatus}
              </span>
            </div>
            {c.leading && (
              <div className="card-leading">
                <SymbolImg
                  symbolCode={c.leading.symbolCode}
                  party={c.leading.party}
                  size={28}
                />
                <div className="card-candidate-info">
                  <span className="card-candidate-name">{c.leading.name}</span>
                  <span className="card-party-name">{c.leading.party}</span>
                </div>
                <span className="card-votes">
                  {formatNumber(c.leading.votes)}
                </span>
              </div>
            )}
            {/* Show ALL candidates on expand (mobile) */}
            {expanded === c.key && c.candidates.length > 0 && (
              <div className="card-expanded">
                {c.candidates.map((cand, i) => (
                  <div key={i} className="card-other-candidate">
                    <SymbolImg
                      symbolCode={cand.symbolCode}
                      party={cand.party}
                      size={20}
                    />
                    <div className="card-expanded-info">
                      <span className="other-name">{cand.name}</span>
                      <span className="card-expanded-party">{cand.party}</span>
                    </div>
                    <span className="other-votes">
                      {formatNumber(cand.votes)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="no-results">
          <p>{t.noResults} &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}
