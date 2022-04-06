const key = `b4fcb56fc30708abf229fd19347e305f`
const url = `https://api.openweathermap.org/data/2.5/onecall`
const temperatureUnit = '˚';
const humidityUnit = ' %';
const pressureUnit = ' мм. рт. ст.';
const windUnit = ' м/с';

async function getCities(){
const response = await fetch('https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json')
if (response.ok) {
    let data = response.json();
    return data
} else {
    alert('error', response.status);
}
}
getCities().then(function useCities(data){
    const cities = data[0]
    const arr = Object.values(cities).flat()
    let res = [];
    for(let i = 0; i<arr.length; i++){
        if(typeof(arr[i]) === 'object'){
            for(let key of Object.keys(arr[i])){
                if(key === 'cities'){
                    res.push(Object.values(arr[i].cities))
                }
            }
        }
    }
    const arr2 = res.flat()
    return arr2
}).then( function getGeo(arr2){
        const city = document.querySelector('#city')
        const cityName = document.querySelector('.current__city')
        let names =[]
        for(e in arr2){
            names.push(arr2[e].name)
        }
        names.sort()
        for(let i = 0; i < names.length; i++){
            city.add(new Option(names[i]))
        }
        city.addEventListener('change', function (){
            let geoData = []
            geoData.length = 0;
            for(let el of arr2){
                if(this.value === el.name){
                    cityName.innerHTML = el.name
                    geoData.push(el.lat, el.lng)
                    getWeather(geoData)
                }
            }
        })
    }
)
async function getWeather(geoData){
    const geo =`?lat=${geoData[0]}&lon=${geoData[1]}&exclude=hourly,minutely&appid=${key}`
    const response = await fetch(url+geo)
    if(response.ok){
        let data = await response.json()
        render(data)
    }else{
        console.log('error', response.status)
    }
}

function convertPressure(value) {
    return (value/1.33 ).toFixed();
}
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}
function getDateString(dateTime) {
    let date = new Date(dateTime);
    let day = date.getDate().pad();
    let m = date.getMonth() + 1;
    let month = m.pad()
    let res = day + '.' + month
    return res;
}

function getValueWithUnit(value, unit) {
    return `${value}${unit}`;
}

function getTemperature(value) {
    let roundedValue = value.toFixed() - 273;
    return getValueWithUnit(roundedValue, temperatureUnit);
}
function render(data){
    currentDay(data)
    dayTwo(data)
    dayThree(data)
    dayFour(data)
    dayFive(data)
}

