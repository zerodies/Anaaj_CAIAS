/* ============================================
   ANAAJ — Location-Based Crop Guide
   crops.js
   ============================================ */

/* ============================================
   CROP DATABASE
   Each crop has regional suitability, climate
   requirements, and agronomic details
   ============================================ */
const CROP_DB = [
  {
    id: "rice", name: "Rice", emoji: "🌾",
    hindiName: "Dhaan",
    season: "kharif",
    regions: ["south", "east", "northeast", "central"],
    tempMin: 20, tempMax: 40,
    humidityMin: 60,
    soilTypes: ["clay", "loamy", "alluvial"],
    waterReq: "High",
    waterDetail: "1200–2000 mm per season",
    sowingMonths: "June – July",
    harvestMonths: "October – November",
    duration: "120–150 days",
    yieldPerAcre: "18–22 quintals",
    marketPrice: "₹2,183/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 80 && temp > 25 ? "High — blast and blight risk" : hum > 65 ? "Medium — monitor for leaf folder" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 80 && temp > 25 ? "high" : hum > 65 ? "medium" : "low",
    whyGrow: "Staple crop with guaranteed MSP, high water availability suits paddy cultivation",
    notSuitable: ["north-arid", "hilly"]
  },
  {
    id: "wheat", name: "Wheat", emoji: "🌿",
    hindiName: "Gehun",
    season: "rabi",
    regions: ["north", "central", "northwest"],
    tempMin: 10, tempMax: 25,
    humidityMin: 30,
    soilTypes: ["loamy", "clay-loam", "alluvial"],
    waterReq: "Medium",
    waterDetail: "450–650 mm per season",
    sowingMonths: "November – December",
    harvestMonths: "March – April",
    duration: "100–150 days",
    yieldPerAcre: "16–20 quintals",
    marketPrice: "₹2,275/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 75 && temp < 20 ? "High — rust and smut risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 75 && temp < 20 ? "high" : "low",
    whyGrow: "Highest MSP support, well-developed procurement system, ideal for cool winters",
    notSuitable: ["south", "coastal"]
  },
  {
    id: "cotton", name: "Cotton", emoji: "🪴",
    hindiName: "Kapas",
    season: "kharif",
    regions: ["central", "south", "northwest"],
    tempMin: 21, tempMax: 40,
    humidityMin: 40,
    soilTypes: ["black-cotton", "loamy", "red"],
    waterReq: "Medium",
    waterDetail: "500–800 mm per season",
    sowingMonths: "May – June",
    harvestMonths: "October – February",
    duration: "150–180 days",
    yieldPerAcre: "8–12 quintals",
    marketPrice: "₹7,121/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 75 ? "High — bollworm and leaf curl virus risk" : "Medium",
    diseaseRiskLevel: (temp, hum) => hum > 75 ? "high" : "medium",
    whyGrow: "High market value, suited to black cotton soil, strong export demand",
    notSuitable: ["east", "northeast", "hilly"]
  },
  {
    id: "sugarcane", name: "Sugarcane", emoji: "🎋",
    hindiName: "Ganna",
    season: "annual",
    regions: ["south", "central", "north", "east"],
    tempMin: 20, tempMax: 40,
    humidityMin: 50,
    soilTypes: ["loamy", "alluvial", "clay-loam"],
    waterReq: "Very High",
    waterDetail: "1500–2500 mm per season",
    sowingMonths: "February – March / October – November",
    harvestMonths: "December – April",
    duration: "270–365 days",
    yieldPerAcre: "250–350 quintals",
    marketPrice: "₹340/quintal (SAP 2024)",
    diseaseRisk: (temp, hum) => hum > 80 ? "Medium — red rot and smut risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 80 ? "medium" : "low",
    whyGrow: "High yield per acre, government-backed SAP pricing, strong mill procurement",
    notSuitable: ["arid", "hilly", "northeast"]
  },
  {
    id: "maize", name: "Maize", emoji: "🌽",
    hindiName: "Makka",
    season: "kharif",
    regions: ["south", "central", "north", "east", "hilly"],
    tempMin: 18, tempMax: 35,
    humidityMin: 40,
    soilTypes: ["loamy", "sandy-loam", "alluvial", "red"],
    waterReq: "Medium",
    waterDetail: "500–700 mm per season",
    sowingMonths: "June – July",
    harvestMonths: "September – October",
    duration: "80–110 days",
    yieldPerAcre: "20–30 quintals",
    marketPrice: "₹2,090/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 80 && temp > 28 ? "High — turcicum blight risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 80 && temp > 28 ? "high" : "low",
    whyGrow: "Short duration, versatile market (food, feed, starch), grows well in hilly terrain",
    notSuitable: ["waterlogged", "coastal-saline"]
  },
  {
    id: "tomato", name: "Tomato", emoji: "🍅",
    hindiName: "Tamatar",
    season: "rabi",
    regions: ["south", "central", "north", "east"],
    tempMin: 15, tempMax: 32,
    humidityMin: 50,
    soilTypes: ["loamy", "sandy-loam", "red", "alluvial"],
    waterReq: "Medium",
    waterDetail: "400–600 mm per season",
    sowingMonths: "October – November / June – July",
    harvestMonths: "January – March / September – October",
    duration: "60–90 days",
    yieldPerAcre: "80–120 quintals",
    marketPrice: "₹800–2,500/quintal (market rate)",
    diseaseRisk: (temp, hum) => hum > 80 && temp > 25 ? "Very High — late blight, bacterial wilt" : hum > 65 ? "High — early blight risk" : "Medium",
    diseaseRiskLevel: (temp, hum) => hum > 80 && temp > 25 ? "high" : hum > 65 ? "high" : "medium",
    whyGrow: "High returns per acre, short harvest cycle, strong local and wholesale demand",
    notSuitable: ["arid", "waterlogged"]
  },
  {
    id: "potato", name: "Potato", emoji: "🥔",
    hindiName: "Aloo",
    season: "rabi",
    regions: ["north", "central", "east", "hilly"],
    tempMin: 10, tempMax: 25,
    humidityMin: 50,
    soilTypes: ["sandy-loam", "loamy", "alluvial"],
    waterReq: "Medium",
    waterDetail: "500–700 mm per season",
    sowingMonths: "October – November",
    harvestMonths: "January – February",
    duration: "75–120 days",
    yieldPerAcre: "80–120 quintals",
    marketPrice: "₹600–1,200/quintal (market rate)",
    diseaseRisk: (temp, hum) => hum > 80 && temp < 20 ? "Very High — late blight risk" : "Medium",
    diseaseRiskLevel: (temp, hum) => hum > 80 && temp < 20 ? "high" : "medium",
    whyGrow: "High yield, cold storage extends marketability, consistent demand year-round",
    notSuitable: ["south-coastal", "arid"]
  },
  {
    id: "soybean", name: "Soybean", emoji: "🫘",
    hindiName: "Soya",
    season: "kharif",
    regions: ["central", "south", "north"],
    tempMin: 20, tempMax: 35,
    humidityMin: 50,
    soilTypes: ["black-cotton", "loamy", "clay-loam"],
    waterReq: "Medium",
    waterDetail: "450–700 mm per season",
    sowingMonths: "June – July",
    harvestMonths: "October – November",
    duration: "90–120 days",
    yieldPerAcre: "8–12 quintals",
    marketPrice: "₹4,600/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 75 ? "Medium — yellow mosaic virus risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 75 ? "medium" : "low",
    whyGrow: "Nitrogen-fixing improves soil health, good MSP, strong oil and feed market",
    notSuitable: ["waterlogged", "saline", "hilly"]
  },
  {
    id: "groundnut", name: "Groundnut", emoji: "🥜",
    hindiName: "Moongfali",
    season: "kharif",
    regions: ["south", "central", "northwest"],
    tempMin: 20, tempMax: 38,
    humidityMin: 40,
    soilTypes: ["sandy-loam", "red", "loamy"],
    waterReq: "Low",
    waterDetail: "400–600 mm per season",
    sowingMonths: "June – July",
    harvestMonths: "September – October",
    duration: "90–130 days",
    yieldPerAcre: "6–10 quintals",
    marketPrice: "₹6,783/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 80 ? "High — aflatoxin and tikka disease risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 80 ? "high" : "low",
    whyGrow: "Drought tolerant, high MSP, fixes nitrogen, good for light sandy soils",
    notSuitable: ["waterlogged", "heavy-clay", "northeast"]
  },
  {
    id: "arhar", name: "Arhar Dal", emoji: "🫛",
    hindiName: "Tur / Arhar",
    season: "kharif",
    regions: ["central", "south", "north", "east"],
    tempMin: 18, tempMax: 38,
    humidityMin: 35,
    soilTypes: ["red", "black-cotton", "loamy", "sandy-loam"],
    waterReq: "Low",
    waterDetail: "350–650 mm per season",
    sowingMonths: "June – July",
    harvestMonths: "December – February",
    duration: "140–180 days",
    yieldPerAcre: "5–8 quintals",
    marketPrice: "₹7,550/quintal (MSP 2024)",
    diseaseRisk: (temp, hum) => hum > 75 && temp > 28 ? "Medium — wilt and sterility mosaic risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 75 && temp > 28 ? "medium" : "low",
    whyGrow: "Drought tolerant, improves soil nitrogen, high MSP, staple pulse demand in India",
    notSuitable: ["waterlogged", "saline", "hilly"]
  },
  {
    id: "onion", name: "Onion", emoji: "🧅",
    hindiName: "Pyaz",
    season: "rabi",
    regions: ["central", "south", "north", "west"],
    tempMin: 13, tempMax: 30,
    humidityMin: 40,
    soilTypes: ["sandy-loam", "loamy", "alluvial"],
    waterReq: "Medium",
    waterDetail: "350–550 mm per season",
    sowingMonths: "October – November / May – June",
    harvestMonths: "February – April / September – October",
    duration: "100–130 days",
    yieldPerAcre: "60–100 quintals",
    marketPrice: "₹800–3,000/quintal (market rate)",
    diseaseRisk: (temp, hum) => hum > 80 ? "High — purple blotch and thrips risk" : "Low",
    diseaseRiskLevel: (temp, hum) => hum > 80 ? "high" : "low",
    whyGrow: "High market value, strong export demand, short season with good returns per acre",
    notSuitable: ["waterlogged", "heavy-clay", "northeast"]
  },
  {
    id: "banana", name: "Banana", emoji: "🍌",
    hindiName: "Kela",
    season: "annual",
    regions: ["south", "east", "central"],
    tempMin: 20, tempMax: 40,
    humidityMin: 65,
    soilTypes: ["loamy", "alluvial", "clay-loam"],
    waterReq: "High",
    waterDetail: "900–1200 mm per year",
    sowingMonths: "June – July / February – March",
    harvestMonths: "Year-round after 12 months",
    duration: "300–365 days",
    yieldPerAcre: "200–300 quintals",
    marketPrice: "₹1,000–1,800/quintal (market rate)",
    diseaseRisk: (temp, hum) => hum > 85 ? "High — Panama wilt and Sigatoka risk" : "Medium",
    diseaseRiskLevel: (temp, hum) => hum > 85 ? "high" : "medium",
    whyGrow: "Year-round harvest, high yield per acre, strong domestic and processing demand",
    notSuitable: ["arid", "hilly", "north-cold"]
  }
];

