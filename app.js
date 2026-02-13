/* =========================================================
   PLUGHUB - Map + List (no search)
   - Lista stazioni a sinistra, mappa a destra
   - Card overlay in stile "app"
   - Cookie gate: se rifiuti, la mappa resta off ma la lista funziona
   ========================================================= */

'use strict';

/** =========================
 *  CONFIG
 *  ========================= */
const CONFIG = {
  // ⚠️ Inserisci qui la tua API KEY Google Maps (Maps JavaScript API).
  // Ricorda di proteggerla con restrizioni HTTP referrer nel Google Cloud Console.
  GOOGLE_MAPS_API_KEY: 'AIzaSyA9JYajFqRA8BSVOLtJAzKIkMtlZ3cJBuI',

  // Centro di default (Italia)
  DEFAULT_CENTER: { lat: 41.9028, lng: 12.4964 }, // Roma
  DEFAULT_ZOOM: 6,

  // localStorage key per il consenso
  COOKIE_CONSENT_KEY: 'plugHubCookieConsent',

  // Dati
  DATA_URL: 'locali.json',
};

/** =========================
 *  STATE
 *  ========================= */
let stations = [];
let map = null;
let markersById = new Map();
let placesService = null;

let selectedStationId = null;
let userLatLng = null;

/** =========================
 *  DOM
 *  ========================= */
const el = {
  cookieBanner: document.getElementById('cookie-banner'),
  mapOverlay: document.getElementById('map-overlay'),

  btnAcceptCookies: document.getElementById('btn-accept-cookies'),
  btnRejectCookies: document.getElementById('btn-reject-cookies'),
  btnCloseCookie: document.getElementById('btn-close-cookie'),

  btnAcceptOverlay: document.getElementById('btn-accept-overlay'),

  stationList: document.getElementById('station-list'),
  stationCount: document.getElementById('station-count'),
  stationCountHero: document.getElementById('station-count-hero'),

  btnFitAll: document.getElementById('btn-fit-all'),
  btnZoomIn: document.getElementById('btn-zoom-in'),
  btnZoomOut: document.getElementById('btn-zoom-out'),
  btnRecenter: document.getElementById('btn-recenter'),

  // Card
  card: document.getElementById('station-card'),
  cardClose: document.getElementById('card-close'),
  cardTitle: document.getElementById('card-title'),
  cardAddress: document.getElementById('card-address'),
  cardPhoto: document.getElementById('card-photo'),
  cardDirections: document.getElementById('card-directions'),
  cardDistanceRow: document.getElementById('card-distance-row'),
  cardDistance: document.getElementById('card-distance'),
  cardHoursRow: document.getElementById('card-hours-row'),
  cardHours: document.getElementById('card-hours'),
  cardPrice: document.getElementById('card-price'),
  cardPayments: document.getElementById('card-payments'),
  cardAvailable: document.getElementById('card-available'),
};

/** =========================
 *  Utilities
 *  ========================= */
function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildDirectionsUrl(station) {
  const destination =
    (typeof station.lat === 'number' && typeof station.lng === 'number')
      ? `${station.lat},${station.lng}`
      : (station.indirizzo || station.nome || '');

  // Google Maps URLs (no API key)
  let url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  if (station.place_id) {
    url += `&destination_place_id=${encodeURIComponent(station.place_id)}`;
  }
  return url;
}

function toRad(v) { return (v * Math.PI) / 180; }

/** Haversine distance in meters (fallback if geometry isn't available) */
function haversineMeters(a, b) {
  const R = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLng / 2);
  const c = s1 * s1 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * s2 * s2;
  return 2 * R * Math.asin(Math.sqrt(c));
}

