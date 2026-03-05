// Path-based symbol proxy with in-memory LRU cache
import { getImage, setImage } from "@/lib/imageCache";

const SYMBOL_MAP = {
  "2583": "1",     // Nepali Congress — रुख (Tree)
  "2598": "2",     // CPN (UML) — सुर्य (Sun)
  "2557": "3",     // CPN (Maoist) — पाँचकुने तारा (Star)
  "2526": "3",     // CPN (Maoist Centre) alternate code
  "2542": "2278",  // Janata Samajbadi — ढल्केको छाता (Umbrella)
  "2604": "2279",  // Rastriya Prajatantra — हलो (Plow)
  "2528": "2445",  // Rastriya Swatantra — घण्टी (Bell)
  "2531": "2306",  // Nagarik Unmukti/JSP(Ekala) — चकिया (Grinder)
  "2522": "10",    // Rastriya Janamorcha — गिलास (Glass)
  "2578": "12",    // Nepal Majdur Kisan — मादल (Madal)
  "2585": "2289",  // Janamat Party — धारा (Water Tap)
  "2511": "18",    // Mongol National — कुखुराको भाले (Rooster)
  "2529": "92",    // Nepal Janamukti — घर (House)
  "2607": "1020",  // CPN (Unified Socialist) — कलम (Pen)
  "2545": "92",    // Loktantrik Samajbadi — साइकल (Bicycle)
};

const ECN_SYMBOL_BASE = "https://result.election.gov.np/Images/symbol-hor-pa";

const RESP_HEADERS = {
  "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
  "CDN-Cache-Control": "public, max-age=86400, immutable",
};

async function fetchSymbol(url) {
  return fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      Accept: "image/*",
      Referer: "https://result.election.gov.np/",
    },
  });
}

export async function GET(_request, { params }) {
  try {
    const { code } = await params;

    if (!code) {
      return new Response("Missing symbol code", { status: 400 });
    }

    const cacheKey = `sym:${code}`;

    // 1. Serve from in-memory cache (instant)
    const cached = getImage(cacheKey);
    if (cached) {
      return new Response(cached.buf, {
        headers: { "Content-Type": cached.type, "X-Cache": "HIT", ...RESP_HEADERS },
      });
    }

    // 2. Fetch from ECN
    const imageId = SYMBOL_MAP[code] || code;
    let response = await fetchSymbol(`${ECN_SYMBOL_BASE}/${imageId}.jpg?v=0.2`);

    // Fallback to raw code if mapped ID failed
    if (!response.ok && imageId !== code) {
      response = await fetchSymbol(`${ECN_SYMBOL_BASE}/${code}.jpg?v=0.2`);
    }

    if (!response.ok) {
      return new Response("Symbol not found", { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // 3. Store in memory
    setImage(cacheKey, imageBuffer, contentType);

    return new Response(imageBuffer, {
      headers: { "Content-Type": contentType, "X-Cache": "MISS", ...RESP_HEADERS },
    });
  } catch (error) {
    console.error("Symbol proxy error:", error);
    return new Response("Failed to fetch symbol", { status: 502 });
  }
}