function currentDay(data){
    let forecastDataContainer = document.querySelector('.weather__day1');
    let forecasts = '';
    const arr = data.daily[0]
    let tmp = getTemperature(arr.temp.eve)
    let description = arr.weather[0].main
    switch (description) {
        case 'Clear sky':
            description = 'Чистое небо'
        break;
        case 'Few clouds':
            description = 'Несколько облаков'
        break;
        case 'Scattered clouds':
            description = 'Рассеянные облака'
        break;
        case 'Broken clouds':
            description = 'Разбитые облака'
        break;
        case 'Shower rain':
            description = 'Ливень'
        break;
        case 'Rain':
            description = 'Дождь'
        break;
        case 'Thunderstorm':
            description = 'Гроза'
        break;
        case 'Snow':
            description = 'Снег'
        break;
        case 'Mist':
            description = 'Туман'
        break;
        case 'Clouds':
            description = 'Облачно'
        break;
    }
    let icon = arr.weather[0].icon
    let feels_like = getTemperature(arr.feels_like.eve) 
    let pressureValue = convertPressure(arr.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(arr.humidity, humidityUnit);
    let wind = getValueWithUnit(arr.wind_speed, windUnit);
    let div = `<div class="day">Сегодня</div>
<div class="current__description">${description}</div>
<div class="current__temperature">${tmp}</div>
<div class="current__icon icon__${icon}"></div>
<div class="details">
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">ощущается как</div>
            <div class="details__value">${feels_like}</div>
        </div>
        <div class="details__item">
            <div class="details__name">давление</div>
            <div class="details__value">${pressure}</div>
        </div>
    </div>
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">влажность</div>
            <div class="details__value">${humidity}</div>
        </div>
        <div class="details__item">
            <div class="details__name">ветер</div>
            <div class="details__value">${wind}</div>
        </div>
    </div>
</div>`;
forecasts += div;
forecastDataContainer.innerHTML = forecasts;
}

function dayTwo(data){
    let forecastDataContainer = document.querySelector('.weather__day2');
    let dayTwo = '';
    const arr = data.daily[1]
    let tmp = getTemperature(arr.temp.eve)
    let description = arr.weather[0].main
    switch (description) {
        case 'Clear sky':
            description = 'Чистое небо'
        break;
        case 'Few clouds':
            description = 'Несколько облаков'
        break;
        case 'Scattered clouds':
            description = 'Рассеянные облака'
        break;
        case 'Broken clouds':
            description = 'Разбитые облака'
        break;
        case 'Clouds':
            description = 'Облачно'
        break;
        case 'Shower rain':
            description = 'Ливень'
        break;
        case 'Rain':
            description = 'Дождь'
        break;
        case 'Thunderstorm':
            description = 'Гроза'
        break;
        case 'Snow':
            description = 'Снег'
        break;
        case 'Mist':
            description = 'Туман'
        break;
    }
    let date = getDateString(arr.dt * 1000)
    let icon = arr.weather[0].icon
    let feels_like = getTemperature(arr.feels_like.eve) 
    let pressureValue = convertPressure(arr.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(arr.humidity, humidityUnit);
    let wind = getValueWithUnit(arr.wind_speed, windUnit);
    let div2 = `<div class="day">${date}</div>
<div class="current__description">${description}</div>
<div class="current__temperature">${tmp}</div>
<div class="current__icon icon__${icon}"></div>
<div class="details">
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">ощущается как</div>
            <div class="details__value">${feels_like}</div>
        </div>
        <div class="details__item">
            <div class="details__name">давление</div>
            <div class="details__value">${pressure}</div>
        </div>
    </div>
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">влажность</div>
            <div class="details__value">${humidity}</div>
        </div>
        <div class="details__item">
            <div class="details__name">ветер</div>
            <div class="details__value">${wind}</div>
        </div>
    </div>
</div>`;
dayTwo += div2;
forecastDataContainer.innerHTML = dayTwo;
}

function dayThree(data){
    let forecastDataContainer = document.querySelector('.weather__day3');
    let dayThree = '';
    const arr = data.daily[2]
    let tmp = getTemperature(arr.temp.eve)
    let description = arr.weather[0].main
    switch (description) {
        case 'Clear sky':
            description = 'Чистое небо'
        break;
        case 'Few clouds':
            description = 'Несколько облаков'
        break;
        case 'Scattered clouds':
            description = 'Рассеянные облака'
        break;
        case 'Broken clouds':
            description = 'Разбитые облака'
        break;
        case 'Clouds':
            description = 'Облачно'
        break;
        case 'Shower rain':
            description = 'Ливень'
        break;
        case 'Rain':
            description = 'Дождь'
        break;
        case 'Thunderstorm':
            description = 'Гроза'
        break;
        case 'Snow':
            description = 'Снег'
        break;
        case 'Mist':
            description = 'Туман'
        break;
    }
    let date = getDateString(arr.dt * 1000)
    let icon = arr.weather[0].icon
    let feels_like = getTemperature(arr.feels_like.eve) 
    let pressureValue = convertPressure(arr.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(arr.humidity, humidityUnit);
    let wind = getValueWithUnit(arr.wind_speed, windUnit);
    let div3 = `<div class="day">${date}</div>
<div class="current__description">${description}</div>
<div class="current__temperature">${tmp}</div>
<div class="current__icon icon__${icon}"></div>
<div class="details">
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">ощущается как</div>
            <div class="details__value">${feels_like}</div>
        </div>
        <div class="details__item">
            <div class="details__name">давление</div>
            <div class="details__value">${pressure}</div>
        </div>
    </div>
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">влажность</div>
            <div class="details__value">${humidity}</div>
        </div>
        <div class="details__item">
            <div class="details__name">ветер</div>
            <div class="details__value">${wind}</div>
        </div>
    </div>
</div>`;
dayThree += div3;
forecastDataContainer.innerHTML = dayThree;
}

function dayFour(data){
    let forecastDataContainer = document.querySelector('.weather__day4');
    let dayFour = '';
    const arr = data.daily[3]
    let tmp = getTemperature(arr.temp.eve)
    let description = arr.weather[0].main
    switch (description) {
        case 'Clear sky':
            description = 'Чистое небо'
        break;
        case 'Few clouds':
            description = 'Несколько облаков'
        break;
        case 'Scattered clouds':
            description = 'Рассеянные облака'
        break;
        case 'Broken clouds':
            description = 'Разбитые облака'
        break;
        case 'Clouds':
            description = 'Облачно'
        break;
        case 'Shower rain':
            description = 'Ливень'
        break;
        case 'Rain':
            description = 'Дождь'
        break;
        case 'Thunderstorm':
            description = 'Гроза'
        break;
        case 'Snow':
            description = 'Снег'
        break;
        case 'Mist':
            description = 'Туман'
        break;
    }
    let date = getDateString(arr.dt * 1000)
    let icon = arr.weather[0].icon
    let feels_like = getTemperature(arr.feels_like.eve) 
    let pressureValue = convertPressure(arr.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(arr.humidity, humidityUnit);
    let wind = getValueWithUnit(arr.wind_speed, windUnit);
    let div4 = `<div class="day">${date}</div>
<div class="current__description">${description}</div>
<div class="current__temperature">${tmp}</div>
<div class="current__icon icon__${icon}"></div>
<div class="details">
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">ощущается как</div>
            <div class="details__value">${feels_like}</div>
        </div>
        <div class="details__item">
            <div class="details__name">давление</div>
            <div class="details__value">${pressure}</div>
        </div>
    </div>
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">влажность</div>
            <div class="details__value">${humidity}</div>
        </div>
        <div class="details__item">
            <div class="details__name">ветер</div>
            <div class="details__value">${wind}</div>
        </div>
    </div>
</div>`;
dayFour += div4;
forecastDataContainer.innerHTML = dayFour;
}

function dayFive(data){
    let forecastDataContainer = document.querySelector('.weather__day5');
    let dayFive = '';
    const arr = data.daily[4]
    let tmp = getTemperature(arr.temp.eve)
    let description = arr.weather[0].main
    switch (description) {
        case 'Clear sky':
            description = 'Чистое небо'
        break;
        case 'Few clouds':
            description = 'Несколько облаков'
        break;
        case 'Scattered clouds':
            description = 'Рассеянные облака'
        break;
        case 'Broken clouds':
            description = 'Разбитые облака'
        break;
        case 'Clouds':
            description = 'Облачно'
        break;
        case 'Shower rain':
            description = 'Ливень'
        break;
        case 'Rain':
            description = 'Дождь'
        break;
        case 'Thunderstorm':
            description = 'Гроза'
        break;
        case 'Snow':
            description = 'Снег'
        break;
        case 'Mist':
            description = 'Туман'
        break;
    }
    let date = getDateString(arr.dt * 1000)
    let icon = arr.weather[0].icon
    let feels_like = getTemperature(arr.feels_like.eve) 
    let pressureValue = convertPressure(arr.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(arr.humidity, humidityUnit);
    let wind = getValueWithUnit(arr.wind_speed, windUnit);
    let div5 = `<div class="day">${date}</div>
<div class="current__description">${description}</div>
<div class="current__temperature">${tmp}</div>
<div class="current__icon icon__${icon}"></div>
<div class="details">
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">ощущается как</div>
            <div class="details__value">${feels_like}</div>
        </div>
        <div class="details__item">
            <div class="details__name">давление</div>
            <div class="details__value">${pressure}</div>
        </div>
    </div>
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">влажность</div>
            <div class="details__value">${humidity}</div>
        </div>
        <div class="details__item">
            <div class="details__name">ветер</div>
            <div class="details__value">${wind}</div>
        </div>
    </div>
</div>`;
dayFive += div5;
forecastDataContainer.innerHTML = dayFive;
}