function formatDistance(meters) {
  if (!Number.isFinite(meters)) return null;
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function getConsent() {
  return localStorage.getItem(CONFIG.COOKIE_CONSENT_KEY);
}

function setConsent(value) {
  localStorage.setItem(CONFIG.COOKIE_CONSENT_KEY, value);
}

/** =========================
 *  Cookie Banner
 *  ========================= */
function showCookieBanner() { el.cookieBanner?.classList.remove('hidden'); }
function hideCookieBanner() { el.cookieBanner?.classList.add('hidden'); }

function acceptCookies() {
  setConsent('accepted');
  hideCookieBanner();
  enableMap();
}

function rejectCookies() {
  setConsent('rejected');
  hideCookieBanner();
  // Mappa resta bloccata
}

function closeCookieBanner() {
  hideCookieBanner();
  if (!getConsent()) setConsent('rejected');
}

/** =========================
 *  Mobile menu + FAQ
 *  ========================= */
function wireUiBasics() {
  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  mobileMenuBtn?.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu?.classList.remove('hidden');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-2xl"></i>';
    } else {
      mobileMenu?.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
    }
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('shadow-lg');
      navbar.style.background = 'rgba(17, 17, 17, 0.98)';
    } else {
      navbar.classList.remove('shadow-lg');
      navbar.style.background = 'rgba(17, 17, 17, 0.95)';
    }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // FAQ
  document.querySelectorAll('[data-faq]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((x) => x.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/** =========================
 *  Data & List
 *  ========================= */
async function loadStations() {
  const res = await fetch(CONFIG.DATA_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Impossibile caricare ${CONFIG.DATA_URL}`);
  const data = await res.json();

  // Normalizza: accetta sia array che {stations:[]}
  const list = Array.isArray(data) ? data : (data?.stations ?? []);
  stations = list
    .map((s, idx) => ({
      id: String(s.id ?? idx),
      nome: s.nome ?? 'Stazione',
      indirizzo: s.indirizzo ?? '',
      lat: typeof s.lat === 'number' ? s.lat : Number(s.lat),
      lng: typeof s.lng === 'number' ? s.lng : Number(s.lng),
      place_id: s.place_id || '',
      photoUrl: s.photoUrl || s.photo_url || '',
      orari: s.orari || '',
      tariffa: s.tariffa || '1€ / 30 min',
      pagamento: s.pagamento || 'Carta, App',
      powerbankDisponibili: (s.powerbankDisponibili ?? s.powerbank_disponibili ?? null),
      // runtime:
      distanceMeters: null,
      distanceText: null,
    }))
    .filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng));

  // Aggiorna contatori
  if (el.stationCount) el.stationCount.textContent = String(stations.length);
  if (el.stationCountHero) el.stationCountHero.textContent = String(stations.length);

  renderStationList();
}

/** Crea item list */
function renderStationList() {
  if (!el.stationList) return;
  el.stationList.innerHTML = '';

  for (const s of stations) {
    const li = document.createElement('li');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'station-item w-full';
    btn.dataset.stationId = s.id;

    const title = escapeHtml(s.nome);
    const address = escapeHtml(s.indirizzo);

    const distance = s.distanceText ? `<span class="station-pill">${escapeHtml(s.distanceText)}</span>` : `<span class="station-pill">—</span>`;
    const avail = (s.powerbankDisponibili === null || s.powerbankDisponibili === undefined)
      ? '—'
      : escapeHtml(String(s.powerbankDisponibili));

    btn.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <div class="station-title truncate">${title}</div>
          <div class="station-meta mt-1 line-clamp-2">${address}</div>
        </div>
        <div class="text-brand-blue"><i class="fa-solid fa-location-dot"></i></div>
      </div>

      <div class="station-actions">
        ${distance}
        <span class="station-pill"><i class="fa-solid fa-bolt" style="margin-right:6px"></i>${avail}</span>
        <a class="station-directions" href="${buildDirectionsUrl(s)}" target="_blank" rel="noopener" data-dir>
          Indicazioni
        </a>
      </div>
    `;

    // Se clicchi "Indicazioni", non selezionare
    btn.querySelector('[data-dir]')?.addEventListener('click', (ev) => ev.stopPropagation());

    btn.addEventListener('click', () => selectStation(s.id, { fromList: true }));

    li.appendChild(btn);
    el.stationList.appendChild(li);
  }

  syncListActive();
}

function syncListActive() {
  if (!el.stationList) return;
  el.stationList.querySelectorAll('[data-station-id]').forEach((node) => {
    node.classList.toggle('active', node.dataset.stationId === selectedStationId);
  });
}

function updateDistanceUi() {
  // Aggiorna distances in stations + rerender list pills quickly
  renderStationList();
  // Se c'è una card aperta, aggiorna anche quella
  if (selectedStationId) {
    const s = stations.find((x) => x.id === selectedStationId);
    if (s) openStationCard(s, { keepMapPan: true });
  }
}

/** =========================
 *  Card
 *  ========================= */
function closeStationCard() {
  el.card?.classList.add('hidden');
}

function openStationCard(station, options = {}) {
  if (!station) return;

  // Foto: preferisci photoUrl o Places (se disponibile)
  const fallbackPhoto = 'logo.png';

  el.cardTitle.textContent = station.nome || 'Stazione';
  el.cardAddress.textContent = station.indirizzo || '';

  // distance
  if (station.distanceText) {
    el.cardDistanceRow.classList.remove('hidden');
    el.cardDistance.textContent = station.distanceText;
  } else {
    el.cardDistanceRow.classList.add('hidden');
  }

  // orari
  const hoursText = station.orari || '';
  if (hoursText) {
    el.cardHoursRow.classList.remove('hidden');
    el.cardHours.textContent = hoursText;
  } else {
    el.cardHoursRow.classList.add('hidden');
  }

  // tariffa / pagamenti
  el.cardPrice.textContent = station.tariffa || '1€ / 30 min';
  el.cardPayments.textContent = station.pagamento || 'Carta, App';

  // availability
  el.cardAvailable.textContent =
    (station.powerbankDisponibili === null || station.powerbankDisponibili === undefined)
      ? '—'
      : String(station.powerbankDisponibili);

  el.cardDirections.href = buildDirectionsUrl(station);

  // image: immediate fallback, then try place photo if needed
  el.cardPhoto.src = station.photoUrl || fallbackPhoto;
  el.cardPhoto.alt = station.nome || 'Foto locale';

  el.card.classList.remove('hidden');

  // On map: pan + maybe zoom
  if (!options.keepMapPan && map && Number.isFinite(station.lat) && Number.isFinite(station.lng)) {
    const pos = { lat: station.lat, lng: station.lng };
    map.panTo(pos);
    if (map.getZoom() < 13) map.setZoom(13);
  }

  // Try Places Details for photo/hours/address if place_id present and map enabled
  if (placesService && station.place_id) {
    placesService.getDetails(
      {
        placeId: station.place_id,
        fields: ['name', 'formatted_address', 'opening_hours', 'photos'],
      },
      (place, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !place) return;

        // Update info if missing/placeholder
        if (place.name && (!station.nome || station.nome === 'Stazione')) {
          el.cardTitle.textContent = place.name;
        }
        if (place.formatted_address && !station.indirizzo) {
          el.cardAddress.textContent = place.formatted_address;
        }

        // Opening hours: show "Aperto ora" if possible
        if (place.opening_hours && typeof place.opening_hours.isOpen === 'function') {
          const isOpen = place.opening_hours.isOpen();
          el.cardHoursRow.classList.remove('hidden');
          el.cardHours.textContent = isOpen ? 'Aperto ora' : 'Chiuso ora';
        }

        // Photo
        if (place.photos && place.photos.length) {
          const url = place.photos[0].getUrl({ maxWidth: 900, maxHeight: 600 });
          el.cardPhoto.src = url;
        }
      }
    );
  }
}

