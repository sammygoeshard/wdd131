// GETDATES VERSION 2 
// scripts/getdate.js  (robust + backward compatible)
(function () {
  const now = new Date();

  // ---- YEAR ----
  // Prefer #currentyear (old), else .year (new)
  const yearEl = document.getElementById("currentyear") || document.querySelector(".year");
  if (yearEl) yearEl.textContent = now.getFullYear();

  // ---- LAST MODIFIED ----
  // Prefer #lastModified (old), else #last-modified (new)
  const lmEl = document.getElementById("lastModified") || document.getElementById("last-modified");
  if (lmEl) {
    const modified = new Date(document.lastModified);
    // If the element is a <time>, fill both datetime and text
    if (lmEl.tagName && lmEl.tagName.toLowerCase() === "time") {
      lmEl.dateTime = modified.toISOString();
      lmEl.textContent = document.lastModified;
    } else {
      lmEl.textContent = `Last Modification: ${document.lastModified}`;
    }
  }
})();
