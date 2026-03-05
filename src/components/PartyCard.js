"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { formatNumber, getPartyColor } from "@/lib/dataUtils";

const SYMBOL_BASE = "/api/symbol";

export default function PartyCard({ party, totalVotes, rank }) {
  const { t } = useLanguage();
  const color = getPartyColor(party.name);
  const voteShare =
    totalVotes > 0 ? ((party.totalVotes / totalVotes) * 100).toFixed(1) : "0.0";

  const symbolUrl = party.symbolCode
    ? `${SYMBOL_BASE}?code=${party.symbolCode}`
    : null;

  return (
    <div className="party-card" style={{ "--party-color": color }}>
      <div className="party-rank">#{rank}</div>
      <div className="party-header">
        {symbolUrl ? (
          <div className="party-symbol-img-wrapper">
            <img
              src={symbolUrl}
              alt={party.symbolName || party.name}
              className="party-symbol-img"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) e.target.nextSibling.style.display = "block";
              }}
            />
            <div
              className="party-color-bar party-color-bar-fallback"
              style={{ backgroundColor: color, display: "none" }}
            ></div>
          </div>
        ) : (
          <div
            className="party-color-bar"
            style={{ backgroundColor: color }}
          ></div>
        )}
        <div className="party-info">
          <h3 className="party-name">{party.name}</h3>
          <span className="party-symbol-text">{party.symbolName}</span>
        </div>
      </div>
      <div className="party-stats">
        <div className="party-stat-main">
          <span className="party-votes">{formatNumber(party.totalVotes)}</span>
          <span className="party-votes-label">{t.votes}</span>
        </div>
        <div className="party-stat-row">
          <div className="party-stat-item">
            <span className="party-stat-number won">{party.seatsWon}</span>
            <span className="party-stat-text">{t.won}</span>
          </div>
          <div className="party-stat-item">
            <span className="party-stat-number leading">{party.seatsLeading}</span>
            <span className="party-stat-text">{t.leading}</span>
          </div>
          <div className="party-stat-item">
            <span className="party-stat-number share">{voteShare}%</span>
            <span className="party-stat-text">{t.share}</span>
          </div>
        </div>
      </div>
      <div
        className="party-progress-bar"
        style={{
          width: `${Math.min(Number(voteShare), 100)}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}
