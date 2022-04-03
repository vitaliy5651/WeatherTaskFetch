async function getCities(){
const response = await fetch('https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json')
if (response.ok) {
    let data = response.json();
    return data
} else {
    alert('error', response.status);
}
}
getCities()
.then((data) => {function useCities(data){
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
    console.log(arr2)

}
useCities(data)
}).then


