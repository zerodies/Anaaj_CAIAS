/* ============================================
   ANAAJ — Farmer's Companion
   script.js
   ============================================ */

/* ---- Constants ---- */

const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** WMO weather code → emoji icon */
const WMO_ICONS = {
  0: "☀️",  1: "🌤️",  2: "⛅",   3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "❄️",
  80: "🌦️", 81: "🌧️", 82: "⛈️",
  95: "⛈️", 96: "⛈️", 99: "⛈️"
};

/** WMO weather code → human-readable description */
const WMO_DESC = {
  0:  "Clear sky",          1:  "Mainly clear",       2:  "Partly cloudy",       3:  "Overcast",
  45: "Foggy",              48: "Depositing rime fog",
  51: "Light drizzle",      53: "Moderate drizzle",   55: "Dense drizzle",
  61: "Slight rain",        63: "Moderate rain",       65: "Heavy rain",
  71: "Slight snow",        73: "Moderate snow",       75: "Heavy snow",
  80: "Slight showers",     81: "Moderate showers",    82: "Violent showers",
  95: "Thunderstorm",       96: "Thunderstorm w/ hail", 99: "Thunderstorm w/ heavy hail"
};

/* ---- State ---- */
let lat      = 12.97;   // Default: Bengaluru
let lon      = 77.59;
let cityName = "Bengaluru";
window.cityName = cityName;

/* ============================================
   API
   ============================================ */

/**
 * Fetches 7-day forecast + current conditions from Open-Meteo (no API key needed).
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Object>} Open-Meteo JSON response
 */
async function fetchWeather(latitude, longitude) {
  const url = [
    "https://api.open-meteo.com/v1/forecast",
    `?latitude=${latitude}&longitude=${longitude}`,
    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index",
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    "&forecast_days=7&timezone=auto"
  ].join("");

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  return res.json();
}

/* ============================================
   RENDER — Hero Card
   ============================================ */

