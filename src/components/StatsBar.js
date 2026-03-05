"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function StatsBar({ stats }) {
  const { t } = useLanguage();

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-icon">🗳️</span>
        <div className="stat-content">
          <span className="stat-value">{stats.totalVotes.toLocaleString()}</span>
          <span className="stat-label">{t.totalVotes}</span>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon">📍</span>
        <div className="stat-content">
          <span className="stat-value">{stats.totalConstituencies}</span>
          <span className="stat-label">{t.constituencies}</span>
        </div>
      </div>
      <div className="stat-card stat-highlight">
        <span className="stat-icon">☑️</span>
        <div className="stat-content">
          <span className="stat-value">{stats.declared}</span>
          <span className="stat-label">{t.resultsDeclared}</span>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon">⏳</span>
        <div className="stat-content">
          <span className="stat-value">{stats.counting}</span>
          <span className="stat-label">{t.counting}</span>
        </div>
      </div>
    </div>
  );
}
