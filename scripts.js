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

function getHoursString(dateTime) {
    let date = new Date(dateTime);
    let hours = date.getHours().pad();

    return hours;
}

function getValueWithUnit(value, unit) {
    return `${value}${unit}`;
}

function getTemperature(value) {
    let roundedValue = value.toFixed() - 273;
    return getValueWithUnit(roundedValue, temperatureUnit);
}
function render(data){
    console.log(data)
    currentDay(data)
    //renderCurrentDescription(data);

    //renderForecast(data);
    //renderDetails(data);
}

function currentDay(data){
    const arr = data.daily[0]
    console.log(arr)
    let tmp = getTemperature(arr.temp.eve)
    let description = arr.weather[0].description
    let icon = arr.weather[0].icon
    let feels_like = getTemperature(arr.feels_like.eve) 
    let pressureValue
    let div = `<div class="weather__day">
<div class="day">Сегодня</div>
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
            <div class="details__value">766 мм. рт. ст.</div>
        </div>
    </div>
    <div class="details__row">
        <div class="details__item">
            <div class="details__name">влажность</div>
            <div class="details__value">50%</div>
        </div>
        <div class="details__item">
            <div class="details__name">ветер</div>
            <div class="details__value">5 м/c</div>
        </div>
    </div>
</div>
</div>`
}