/** =========================
 *  Selection
 *  ========================= */
function selectStation(id, { fromList = false } = {}) {
  const s = stations.find((x) => x.id === id);
  if (!s) return;

  selectedStationId = id;
  syncListActive();
  openStationCard(s);

  // Se arriva dalla lista su mobile, assicurati che l’utente veda la mappa + card
  if (fromList && window.matchMedia('(max-width: 1023px)').matches) {
    document.getElementById('map-canvas')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Se marker esiste, porta sopra
  const marker = markersById.get(id);
  if (marker?.position && map) {
    map.panTo(marker.position);
  }
}

/** =========================
 *  Google Maps
 *  ========================= */

// Dark theme style
const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#111111' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#111111' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
  { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#181818' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#373737' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3c3c3c' }] },
  { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#4e4e4e' }] },
  { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f0f0f' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] },
];

function enableMap() {
  // Se manca la key, evita errori e lascia overlay
  if (!CONFIG.GOOGLE_MAPS_API_KEY || CONFIG.GOOGLE_MAPS_API_KEY === 'INSERISCI_LA_TUA_API_KEY') {
    console.warn('Inserisci la tua GOOGLE_MAPS_API_KEY in app.js');
    return;
  }

  // Se già caricata
  if (window.google && window.google.maps) {
    window.initMap();
    return;
  }

  const script = document.createElement('script');

  // Libraries:
  // - marker: AdvancedMarkerElement
  // - places: per foto/orari (facoltativo ma utile per la card)
  // - geometry: per distanze (facoltativo)
  script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=marker,places,geometry`;
  script.async = true;
  script.defer = true;
  script.onerror = () => console.error('Errore nel caricamento Google Maps API');
  document.head.appendChild(script);
}

window.initMap = function initMap() {
  // Se non ci sono stazioni, crea una mappa vuota
  const first = stations[0];
  const center = first ? { lat: first.lat, lng: first.lng } : CONFIG.DEFAULT_CENTER;

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center,
    zoom: first ? 12 : CONFIG.DEFAULT_ZOOM,
    styles: mapDarkStyle,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    gestureHandling: 'cooperative',
  });

  // Places service (per dettagli)
  placesService = new google.maps.places.PlacesService(map);

  // Marker pin
  const pin = new google.maps.marker.PinElement({
    background: '#41B3E7',
    borderColor: '#ffffff',
    glyphColor: '#111111',
  });

  // Markers
  markersById.clear();
  for (const s of stations) {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: s.lat, lng: s.lng },
      title: s.nome,
      content: pin.element.cloneNode(true),
    });

    marker.addListener('click', () => selectStation(s.id));
    markersById.set(s.id, marker);
  }

  // Click on map closes card
  map.addListener('click', () => closeStationCard());

  // Hide overlay
  el.mapOverlay?.classList.add('hidden');

  // Wire controls
  wireMapControls();

  // Fit all once
  fitAllStations();

  // If a station already selected (rare), refresh
  if (selectedStationId) selectStation(selectedStationId);
};

function wireMapControls() {
  el.btnZoomIn?.addEventListener('click', () => { if (map) map.setZoom(map.getZoom() + 1); });
  el.btnZoomOut?.addEventListener('click', () => { if (map) map.setZoom(map.getZoom() - 1); });
  el.btnRecenter?.addEventListener('click', () => fitAllStations());
  el.btnFitAll?.addEventListener('click', () => fitAllStations());
}

function fitAllStations() {
  if (!map || stations.length === 0) return;

  const bounds = new google.maps.LatLngBounds();
  for (const s of stations) bounds.extend({ lat: s.lat, lng: s.lng });
  map.fitBounds(bounds);

  // Clamp zoom a bit (fitBounds can zoom too much for very close points)
  setTimeout(() => {
    if (!map) return;
    const z = map.getZoom();
    if (z > 16) map.setZoom(16);
  }, 250);
}

/** =========================
 *  Geolocation for distance
 *  ========================= */
function initGeolocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };

      // compute distances
      for (const s of stations) {
        const meters = haversineMeters(userLatLng, { lat: s.lat, lng: s.lng });
        s.distanceMeters = meters;
        s.distanceText = formatDistance(meters);
      }

      // sort list by distance (optional) – comment out if you prefer fixed order
      stations.sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));

      updateDistanceUi();
    },
    () => {
      // user denied; ignore
    },
    { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
  );
}

/** =========================
 *  Boot
 *  ========================= */
document.addEventListener('DOMContentLoaded', async () => {
  wireUiBasics();

  // Cookie banner actions
  el.btnAcceptCookies?.addEventListener('click', acceptCookies);
  el.btnRejectCookies?.addEventListener('click', rejectCookies);
  el.btnCloseCookie?.addEventListener('click', closeCookieBanner);
  el.btnAcceptOverlay?.addEventListener('click', acceptCookies);

  // Card close
  el.cardClose?.addEventListener('click', closeStationCard);

  // Load stations and render list
  try {
    await loadStations();
  } catch (err) {
    console.error(err);
    if (el.stationList) {
      el.stationList.innerHTML = '<li class="text-gray-400 p-4">Errore nel caricamento dei locali. Controlla <code>locali.json</code>.</li>';
    }
  }

  // Geolocation (distance)
  initGeolocation();

  // Cookie consent
  const consent = getConsent();
  if (consent === 'accepted') {
    hideCookieBanner();
    enableMap();
  } else if (consent === 'rejected') {
    hideCookieBanner();
    // overlay remains visible
  } else {
    showCookieBanner();
  }
});

// Expose for inline safety (non serve più, ma utile se vuoi richiamare da HTML)
window.acceptCookies = acceptCookies;
window.rejectCookies = rejectCookies;
window.closeCookieBanner = closeCookieBanner;
