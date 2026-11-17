# Weather App

Overview: Weather app that displays the current conditions on a 3-day forecast. Users can switch between Celsius and Fahrenheit easily, view icons representing different weather conditions, and check daily high and low temperatures.
For Part 2, I changed my original JavaScript code to TypeScript. I wanted to keep the weather app the same while making some improvements to the code.


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
- Typescript
- Weather API (free plan, 3-day forecast)
- [Iconify](https://iconify.design/) CSS icons

## Why I Chose TypeScript (NEW)

I chose TypeScript because it was similar to JavaScript, which I was already familiar with. I also wanted to try working with types since my weather app gets information from an API.

I thought it would be a good way to make my code a little more organized and help catch mistakes before running the app.

## Why I Chose TypeScript

I chose TypeScript because it was similar to JavaScript, which I was already familiar with. Since my weather app uses an API, I wanted to try adding types to make the code easier to understand and catch mistakes earlier.

What I Changed

I kept my original functions but added interfaces for the weather data, types for the HTML elements, and checks for missing elements. I also set up tsconfig.json to compile the TypeScript into JavaScript.

I ran into an issue where the app wouldn't load because of the compiled JavaScript. After fixing the compiler settings, everything worked again.

## Installation

Requirements

A modern web browser
A free API key from Weather API name
node.js and npm

## Installation instructions

1. Clone the repository:
 git clone https://github.com/megbcn5/weather-widget.git
cd weather-widget
2. Install dependencies: npn install
3. Get a free API key from [Weather API](https://www.weatherapi.com/my/).
4. Add your key where the app expects it (for example in `script.js`):

   ```js
   const API_KEY = "YOUR_API_KEY_HERE";
   ```
5. Compile TypeScript: npx tsc
6. Open index.html in your browser, or start a local server: npx serve
   
## Usage
Open the app. The current weather and the 3-day forecast load automatically.
Use the °C / °F buttons in the top corner to change the temperature unit.
If the data can't be loaded, a message appears under the title explaining what went wrong.

## Project structure

```
├── index.html
├── package.json
├── styles.css
├── script.ts
├── script.js
├── tsconfig.json
└── README.md
```
## Recommendations for Improvements
More cities: Add a search bar so users can check weather in other locations.

Error handling: Add a retry button instead of having to refresh the page.

Code organization: Separate the API and display functions to make the code easier to manage.

Accessibility: Improve loading messages for screen readers.

Weather details: Include humidity, wind speed, and precipitation.

## Notes

- The free weather API plan only provides a 3-day forecast, so the layout is set to three cards. 


## Credits

- Weather data from (https://www.weatherapi.com/my/)
- - City heading icon: cbi:weather-page-alt, accessed through Iconify.
- Icon license: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
