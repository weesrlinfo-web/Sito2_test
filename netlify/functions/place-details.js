/**
 * Netlify Function: Place Details (New)
 *
 * Calls Places API (New) Place Details endpoint server-side so the API key stays private.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
 */

exports.handler = async function handler(event) {
  try {
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const apiKey = process.env.PLACES_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing PLACES_API_KEY env var' }) };
    }

    const qs = event.queryStringParameters || {};
    const placeId = (qs.placeId || '').trim();
    const languageCode = (qs.languageCode || 'it').trim();
    const regionCode = (qs.regionCode || 'IT').trim();

    if (!placeId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing placeId' }) };
    }

    // IMPORTANT: every requested field can affect billing.
    // - photos -> IDs Only SKU
    // - currentOpeningHours/regularOpeningHours -> Enterprise SKU
    // Keep this minimal.
    const fieldMask = [
      'id',
      'photos',
      'currentOpeningHours',
      'regularOpeningHours'
    ].join(',');

    const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`);
    url.searchParams.set('languageCode', languageCode);
    url.searchParams.set('regionCode', regionCode);

    const resp = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
    });

    const text = await resp.text();
    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: 'Places API error', status: resp.status, details: safeJson(text) }),
      };
    }

    const data = safeJson(text) || {};

    // Return only what the frontend needs
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache on the edge for a short time to reduce cost.
        // NOTE: check Google Maps Platform terms for caching rules.
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify({
        id: data.id,
        photos: Array.isArray(data.photos) ? data.photos.map((p) => ({
          name: p.name,
          widthPx: p.widthPx,
          heightPx: p.heightPx,
        })) : [],
        currentOpeningHours: data.currentOpeningHours || null,
        regularOpeningHours: data.regularOpeningHours || null,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', message: String(err) }),
    };
  }
};

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
