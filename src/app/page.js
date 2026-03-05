"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { useLanguage } from "@/lib/LanguageContext";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import PartyCard from "@/components/PartyCard";
import ProvinceFilter from "@/components/ProvinceFilter";
import ConstituencyTable from "@/components/ConstituencyTable";
import {
  aggregateByParty,
  groupByConstituency,
  filterByProvince,
  getTopParties,
  getOverallStats,
} from "@/lib/dataUtils";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { t } = useLanguage();
  const [selectedProvince, setSelectedProvince] = useState("all");

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

  const filteredCandidates = useMemo(
    () => filterByProvince(candidates, selectedProvince),
    [candidates, selectedProvince]
  );

  const parties = useMemo(
    () => aggregateByParty(filteredCandidates),
    [filteredCandidates]
  );

  const constituencies = useMemo(
    () => groupByConstituency(filteredCandidates),
    [filteredCandidates]
  );

  const allConstituencies = useMemo(
    () => groupByConstituency(candidates),
    [candidates]
  );

  const stats = useMemo(
    () => getOverallStats(candidates, allConstituencies),
    [candidates, allConstituencies]
  );

  const topParties = useMemo(() => getTopParties(parties, 6), [parties]);

  const totalVotes = parties.reduce((sum, p) => sum + p.totalVotes, 0);

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <h2>{t.errorTitle}</h2>
          <p>{t.errorMsg}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header timestamp={data?.timestamp} isLoading={isValidating} />

      <main className="main-content">
        {isLoading ? (
          <div className="loading-screen">
            <div className="loader"></div>
            <p>{t.loadingText}</p>
          </div>
        ) : (
          <>
            <StatsBar stats={stats} />

            <section className="party-section">
              <h2 className="section-title">{t.partyWiseResults}</h2>
              <div className="party-grid">
                {topParties.map((party, index) => (
                  <PartyCard
                    key={party.name}
                    party={party}
                    totalVotes={totalVotes}
                    rank={index + 1}
                  />
                ))}
              </div>
              {parties.length > 6 && (
                <details className="more-parties">
                  <summary className="more-parties-toggle">
                    {t.showAllParties} {parties.length} {t.parties}
                  </summary>
                  <div className="party-grid party-grid-small">
                    {parties.slice(6).map((party, index) => (
                      <PartyCard
                        key={party.name}
                        party={party}
                        totalVotes={totalVotes}
                        rank={index + 7}
                      />
                    ))}
                  </div>
                </details>
              )}
            </section>

            <ProvinceFilter
              provinces={stats.provinces}
              selected={selectedProvince}
              onSelect={setSelectedProvince}
            />

            <ConstituencyTable constituencies={constituencies} />

            <footer className="footer">
              <p>
                {t.dataSource}{" "}
                <a
                  href="https://result.election.gov.np"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Election Commission Nepal
                </a>{" "}
                • {t.autoRefresh}
              </p>
              <p className="footer-disclaimer">
                {t.disclaimer}{" "}
                <a
                  href="https://election.gov.np"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  election.gov.np
                </a>
              </p>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
