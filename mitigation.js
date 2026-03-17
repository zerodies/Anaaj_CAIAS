/* ============================================
   ANAAJ — Crisis Mitigation Center
   mitigation.js
   ============================================ */

const CRISES = [
  {
    id: "heat", icon: "🔥", title: "Heat Wave / Drought", category: "heat",
    subtitle: "Triggered when temperature ≥ 33°C or extended dry spell",
    recovery: "7–14 days after temperatures normalise",
    crops: [
      { name: "Wheat", risk: "high" }, { name: "Tomato", risk: "high" },
      { name: "Lettuce", risk: "high" }, { name: "Rice", risk: "medium" },
      { name: "Maize", risk: "medium" }, { name: "Sugarcane", risk: "low" }, { name: "Cotton", risk: "low" }
    ],
    timeline: [
      { dot: "green", text: "Day 1–2: Irrigate early AM, apply mulch" },
      { dot: "amber", text: "Day 3–7: Monitor leaf curl and wilting" },
      { dot: "amber", text: "Week 2: Resume fertilising carefully" },
      { dot: "green", text: "Week 3–4: Assess final yield impact" }
    ],
    phases: [
      { label: "Immediate — Day 1", actions: [
        "Irrigate all crops <strong>before 7 AM</strong> — water evaporates rapidly after 9 AM in heat waves.",
        "Apply <strong>2–3 inch mulch layer</strong> (straw or dry leaves) around crop base to retain soil moisture.",
        "Install <strong>temporary shade nets (50% shade)</strong> over vegetable crops and nurseries.",
        "Suspend all <strong>fertiliser and pesticide applications</strong> — heat causes chemical burn on leaves.",
        "Move potted or nursery plants to shaded areas immediately."
      ]},
      { label: "Short-term — Days 2–5", actions: [
        "Switch to <strong>drip irrigation</strong> if available — reduces water loss by up to 60% vs flood irrigation.",
        "Spray crops with <strong>kaolin clay solution</strong> — creates a reflective film that lowers leaf temperature.",
        "Check soil moisture <strong>twice daily</strong> (morning + evening) — irrigate if top 5 cm is dry.",
        "Check and repair <strong>irrigation channels</strong> to eliminate water wastage."
      ]},
      { label: "Protective — Ongoing", actions: [
        "Delay <strong>new sowing</strong> until temperatures drop below 35°C.",
        "Add <strong>organic matter (compost)</strong> to soil to improve water retention long-term.",
        "Monitor for heat stress: <strong>wilting at midday, leaf curl, brown leaf edges</strong>.",
        "Keep <strong>livestock in shaded areas</strong> with constant fresh water access."
      ]}
    ]
  },
  {
    id: "rain", icon: "🌊", title: "Heavy Rain / Flooding", category: "rain",
    subtitle: "Triggered when rain probability ≥ 70% or heavy rain weather code",
    recovery: "3–10 days depending on drainage",
    crops: [
      { name: "Wheat", risk: "high" }, { name: "Lentils", risk: "high" },
      { name: "Cotton", risk: "high" }, { name: "Maize", risk: "medium" },
      { name: "Soybean", risk: "medium" }, { name: "Rice", risk: "low" }, { name: "Jute", risk: "low" }
    ],
    timeline: [
      { dot: "red",   text: "Before rain: Clear drains, harvest mature crops" },
      { dot: "amber", text: "Day 1–2: Monitor water levels, document damage" },
      { dot: "amber", text: "Day 3–5: Drain water, apply fungicide" },
      { dot: "green", text: "Week 2–3: Re-apply nitrogen, resume normal care" }
    ],
    phases: [
      { label: "Before Rain — Preparation", actions: [
        "Clear all <strong>drainage channels and bunds</strong> — blocked drains are the #1 cause of waterlogging crop loss.",
        "Harvest any <strong>mature or near-mature crops immediately</strong> — wet grain gets fungal infection fast.",
        "Move all <strong>stored produce, fertiliser bags, and equipment</strong> to elevated or covered areas.",
        "Create <strong>raised bunds</strong> around the most valuable crop sections to redirect water flow.",
        "Do <strong>not apply fertiliser</strong> 48 hours before heavy rain — all nutrients will wash away."
      ]},
      { label: "During Heavy Rain", actions: [
        "<strong>Do not enter waterlogged fields</strong> — risk of electrocution from underground cables.",
        "Monitor <strong>water levels at field boundaries</strong> every 2–3 hours.",
        "Open <strong>irrigation gate valves fully</strong> to allow water to drain into lower channels.",
        "<strong>Document damage with photos</strong> for insurance claims — do this in real time."
      ]},
      { label: "After Rain — Recovery", actions: [
        "Wait until water drains <strong>before entering fields</strong> — walking on waterlogged soil compacts it.",
        "Apply <strong>fungicide spray within 24 hours</strong> of water recession — wet conditions trigger disease rapidly.",
        "Remove <strong>dead or badly damaged plants</strong> immediately to prevent spread to healthy crops.",
        "<strong>Re-apply nitrogen fertiliser</strong> — heavy rain leaches nitrogen from soil extremely fast.",
        "Apply <strong>potassium-based fertiliser</strong> to help plants recover from root oxygen stress."
      ]}
    ]
  },
  {
    id: "pest", icon: "🦠", title: "Pest / Disease Outbreak", category: "pest",
    subtitle: "Triggered when humidity > 75% and temperature > 25°C",
    recovery: "10–21 days with correct treatment",
    crops: [
      { name: "Rice", risk: "high" }, { name: "Potato", risk: "high" },
      { name: "Tomato", risk: "high" }, { name: "Chilli", risk: "medium" },
      { name: "Groundnut", risk: "medium" }, { name: "Cotton", risk: "medium" }, { name: "Wheat", risk: "low" }
    ],
    timeline: [
      { dot: "red",   text: "Day 1: Field inspection and spray" },
      { dot: "amber", text: "Day 2–7: Monitor spread daily" },
      { dot: "amber", text: "Week 2: Second spray if needed" },
      { dot: "green", text: "Week 3–4: Assess and replant if required" }
    ],
    phases: [
      { label: "Early Detection", actions: [
        "Inspect crops <strong>every morning</strong> — walk entire field, check undersides of leaves for eggs, spots, or lesions.",
        "Look for: <strong>yellowing leaves, wilting despite water, unusual spots, sticky residue</strong>, or insect clusters.",
        "<strong>Identify the specific pest or disease</strong> before any treatment — wrong treatment wastes money.",
        "Check <strong>neighbouring farms</strong> — pest outbreaks spread rapidly across fields in the same region."
      ]},
      { label: "Immediate Control", actions: [
        "For fungal disease: apply <strong>copper-based fungicide (Bordeaux mixture)</strong> as first-line treatment.",
        "For insect pests: use <strong>neem oil spray (5ml per litre of water)</strong> as organic first response.",
        "<strong>Remove and burn infected plant material</strong> — do not compost it, this spreads spores.",
        "Set up <strong>yellow sticky traps</strong> at canopy level to monitor insect populations.",
        "Switch to <strong>drip irrigation</strong> — overhead watering keeps leaf surfaces wet and accelerates fungal spread."
      ]},
      { label: "Prevention & Follow-up", actions: [
        "Improve <strong>field air circulation</strong> by thinning dense crop areas — humidity causes fungal spread.",
        "Apply <strong>preventive spray every 7 days</strong> during high-humidity periods.",
        "Rotate to <strong>resistant crop varieties</strong> in the next season for affected fields.",
        "Contact your local <strong>Krishi Vigyan Kendra (KVK)</strong> if outbreak is severe — free diagnosis available."
      ]}
    ]
  },
  {
    id: "wind", icon: "💨", title: "Strong Winds / Storm", category: "wind",
    subtitle: "Triggered when wind speed > 40 km/h or thunderstorm detected",
    recovery: "5–15 days for structural recovery",
    crops: [
      { name: "Banana", risk: "high" }, { name: "Sugarcane", risk: "high" },
      { name: "Maize", risk: "high" }, { name: "Sunflower", risk: "medium" },
      { name: "Arhar Dal", risk: "medium" }, { name: "Rice", risk: "low" }, { name: "Wheat", risk: "low" }
    ],
    timeline: [
      { dot: "red",   text: "Before storm: Stake crops, harvest ripe produce" },
      { dot: "red",   text: "Day 1: Re-stake lodged crops within 24 hours" },
      { dot: "amber", text: "Day 2–3: Clear debris, check root exposure" },
      { dot: "green", text: "Week 2: Assess structural damage, replant if needed" }
    ],
    phases: [
      { label: "Before Storm — Preparation", actions: [
        "<strong>Stake and tie all tall crops</strong> (sugarcane, maize, banana) to bamboo or wooden poles immediately.",
        "Harvest any <strong>ripe or near-ripe produce</strong> — this is the single highest priority action.",
        "Secure all <strong>plastic covers, nets, and greenhouse structures</strong> with extra anchoring.",
        "Park all <strong>farming equipment</strong> in covered or sheltered areas.",
        "Delay all <strong>spraying operations</strong> — wind disperses chemicals far away from target crops."
      ]},
      { label: "During Storm", actions: [
        "<strong>Stay indoors</strong> — do not attempt to protect crops during active storm conditions.",
        "Keep all <strong>livestock secured</strong> in shelters with adequate feed and water.",
        "Avoid using <strong>electrical equipment</strong> or standing near tall trees or poles.",
        "Monitor <strong>weather updates every 30 minutes</strong> for storm movement and intensity."
      ]},
      { label: "Post-Storm — Recovery", actions: [
        "Survey fields for damage — <strong>document everything photographically</strong> before touching anything.",
        "<strong>Re-stake fallen crops within 24 hours</strong> — plants can fully recover if re-staked quickly.",
        "Clear <strong>debris from drainage channels</strong> immediately to prevent secondary flooding.",
        "Check for <strong>root exposure in uprooted plants</strong> — if roots are intact, re-plant and water immediately."
      ]}
    ]
  },
  {
    id: "cold", icon: "❄️", title: "Cold Wave / Frost", category: "cold",
    subtitle: "Triggered when temperature ≤ 10°C or frost warning issued",
    recovery: "Varies — frost-killed crops may need replanting",
    crops: [
      { name: "Tomato", risk: "high" }, { name: "Brinjal", risk: "high" },
      { name: "Papaya", risk: "high" }, { name: "Chilli", risk: "high" },
      { name: "Banana", risk: "medium" }, { name: "Potato", risk: "medium" }, { name: "Wheat", risk: "low" }
    ],
    timeline: [
      { dot: "red",   text: "Evening: Cover crops + irrigate fields" },
      { dot: "amber", text: "Day 2–5: Remove frost-burnt outer leaves" },
      { dot: "amber", text: "Week 2: Apply potassium foliar feed" },
      { dot: "green", text: "Week 3–4: New growth appears, assess damage" }
    ],
    phases: [
      { label: "Before Cold Wave — Evening Prep", actions: [
        "Cover sensitive crops with <strong>frost cloth, old saris, or polythene sheets</strong> before sunset.",
        "<strong>Irrigate fields in the evening</strong> — wet soil holds heat 3x better than dry soil overnight.",
        "Apply <strong>potassium-rich fertiliser (potash)</strong> — strengthens cell walls and improves frost tolerance.",
        "<strong>Move seedling trays and nursery plants</strong> indoors or into a polytunnel before dark."
      ]},
      { label: "During Cold Period", actions: [
        "Light <strong>smoky fires at field edges</strong> in early morning hours (3–6 AM) — rising warm air prevents ice crystal formation.",
        "Remove <strong>frost cloth or covers by 9 AM</strong> once temperatures rise — trapped moisture causes fungal disease.",
        "<strong>Avoid pruning or cutting</strong> during cold waves — fresh cuts are highly vulnerable to frost.",
        "Check covered plants for <strong>condensation buildup</strong> — shake covers to remove ice weight."
      ]},
      { label: "After Cold Wave — Recovery", actions: [
        "<strong>Do not remove frost-damaged leaves immediately</strong> — they insulate surviving tissue underneath.",
        "Wait <strong>1–2 weeks after cold spell ends</strong> before assessing the true damage extent.",
        "Apply <strong>foliar spray of seaweed extract or micronutrients</strong> to help plants recover faster.",
        "Replant frost-killed sections with <strong>cold-tolerant varieties</strong> if the season still permits."
      ]}
    ]
  }
];

