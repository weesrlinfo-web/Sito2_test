/**
 * Netlify Function: Place Photos (New) -> returns a short-lived photoUri.
 *
 * Calls: https://places.googleapis.com/v1/NAME/media?maxWidthPx=...&skipHttpRedirect=true
 * Docs: https://developers.google.com/maps/documentation/places/web-service/photos
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
    const name = (qs.name || '').trim();
    const maxWidthPx = String(qs.maxWidthPx || '900').trim();

    if (!name) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing name' }) };
    }

    // Basic safety: avoid path traversal / weird inputs
    if (!name.startsWith('places/') || name.includes('..')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid name' }) };
    }

    const url = new URL(`https://places.googleapis.com/v1/${name}/media`);
    url.searchParams.set('key', apiKey);
    url.searchParams.set('maxWidthPx', maxWidthPx);
    url.searchParams.set('skipHttpRedirect', 'true');

    const resp = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const text = await resp.text();
    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: 'Places Photo error', status: resp.status, details: safeJson(text) }),
      };
    }

    const data = safeJson(text) || {};
    const photoUri = data.photoUri;
    if (!photoUri) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Missing photoUri from Places API' }) };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // short cache: photoUri is temporary
        'Cache-Control': 'public, max-age=60',
      },
      body: JSON.stringify({ photoUri }),
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
