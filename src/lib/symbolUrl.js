/**
 * Symbol URL resolver.
 * Major parties → static /symbols/{code}.jpg (official, colorful, instant)
 * Others → direct ECN URL (no proxy needed for <img> tags)
 */

// Downloaded official colorful symbols in public/symbols/
const LOCAL_SYMBOLS = new Set([
  "2583", // Nepali Congress
  "2598", // CPN-UML
  "2557", // CPN Maoist Centre
  "2526", // CPN Maoist Centre (alt)
  "2528", // Rastriya Swatantra Party
  "2604", // Rastriya Prajatantra Party
  "2542", // Janata Samajbadi Party
  "2607", // CPN (Unified Socialist)
  "2522", // Rastriya Janamorcha
  "2578", // Nepal Majdur Kisan Party
  "2511", // Mongol National Organisation
  "2529", // Nepal Janamukti Party
]);

const ECN_SYMBOL_BASE = "https://result.election.gov.np/Images/symbol-hor-pa";

export function getSymbolUrl(symbolCode) {
  if (!symbolCode) return null;
  const code = String(symbolCode);
  if (LOCAL_SYMBOLS.has(code)) {
    return `/symbols/${code}.jpg`;
  }
  return `${ECN_SYMBOL_BASE}/${code}.jpg?v=0.2`;
}

