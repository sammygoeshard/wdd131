/* WIND CHILL CALCULATOR */

/**
 * returs wind chill value:
 *  - units: "metric" (°C, km/h) o "imperial" (°F, mph)
 *  - temp: temperature value
 *  - wind: wind speed value
 */
function calculateWindChill(units, temp, wind) {
  return units === "metric"
    ? 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)
    : 35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16);
}

/* Validates whether wind chill should be calculated according to the system of units. */
function canComputeWindChill(units, temp, wind) {
  if (units === "metric") return temp <= 10 && wind > 4.8;  // °C y km/h
  return temp <= 50 && wind > 3;                            // °F y mph
}

/* output format: 0.1 °C in metric; entero en imperial */
function formatWC(units, value) {
  return units === "metric" ? Math.round(value * 10) / 10 : Math.round(value);
}

document.addEventListener("DOMContentLoaded", () => {
  const weather = document.getElementById("weather");
  if (!weather) return;

  // dataset statistics 
  const units = (weather.dataset.units || "metric").toLowerCase(); // "metric" | "imperial"
  const temp  = Number(weather.dataset.temp ?? NaN);
  const wind  = Number(weather.dataset.wind ?? NaN);

  // object Nodes
  const tempEl = document.getElementById("temperature");
  const windEl = document.getElementById("wind");
  const wcEl   = document.getElementById("windchill");
  const unitEl = document.querySelector(".unit");
  const windUnitEl = document.querySelector(".wind-unit");
  const wcUnitEl = document.querySelector(".wc-unit");

  // uptate units labels according to units system
  if (unitEl) unitEl.textContent = units === "metric" ? "°C" : "°F";
  if (windUnitEl) windUnitEl.textContent = units === "metric" ? "km/h" : "mph";
  if (wcUnitEl) wcUnitEl.textContent = units === "metric" ? "°C" : "°F";

//apply values to DOM
  if (Number.isFinite(temp) && tempEl) tempEl.textContent = temp;
  if (Number.isFinite(wind) && windEl) windEl.textContent = wind;

  // If not applicable, indicate "N/A"
  if (!Number.isFinite(temp) || !Number.isFinite(wind) || !canComputeWindChill(units, temp, wind)) {
    if (wcEl) wcEl.textContent = "N/A";
    return;
  }

  // calculate and rounds wind chill 
  const wc = calculateWindChill(units, temp, wind);
  if (wcEl) wcEl.textContent = formatWC(units, wc);
});
