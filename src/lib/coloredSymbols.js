/**
 * Colored SVG party symbols for major Nepal parties.
 * Served inline from the symbol API — no external fetch needed.
 * Keyed by SYMBOLCODE from ECN data.
 */

// Nepali Congress — रुख (Tree)
const TREE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="53" y="72" width="14" height="32" rx="3" fill="#5D4037"/>
  <rect x="49" y="96" width="22" height="6" rx="3" fill="#4E342E"/>
  <polygon points="60,6 18,50 102,50" fill="#1B5E20"/>
  <polygon points="60,22 24,62 96,62" fill="#2E7D32"/>
  <polygon points="60,38 28,74 92,74" fill="#388E3C"/>
</svg>`;

// CPN-UML — सुर्य (Sun)
const SUN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <g transform="translate(60,60)">
    <g fill="#D32F2F">${[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>`<polygon points="-5,-24 0,-48 5,-24" transform="rotate(${a})"/>`).join('')}</g>
    <circle r="22" fill="#F44336"/>
    <circle r="16" fill="#EF5350"/>
  </g>
</svg>`;

// CPN Maoist Centre — हँसिया हथौडा (Hammer & Sickle in Star)
const STAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <polygon points="60,6 73,42 112,42 80,64 92,100 60,78 28,100 40,64 8,42 47,42"
    fill="#C62828" stroke="#B71C1C" stroke-width="2"/>
  <polygon points="60,22 68,44 92,44 72,58 80,80 60,66 40,80 48,58 28,44 52,44"
    fill="#E53935"/>
</svg>`;

// Rastriya Swatantra Party — घण्टी (Bell)
const BELL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="56" y="6" width="8" height="14" rx="4" fill="#0D47A1"/>
  <path d="M60 18 C60 18 54 18 54 26 C54 26 34 34 30 62 C28 76 26 82 22 86 L98 86 C94 82 92 76 90 62 C86 34 66 26 66 26 C66 18 60 18 60 18Z"
    fill="#1565C0"/>
  <path d="M60 18 C60 18 56 18 56 26 C56 26 40 34 36 58 C34 70 32 78 28 84 L60 84 L60 18Z"
    fill="#1976D2" opacity="0.7"/>
  <ellipse cx="60" cy="88" rx="18" ry="5" fill="#0D47A1"/>
  <circle cx="60" cy="98" r="7" fill="#1565C0"/>
  <circle cx="60" cy="98" r="4" fill="#0D47A1"/>
</svg>`;

// Rastriya Prajatantra Party — हलो (Plow)
const PLOW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <path d="M30 30 L90 90" stroke="#E65100" stroke-width="8" stroke-linecap="round"/>
  <path d="M20 80 Q20 100 40 105 L100 105 Q110 105 110 95 L110 90 Q110 82 100 82 L55 82 Q40 82 35 70 Z"
    fill="#F57C00"/>
  <path d="M20 80 Q20 100 40 105 L70 105 L55 82 Q40 82 35 70 Z"
    fill="#EF6C00"/>
  <circle cx="30" cy="30" r="6" fill="#BF360C"/>
  <path d="M26 26 L18 18" stroke="#BF360C" stroke-width="5" stroke-linecap="round"/>
</svg>`;

// Janata Samajbadi Party — ढल्केको छाता (Umbrella)
const UMBRELLA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <path d="M60 14 C28 14 10 40 10 56 L60 56 Z" fill="#00838F"/>
  <path d="M60 14 C92 14 110 40 110 56 L60 56 Z" fill="#00ACC1"/>
  <line x1="60" y1="14" x2="60" y2="100" stroke="#4E342E" stroke-width="5" stroke-linecap="round"/>
  <path d="M60 100 Q60 112 48 112" stroke="#4E342E" stroke-width="5" fill="none" stroke-linecap="round"/>
  <line x1="10" y1="56" x2="60" y2="56" stroke="#006064" stroke-width="1.5"/>
  <line x1="60" y1="56" x2="110" y2="56" stroke="#00838F" stroke-width="1.5"/>
  <path d="M35 56 Q35 24 60 14" stroke="#006064" stroke-width="1.5" fill="none"/>
  <path d="M85 56 Q85 24 60 14" stroke="#00838F" stroke-width="1.5" fill="none"/>
</svg>`;

// CPN (Unified Socialist) — कलम (Pen)
const PEN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <rect x="52" y="14" width="16" height="60" rx="3" fill="#C62828"/>
  <rect x="52" y="14" width="8" height="60" rx="2" fill="#D32F2F"/>
  <polygon points="52,74 68,74 60,100" fill="#FFB300"/>
  <polygon points="58,90 62,90 60,100" fill="#37474F"/>
  <rect x="50" y="10" width="20" height="8" rx="2" fill="#B71C1C"/>
  <rect x="52" y="48" width="16" height="3" rx="1" fill="#B71C1C"/>
  <ellipse cx="60" cy="14" rx="4" ry="2" fill="#FFCDD2"/>
