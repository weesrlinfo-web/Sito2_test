/**
 * Aggiorna il cache statico di Places (foto + orari) usando Places API (New).
 * - Legge: locali.json (place_id)
 * - Scrive: places_cache.json
 * - Scarica (solo se manca): assets/place-photos/<place_id>.<ext>
 *
 * Requisiti:
 *   - PLACES_API_KEY in environment (GitHub Secret)
 */

import fs from "node:fs/promises";
import path from "node:path";

const API_KEY = process.env.PLACES_API_KEY;
if (!API_KEY) {
  console.error("Errore: manca PLACES_API_KEY (GitHub Secret).");
  process.exit(1);
}

const ROOT = process.cwd();
const LOCALI_PATH = path.join(ROOT, "locali.json");
const CACHE_PATH = path.join(ROOT, "places_cache.json");
const PHOTOS_DIR = path.join(ROOT, "assets", "place-photos");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function readJsonSafe(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function pickExt(contentType) {
  const ct = (contentType || "").toLowerCase();
  if (ct.includes("image/png")) return "png";
  if (ct.includes("image/webp")) return "webp";
  return "jpg";
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchPlaceDetails(placeId) {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=it`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      // FieldMask obbligatorio per Places API (New)
      "X-Goog-FieldMask": "displayName,formattedAddress,regularOpeningHours.weekdayDescriptions,photos",
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`PlaceDetails HTTP ${res.status} ${res.statusText} - ${body.slice(0, 200)}`);
  }

  return res.json();
}

async function fetchPhotoUri(photoName) {
  // skipHttpRedirect=true per ottenere JSON { photoUri } (evita redirect in actions)
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=900&skipHttpRedirect=true`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`PhotoMedia HTTP ${res.status} ${res.statusText} - ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  if (!data?.photoUri) throw new Error("PhotoMedia: photoUri mancante");
  return data.photoUri;
}

async function downloadPhotoIfMissing(placeId, photoUri, preferredExistingPath) {
  // Se esiste già una foto in cache e il file è presente, non scarichiamo di nuovo
  if (preferredExistingPath) {
    const abs = path.join(ROOT, preferredExistingPath);
    if (await fileExists(abs)) return preferredExistingPath;
  }

  const imgRes = await fetch(photoUri);
  if (!imgRes.ok) {
    throw new Error(`Download photo HTTP ${imgRes.status} ${imgRes.statusText}`);
  }

  const ext = pickExt(imgRes.headers.get("content-type"));
  const relPath = path.join("assets", "place-photos", `${placeId}.${ext}`).replaceAll("\\", "/");
  const absPath = path.join(ROOT, relPath);

  // Se esiste già quel file, non sovrascriviamo (evita commit inutili)
  if (await fileExists(absPath)) return relPath;

  const buf = Buffer.from(await imgRes.arrayBuffer());
  await fs.writeFile(absPath, buf);
  return relPath;
}

async function main() {
  const locali = await readJsonSafe(LOCALI_PATH, []);
  const existingCache = await readJsonSafe(CACHE_PATH, {});

  await fs.mkdir(PHOTOS_DIR, { recursive: true });

  const out = { ...existingCache };
  const nowIso = new Date().toISOString();

  let processed = 0;
  for (const l of locali) {
    const placeId = (l.place_id || "").trim();
    if (!placeId) continue;

    try {
      const details = await fetchPlaceDetails(placeId);

      const name = details?.displayName?.text || l.nome || "";
      const address = details?.formattedAddress || l.indirizzo || "";
      const weekdayDescriptions = details?.regularOpeningHours?.weekdayDescriptions || [];

      let photoPath = out?.[placeId]?.photoPath || "";
      const firstPhotoName = details?.photos?.[0]?.name || "";
      if (firstPhotoName) {
        try {
          const photoUri = await fetchPhotoUri(firstPhotoName);
          photoPath = await downloadPhotoIfMissing(placeId, photoUri, photoPath);
        } catch (e) {
          console.warn(`[WARN] Foto non aggiornata per ${placeId}: ${e?.message || e}`);
        }
      }

      out[placeId] = {
        placeId,
        name,
        address,
        weekdayDescriptions,
        photoPath,
        updatedAt: nowIso,
      };

      processed += 1;
      // piccolo delay per evitare burst
      await sleep(150);
    } catch (e) {
      console.warn(`[WARN] Skip ${placeId}: ${e?.message || e}`);
      // mantieni l'entry esistente (se c'è)
    }
  }

  // Scrivi cache ordinato per stabilità diff
  const ordered = Object.fromEntries(Object.entries(out).sort((a, b) => a[0].localeCompare(b[0])));
  await fs.writeFile(CACHE_PATH, JSON.stringify(ordered, null, 2), "utf8");

  console.log(`OK: aggiornate ${processed} entries. Cache: ${CACHE_PATH}`);
}

main().catch((e) => {
  console.error("Errore:", e);
  process.exit(1);
});
