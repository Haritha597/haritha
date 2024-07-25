const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const searchButton = document.getElementById('searchButton');
const currentLocationButton = document.getElementById('currentLocationButton');

searchButton.addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

currentLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(null, lat, lon);
        });
    } else {
        weatherInfo.innerText = "Geolocation is not supported by this browser.";
    }
});

function fetchWeatherData(location, lat = null, lon = null) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    if (lat !== null && lon !== null) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => weatherInfo.innerText = "Unable to retrieve weather data.");
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const { name, main, weather, wind } = data;
        weatherInfo.innerHTML = `
            <div>Location: ${name}</div>
            <div>Temperature: ${main.temp}°C</div>
            <div>Weather: ${weather[0].description}</div>
            <div>Humidity: ${main.humidity}%</div>
            <div>Wind Speed: ${wind.speed} m/s</div>
        `;
    } else {
        weatherInfo.innerText = "Location not found.";
    }
}