/* ============================================
   REGION DETECTION
   Based on latitude from GPS
   ============================================ */
function detectRegion(lat, lon) {
  if (lat > 28)                          return { id: "north",     label: "North India",      states: "Punjab, Haryana, UP, Bihar" };
  if (lat > 23 && lon < 76)             return { id: "central",   label: "Central India",    states: "MP, Rajasthan, Gujarat" };
  if (lat > 23 && lon >= 76)            return { id: "central",   label: "Central India",    states: "MP, Chhattisgarh, Jharkhand" };
  if (lat > 20 && lon > 80)             return { id: "east",      label: "East India",       states: "WB, Odisha, Andhra Pradesh" };
  if (lat <= 20 && lon < 76)            return { id: "south",     label: "South India",      states: "Karnataka, Kerala, TN" };
  if (lat <= 20 && lon >= 76)           return { id: "south",     label: "South India",      states: "Telangana, AP, Karnataka" };
  return                                       { id: "central",   label: "Central India",    states: "Madhya Pradesh, Maharashtra" };
}

/* ============================================
   CURRENT SEASON
   Based on current month
   ============================================ */
function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 6  && month <= 11) return { id: "kharif",  label: "Kharif",  period: "Jun – Nov" };
  if (month >= 11 || month <= 4)  return { id: "rabi",    label: "Rabi",    period: "Nov – Apr" };
  return                                  { id: "zaid",    label: "Zaid",    period: "Apr – Jun" };
}

