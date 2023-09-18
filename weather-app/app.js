const apiKey = "a3b618219308dcd2b718c";		//You can use your own api key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const searchBox = document.querySelector('.city');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

// fetch data from API
async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);

    // display data
    document.querySelector('.city-name').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

    // Change weather icon
    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "./assets/cloud.png";
    } else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "./assets/rain.png";
    } else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./assets/drizzle.png";
    } else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "./assets/mist.png";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});