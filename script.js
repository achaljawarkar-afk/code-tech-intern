async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "Please enter city name";
        return;
    }

    result.innerHTML = "Loading...";

    try {
        // Get latitude & longitude
        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" + city
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerHTML = "City not found";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        result.innerHTML = `
            <p><b>City:</b> ${city}</p>
            <p><b>Temperature:</b> ${weatherData.current_weather.temperature} °C</p>
            <p><b>Wind Speed:</b> ${weatherData.current_weather.windspeed} km/h</p>
        `;
    } catch (error) {
        result.innerHTML = "Error fetching data";
    }
}
