var APPID = "e264b763ffeae672c7f18a64df71a46c";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip){
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID +
    "&units=imperial";
    sendRequest(url);
}

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  //Below: When this request receives a response, we want to perform an action.
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var data = JSON.parse(xmlhttp.responseText); //Converts the data that has been fetched from a string to a JavaScript object.
      var weather = {};
      weather.icon = data.weather[0].id; //0 means we are focusing on the location at the 0th index of the weather array that we got back from the JSON info.
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.direction = data.wind.deg;
      weather.loc = data.name;
      weather.temp = data.main.temp;
      update(weather);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function update(weather){
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "images/codes/" + weather.icon +".png";
}

window.onload = function  () {
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

  updateByZip(94720);

}
