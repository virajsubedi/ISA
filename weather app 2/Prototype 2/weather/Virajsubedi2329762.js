/* selecting elements from heml using different query selectors
and storing them to respective variables */
let inputValue = document.getElementById("searchbar");
let city = document.querySelector(".name");
let temp = document.querySelector(".temp");
let windSpeed = document.querySelector(".wind");
let humiditydisplay = document.querySelector(".humm");
let weathercondition = document.getElementById("rain");
let button = document.getElementById("submitb");
let icon = document.getElementById("icon");
let date = document.getElementById("date");
let press = document.getElementById("pressure");
let direction = document.getElementById("direction");

/* defining function to get weather data from api 
and change the values in HTML */
function gettingWeather() {
  fetch("http://localhost/demo/Prototype%202/makingapi.php")
    /* the response from the fetched api is returned in json
  format and stored in data, then it is extracted and 
  HTML elements are changed so on */
    .then((response) => response.json())
    .then((data) => {
      const {
        Name,
        temperature,
        pressure,
        humidity,
        wind_speed,
        wind_deg,
        dt,
        weather_description,
        icon,
      } = data;

      // changing HTML elements with refrence to data from database
      icon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      city.innerHTML = Name;
      temp.innerHTML = temperature + "° C";
      humiditydisplay.innerHTML = "Humidity : " + humidity + " %";
      windSpeed.innerHTML = "Wind speed : " + wind_speed + " m/s";
      direction.innerHTML = "Wind Direction : " + wind_deg + "°";
      weathercondition.innerHTML = weather_description;
      press.innerHTML = "Pressure :" + pressure + " hPa";
      let d = new Date(dt * 1000);
      date.innerHTML = d.toDateString();
      inputValue.value = "";
    });
}

/* initial value is set for south lanarkshire by calling gettingWeather
with value south lanarkshire */
gettingWeather();

/* this is for search button to be clicked which will call
the gettingWeather function with value from search bar */
button.addEventListener("click", function (name) {
  gettingWeather(inputValue.value);
});

/* this is for "Enter" key is pressed while you are in search
bar. This will also call gettingWeather function with value 
from search bar as parameter" */
inputValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    gettingWeather(inputValue.value);
  }
});
