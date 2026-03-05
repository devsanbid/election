const ECN_BASE = "https://result.election.gov.np/JSONFiles";

const ENDPOINTS = {
  candidates: `${ECN_BASE}/ElectionResultCentral2082.txt`,
  states: `${ECN_BASE}/StateName.txt`,
  districts: `${ECN_BASE}/DistrictName.txt`,
};

// In-memory cache — 60s keeps data warm between SWR polls (15s interval)
// On cold start, first request fetches from ECN, all subsequent requests use cache
let cache = {};
const CACHE_TTL = 60_000; // 60 seconds (up from 10s)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "candidates";

  try {
    const url = ENDPOINTS[type];
    if (!url) {
      return Response.json(
        { error: "Invalid type. Use: candidates, states, districts" },
        { status: 400 }
      );
    }

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

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
      },
    });

    if (!response.ok) {
      throw new Error(`ECN returned ${response.status}`);
    }

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = JSON.parse(text.trim().replace(/^\uFEFF/, ""));
    }

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
