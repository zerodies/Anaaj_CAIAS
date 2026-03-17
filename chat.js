/* ============================================
   ANAAJ — AI Farming Assistant Chat
   chat.js
   ============================================ */

const OPENROUTER_KEY  = "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";
const OPENROUTER_MODEL = "z-ai/glm-4.5-air:free";
const OPENROUTER_URL   = "https://openrouter.ai/api/v1/chat/completions";

/* ---- conversation history (sent with every request for context) ---- */
let chatHistory = [];

/* ---- build system prompt using live weather if available ---- */
function buildSystemPrompt() {
  let weatherContext = "";

  if (window.lastWeatherData) {
    const c  = window.lastWeatherData.current;
    const d  = window.lastWeatherData.daily;
    const rainToday    = d?.precipitation_probability_max?.[0] ?? "unknown";
    const rainTomorrow = d?.precipitation_probability_max?.[1] ?? "unknown";
    weatherContext = `
CURRENT WEATHER AT FARMER'S LOCATION:
- Temperature: ${Math.round(c.temperature_2m)}°C
- Humidity: ${c.relative_humidity_2m}%
- Wind Speed: ${Math.round(c.wind_speed_10m)} km/h
- Weather Condition: ${c.weather_code}
- Rain probability today: ${rainToday}%
- Rain probability tomorrow: ${rainTomorrow}%
- Location: ${window.cityName || "India"}

Use this live weather data to give highly relevant, location-specific advice.`;
  }

  return `You are ANAAJ, a friendly and knowledgeable AI farming assistant built specifically for Indian farmers.

Your role:
- Give practical, actionable farming advice based on current weather conditions
- Help farmers make daily decisions about irrigation, fertilisation, spraying, harvesting, and sowing
- Warn about crop risks from weather like heat, rain, humidity, and cold
- Suggest solutions for pest and disease problems
- Answer questions about Indian crops: Rice, Wheat, Cotton, Sugarcane, Tomato, Potato, Maize, Chilli, Groundnut, Soybean, Arhar Dal, and more
- Be aware of Indian farming seasons: Kharif (June-November), Rabi (November-April), Zaid (April-June)
- Reference Indian agricultural bodies when relevant: ICAR, KVK (Krishi Vigyan Kendra), PM-KISAN

Tone and style:
- Speak simply and clearly — your audience may not be highly educated
- Be warm, respectful, and encouraging
- Keep responses concise — 3 to 5 sentences for simple questions, structured bullet points for complex advice
- If the farmer seems to be in crisis (crop failure, flooding, pest outbreak), be urgent and direct
- You can understand and respond in Hindi if the farmer writes in Hindi

${weatherContext}

Important rules:
- Never recommend illegal pesticides or harmful chemicals banned in India
- Always suggest consulting the local KVK or agricultural officer for serious outbreaks
- Do not give financial or loan advice — redirect to PM-KISAN or local banks
- If you don't know something specific, say so honestly and suggest who to ask`;
}

/* ============================================
   RENDER — Chat Tab UI
   ============================================ */
function renderChatTab() {
  const el = document.getElementById("chat-content");
  if (!el || el.dataset.initialized) return;
  el.dataset.initialized = "true";

  el.innerHTML = `
    <div class="chat-wrap">

      <!-- Suggested questions -->
      <div class="chat-suggestions" id="chat-suggestions">
        <div class="chat-suggest-label">Quick questions to get started</div>
        <div class="chat-suggest-row">
          <button class="chat-suggest-btn" onclick="sendSuggestion('Should I irrigate my crops today?')">
            💧 Should I irrigate today?
          </button>
          <button class="chat-suggest-btn" onclick="sendSuggestion('Is it safe to spray pesticide today?')">
            🌿 Safe to spray today?
          </button>
          <button class="chat-suggest-btn" onclick="sendSuggestion('What crops should I sow this season?')">
            🌱 What to sow this season?
          </button>
          <button class="chat-suggest-btn" onclick="sendSuggestion('My crop leaves are turning yellow, what should I do?')">
            🍂 Yellow leaves — what to do?
          </button>
          <button class="chat-suggest-btn" onclick="sendSuggestion('How do I protect my crops from the current weather?')">
            🛡️ Protect from current weather?
          </button>
          <button class="chat-suggest-btn" onclick="sendSuggestion('When should I harvest my crop?')">
            🌾 When to harvest?
          </button>
        </div>
      </div>

      <!-- Message thread -->
      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg assistant">
          <div class="chat-avatar">🌱</div>
          <div class="chat-bubble">
            Namaste! I am ANAAJ, your farming assistant. I can see your live weather conditions and I am ready to help you make the best decisions for your crops today. What would you like to know?
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="chat-input-area">
        <input
          type="text"
          id="chat-input"
          class="chat-input"
          placeholder="Ask anything about your crops or weather…"
          autocomplete="off"
        />
        <button class="chat-send-btn" id="chat-send-btn" onclick="handleChatSend()">
          Send ↗
        </button>
      </div>

    </div>
  `;

  /* Send on Enter key */
  document.getElementById("chat-input").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSend();
    }
  });
}