</svg>`;

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

// Rastriya Janamorcha — गिलास (Glass)
const GLASS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <path d="M36 20 L42 90 L78 90 L84 20 Z" fill="#42A5F5" opacity="0.85"/>
  <path d="M36 20 L42 90 L60 90 L60 20 Z" fill="#64B5F6" opacity="0.6"/>
  <rect x="38" y="90" width="44" height="6" rx="2" fill="#1565C0"/>
  <rect x="44" y="96" width="32" height="8" rx="2" fill="#0D47A1"/>
  <ellipse cx="60" cy="20" rx="24" ry="5" fill="#90CAF9" opacity="0.6"/>
  <path d="M40 20 L44 75" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// Nepal Majdur Kisan Party — मादल (Madal/Drum)
const MADAL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <ellipse cx="60" cy="60" rx="40" ry="22" fill="#8D6E63"/>
  <ellipse cx="60" cy="60" rx="40" ry="22" fill="#6D4C41" opacity="0.5"/>
  <ellipse cx="60" cy="56" rx="40" ry="22" fill="#A1887F"/>
  <ellipse cx="60" cy="56" rx="28" ry="15" fill="#BCAAA4" opacity="0.4"/>
  <ellipse cx="26" cy="58" rx="8" ry="18" fill="#D7CCC8" opacity="0.4"/>
  <ellipse cx="94" cy="58" rx="8" ry="18" fill="#D7CCC8" opacity="0.4"/>
  <line x1="20" y1="48" x2="100" y2="48" stroke="#5D4037" stroke-width="2"/>
  <line x1="20" y1="68" x2="100" y2="68" stroke="#5D4037" stroke-width="2"/>
</svg>`;

// Mongol National Organisation — कुखुराको भाले (Rooster)
const ROOSTER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <path d="M55 40 Q50 20 60 12 Q65 20 60 30" fill="#D32F2F"/>
  <ellipse cx="58" cy="52" rx="20" ry="18" fill="#E65100"/>
  <ellipse cx="58" cy="52" rx="16" ry="15" fill="#F57C00"/>
  <circle cx="52" cy="44" r="3" fill="#37474F"/>
  <polygon points="42,48 32,46 42,52" fill="#FDD835"/>
  <path d="M72 56 Q90 40 95 55 Q88 50 78 58" fill="#1B5E20"/>
  <path d="M72 60 Q92 52 96 65 Q86 58 78 64" fill="#2E7D32"/>
  <path d="M72 64 Q88 62 92 74 Q84 66 76 68" fill="#388E3C"/>
  <line x1="50" y1="70" x2="46" y2="96" stroke="#F57C00" stroke-width="4" stroke-linecap="round"/>
  <line x1="62" y1="70" x2="66" y2="96" stroke="#F57C00" stroke-width="4" stroke-linecap="round"/>
  <path d="M40 96 L52 96" stroke="#F57C00" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 96 L72 96" stroke="#F57C00" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// Nepal Janamukti Party — घर (House)
const HOUSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <polygon points="60,14 14,56 106,56" fill="#D32F2F"/>
  <polygon points="60,20 20,56 100,56" fill="#E53935"/>
  <rect x="28" y="56" width="64" height="44" fill="#FDD835"/>
  <rect x="28" y="56" width="32" height="44" fill="#FBC02D"/>
  <rect x="48" y="68" width="24" height="32" rx="2" fill="#795548"/>
  <rect x="48" y="68" width="12" height="32" rx="1" fill="#6D4C41"/>
  <circle cx="68" cy="84" r="2" fill="#FFB300"/>
  <rect x="34" y="64" width="10" height="10" rx="1" fill="#42A5F5"/>
  <rect x="76" y="64" width="10" height="10" rx="1" fill="#42A5F5"/>
  <rect x="82" y="38" width="8" height="22" rx="2" fill="#78909C"/>
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

/**
 * Map of SYMBOLCODE → colored SVG string.
 * Major parties get instant colored symbols with zero network calls.
 */
export const COLORED_SYMBOLS = {
  "2583": TREE,     // Nepali Congress
  "2598": SUN,      // CPN-UML
  "2557": STAR,     // CPN Maoist Centre
  "2526": STAR,     // CPN Maoist Centre (alternate code)
  "2528": BELL,     // Rastriya Swatantra Party
  "2604": PLOW,     // Rastriya Prajatantra Party
  "2542": UMBRELLA, // Janata Samajbadi Party
  "2607": PEN,      // CPN (Unified Socialist)
  "2585": TAP,      // Janamat Party
  "2531": GRINDER,  // Nagarik Unmukti / JSP(Ekala)
  "2522": GLASS,    // Rastriya Janamorcha
  "2578": MADAL,    // Nepal Majdur Kisan Party
  "2511": ROOSTER,  // Mongol National Organisation
  "2529": HOUSE,    // Nepal Janamukti Party
  "2545": BICYCLE,  // Loktantrik Samajbadi
};
