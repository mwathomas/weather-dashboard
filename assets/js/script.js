//variables
var searchCityEl = document.querySelector("#search-city");
var searchBtnEl = document.querySelector("#searchBtn");
var clearBtnEl = document.querySelector("#clearBtn");
var searchHistoryEl = document.querySelector("#search-history");
var cityNameEl = document.querySelector("#city-name");
var currentImgEl = document.querySelector("#current-img");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var f1El = document.querySelector("#forecast-date1");
var f2El = document.querySelector("#forecast-date2");
var f3El = document.querySelector("#forecast-date3");
var f1imgEl = document.querySelector("#forecast-img1");
var f2imgEl = document.querySelector("#forecast-img2");
var f3imgEl = document.querySelector("#forecast-img3");

//pull history from local storage
var searchHistory = JSON.parse(localStorage.getItem("allSearches"));
if (searchHistory == null) {
  searchHistory = [];
}
for (let i = 0; i < searchHistory.length; i++) {
  var item = searchHistory[i];
  var li = document.createElement("li");
  li.append(item);
  document.getElementById("search-history").appendChild(li);
}

//Add search terms to local storage
searchBtnEl.addEventListener("click", function () {
  var search = searchCityEl.value;
  var li = document.createElement("li");
  li.append(search);
  searchHistory.push(search);
  document.getElementById("search-history").appendChild(li);
  localStorage.setItem("allSearches", JSON.stringify(searchHistory));
  pullWeather(search);
});

//clear storage and list
clearBtnEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  document.getElementById("search-history").innerHTML = " ";
});

//define API key
var apiKey = "9bfb82636b9d55c38426ec2e78a9898f";

//pull in weather based on search
function pullWeather(city) {
  var URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  $.ajax({
    url: URL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var today = new Date(response.dt * 1000);
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    cityNameEl.innerHTML =
      response.name + " (" + month + "/" + day + "/" + year + ") ";
    tempEl.innerHTML =
      "Temperature: " + kelvinToFahrenheit(response.main.temp) + " F";
    humidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
    windEl.innerHTML = "Wind Speed: " + response.wind.speed + " mph";
    //find icon number to pull in image
    iconNumber = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconNumber + ".png";
    currentImgEl.setAttribute("src", iconurl);
    currentImgEl.setAttribute("alt", response.weather[0].description);
    //find city ID to pull in forecast url
    let cityID = response.id;
    let fiveDayURL =
      "https://api.openweathermap.org/data/2.5/forecast?id=" +
      cityID +
      "&appid=" +
      apiKey;
    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var tomorrow = new Date(response.list[2].dt * 1000);
      var oneday = tomorrow.getDate();
      var onemonth = tomorrow.getMonth() + 1;
      f1El.innerHTML = onemonth + "/" + oneday;
      iconNumber = response.list[0].weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconNumber + ".png";
      f1imgEl.setAttribute("src", iconurl);
      f1imgEl.setAttribute("alt", response.list[0].weather[0].description);
      var nextDay = new Date(response.list[16].dt * 1000);
      var day2 = nextDay.getDate();
      var month2 = nextDay.getMonth() + 1;
      f2El.innerHTML = month2 + "/" + day2;
      iconNumber2 = response.list[1].weather[0].icon;
      var iconurl2 = "http://openweathermap.org/img/w/" + iconNumber2 + ".png";
      f2imgEl.setAttribute("src", iconurl2);
      f2imgEl.setAttribute("alt", response.list[1].weather[0].description);
      var nextDay2 = new Date(response.list[22].dt * 1000);
      var day3 = nextDay2.getDate();
      var month3 = nextDay2.getMonth() + 1;
      f3El.innerHTML = month3 + "/" + day3;
      iconNumber2 = response.list[2].weather[0].icon;
      var iconurl2 = "http://openweathermap.org/img/w/" + iconNumber2 + ".png";
      f3imgEl.setAttribute("src", iconurl2);
      f3imgEl.setAttribute("alt", response.list[2].weather[0].description);
    });
    //return response.json();
  });
}

var kelvinToFahrenheit = (kelvin) => Math.floor((kelvin - 273) * 1.8 - 32);
