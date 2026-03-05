"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { translateEntity } from "@/lib/entityMappings";

export default function ProvinceFilter({ provinces, selected, onSelect }) {
  const { t, lang } = useLanguage();

  return (
    <div className="province-filter">
      <button
        className={`filter-btn ${selected === "all" ? "active" : ""}`}
        onClick={() => onSelect("all")}
      >
        {t.allProvinces}
      </button>
      {provinces.map((p) => (
        <button
          key={p}
          className={`filter-btn ${selected === p ? "active" : ""}`}
          onClick={() => onSelect(p)}
        >
          {translateEntity(p, "province", lang)}
        </button>
      ))}
    </div>
  );
}