function updateHero(data) {
  const c  = data.current;
  const wc = c.weather_code;

  document.getElementById("temp-val").textContent  = Math.round(c.temperature_2m);
  document.getElementById("hero-cond").textContent = WMO_DESC[wc] || "Clear";
  document.getElementById("hero-icon").textContent = WMO_ICONS[wc] || "☀️";
  document.getElementById("stat-hum").textContent  = c.relative_humidity_2m + "%";
  document.getElementById("stat-wind").textContent = Math.round(c.wind_speed_10m) + " km/h";
  document.getElementById("stat-uv").textContent   =
    c.uv_index ?? data.hourly?.uv_index?.[new Date().getHours()] ?? "N/A";

  const todayRainProb = data.daily?.precipitation_probability_max?.[0] ?? 0;
  document.getElementById("stat-rain").textContent = todayRainProb + "%";

  const now = new Date();
  document.getElementById("hero-date").textContent =
    `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
}

/* ============================================
   RENDER — 7-Day Forecast Strip
   ============================================ */

function buildForecast(data) {
  const strip = document.getElementById("forecast-strip");
  strip.innerHTML = "";

  const daily = data.daily;

  for (let i = 0; i < 7; i++) {
    const date    = new Date(daily.time[i]);
    const isToday = i === 0;
    const pp      = daily.precipitation_probability_max[i];

    const div = document.createElement("div");
    div.className = "forecast-day" + (isToday ? " today" : "");

    div.innerHTML = `
      <div class="fday-name">${isToday ? "Today" : days[date.getDay()]}</div>
      <div class="fday-icon">${WMO_ICONS[daily.weather_code[i]] || "☀️"}</div>
      <div class="fday-hi">${Math.round(daily.temperature_2m_max[i])}°</div>
      <div class="fday-lo">${Math.round(daily.temperature_2m_min[i])}°</div>
      ${pp > 20 ? `<div class="fday-rain">${pp}%</div>` : ""}
    `;

    strip.appendChild(div);
  }
}

/* ============================================
   RENDER — Risk Cards, Alerts, Scores, Advice
   ============================================ */

function assessRisks(data) {
  const c    = data.current;
  const temp = c.temperature_2m;
  const hum  = c.relative_humidity_2m;
  const wind = c.wind_speed_10m;

  const rainToday    = data.daily.precipitation_probability_max[0] ?? 0;
  const rainTomorrow = data.daily.precipitation_probability_max[1] ?? 0;

  /* -- Heat Risk -- */
  let heatClass = "risk-low",
      heatLevel = "Low",
      heatDesc  = "Temperatures are comfortable for field work.",
      heatBadge = "All Clear";

  if (temp >= 38) {
    heatClass = "risk-high";
    heatLevel = "High";
    heatDesc  = "Extreme heat. Avoid midday work. Irrigate crops immediately.";
    heatBadge = "Critical";
  } else if (temp >= 33) {
    heatClass = "risk-medium";
    heatLevel = "Medium";
    heatDesc  = "Above-average heat. Early morning irrigation recommended.";
    heatBadge = "Monitor";
  }
  setRiskCard("heat-card", heatClass, "heat-level", heatLevel, "heat-desc", heatDesc, heatBadge);

  /* -- Rain Risk -- */
  let rainClass = "risk-low",
      rainLevel = "Low",
      rainDesc  = "No significant rain expected. Normal operations fine.",
      rainBadge = "All Clear";

  if (rainToday >= 70) {
    rainClass = "risk-high";
    rainLevel = "High";
    rainDesc  = "Heavy rain likely today. Protect harvested crops and clear drains.";
    rainBadge = "Take Action";
  } else if (rainTomorrow >= 60) {
    rainClass = "risk-medium";
    rainLevel = "Medium";
    rainDesc  = "Rain forecast tomorrow. Delay fertiliser application today.";
    rainBadge = "Plan Ahead";
  } else if (rainToday >= 40) {
    rainClass = "risk-medium";
    rainLevel = "Medium";
    rainDesc  = "Moderate rain chance today. Check field drainage.";
    rainBadge = "Monitor";
  }
  setRiskCard("rain-card", rainClass, "rain-level", rainLevel, "rain-desc", rainDesc, rainBadge);

  /* -- Disease Risk (humidity × temperature) -- */
  let diseaseClass = "risk-low",
      diseaseLevel = "Low",
      diseaseDesc  = "Humidity within safe range. Fungal risk is minimal.",
      diseaseBadge = "All Clear";

  if (hum > 80 && temp > 25) {
    diseaseClass = "risk-high";
    diseaseLevel = "High";
    diseaseDesc  = "High humidity + warmth creates blight & fungal risk. Spray preventively.";
    diseaseBadge = "Take Action";
  } else if (hum > 70) {
    diseaseClass = "risk-medium";
    diseaseLevel = "Medium";
    diseaseDesc  = "Elevated humidity. Watch for early blight signs on leaves.";
    diseaseBadge = "Monitor";
  }
  setRiskCard("disease-card", diseaseClass, "disease-level", diseaseLevel, "disease-desc", diseaseDesc, diseaseBadge);

  /* -- Weather Alert Banner -- */
  if (c.weather_code >= 80 || rainToday >= 75 || wind > 60 || temp > 40) {
    let alertMsg = "";

    if      (c.weather_code >= 95) alertMsg = "Thunderstorm warning. Secure equipment and avoid open fields.";
    else if (rainToday >= 75)      alertMsg = "Heavy rain forecast. Ensure drainage channels are clear and crops are protected.";
    else if (wind > 60)            alertMsg = "Strong winds expected. Stake tall crops and delay spraying.";
    else if (temp > 40)            alertMsg = "Extreme heat advisory. Limit outdoor work to early morning and evening hours.";

    if (alertMsg) {
      document.getElementById("alert-title").textContent = "Weather Alert";
      document.getElementById("alert-msg").textContent   = alertMsg;
      document.getElementById("alert-banner").style.display = "flex";
    }
  }

  /* -- Crop Score Progress Bars -- */
  const sunScore    = Math.min(100, Math.round([0, 1].includes(c.weather_code) ? 90 : c.weather_code <= 3 ? 70 : 40));
  const waterStress = Math.round(hum > 60 ? 80 : hum > 40 ? 55 : 30);
  const growthScore = Math.round(temp > 20 && temp < 35 && hum > 40 && hum < 85 ? 85 : temp > 15 ? 60 : 35);

  animBar("pb-sun",    sunScore);    document.getElementById("pb-sun-val").textContent    = sunScore    + "%";
  animBar("pb-water",  waterStress); document.getElementById("pb-water-val").textContent  = waterStress + "%";
  animBar("pb-growth", growthScore); document.getElementById("pb-growth-val").textContent = growthScore + "%";

  /* -- Soil Condition Estimates -- */
  document.getElementById("soil-moist").textContent =
    hum > 70 ? "Adequate" : hum > 50 ? "Moderate" : "Low — irrigate";
  document.getElementById("soil-temp").textContent  = Math.round(temp - 3) + "°C";
  document.getElementById("soil-evap").textContent  =
    (temp > 30 ? "High" : "Moderate") + " (" + (temp > 30 ? "6–8" : "3–5") + " mm/day)";
  document.getElementById("dew-point").textContent  =
    Math.round(temp - (100 - hum) / 5) + "°C";

  /* -- Contextual Advice -- */
  buildAdvice(temp, hum, rainToday, rainTomorrow, c.weather_code, wind);
}

/* ============================================
   RENDER — Today's Advice
   ============================================ */

function buildAdvice(temp, hum, rainToday, rainTomorrow, wc, wind) {
  let quote   = "";
  let bullets = [];

  if (rainTomorrow >= 60) {
    quote   = "Rain is forecast for tomorrow — act today to protect your yield and prepare the field.";
    bullets = [
      "Apply fertilisers before 2 PM — rain will help absorption overnight.",
      "Clear field drainage channels to prevent waterlogging.",
      "Avoid sowing new seeds; wait 2 days after rain for soil to settle.",
      "Move harvested produce and equipment under shelter."
    ];
  } else if (temp > 36) {
    quote   = "Intense heat is your crop's biggest threat today. Prioritise water and timing.";
    bullets = [
      "Irrigate before 7 AM and after 6 PM only — midday water evaporates fast.",
      "Apply mulch to retain soil moisture and cool roots.",
      "Postpone any pesticide or herbicide spraying — heat causes leaf burn.",
      "Monitor cattle and livestock for heat stress signs."
    ];
  } else if (hum > 80) {
    quote   = "High humidity creates ideal conditions for fungal disease. Stay vigilant.";
    bullets = [
      "Inspect leaves for early signs of blight or rust this morning.",
      "Apply copper-based fungicide as a preventive measure.",
      "Improve air circulation — remove excess foliage if possible.",
      "Avoid overhead irrigation which increases surface moisture."
    ];
  } else if (wc >= 95) {
    quote   = "Thunderstorms are approaching. Safety comes before fieldwork today.";
    bullets = [
      "Keep all workers and livestock away from open fields.",
      "Secure farming equipment and lightweight structures.",
      "Use this time for maintenance, record-keeping, or planning.",
      "Check crops after the storm for damage and drainage issues."
    ];
  } else if (rainToday >= 50) {
    quote   = "Rain is likely today — a good sign for the soil but plan your tasks carefully.";
    bullets = [
      "Delay harvesting until at least 6 hours after rain stops.",
      "Check drainage to prevent root damage from waterlogging.",
      "Use this time to prepare tools and plan upcoming sprays.",
      "Note soil moisture levels to adjust irrigation schedule."
    ];
  } else {
    quote   = "Conditions look favourable today. A good opportunity to get ahead on field work.";
    bullets = [
      "Ideal window for transplanting, weeding, and sowing.",
      "Apply balanced fertiliser if due — conditions are optimal for uptake.",
      "Good day for pesticide or nutrient spraying — wind below safe threshold.",
      "Inspect crops for early pest activity while weather is clear."
    ];
  }

  document.getElementById("advice-quote").textContent = "\u201C" + quote + "\u201D";

  const ul = document.getElementById("advice-bullets");
  ul.innerHTML = bullets
    .map(b => `<li><div class="bullet-dot"></div>${b}</li>`)
    .join("");
}

/* ============================================
   HELPERS
   ============================================ */

/**
 * Updates a risk card's class, text, and badge.
 */
function setRiskCard(cardId, riskClass, levelId, levelText, descId, descText, badge) {
  const card = document.getElementById(cardId);
  card.className = "risk-card " + riskClass;
  document.getElementById(levelId).textContent = levelText;
  document.getElementById(descId).textContent  = descText;
  const badgeEl = card.querySelector(".risk-badge");
  if (badgeEl) badgeEl.textContent = badge;
}

/**
 * Animates a progress bar fill to a given percentage.
 * @param {string} id  - Element ID of the .pb-fill div
 * @param {number} pct - Target percentage (0–100)
 */
function animBar(id, pct) {
  setTimeout(() => {
    document.getElementById(id).style.width = pct + "%";
  }, 300);
}

/* ============================================
   INIT — Geolocation → Weather Load
   ============================================ */

async function init() {
  document.getElementById("location-name").textContent = cityName;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;

        /* Reverse geocode with Nominatim (free, no key) */
        try {
          const geoRes  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const geoData = await geoRes.json();
          cityName = geoData.address?.city || geoData.address?.town || geoData.address?.village || "Your Location";
          window.cityName = cityName;
          document.getElementById("location-name").textContent = cityName;
        } catch (_) { /* silently fall back to default city name */ }

        window.userLat = lat;
        window.userLon = lon;
        loadWeather();
      },
      () => loadWeather() // Permission denied — use default coords
    );
  } else {
    loadWeather();
  }
}

async function loadWeather() {
  try {
    const data = await fetchWeather(lat, lon);
    updateHero(data);
    buildForecast(data);
    assessRisks(data);
    // Pass data to mitigation module so it can detect active crises
    if (typeof initMitigation === "function") initMitigation(data);
    if (typeof initCrops === "function") initCrops(data, window.userLat || lat, window.userLon || lon);
  } catch (err) {
    console.error("ANAAJ weather error:", err);
    document.getElementById("hero-cond").textContent = "Unable to load weather. Check your connection.";
  }
}

/* ---- Kick off ---- */
init();
