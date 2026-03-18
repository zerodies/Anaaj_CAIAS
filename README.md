# 🌱 ANAAJ — Climate-Aware Farming Assistant
## 🏆 Built for CAIAS Hackathon 2026

ANAAJ is a climate adaptation tool for Indian farmers that converts live weather data into simple, actionable farming decisions — instantly, for free, on any device.


## 🌾 The Problem

India has 140 million farming households. Over 85% own a basic smartphone. Yet crop losses from preventable weather events cost Indian agriculture over ₹1.5 lakh crore annually.

The issue is not lack of weather data — it is the gap between data and decision. A farmer seeing "humidity 84%, temperature 31°C" does not know what to do. By the time they figure it out, the crop is already at risk.


## 💡 The Solution

ANAAJ converts raw meteorological data into specific, actionable farming decisions in real time — automatically, for free, on any device with a browser.


## ✨ Features

### 🏠 Dashboard
- Live weather card with temperature, humidity, wind speed, UV index
- Automated risk assessment — Heat, Rain, and Disease risk calculated from live conditions
- Context-aware daily advice updated in real time
- 7-day forecast strip
- Soil and field condition estimates
- Crop score indicators for sunlight, water stress, and growth conditions

### 🛡️ Crisis Mitigation Center
- Auto-detects active weather threats from live data
- Step-by-step emergency protocols for 5 crisis types:
  - 🔥 Heat Wave / Drought
  - 🌊 Heavy Rain / Flooding
  - 🦠 Pest / Disease Outbreak
  - 💨 Strong Winds / Storm
  - ❄️ Cold Wave / Frost
- Crop-specific risk ratings per crisis
- Recovery timelines for each scenario
- Active threats auto-expand and highlight on tab open

### 💬 AI Farming Assistant
- Powered Z.AI: GLM 4.5 Air via OpenRouter
- Live weather injected into every prompt for location-specific answers
- Responds in Hindi and regional Indian languages natively
- Suggested quick-start questions for common farming queries
- Conversation memory within session

### 🌾 Crop Guide
- Ranks 12 major Indian crops by suitability score out of 100
- Scoring based on GPS region, live temperature, humidity, current season, and soil type
- Each crop shows:
  - Best sowing window and harvest months
  - Water requirement
  - Expected yield per acre
  - 2024 MSP / market price
  - Live disease risk calculated from current weather
  - Suitable soil types
- Soil type selector dynamically re-ranks all crops instantly

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Weather API | Open-Meteo (free, no key needed) |
| Location | Browser Geolocation API |
| Reverse Geocoding | Nominatim / OpenStreetMap |
| AI Chat | OpenRouter — Google Gemma 3 27B |
| Hosting | GitHub Pages |

---

## 🏗️ Architecture
```
User's Browser
      │
      ├── GPS coordinates
      │         ↓
      │   Nominatim API → City name
      │
      ├── Coordinates → Open-Meteo API
      │         ↓
      │   Weather data → Risk Engine → Advice Generator
      │                             → Mitigation Detector
      │                             → Crop Scorer
      │
      └── Farmer question → OpenRouter API (Gemma 27B)
                ↑
          Live weather context injected automatically
```

---

## 📁 File Structure
```
ANAAJ_CAIAS/
├── index.html       — App shell, tab navigation, all HTML
├── style.css        — Design system, all component styles
├── script.js        — Weather API, risk engine, advice logic
├── mitigation.js    — Crisis data, auto-detection, protocols
├── crops.js         — Crop database, scoring engine, UI
└── chat.js          — AI chat, OpenRouter integration
```

---

## 🚀 How to Run Locally

No installation needed. Just clone and open:
```bash
git clone https://github.com/zerodies/Anaaj_CAIAS.git
cd Anaaj_CAIAS
```

Open `index.html` in any browser. That's it.

For AI chat to work, add your OpenRouter API key in `chat.js` line 4:
```javascript
const OPENROUTER_KEY = "your-key-here";
```

---

## 🗺️ Roadmap

**Phase 2 — Next 3 months**
- Multi-language UI — Hindi, Telugu, Kannada, Tamil, Marathi
- Live mandi prices via Agmarknet API (Government of India)
- PWA — full offline support after first load
- Crop-specific advice engine

---

## 📊 Impact Potential

| Metric | Value |
|---|---|
| Target users | 140M farming households |
| Annual weather crop loss | ₹1.5 lakh crore |
| App load time on 3G | Under 2 seconds |
| Cost per user per day | ₹0 |
| Crops in database | 12 with 2024 MSP prices |
| Crisis protocols | 5 |
| Server infrastructure needed | None |

---

## 👨‍💻 Built By

Team CODE ZERO — CAIAS Hackathon 2026
