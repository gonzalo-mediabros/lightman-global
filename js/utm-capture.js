(function () {
  const STORAGE_KEY = "__utm_data";
  const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const CLICK_PARAMS = ["gclid", "fbclid", "msclkid"];

  var params = new URLSearchParams(window.location.search);
  var current = {};

  UTM_PARAMS.concat(CLICK_PARAMS).forEach(function (key) {
    var val = params.get(key);
    if (val) {
      current[key] = val;
    }
    // Also check for utm_content variants (some platforms use different casing)
  });

  // Also capture msclkid with alt casing
  var msclkidAlt = params.get("msclkid") || params.get("Msclkid");
  if (msclkidAlt) {
    current["msclkid"] = msclkidAlt;
  }

  var raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (_) {}

  var stored = {};
  if (raw) {
    try {
      stored = JSON.parse(raw);
    } catch (_) {
      stored = {};
    }
  }

  // Preserve first_visit timestamp if it exists
  if (!stored.first_visit && stored._timestamp) {
    current.first_visit = stored._timestamp;
  }

  // New values override old; params not in URL are kept
  // But timestamp always updates
  var merged = {};
  var allKeys = Object.keys(stored).concat(Object.keys(current));
  for (var i = 0; i < allKeys.length; i++) {
    var k = allKeys[i];
    if (current.hasOwnProperty(k)) {
      merged[k] = current[k];
    } else if (stored.hasOwnProperty(k)) {
      merged[k] = stored[k];
    }
  }
  merged._timestamp = new Date().toISOString();

  // Also store separate raw URL for debugging
  if (window.location.search) {
    merged._landing_url = window.location.href;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (_) {}
})();
