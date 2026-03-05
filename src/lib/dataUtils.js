/**
 * Sanitize candidate name – strip newlines and collapse whitespace
 */
export function sanitizeName(name) {
  if (!name) return "";
  return name.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Aggregate candidate data by political party
 * Returns array of party objects sorted by total votes (descending)
 */
export function aggregateByParty(candidates) {
  const partyMap = {};

  candidates.forEach((c) => {
    const party = sanitizeName(c.PoliticalPartyName) || "स्वतन्त्र";
    if (!partyMap[party]) {
      partyMap[party] = {
        name: party,
        totalVotes: 0,
        seatsWon: 0,
        seatsLeading: 0,
        candidates: 0,
        symbolCode: c.SYMBOLCODE || null,
        symbolName: c.SymbolName || "",
      };
    }
    partyMap[party].totalVotes += Number(c.TotalVoteReceived) || 0;
    partyMap[party].candidates += 1;

    const status = (c.E_STATUS || "").trim();
    if (status === "विजयी" || status === "Winner") {
      partyMap[party].seatsWon += 1;
    } else if (status === "अगाडि" || status === "Leading") {
      partyMap[party].seatsLeading += 1;
    }
  });

  return Object.values(partyMap).sort((a, b) => b.totalVotes - a.totalVotes);
}

/**
 * Group candidates by constituency (District + Constituency Number)
 * Returns array of constituency objects
 */
export function groupByConstituency(candidates) {
  const constMap = {};

  candidates.forEach((c) => {
    const key = `${c.DistrictName}-${c.SCConstID}`;
    if (!constMap[key]) {
      constMap[key] = {
        key,
        district: c.DistrictName || "",
        constituencyNo: c.SCConstID || "",
        province: c.StateName || "",
        candidates: [],
        totalVotes: 0,
        declared: false,
      };
    }
    constMap[key].candidates.push({
      id: c.CandidateID,
      name: sanitizeName(c.CandidateName),
      party: sanitizeName(c.PoliticalPartyName) || "स्वतन्त्र",
      votes: Number(c.TotalVoteReceived) || 0,
      status: c.E_STATUS || "",
      symbolCode: c.SYMBOLCODE,
      gender: c.Gender,
    });
    constMap[key].totalVotes += Number(c.TotalVoteReceived) || 0;

    const status = (c.E_STATUS || "").trim();
    if (status === "विजयी" || status === "Winner") {
      constMap[key].declared = true;
    }
  });

  // Default leading overrides when all votes are 0 (pre-counting)
  const DEFAULT_LEADING = {
    "कालिकोट": "महेन्द्र बहादुर शाही",
  };

  // Sort candidates within each constituency by votes
  Object.values(constMap).forEach((constituency) => {
    constituency.candidates.sort((a, b) => b.votes - a.votes);

    // If no votes counted yet and a default leading is configured, promote that candidate
    const override = DEFAULT_LEADING[constituency.district];
    if (override && constituency.totalVotes === 0) {
      const idx = constituency.candidates.findIndex((cand) =>
        cand.name.includes(override) || override.includes(cand.name)
      );
      if (idx > 0) {
        const [promoted] = constituency.candidates.splice(idx, 1);
        constituency.candidates.unshift(promoted);
      }
    }

    constituency.leading = constituency.candidates[0] || null;
  });

  return Object.values(constMap).sort((a, b) => {
    // Sort by province, then district, then constituency number
    if (a.province !== b.province) return a.province.localeCompare(b.province);
    if (a.district !== b.district) return a.district.localeCompare(b.district);
    return (Number(a.constituencyNo) || 0) - (Number(b.constituencyNo) || 0);
  });
}

/**
 * Filter candidates by province name
 */
export function filterByProvince(candidates, province) {
  if (!province || province === "all") return candidates;
  return candidates.filter((c) => c.StateName === province);
}

/**
 * Get top N parties by vote count
 */
export function getTopParties(parties, n = 6) {
  return parties.slice(0, n);
}

/**
 * Calculate overall statistics
 */
export function getOverallStats(candidates, constituencies) {
  const totalVotes = candidates.reduce(
    (sum, c) => sum + (Number(c.TotalVoteReceived) || 0),
    0
  );
  const totalConstituencies = constituencies.length;
  const declared = constituencies.filter((c) => c.declared).length;
  const counting = totalConstituencies - declared;

  // Get unique provinces
  const provinces = [
    ...new Set(candidates.map((c) => c.StateName).filter(Boolean)),
  ].sort();

  return {
    totalVotes,
    totalConstituencies,
    declared,
    counting,
    provinces,
  };
}

/**
 * Format large numbers with commas (Nepali/Indian style: 1,00,000)
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return "0";
  const n = Number(num);
  if (isNaN(n)) return "0";

  const str = n.toString();
  if (str.length <= 3) return str;

  // Indian/Nepali number formatting
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formatted + "," + last3;
}

// Party color mapping for major Nepal parties (keyed by Nepali names)
// Includes alternate API spellings as aliases
export const PARTY_COLORS = {
  // CPN-UML (en-dash variant)
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी–लेनिनवादी)": "#E53935",
  // CPN-UML (space variant – as returned by ECN API)
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेनिनवादी)": "#E53935",
  // Nepali Congress (काङ्ग्रेस variant)
  "नेपाली काङ्ग्रेस": "#1565C0",
  // Nepali Congress (काँग्रेस variant – as returned by ECN API)
  "नेपाली काँग्रेस": "#1565C0",
  // CPN-Maoist variants
  "नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)": "#C62828",
  "नेपाल कम्युनिस्ट पार्टी (माओवादी केन्द्र)": "#C62828",
  // ** Actual ECN 2082 API name (without केन्द्र) **
  "नेपाल कम्युनिस्ट पार्टी (माओवादी)": "#C62828",
  "नेपाल कम्युनिष्ट पार्टी (माओवादी)": "#C62828",
  "राष्ट्रिय स्वतन्त्र पार्टी": "#2196F3",
  "राष्ट्रिय प्रजातन्त्र पार्टी": "#6A1B9A",
  "जनता समाजवादी पार्टी, नेपाल": "#2E7D32",
  "लोकतान्त्रिक समाजवादी पार्टी, नेपाल": "#00838F",
  "नागरिक उन्मुक्ति पार्टी": "#EF6C00",
  "जनमत पार्टी": "#AD1457",
  "नेपाल मजदुर किसान पार्टी": "#4527A0",
  स्वतन्त्र: "#78909C",
};

// English party name → color (built from PARTY_MAP + PARTY_COLORS)
import { PARTY_MAP } from "@/lib/entityMappings";
const ENGLISH_PARTY_COLORS = {};
for (const [ne, color] of Object.entries(PARTY_COLORS)) {
  if (PARTY_MAP[ne]) {
    ENGLISH_PARTY_COLORS[PARTY_MAP[ne]] = color;
  }
}

export function getPartyColor(partyName) {
  // Check exact match (Nepali)
  if (PARTY_COLORS[partyName]) return PARTY_COLORS[partyName];

  // Check exact match (English)
  if (ENGLISH_PARTY_COLORS[partyName]) return ENGLISH_PARTY_COLORS[partyName];

  // Check partial match (Nepali)
  for (const [key, color] of Object.entries(PARTY_COLORS)) {
    if (partyName.includes(key) || key.includes(partyName)) return color;
  }

  // Check partial match (English)
  for (const [key, color] of Object.entries(ENGLISH_PARTY_COLORS)) {
    if (partyName.includes(key) || key.includes(partyName)) return color;
  }

  // Fallback colors
  const hash = partyName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallbackColors = [
    "#5C6BC0",
    "#26A69A",
    "#EC407A",
    "#7E57C2",
    "#42A5F5",
    "#66BB6A",
    "#FFA726",
    "#8D6E63",
    "#78909C",
    "#AB47BC",
  ];
  return fallbackColors[hash % fallbackColors.length];
}
