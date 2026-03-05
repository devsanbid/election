/**
 * Aggregate candidate data by political party
 * Returns array of party objects sorted by total votes (descending)
 */
export function aggregateByParty(candidates) {
  const partyMap = {};

  candidates.forEach((c) => {
    const party = c.PoliticalPartyName || "स्वतन्त्र";
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
      name: c.CandidateName,
      party: c.PoliticalPartyName || "स्वतन्त्र",
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

  // Sort candidates within each constituency by votes
  Object.values(constMap).forEach((constituency) => {
    constituency.candidates.sort((a, b) => b.votes - a.votes);
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

// Party color mapping for major Nepal parties
export const PARTY_COLORS = {
  "नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी–लेनिनवादी)": "#E53935",
  "नेपाली काङ्ग्रेस": "#1565C0",
  "नेपाल कम्युनिष्ट पार्टी (माओवादी केन्द्र)": "#C62828",
  "राष्ट्रिय स्वतन्त्र पार्टी": "#FF8F00",
  "राष्ट्रिय प्रजातन्त्र पार्टी": "#6A1B9A",
  "जनता समाजवादी पार्टी, नेपाल": "#2E7D32",
  "लोकतान्त्रिक समाजवादी पार्टी, नेपाल": "#00838F",
  "नागरिक उन्मुक्ति पार्टी": "#EF6C00",
  "जनमत पार्टी": "#AD1457",
  "नेपाल मजदुर किसान पार्टी": "#4527A0",
  स्वतन्त्र: "#78909C",
};

export function getPartyColor(partyName) {
  // Check exact match
  if (PARTY_COLORS[partyName]) return PARTY_COLORS[partyName];

  // Check partial match
  for (const [key, color] of Object.entries(PARTY_COLORS)) {
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
