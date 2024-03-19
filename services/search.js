import {putTodayWeatherIntoElements, putTodayPropestiesIntoElements, putDailyWeatherIntoElements, putHourlyWeatherIntoElements, putMinMaxPropestiesIntoElements} from "./domElements.js";
import {swiperDay, swiperHour} from "../views/swiper.js";
import {getAPIKey} from "./key.js";

const input = document.querySelector("input");
input.addEventListener("keyup", function(e) {
    if (event?.keyCode != 13) {
        return;
    }
    performForecastSearch();
});

let button = document.querySelector("button");
button.onclick = performForecastSearch;


async function getResponse(type) {
    try {
        const response = await fetch(type.call);
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error(type.error, error);
    }
}

function getRequestObject(city) {
    const APIkeyOpenWeather = getAPIKey();
    let requests = {
        today: {
            call: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkeyOpenWeather}`,
            error: 'Error fetching today response:'
        },
        daily: {
            call: `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=16&appid=${APIkeyOpenWeather}`,
            error: 'Error fetching daily response:'
        },
        hourly: {
            call: `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=${APIkeyOpenWeather}&cnt=24`,
            error: 'Error fetching hourly response:'
        }
    };

    return requests;
}

function performForecastSearch() {
    let place = input.value;
    if(place === ''){
        alert("Please enter the place for searching");
        return;
    }
    getForecast(place);
}


function getForecast(place) {
    button.classList.add("sending");
    let requests = getRequestObject(place);
    Promise.all([getResponse(requests.today), getResponse(requests.daily), getResponse(requests.hourly)])
    .then(results => {
        const [todayWeather, dailyWeather, hourlyWeather] = results;
        if (todayWeather.cod == "404" || dailyWeather.cod == "404" || hourlyWeather.cod == "404") {
            button.classList.remove("sending");
            alert("No such place. Please try to enter another location");
            return;
        }
        putTodayWeatherIntoElements(todayWeather);
        putTodayPropestiesIntoElements(todayWeather);
        putMinMaxPropestiesIntoElements(dailyWeather);
        putDailyWeatherIntoElements(dailyWeather);
        putHourlyWeatherIntoElements(hourlyWeather);
        swiperDay.slideTo(0, 700, true);
        swiperHour.slideTo(0, 700, true);
        button.classList.remove("sending");
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
 
}

document.addEventListener("DOMContentLoaded", function() {
    getForecast('moscow');
});