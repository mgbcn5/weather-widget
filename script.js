"use strict";

const apiKey = "7c01c5cda0be4e46afa162210262710";
let weatherData;
let unit = "c";
// Get the HTML elements
const statusMessage = document.querySelector("#status-message");
const currentWeather = document.querySelector("#current-weather");
const forecastGrid = document.querySelector("#forecast-grid");
const celsiusButton = document.querySelector("#celsius-button");
const fahrenheitButton = document.querySelector("#fahrenheit-button");
// Make sure the required elements exist
if (!statusMessage ||
    !currentWeather ||
    !forecastGrid ||
    !celsiusButton ||
    !fahrenheitButton) {
    throw new Error("Required weather widget elements are missing.");
}
// Choose an icon based on the weather description
function getIcon(condition) {
    const text = condition.toLowerCase();
    if (text.includes("thunder")) {
        return "⛈️";
    }
    else if (text.includes("snow") || text.includes("sleet")) {
        return "🌨️";
    }
    else if (text.includes("rain") || text.includes("drizzle")) {
        return "🌧️";
    }
    else if (text.includes("partly cloudy")) {
        return "🌤️";
    }
    else if (text.includes("cloud") || text.includes("overcast")) {
        return "☁️";
    }
    else if (text.includes("fog") || text.includes("mist")) {
        return "🌫️";
    }
    else if (text.includes("sunny")) {
        return "☀️";
    }
    else if (text.includes("clear")) {
        return "🌙";
    }
    return "🌡️";
}
// Display the saved weather data
function displayWeather() {
    if (!weatherData) {
        return;
    }
    const current = weatherData.current;
    const cityName = document.querySelector("#city-name");
    if (cityName) {
        cityName.textContent = weatherData.location.name;
    }
    const temperatureElement = document.querySelector("#current-temperature");
    if (temperatureElement) {
        temperatureElement.textContent =
            `${Math.round(current[`temp_${unit}`])}°${unit.toUpperCase()}`;
    }
    const conditionElement = document.querySelector("#current-condition");
    if (conditionElement) {
        conditionElement.textContent = current.condition.text;
    }
    const iconElement = document.querySelector("#current-icon");
    if (iconElement) {
        iconElement.textContent = getIcon(current.condition.text);
    }
    // Clear the old cards before creating updated ones
    if (forecastGrid) {
        forecastGrid.replaceChildren();
    }
    weatherData.forecast.forecastday.forEach(function (forecast) {
        const day = forecast.day;
        // Use local midnight to avoid displaying the previous date
        const date = new Date(`${forecast.date}T00:00:00`);
        const card = document.createElement("article");
        card.className = "forecast-card";
        const heading = document.createElement("h3");
        heading.textContent = date.toLocaleDateString("en-CA", {
            weekday: "short"
        });
        const dateLabel = document.createElement("p");
        dateLabel.className = "forecast-date";
        dateLabel.textContent = date.toLocaleDateString("en-CA", {
            month: "short",
            day: "numeric"
        });
        const icon = document.createElement("span");
        icon.className = "weather-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = getIcon(day.condition.text);
        const condition = document.createElement("p");
        condition.className = "forecast-condition";
        condition.textContent = day.condition.text;
        const temperatures = document.createElement("p");
        temperatures.className = "forecast-temperatures";
        const high = document.createElement("strong");
        high.textContent = `High ${Math.round(day[`maxtemp_${unit}`])}°`;
        const low = document.createElement("span");
        low.className = "low-temperature";
        low.textContent = `Low ${Math.round(day[`mintemp_${unit}`])}°`;
        temperatures.append(high, low);
        card.append(heading, dateLabel, icon, condition, temperatures);
        if (forecastGrid) {
            forecastGrid.append(card);
        }
    });
    if (currentWeather) {
        currentWeather.hidden = false;
    }
}
// Fetch weather when the page opens
async function loadWeather() {
    if (statusMessage) {
        statusMessage.textContent = "Loading weather…";
    }
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Calgary&days=3`);
        if (!response.ok) {
            throw new Error("Weather request failed.");
        }
        weatherData = await response.json();
        displayWeather();
        if (statusMessage) {
            statusMessage.textContent = "";
        }
    }
    catch (error) {
        if (statusMessage) {
            statusMessage.textContent =
                "Weather could not load. Check your connection and API key, then refresh.";
        }
        console.error(error);
    }
}
// Update the unit and redraw the temperatures
function changeUnit(selectedUnit) {
    unit = selectedUnit;
    if (celsiusButton) {
        celsiusButton.setAttribute("aria-pressed", String(unit === "c"));
    }
    if (fahrenheitButton) {
        fahrenheitButton.setAttribute("aria-pressed", String(unit === "f"));
    }
    if (weatherData) {
        displayWeather();
    }
}
if (celsiusButton) {
    celsiusButton.addEventListener("click", function () {
        changeUnit("c");
    });
}
if (fahrenheitButton) {
    fahrenheitButton.addEventListener("click", function () {
        changeUnit("f");
    });
}
loadWeather();
//# sourceMappingURL=script.js.map