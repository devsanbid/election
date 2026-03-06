// Data source: NepalVotes R2 bucket (mirrors ECN data in real-time)
const R2_URL = "https://pub-4173e04d0b78426caa8cfa525f827daa.r2.dev/constituencies.json";

// Province name mapping: English → Nepali (as used in ECN data)
const PROVINCE_MAP = {
  Koshi: "कोशी प्रदेश",
  Madhesh: "मधेश प्रदेश",
  Bagmati: "बागमती प्रदेश",
  Gandaki: "गण्डकी प्रदेश",
  Lumbini: "लुम्बिनी प्रदेश",
  Karnali: "कर्णाली प्रदेश",
  Sudurpashchim: "सुदूरपश्चिम प्रदेश",
};

/**
 * Transform R2 constituency-grouped data into a flat candidate array
 * matching the original ECN field names that the frontend expects.
 */
function transformR2Data(constituencies) {
  const candidates = [];

  for (const c of constituencies) {
    // Parse constituency number from code like "1-ताप्लेजुङ-1"
    const parts = (c.code || "").split("-");
    const constNo = parts.length >= 3 ? parts[parts.length - 1] : "";

    const provinceName = PROVINCE_MAP[c.province] || c.province || "";

    for (const cand of c.candidates || []) {
      candidates.push({
        CandidateID: cand.candidateId,
        CandidateName: cand.nameNp || cand.name || "",
        PoliticalPartyName: cand.partyName || "",
        TotalVoteReceived: cand.votes || 0,
        DistrictName: c.districtNp || c.district || "",
        SCConstID: constNo,
        StateName: provinceName,
        SYMBOLCODE: cand.partyId || "",
        E_STATUS: cand.isWinner ? "विजयी" : "",
        Gender: cand.gender || "",
        SymbolName: "",
      });
    }
  }

  return candidates;
}

// In-memory cache — 60s keeps data warm between SWR polls
let cache = {};
const CACHE_TTL = 60_000;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "candidates";

  // Only "candidates" type is supported with R2 source
  if (type !== "candidates") {
    return Response.json(
      { error: "Invalid type. Use: candidates" },
      { status: 400 }
    );
  }

  try {
    // Serve from warm cache if fresh
    const now = Date.now();
    if (cache[type] && now - cache[type].ts < CACHE_TTL) {
      return Response.json(cache[type].payload, {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
          "CDN-Cache-Control": "public, max-age=30, stale-while-revalidate=60",
          "X-Cache": "HIT",
        },
      });
    }

    const response = await fetch(R2_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    if (!response.ok) {
      throw new Error(`R2 returned ${response.status}`);
    }

    const text = await response.text();
    let rawData;
    try {
      rawData = JSON.parse(text);
    } catch {
      rawData = JSON.parse(text.trim().replace(/^\uFEFF/, ""));
    }

    // Transform from constituency-grouped format to flat candidate array
    const data = transformR2Data(rawData);

    const payload = {
      data,
      timestamp: new Date().toISOString(),
      source: "Election Commission Nepal",
    };

    // Update warm cache
    cache[type] = { payload, ts: now };

    return Response.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "CDN-Cache-Control": "public, max-age=30, stale-while-revalidate=60",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Election API Error:", error);

    // Serve stale cache on error (any age)
    if (cache[type]) {
      return Response.json(cache[type].payload, {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          "X-Cache": "STALE",
        },
      });
    }

    return Response.json(
      { error: "Failed to fetch election data", message: error.message },
      { status: 502 }
    );
  }
}