/* ============================================
   SCORING ENGINE
   Scores each crop 0-100 based on:
   - Region match (30 pts)
   - Temperature match (25 pts)
   - Humidity match (15 pts)
   - Soil type match (20 pts)
   - Season match (10 pts)
   ============================================ */
function scoreCrop(crop, region, temp, humidity, soilType, season) {
  let score = 0;
  const reasons = [];
  const warnings = [];

  // Region match (30 pts)
  if (crop.regions.includes(region.id)) {
    score += 30;
    reasons.push("Well-suited to " + region.label);
  } else if (crop.regions.includes("all")) {
    score += 20;
  } else {
    warnings.push("Not ideal for " + region.label);
  }

  // Temperature match (25 pts)
  if (temp >= crop.tempMin && temp <= crop.tempMax) {
    score += 25;
    reasons.push("Current temperature is ideal");
  } else if (temp < crop.tempMin) {
    const diff = crop.tempMin - temp;
    if (diff <= 5) { score += 12; warnings.push("Slightly cool — monitor germination"); }
    else           { warnings.push("Too cold for optimal growth"); }
  } else {
    const diff = temp - crop.tempMax;
    if (diff <= 5) { score += 12; warnings.push("Slightly warm — ensure adequate irrigation"); }
    else           { warnings.push("Too hot — heat stress risk"); }
  }

  // Humidity match (15 pts)
  if (humidity >= crop.humidityMin) {
    score += 15;
    reasons.push("Humidity levels are suitable");
  } else {
    warnings.push("Low humidity — extra irrigation may be needed");
    score += 5;
  }

  // Soil type match (20 pts)
  if (soilType && crop.soilTypes.includes(soilType)) {
    score += 20;
    reasons.push("Excellent soil type match");
  } else if (soilType === "unknown" || !soilType) {
    score += 10; // neutral if unknown
  } else {
    warnings.push("Soil type not ideal — consider soil amendment");
    score += 5;
  }

  // Season match (10 pts)
  if (crop.season === season.id || crop.season === "annual") {
    score += 10;
    reasons.push("Right season to sow");
  } else {
    warnings.push("Off-season — sow at start of " + crop.season + " season");
  }

  return { score, reasons, warnings };
}

