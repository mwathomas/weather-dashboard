var searchCityEl = document.querySelector("#search-city");
var searchBtnEl = document.querySelector("#searchBtn");
var clearBtnEl = document.querySelector("#clearBtn");
var searchHistoryEl = document.querySelector("#search-history");
var cityNameEl = document.querySelector("#city-name");
var currentImgEl = document.querySelector("#current-img");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");
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
});

clearBtnEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  document.getElementById("search-history").innerHTML = " ";
});
