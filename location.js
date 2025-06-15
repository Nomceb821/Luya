const apiKey = "9fc13f7ef6f34e2681cb6fd4938e40b6"; // Replace with your real OpenCage key
const locationElement = document.getElementById("location");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  locationElement.innerText = "Geolocation is not supported by your browser.";
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const address = data.results[0].formatted;
        locationElement.innerText = address;
      } else {
        locationElement.innerText = "Unable to find location details.";
      }
    })
    .catch(() => {
      locationElement.innerText = "Error fetching location name.";
    });
}

function error(err) {
  switch(err.code) {
    case err.PERMISSION_DENIED:
      locationElement.innerText = "You denied the location request.";
      break;
    case err.POSITION_UNAVAILABLE:
      locationElement.innerText = "Location unavailable.";
      break;
    case err.TIMEOUT:
      locationElement.innerText = "Location request timed out.";
      break;
    default:
      locationElement.innerText = "An unknown error occurred.";
  }
}
