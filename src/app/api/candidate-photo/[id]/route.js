// Path-based candidate photo proxy with in-memory LRU cache
import { getImage, setImage } from "@/lib/imageCache";

const ECN_PHOTO_BASE = "https://result.election.gov.np/Images/candidate";

const RESP_HEADERS = {
  "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
  "CDN-Cache-Control": "public, max-age=86400, immutable",
};

export async function GET(_request, { params }) {
  try {
    const { id } = await params;

    if (!id || !/^\d+$/.test(id)) {
      return new Response("Invalid candidate ID", { status: 400 });
    }

    const cacheKey = `photo:${id}`;

    // 1. Serve from in-memory cache (instant, no network)
    const cached = getImage(cacheKey);
    if (cached) {
      return new Response(cached.buf, {
        headers: { "Content-Type": cached.type, "X-Cache": "HIT", ...RESP_HEADERS },
      });
    }

    // 2. Fetch from ECN
    const response = await fetch(`${ECN_PHOTO_BASE}/${id}.jpg`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        Accept: "image/*",
        Referer: "https://result.election.gov.np/",
      },
    });

    if (!response.ok) {
      return new Response("Candidate photo not found", { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // 3. Store in memory for subsequent requests
    setImage(cacheKey, imageBuffer, contentType);

    return new Response(imageBuffer, {
      headers: { "Content-Type": contentType, "X-Cache": "MISS", ...RESP_HEADERS },
    });
  } catch (error) {
    console.error("Candidate photo proxy error:", error);
    return new Response("Failed to fetch candidate photo", { status: 502 });
  }
}
