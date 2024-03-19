export function getWeatherImg(iconCode, imgType) {
    let code = iconCode.slice(0,2);
    return imgType[code.toString()];
}

export function getTime(utcFormat, timezone) {
    let localDate = new Date(utcFormat * 1000);
    let localTime = new Date(localDate.getTime() + timezone * 1000);

    let hours = localTime.getUTCHours();
    let minutes = localTime.getUTCMinutes();
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes;
}

export function getWeek(utcFormat, timezone) {
    let localDate = new Date(utcFormat * 1000);
    let localTime = new Date(localDate.getTime() + timezone * 1000);
   
    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayOfWeek = localTime.getUTCDay();

    return daysOfWeek[dayOfWeek];
}