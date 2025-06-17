const apiKey = "78b84fc8c29e5e7fdaebb1a8dca16c9b"; // Replace with your OpenWeatherMap API key

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const city = data.name;
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;

        document.getElementById("weather").innerHTML = `
          🌍 Weather in <strong>${city}</strong><br>
          🌡️ Temperature: ${temp}°C<br>
          🌥️ Condition: ${desc}<br>
          💨 Wind Speed: ${wind} m/s<br>
          💧 Humidity: ${humidity}%
        `;
      })
      .catch(error => {
        document.getElementById("weather").innerHTML = "Unable to fetch weather.";
        console.error(error);
      });
  });
} else {
  document.getElementById("weather").innerHTML = "Geolocation not supported.";
}