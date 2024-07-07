const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const search = document.querySelector(".search");
const form = document.getElementById("locationInput");
const cities = document.querySelectorAll(".city");

// Default city when the page loads
let cityInput = "Hanoi";

// Fetch weather data initially
fetchWeatherData();

// Add event listeners for predefined cities
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
  });
});

// Add event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  if (search.value.trim() === "") {
    alert("Please type in the city name");
  } else {
    cityInput = search.value.trim();
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
  // Log the city input to ensure it's correct
  console.log("Fetching weather data for:", cityInput);

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=522d6afd862c43b195055234240707&q=${cityInput}&aqi=yes`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Weather data received:", data);

      // Update DOM elements with new data
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const y = parseInt(date.substr(0, 4));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} ${m} ${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;

      // Update Cloud, Humidity, and Wind information
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      // Set background based on time of day and weather condition
      let timeOfDay = data.current.is_day ? "day" : "night";
      const code = data.current.condition.code;

      if (code === 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#e5ba92" : "#181e27";
      } else if (
        [
          1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282,
        ].includes(code)
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#fa6d1b" : "#181e27";
      } else if (
        [
          1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195,
          1204, 1207, 1240, 1243, 1246, 1249, 1252,
        ].includes(code)
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#647d75" : "#325c80";
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = timeOfDay === "day" ? "#4d72aa" : "#1b1b1b";
      }

      app.style.opacity = "1";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

app.style.opacity = "1";