/* ============================================
   DISEASE RISK LABEL HELPER
   ============================================ */
function getDiseaseRisk(crop, temp, hum) {
  try {
    return {
      label: crop.diseaseRisk(temp, hum),
      level: crop.diseaseRiskLevel(temp, hum)
    };
  } catch {
    return { label: "Low", level: "low" };
  }
}

/* ============================================
   STATE
   ============================================ */
let cropsState = {
  soilType:     "unknown",
  region:       null,
  season:       getCurrentSeason(),
  scored:       [],
  rendered:     false
};

/* ============================================
   RENDER — Crops Tab
   ============================================ */
function renderCropsTab() {
  const el = document.getElementById("crops-content");
  if (!el) return;

  // Get weather data
  const wd   = window.lastWeatherData;
  const temp = wd?.current?.temperature_2m     ?? 28;
  const hum  = wd?.current?.relative_humidity_2m ?? 60;
  const lat  = window.userLat ?? 12.97;
  const lon  = window.userLon ?? 77.59;

  cropsState.region = detectRegion(lat, lon);
  cropsState.season = getCurrentSeason();

  el.innerHTML = buildCropsUI(temp, hum);

  // Wire soil selector
  document.getElementById("soil-select")?.addEventListener("change", e => {
    cropsState.soilType = e.target.value;
    refreshCropList();
  });

  refreshCropList();
}

