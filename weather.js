document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "78b84fc8c29e5e7fdaebb1a8dca16c9b";
  const city = "Radiokop";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const locationElement = document.getElementById("location");
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("description");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");

  const forecastBtn = document.getElementById("forecast-btn");
  const forecastPopup = document.getElementById("forecast-popup");
  const forecastContainer = document.getElementById("forecast-container");

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
      descriptionElement.textContent = `Condition: ${data.weather[0].description}`;
      humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

      const { lat, lon } = data.coord;

      forecastBtn.addEventListener("click", () => {
        const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(forecastApi)
          .then(res => res.json())
          .then(forecastData => {
            forecastContainer.innerHTML = "";

            // Filter one forecast per day at 12:00
            const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

            dailyForecasts.forEach(item => {
              const date = new Date(item.dt_txt).toDateString();
              const temp = item.main.temp;
              const desc = item.weather[0].description;
              const humidity = item.main.humidity;
              const wind = item.wind.speed;

              forecastContainer.innerHTML += `
                <div class="forecast-day" style="border-bottom:1px solid #ccc; padding: 10px;">
                  <strong>${date}</strong><br>
                  <p>Temp: ${temp}°C</p>
                  <p>Condition: ${desc}</p>
                  <p>Humidity: ${humidity}%</p>
                  <p>Wind Speed: ${wind} m/s</p>
                </div>
              `;
            });

            forecastPopup.style.display =
              forecastPopup.style.display === "none" ? "block" : "none";
          })
          .catch(err => {
            forecastContainer.innerHTML = "<p>Could not fetch forecast data.</p>";
            console.error("Forecast error:", err);
          });
      });
    })
    .catch(error => {
      locationElement.textContent = "Could not retrieve weather data.";
      console.error("Error fetching weather data:", error);
    });
});




