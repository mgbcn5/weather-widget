const apiKey = "7c01c5cda0be4e46afa162210262710";

let weatherData;
let unit = "c";

// Get the HTML elements
const statusMessage = document.querySelector("#status-message");
const currentWeather = document.querySelector("#current-weather");
const forecastGrid = document.querySelector("#forecast-grid");
const celsiusButton = document.querySelector("#celsius-button");
const fahrenheitButton = document.querySelector("#fahrenheit-button");

// Choose an icon based on the weather description
function getIcon(condition) {
  const text = condition.toLowerCase();

  if (text.includes("thunder")) {
    return "⛈️";
  } else if (text.includes("snow") || text.includes("sleet")) {
    return "🌨️";
  } else if (text.includes("rain") || text.includes("drizzle")) {
    return "🌧️";
  } else if (text.includes("partly cloudy")) {
    return "🌤️";
  } else if (text.includes("cloud") || text.includes("overcast")) {
    return "☁️";
  } else if (text.includes("fog") || text.includes("mist")) {
    return "🌫️";
  } else if (text.includes("sunny")) {
    return "☀️";
  } else if (text.includes("clear")) {
    return "🌙";
  }

  return "🌡️";
}

// Display the saved weather data
function displayWeather() {
  const current = weatherData.current;

  document.querySelector("#city-name").textContent =
    weatherData.location.name;

  document.querySelector("#current-temperature").textContent =
    `${Math.round(current[`temp_${unit}`])}°${unit.toUpperCase()}`;

  document.querySelector("#current-condition").textContent =
    current.condition.text;

  document.querySelector("#current-icon").textContent =
    getIcon(current.condition.text);

  // Clear the old cards before creating updated ones
  forecastGrid.replaceChildren();

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
    forecastGrid.append(card);
  });

  currentWeather.hidden = false;
}

// Fetch weather when the page opens
async function loadWeather() {
  statusMessage.textContent = "Loading weather…";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Calgary&days=3`
    );

    if (!response.ok) {
      throw new Error("Weather request failed.");
    }

    weatherData = await response.json();
    displayWeather();
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent =
      "Weather could not load. Check your connection and API key, then refresh.";

    console.error(error);
  }
}

// Update the unit and redraw the temperatures
function changeUnit(selectedUnit) {
  unit = selectedUnit;

  celsiusButton.setAttribute("aria-pressed", unit === "c");
  fahrenheitButton.setAttribute("aria-pressed", unit === "f");

  if (weatherData) {
    displayWeather();
  }
}

celsiusButton.addEventListener("click", function () {
  changeUnit("c");
});

fahrenheitButton.addEventListener("click", function () {
  changeUnit("f");
});

loadWeather();