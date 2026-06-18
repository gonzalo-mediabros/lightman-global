(function () {
  var queryString = window.location.search;
  if (!queryString) return;

  var params = new URLSearchParams(queryString);
  var current = {};
  try {
    var raw = localStorage.getItem("__utm_data");
    if (raw) current = JSON.parse(raw);
  } catch (_) {}

  params.forEach(function (value, key) {
    current[key] = value;
  });

  try {
    localStorage.setItem("__utm_data", JSON.stringify(current));
  } catch (_) {}
})();