/* ============================================
   SEND — handle user message
   ============================================ */
async function handleChatSend() {
  const input = document.getElementById("chat-input");
  const text  = input.value.trim();
  if (!text) return;
  input.value = "";
  await sendMessage(text);
}

function sendSuggestion(text) {
  /* Hide suggestions after first use */
  const sug = document.getElementById("chat-suggestions");
  if (sug) sug.style.display = "none";
  sendMessage(text);
}

async function sendMessage(text) {
  /* Disable input while waiting */
  const input   = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");
  input.disabled   = true;
  sendBtn.disabled = true;

  /* Append user bubble */
  appendBubble("user", text);

  /* Add to history */
  chatHistory.push({ role: "user", content: text });

  /* Show typing indicator */
  const typingId = showTyping();

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "HTTP-Referer":  "https://zerodies.github.io/Anaaj_CAIAS",
        "X-Title":       "ANAAJ Farming Assistant"
      },
      body: JSON.stringify({
        model:    OPENROUTER_MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...chatHistory
        ],
        max_tokens:  600,
        temperature: 0.7
      })
    });

    removeTyping(typingId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${res.status}`);
    }

    const data    = await res.json();
    const reply   = data.choices?.[0]?.message?.content?.trim();

    if (!reply) throw new Error("Empty response from model");

    /* Add assistant reply to history */
    chatHistory.push({ role: "assistant", content: reply });

    /* Keep history to last 10 exchanges to avoid token bloat */
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    appendBubble("assistant", reply);

  } catch (err) {
    removeTyping(typingId);
    appendBubble("error", `Sorry, I couldn't connect right now. Please check your internet and try again. (${err.message})`);
    /* Remove failed user message from history */
    chatHistory.pop();
  }

  input.disabled   = false;
  sendBtn.disabled = false;
  input.focus();
}

/* ============================================
   UI HELPERS
   ============================================ */

function appendBubble(role, text) {
  const thread = document.getElementById("chat-messages");
  if (!thread) return;

  const div = document.createElement("div");
  div.className = `chat-msg ${role}`;

  if (role === "user") {
    div.innerHTML = `
      <div class="chat-bubble user-bubble">${escapeHtml(text)}</div>
      <div class="chat-avatar user-avatar">👤</div>`;
  } else if (role === "error") {
    div.innerHTML = `
      <div class="chat-avatar">🌱</div>
      <div class="chat-bubble error-bubble">${escapeHtml(text)}</div>`;
  } else {
    /* Format assistant reply — convert **bold** and newlines */
    const formatted = escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>");
    div.innerHTML = `
      <div class="chat-avatar">🌱</div>
      <div class="chat-bubble"><p>${formatted}</p></div>`;
  }

  thread.appendChild(div);
  thread.scrollTop = thread.scrollHeight;
}

function showTyping() {
  const thread = document.getElementById("chat-messages");
  if (!thread) return null;
  const id  = "typing-" + Date.now();
  const div = document.createElement("div");
  div.className = "chat-msg assistant";
  div.id        = id;
  div.innerHTML = `
    <div class="chat-avatar">🌱</div>
    <div class="chat-bubble typing-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
  thread.appendChild(div);
  thread.scrollTop = thread.scrollHeight;
  return id;
}

function removeTyping(id) {
  if (id) document.getElementById(id)?.remove();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
