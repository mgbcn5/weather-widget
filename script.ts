
const apiKey = "7c01c5cda0be4e46afa162210262710";

// My API key is currently in the code.
// For a larger project, I would move the API request
// to a backend so the key isn't exposed.

interface WeatherCondition {
  text: string;
}

interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: WeatherCondition;
  };
}

interface WeatherData {
  location: {
    name: string;
  };
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

let weatherData: WeatherData | undefined;

type TemperatureUnit = "c" | "f";
let unit: TemperatureUnit = "c";

// Get the HTML elements
const statusMessage = document.querySelector<HTMLElement>("#status-message");
const currentWeather = document.querySelector<HTMLElement>("#current-weather");
const forecastGrid = document.querySelector<HTMLElement>("#forecast-grid");
const celsiusButton = document.querySelector<HTMLButtonElement>("#celsius-button");
const fahrenheitButton = document.querySelector<HTMLButtonElement>("#fahrenheit-button");

// Make sure the required elements exist
if (
  !statusMessage ||
  !currentWeather ||
  !forecastGrid ||
  !celsiusButton ||
  !fahrenheitButton
) {
  throw new Error("Required weather widget elements are missing.");
}

// I could put the weather conditions and icons into a separate list
// instead of using multiple if statements.
// This would make it easier to add new icons later.

// Choose an icon based on the weather description
function getIcon(condition: string): string {
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

// This function does a lot of things at once.
// I could split it into smaller functions to make it
// easier to read and update.

// Display the saved weather data
function displayWeather(): void {
  if (!weatherData) {
    return;
  }

  const current = weatherData.current;

  const cityName = document.querySelector<HTMLElement>("#city-name");

  if (cityName) {
    cityName.textContent = weatherData.location.name;
  }

  const temperatureElement =
    document.querySelector<HTMLElement>("#current-temperature");

  if (temperatureElement) {
    temperatureElement.textContent =
      `${Math.round(current[`temp_${unit}`])}°${unit.toUpperCase()}`;
  }

  const conditionElement =
    document.querySelector<HTMLElement>("#current-condition");

  if (conditionElement) {
    conditionElement.textContent = current.condition.text;
  }

  const iconElement =
    document.querySelector<HTMLElement>("#current-icon");

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

// If the weather doesn't load, users have to refresh the page.
// I could add a retry button and clearer error messages.

// Fetch weather when the page opens
async function loadWeather(): Promise<void> {
  if (statusMessage) {
    statusMessage.textContent = "Loading weather…";
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Calgary&days=3`
    );

    if (!response.ok) {
      throw new Error("Weather request failed.");
    }

    weatherData = (await response.json()) as WeatherData;
    displayWeather();

    if (statusMessage) {
      statusMessage.textContent = "";
    }
  } catch (error) {
    if (statusMessage) {
      statusMessage.textContent =
        "Weather could not load. Check your connection and API key, then refresh.";
    }

    console.error(error);
  }
}

// The temperature buttons work, but I could add a message
// for screen readers when users switch between Celsius and Fahrenheit.

// Update the unit and redraw the temperatures
function changeUnit(selectedUnit: TemperatureUnit): void {
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
