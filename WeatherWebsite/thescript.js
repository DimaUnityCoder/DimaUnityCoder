var inputval = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var sunrise = document.querySelector('#sunrise');
var sunset = document.querySelector('#sunset');

var picture = document.getElementById("image");


apik = "3045dd712ffe6e702e3245525ac7fa38"

//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.



function convertion(val) {
    return (val - 273).toFixed(2)
}

//converts unix time to time because openweather decided to use unix for some reason
function unixConv(val) {
    var date = new Date(val * 1000);
    var hour = '0' + date.getHours();
    var min = '0' + date.getMinutes();

    var time = hour.slice(-2) + ':' + min.slice(-2)
    return time;

}
//Now we have to collect all the information with the help of fetch method

inputval.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getAndSetWeatherData();
    }
});

function getAndSetWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputval.value + '&appid=' + apik)
    .then(res => res.json())

    //.then(data => console.log(data))

    .then(data => {

        //Now you need to collect the necessary information with the API link. Now I will collect that information and store it in different constants.

        var nameval = data['name']
        var descrip = data['weather']['0']['description']
        var tempature = data['main']['temp']
        var wndspd = data['wind']['speed']
        var sunriseval = data['sys']['sunrise']
        var sunsetval = data['sys']['sunset']
        var weathericon = data['weather']['0']['icon'].slice(-3)
         //Now with the help of innerHTML you have to make arrangements to display all the information in the webpage.
        console.log(weathericon)
        city.innerHTML = `Weather of <span>${nameval}<span>`
        temp.innerHTML = `Temperature: <span>${convertion(tempature)} C</span>`
        description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
        wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`
        sunrise.innerHTML = `Sunrise at: <span>${unixConv(sunriseval)}<span>`
        sunset.innerHTML = `Sunset at: <span>${unixConv(sunsetval)}<span>`
        document.getElementById("image").src = `https://openweathermap.org/img/wn/${weathericon}@2x.png`;
        
        //             https://openweathermap.org/img/wn/${weathericon}@2x.png
        console.log(data['weather'])
        console.log(data)


    })

    //Now the condition must be added that what if you do not input anything in the input box.
    .catch(err => alert("That's not a city name"))
}

btn.addEventListener('click', function () {

    //This is the api link from where all the information will be collected
    
    getAndSetWeatherData();
    

})