/* ============================================
   BUILD UI SHELL
   ============================================ */
function buildCropsUI(temp, hum) {
  const region = cropsState.region;
  const season = cropsState.season;

  return `
    <!-- Context bar -->
    <div class="crops-context-bar">
      <div class="crops-ctx-item">
        <div class="crops-ctx-label">📍 Your Region</div>
        <div class="crops-ctx-val">${region.label}</div>
        <div class="crops-ctx-sub">${region.states}</div>
      </div>
      <div class="crops-ctx-item">
        <div class="crops-ctx-label">🗓️ Current Season</div>
        <div class="crops-ctx-val">${season.label}</div>
        <div class="crops-ctx-sub">${season.period}</div>
      </div>
      <div class="crops-ctx-item">
        <div class="crops-ctx-label">🌡️ Temperature</div>
        <div class="crops-ctx-val">${Math.round(temp)}°C</div>
        <div class="crops-ctx-sub">${hum}% humidity</div>
      </div>
      <div class="crops-ctx-item soil-selector-wrap">
        <div class="crops-ctx-label">🪱 Soil Type</div>
        <select id="soil-select" class="soil-select">
          <option value="unknown">Select soil type</option>
          <option value="alluvial">Alluvial (Indo-Gangetic)</option>
          <option value="black-cotton">Black Cotton (Regur)</option>
          <option value="red">Red Soil (Deccan)</option>
          <option value="loamy">Loamy</option>
          <option value="sandy-loam">Sandy Loam</option>
          <option value="clay-loam">Clay Loam</option>
          <option value="clay">Clay</option>
        </select>
      </div>
    </div>

    <!-- Intro -->
    <p class="crops-intro">
      Crops are ranked by suitability score based on your GPS location, live weather conditions, current season, and soil type.
      Select your soil type above to improve accuracy.
    </p>

    <!-- Ranked list -->
    <div id="crops-ranked-list"></div>
  `;
}

/* ============================================
   REFRESH — re-score and re-render list
   ============================================ */
function refreshCropList() {
  const wd   = window.lastWeatherData;
  const temp = wd?.current?.temperature_2m       ?? 28;
  const hum  = wd?.current?.relative_humidity_2m  ?? 60;

  // Score all crops
  const scored = CROP_DB.map(crop => {
    const result = scoreCrop(crop, cropsState.region, temp, hum, cropsState.soilType, cropsState.season);
    return { crop, ...result };
  }).sort((a, b) => b.score - a.score);

  cropsState.scored = scored;
  renderRankedList(scored, temp, hum);
}

/* ============================================
   RENDER — Ranked list
   ============================================ */