/* ---- state ---- */
let mitActiveFilter  = "all";
let mitExpanded      = new Set();
let mitActiveCrises  = new Set();

/* ---- detect active crises from weather ---- */
function detectActiveCrises(wd) {
  const ids = new Set();
  if (!wd) return ids;
  const c = wd.current;
  const rainToday = wd.daily?.precipitation_probability_max?.[0] ?? 0;
  if (c.temperature_2m >= 33)                           ids.add("heat");
  if (rainToday >= 70 || c.weather_code >= 80)          ids.add("rain");
  if (c.relative_humidity_2m > 75 && c.temperature_2m > 25) ids.add("pest");
  if (c.wind_speed_10m > 40 || c.weather_code >= 95)    ids.add("wind");
  if (c.temperature_2m < 10)                            ids.add("cold");
  return ids;
}

/* ---- main render ---- */
function renderMitigationTab() {
  const el = document.getElementById("mitigation-content");
  if (!el) return;
  mitActiveCrises = detectActiveCrises(window.lastWeatherData || null);
  mitActiveCrises.forEach(id => mitExpanded.add(id));

  el.innerHTML = renderBanner() + renderPills() + renderIntro() + renderCardList();

  el.querySelectorAll(".mit-filter-pill").forEach(b => {
    b.addEventListener("click", () => {
      mitActiveFilter = b.dataset.filter;
      el.querySelectorAll(".mit-filter-pill").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      mitApplyFilter();
    });
  });
  el.querySelectorAll(".mit-hdr-btn").forEach(b => {
    b.addEventListener("click", () => mitToggle(b.dataset.id));
  });
  mitApplyFilter();
  if (mitActiveCrises.size > 0) {
    setTimeout(() => {
      document.getElementById("mc-" + [...mitActiveCrises][0])
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }
}

function renderBanner() {
  if (mitActiveCrises.size === 0) return `
    <div class="mit-banner mit-safe">
      <span class="mit-banner-icon">✅</span>
      <div>
        <div class="mit-banner-title">No Active Threats Right Now</div>
        <div class="mit-banner-sub">Current weather is within safe parameters. Browse guides below to stay prepared.</div>
      </div>
    </div>`;
  const names = CRISES.filter(c => mitActiveCrises.has(c.id))
    .map(c => `${c.icon} ${c.title.split("/")[0].trim()}`).join(" · ");
  return `
    <div class="mit-banner mit-alert-active">
      <span class="mit-banner-icon">⚡</span>
      <div>
        <div class="mit-banner-title">Active Threat${mitActiveCrises.size > 1 ? "s" : ""} Detected — Action Required</div>
        <div class="mit-banner-sub">${names}</div>
      </div>
    </div>`;
}

function renderPills() {
  const defs = [
    { k: "all",  l: "All Scenarios" }, { k: "heat", l: "🔥 Heat" },
    { k: "rain", l: "🌊 Rain"       }, { k: "pest", l: "🦠 Pest" },
    { k: "wind", l: "💨 Wind"       }, { k: "cold", l: "❄️ Cold" }
  ];
  return `<div class="mit-pills-row">${defs.map(d => `
    <button class="mit-filter-pill${d.k === mitActiveFilter ? " active" : ""}" data-filter="${d.k}">
      ${d.l}${mitActiveCrises.has(d.k) ? '<span class="mit-pill-alert"></span>' : ""}
    </button>`).join("")}</div>`;
}

function renderIntro() {
  return `<p class="mit-intro-text">Tap any card to expand the full action plan.${
    mitActiveCrises.size > 0
      ? " Cards marked <strong>⚡ Active</strong> are triggered by today's live weather and are expanded automatically."
      : ""}</p>`;
}

function renderCardList() {
  return `<div id="mit-cards-list">${CRISES.map(renderCard).join("")}</div>`;
}

function renderCard(crisis) {
  const isActive   = mitActiveCrises.has(crisis.id);
  const isExpanded = mitExpanded.has(crisis.id);

  const cropTags = crisis.crops.map(c =>
    `<span class="mit-crop-tag ${c.risk}">${c.name}</span>`).join("");

  const timeline = crisis.timeline.map(t =>
    `<div class="mit-tl-row"><span class="mit-tl-dot ${t.dot}"></span><span>${t.text}</span></div>`
  ).join("");

  const phases = crisis.phases.map((p, i) => `
    <div class="mit-phase">
      <div class="mit-phase-hdr"><span class="mit-phase-num">${i + 1}</span><span class="mit-phase-lbl">${p.label}</span></div>
      <ol class="mit-actions-ol">${p.actions.map(a =>
        `<li class="mit-action-li"><span class="mit-action-dot"></span><span>${a}</span></li>`
      ).join("")}</ol>
    </div>`).join("");

  return `
  <div class="mit-card${isActive ? " is-threat" : ""}" id="mc-${crisis.id}" data-category="${crisis.category}">
    <button class="mit-hdr-btn ${crisis.category}" data-id="${crisis.id}">
      <div class="mit-hdr-left">
        <span class="mit-card-icon">${crisis.icon}</span>
        <div>
          <div class="mit-card-title">${crisis.title}</div>
          <div class="mit-card-sub">${crisis.subtitle}</div>
        </div>
      </div>
      <div class="mit-hdr-right">
        ${isActive ? '<span class="mit-active-pill">⚡ Active</span>' : ""}
        <span class="mit-chevron${isExpanded ? " open" : ""}" id="chev-${crisis.id}">▼</span>
      </div>
    </button>
    <div class="mit-body" id="mb-${crisis.id}" style="display:${isExpanded ? "block" : "none"}">
      <div class="mit-meta-bar">
        <span class="mit-meta-label">⏱️ Recovery:</span>
        <span class="mit-meta-val">${crisis.recovery}</span>
      </div>
      <div class="mit-sec-lbl">🌾 Most At-Risk Crops</div>
      <div class="mit-crops-row">${cropTags}</div>
      <div class="mit-sec-lbl">📅 Recovery Timeline</div>
      <div class="mit-timeline">${timeline}</div>
      <div class="mit-divider"></div>
      <div class="mit-steps-title">⚡ Step-by-Step Action Plan</div>
      <div class="mit-phases">${phases}</div>
    </div>
  </div>`;
}

function mitToggle(id) {
  const body = document.getElementById("mb-" + id);
  const chev = document.getElementById("chev-" + id);
  if (!body) return;
  const open = body.style.display !== "none";
  body.style.display = open ? "none" : "block";
  chev.classList.toggle("open", !open);
  if (!open) {
    mitExpanded.add(id);
    setTimeout(() => document.getElementById("mc-" + id)?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
  } else {
    mitExpanded.delete(id);
  }
}

function mitApplyFilter() {
  document.querySelectorAll(".mit-card").forEach(c => {
    c.style.display = (mitActiveFilter === "all" || mitActiveFilter === c.dataset.category) ? "block" : "none";
  });
}

/* ---- public API called by script.js ---- */
function initMitigation(weatherData) {
  window.lastWeatherData = weatherData;
  updateMitNavBadge();
  if (document.getElementById("tab-mitigation")?.classList.contains("active")) {
    renderMitigationTab();
  }
}

function updateMitNavBadge() {
  const btn = document.querySelector('[data-tab="mitigation"]');
  if (!btn) return;
  btn.querySelector(".nav-threat-dot")?.remove();
  if (detectActiveCrises(window.lastWeatherData).size > 0) {
    const dot = document.createElement("span");
    dot.className = "nav-threat-dot";
    btn.appendChild(dot);
  }
}
