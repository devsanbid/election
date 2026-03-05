// Path-based symbol proxy — Netlify CDN caches each /api/symbol/<code> separately
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

export async function GET(_request, { params }) {
  try {
    const { code } = await params;

    if (!code) {
      return new Response("Missing symbol code", { status: 400 });
    }

    const imageId = SYMBOL_MAP[code] || code;
    const imageUrl = `${ECN_SYMBOL_BASE}/${imageId}.jpg?v=0.2`;

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        Accept: "image/*",
        Referer: "https://result.election.gov.np/",
      },
    });

    if (!response.ok && imageId !== code) {
      const fallback = await fetch(`${ECN_SYMBOL_BASE}/${code}.jpg?v=0.2`, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "image/*",
          Referer: "https://result.election.gov.np/",
        },
      });
      if (fallback.ok) {
        const buf = await fallback.arrayBuffer();
        return new Response(buf, {
          headers: {
            "Content-Type": fallback.headers.get("content-type") || "image/jpeg",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
            "CDN-Cache-Control": "public, max-age=86400, immutable",
          },
        });
      }
    }

    if (!response.ok) {
      return new Response("Symbol not found", { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
        "CDN-Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("Symbol proxy error:", error);
    return new Response("Failed to fetch symbol", { status: 502 });
  }
}
