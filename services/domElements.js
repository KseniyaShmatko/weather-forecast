import {imgIconSrc, imgBackSrc} from "./imgSrc.js";
import {getTime, getWeatherImg, getWeek} from "./processResult.js";

let articleTodayWeather = document.querySelector(".todayWeather");

let articleTodayReport = {
    weatherTodayDescription : {
        h2: document.querySelector(".weatherTodayDescription h2"),
        img: document.querySelector(".weatherTodayDescription img"),
        p: document.querySelector(".weatherTodayDescription p")
    },
    h3: document.querySelector(".todayReport h3")
};

let articleWrapperPropesties = {
    wind : {
        p: document.querySelector(".wind p span")
    },
    humidity : {
        p: document.querySelector(".humidity p span")
    },
    pressure : {
        p: document.querySelector(".pressure p span")
    },
    cloudiness : {
        p: document.querySelector(".cloudiness p span")
    },
    sunTime : {
        sunrise: {
            p: document.querySelector(".sunrise p span")
        },
        sunset: {
            p: document.querySelector(".sunset p span")
        }
    }
};

let sectionMinMaxTemp = {
    minTemp: {
        p: document.querySelector(".minTemp p span")
    },
    maxTemp: {
        p: document.querySelector(".maxTemp p span")
    }
};

let articleNextDaysReport = {
    pDay: document.querySelectorAll(".weatherDaily .day"),
    img: document.querySelectorAll(".weatherDaily img"),
    pTempMin: document.querySelectorAll(".weatherDaily .temp .min"),
    pTempMax: document.querySelectorAll(".weatherDaily .temp .max")
};

let articleHourReport = {
    pHour: document.querySelectorAll(".weatherHourly .hour"),
    img: document.querySelectorAll(".weatherHourly .hourImg"),
    pTemp: document.querySelectorAll(".weatherHourly .temp")
};

export function putTodayWeatherIntoElements(result) {
    articleTodayReport.h3.textContent = result.name;
    articleTodayReport.weatherTodayDescription.p.textContent = result.weather[0].description;
    articleTodayReport.weatherTodayDescription.img.src = getWeatherImg(result.weather[0].icon, imgIconSrc);
    articleTodayReport.weatherTodayDescription.img.alt = result.weather[0].main;
    let tempStr = Math.round(result.main.temp) + "°";
    articleTodayReport.weatherTodayDescription.h2.textContent = tempStr;

    let path = getWeatherImg(result.weather[0].icon, imgBackSrc);
    articleTodayWeather.style.backgroundImage = `url(${path})`;
}

export function putMinMaxPropestiesIntoElements(result) {
    sectionMinMaxTemp.minTemp.p.textContent = Math.round(result.list[0].temp.min) + "°";
    sectionMinMaxTemp.maxTemp.p.textContent = Math.round(result.list[0].temp.max) + "°";
}

export function putTodayPropestiesIntoElements(result) {
    articleWrapperPropesties.wind.p.textContent = result.wind.speed;
    articleWrapperPropesties.humidity.p.textContent = result.main.humidity;
    articleWrapperPropesties.pressure.p.textContent = result.main.pressure;
    articleWrapperPropesties.cloudiness.p.textContent = result.clouds.all;

    articleWrapperPropesties.sunTime.sunrise.p.textContent = getTime(result.sys.sunrise, result.timezone);
    articleWrapperPropesties.sunTime.sunset.p.textContent = getTime(result.sys.sunset,  result.timezone);
}

export function putDailyWeatherIntoElements(result) {
    for (let i = 1; i < result.cnt; i++) {
        articleNextDaysReport.pDay[i-1].textContent = getWeek(result.list[i].dt, result.city.timezone);
        articleNextDaysReport.img[i-1].src = getWeatherImg(result.list[i].weather[0].icon, imgIconSrc);
        articleNextDaysReport.img[i-1].alt = result.list[i].weather[0].main;
        articleNextDaysReport.pTempMin[i-1].textContent = Math.round(result.list[i].temp.min) + "°";
        articleNextDaysReport.pTempMax[i-1].textContent = Math.round(result.list[i].temp.max) + "°";
    }
}

export function putHourlyWeatherIntoElements(result) {
    for (let i = 0; i < result.cnt; i++) {
        articleHourReport.pHour[i].textContent = getTime(result.list[i].dt, result.city.timezone);
        articleHourReport.img[i].src = getWeatherImg(result.list[i].weather[0].icon, imgIconSrc);
        articleHourReport.img[i].alt = result.list[i].weather[0].main;
        articleHourReport.pTemp[i].textContent = Math.round(result.list[i].main.temp) + "°";
   }
}