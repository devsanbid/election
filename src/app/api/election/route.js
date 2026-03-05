const ECN_BASE = "https://result.election.gov.np/JSONFiles";

const ENDPOINTS = {
  candidates: `${ECN_BASE}/ElectionResultCentral2082.txt`,
  states: `${ECN_BASE}/StateName.txt`,
  districts: `${ECN_BASE}/DistrictName.txt`,
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "candidates";

    const url = ENDPOINTS[type];
    if (!url) {
      return Response.json(
        { error: "Invalid type. Use: candidates, states, districts" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json, text/plain, */*",
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
      // Sometimes the response might have BOM or extra whitespace
      data = JSON.parse(text.trim().replace(/^\uFEFF/, ""));
    }

    return Response.json({
      data,
      timestamp: new Date().toISOString(),
      source: "Election Commission Nepal",
    });
  } catch (error) {
    console.error("Election API Error:", error);
    return Response.json(
      {
        error: "Failed to fetch election data",
        message: error.message,
      },
      { status: 502 }
    );
  }
}