function renderRankedList(scored, temp, hum) {
  const el = document.getElementById("crops-ranked-list");
  if (!el) return;

  el.innerHTML = scored.map((item, i) => {
    const { crop, score, reasons, warnings } = item;
    const disease = getDiseaseRisk(crop, temp, hum);
    const rank    = i + 1;

    const scoreColor = score >= 70 ? "score-high" : score >= 45 ? "score-medium" : "score-low";
    const rankBadge  = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;

    const reasonTags = reasons.map(r =>
      `<span class="crop-reason-tag">✓ ${r}</span>`
    ).join("");

    const warningTags = warnings.map(w =>
      `<span class="crop-warning-tag">⚠ ${w}</span>`
    ).join("");

    return `
    <div class="crop-row" id="croprow-${crop.id}">

      <!-- Row header -->
      <div class="crop-row-header" onclick="toggleCropRow('${crop.id}')">
        <div class="crop-row-left">
          <span class="crop-rank">${rankBadge}</span>
          <span class="crop-emoji">${crop.emoji}</span>
          <div>
            <div class="crop-name">${crop.name} <span class="crop-hindi">${crop.hindiName}</span></div>
            <div class="crop-season-tag">${crop.season.charAt(0).toUpperCase() + crop.season.slice(1)} · ${crop.sowingMonths}</div>
          </div>
        </div>
        <div class="crop-row-right">
          <div class="crop-score-wrap">
            <div class="crop-score-bar-track">
              <div class="crop-score-bar-fill ${scoreColor}" style="width:${score}%"></div>
            </div>
            <span class="crop-score-num ${scoreColor}">${score}%</span>
          </div>
          <span class="crop-chevron" id="cropchev-${crop.id}">▼</span>
        </div>
      </div>

      <!-- Expanded detail -->
      <div class="crop-detail" id="cropdetail-${crop.id}" style="display:none;">

        <!-- Why grow -->
        <div class="crop-why">${crop.whyGrow}</div>

        <!-- Fit tags -->
        <div class="crop-tags-row">
          ${reasonTags}${warningTags}
        </div>

        <!-- Stats grid -->
        <div class="crop-stats-grid">
          <div class="crop-stat-box">
            <div class="crop-stat-label">💧 Water Need</div>
            <div class="crop-stat-val">${crop.waterReq}</div>
            <div class="crop-stat-sub">${crop.waterDetail}</div>
          </div>
          <div class="crop-stat-box">
            <div class="crop-stat-label">📅 Sow Window</div>
            <div class="crop-stat-val">${crop.sowingMonths}</div>
            <div class="crop-stat-sub">Harvest: ${crop.harvestMonths}</div>
          </div>
          <div class="crop-stat-box">
            <div class="crop-stat-label">⏱️ Duration</div>
            <div class="crop-stat-val">${crop.duration}</div>
            <div class="crop-stat-sub">From sowing to harvest</div>
          </div>
          <div class="crop-stat-box">
            <div class="crop-stat-label">📦 Yield / Acre</div>
            <div class="crop-stat-val">${crop.yieldPerAcre}</div>
            <div class="crop-stat-sub">Average expected</div>
          </div>
          <div class="crop-stat-box">
            <div class="crop-stat-label">💰 Market Price</div>
            <div class="crop-stat-val price-val">${crop.marketPrice}</div>
            <div class="crop-stat-sub">MSP / current rate</div>
          </div>
          <div class="crop-stat-box">
            <div class="crop-stat-label">🦠 Disease Risk Now</div>
            <div class="crop-stat-val disease-${disease.level}">${disease.label.split("—")[0].trim()}</div>
            <div class="crop-stat-sub">${disease.label.includes("—") ? disease.label.split("—")[1].trim() : "Based on live weather"}</div>
          </div>
        </div>

        <!-- Suitable soils -->
        <div class="crop-soils-row">
          <span class="crop-soils-label">Best soils:</span>
          ${crop.soilTypes.map(s => `<span class="crop-soil-tag">${s.replace("-", " ")}</span>`).join("")}
        </div>

      </div>
    </div>`;
  }).join("");
}

/* ============================================
   TOGGLE expand / collapse
   ============================================ */
function toggleCropRow(id) {
  const detail = document.getElementById("cropdetail-" + id);
  const chev   = document.getElementById("cropchev-"   + id);
  if (!detail) return;
  const open = detail.style.display !== "none";
  detail.style.display = open ? "none" : "block";
  chev.classList.toggle("open", !open);
  if (!open) {
    setTimeout(() => {
      document.getElementById("croprow-" + id)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }
}

/* ============================================
   PUBLIC API — called from script.js
   ============================================ */
function initCrops(weatherData, lat, lon) {
  window.lastWeatherData = weatherData;
  window.userLat = lat;
  window.userLon = lon;

  // Re-render if tab is active
  if (document.getElementById("tab-crops")?.classList.contains("active")) {
    renderCropsTab();
  }
}
