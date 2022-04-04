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
            console.log(geoData)
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
    let s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

function getHoursString(dateTime) {
    let date = new Date(dateTime);
    let hours = date.getHours().pad();

    return hours;
}

function getValueWithUnit(value, unit) {
    return `${value}${unit}`;
}

function getTemperature(value) {
    let roundedValue = value.toFixed();
    return getValueWithUnit(roundedValue, temperatureUnit);
}
function render(data){
    console.log(data)
    /*renderCurrentTemperature(data);
    renderCurrentDescription(data);

    renderForecast(data);
    renderDetails(data);*/
}
/*function renderCurrentTemperature(data) {
    let tmp = data.list[0].main.temp;

    let currentTmp = document.querySelector('.current__temperature');
    currentTmp.innerHTML = getTemperature(tmp);
}

function renderCurrentDescription(data) {
    let tmp = data.list[0].weather[0].description;

    let description = document.querySelector('.current__description');
    description.innerHTML = tmp;
}

function renderForecast(data) {
    let forecastDataContainer = document.querySelector('.forecast');
    let forecasts = '';

    for (let i = 0; i < 6; i++) {
    let item = data.list[i];

    let icon = item.weather[0].icon;
    let temp = getTemperature(item.main.temp);
      let hours = ( i == 0 ? 'Сейчас' : getHoursString(item.dt * 1000));

    let template = `<div class="forecast__item">
        <div class="forecast__time">${hours}</div>
        <div class="forecast__icon icon__${icon}"></div>
        <div class="forecast__temperature">${temp}</div>
    </div>`;
    forecasts += template;
    }
    forecastDataContainer.innerHTML = forecasts;
}

function renderDetails(data) {
    let item = data.list[0];
    let pressureValue = convertPressure(item.main.pressure);
    let pressure = getValueWithUnit(pressureValue, pressureUnit);
    let humidity = getValueWithUnit(item.main.humidity, humidityUnit);
    let feels_like = getTemperature(item.main.feels_like);
    let wind = getValueWithUnit(item.wind.speed, windUnit);
    renderDetailsItem('feelslike', feels_like);
    renderDetailsItem('humidity', humidity);
    renderDetailsItem('pressure', pressure);
    renderDetailsItem('wind', wind);
}

function renderDetailsItem(className, value) {
    let container = document.querySelector(`.${className}`).querySelector('.details__value');
    container.innerHTML = value;
}

function isDay(data) {
    let sunrise = data.city.sunrise * 1000;
    let sunset = data.city.sunset * 1000;

    let now = Date.now();
    return (now > sunrise && now < sunset);
}*/




