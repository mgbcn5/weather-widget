# Weather App

Overview: Weather app that displays the current conditions on a 3-day forecast. Users can switch between Celsius and Fahrenheit easily, view icons representing different weather conditions, and check daily high and low temperatures.


**Live demo:** [http://127.0.0.1:5500/index.html]
## Features

- Current temperature and conditions
- 3-day forecast
- Able to switch between Celsius and Fahrenheit
- Responsive layout for desktop and mobile
- Light and dark page themes 
- Accessible: keyboard focus styles, ARIA attributes, reduced-motion support

## Built with

- HTML
- CSS 
- JavaScript
- Weather API (free plan, 3-day forecast)
- [Iconify](https://iconify.design/) CSS icons

## Installation

Requirements

A modern web browser
A free API key from Weather API name

## Installation instructions

1. Clone the repository:
 ```bash
   git clone https://github.com/megbcn5/weather-widget.git
   cd your-repo
   ```
2. Get a free API key from [Weather API](https://www.weatherapi.com/my/).
3. Add your key where the app expects it (for example in `script.js`):

   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
4. Open `index.html` in your browser, or start ith new terminal:
   ```bash
   npx serve
   ```
## Usage
Open the app. The current weather and the 3-day forecast load automatically.
Use the °C / °F buttons in the top corner to change the temperature unit.
If the data can't be loaded, a message appears under the title explaining what went wrong.

## Project structure

```
├── index.html
├── package.json
├── styles.css
├── script.js
└── README.md
```

## Notes

- The free weather API plan only provides a 3-day forecast, so the layout is set to three cards. 


## Credits

- Weather data from (https://www.weatherapi.com/my/)
- - City heading icon: cbi:weather-page-alt, accessed through Iconify.
- Icon license: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
