/**
 * Colored SVG fallbacks for parties NOT available on nepalelectionupdates.com.
 * Only used by the API proxy route for these 3 minor parties.
 * Major parties are served as static JPGs from public/symbols/
 */

// Janamat Party — धारा (Water Tap)
const TAP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="20" y="24" width="50" height="12" rx="4" fill="#546E7A"/>
  <rect x="62" y="24" width="14" height="40" rx="4" fill="#546E7A"/>
  <rect x="56" y="56" width="26" height="10" rx="5" fill="#455A64"/>
  <circle cx="42" cy="30" r="8" fill="#37474F"/>
  <circle cx="42" cy="30" r="4" fill="#78909C"/>
  <path d="M66 66 Q69 74 69 82" stroke="#1E88E5" stroke-width="5" stroke-linecap="round" fill="none"/>
  <ellipse cx="69" cy="92" rx="8" ry="4" fill="#42A5F5" opacity="0.7"/>
  <circle cx="65" cy="86" r="3" fill="#64B5F6" opacity="0.8"/>
  <circle cx="73" cy="88" r="2" fill="#64B5F6" opacity="0.6"/>
  <circle cx="69" cy="96" r="2.5" fill="#64B5F6" opacity="0.5"/>
</svg>`;

// Nagarik Unmukti / JSP(Ekala) — चकिया (Grinder)
const GRINDER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <ellipse cx="60" cy="78" rx="38" ry="10" fill="#6D4C41"/>
  <ellipse cx="60" cy="58" rx="38" ry="12" fill="#8D6E63"/>
  <ellipse cx="60" cy="54" rx="38" ry="12" fill="#A1887F"/>
  <ellipse cx="60" cy="38" rx="34" ry="10" fill="#8D6E63"/>
  <ellipse cx="60" cy="34" rx="34" ry="10" fill="#BCAAA4"/>
  <line x1="60" y1="28" x2="96" y2="18" stroke="#5D4037" stroke-width="5" stroke-linecap="round"/>
  <circle cx="60" cy="34" r="4" fill="#5D4037"/>
</svg>`;

// Loktantrik Samajbadi — साइकल (Bicycle)
const BICYCLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <circle cx="30" cy="72" r="20" fill="none" stroke="#2E7D32" stroke-width="4"/>
  <circle cx="90" cy="72" r="20" fill="none" stroke="#2E7D32" stroke-width="4"/>
  <circle cx="30" cy="72" r="3" fill="#1B5E20"/>
  <circle cx="90" cy="72" r="3" fill="#1B5E20"/>
  <line x1="30" y1="72" x2="56" y2="72" stroke="#37474F" stroke-width="4" stroke-linecap="round"/>
  <line x1="56" y1="72" x2="90" y2="72" stroke="#37474F" stroke-width="3" stroke-linecap="round"/>
  <line x1="56" y1="72" x2="48" y2="42" stroke="#37474F" stroke-width="4" stroke-linecap="round"/>
  <line x1="90" y1="72" x2="70" y2="42" stroke="#37474F" stroke-width="3" stroke-linecap="round"/>
  <line x1="48" y1="42" x2="76" y2="42" stroke="#37474F" stroke-width="4" stroke-linecap="round"/>
  <circle cx="76" cy="42" r="4" fill="#37474F"/>
  <line x1="48" y1="42" x2="38" y2="32" stroke="#37474F" stroke-width="3" stroke-linecap="round"/>
  <line x1="34" y1="32" x2="44" y2="32" stroke="#37474F" stroke-width="3" stroke-linecap="round"/>
</svg>`;

/**
 * SVG fallback for 3 parties not on nepalelectionupdates.com
 */
export const COLORED_SYMBOLS = {
  "2585": TAP,      // Janamat Party
  "2531": GRINDER,  // Nagarik Unmukti / JSP(Ekala)
  "2545": BICYCLE,  // Loktantrik Samajbadi
};
