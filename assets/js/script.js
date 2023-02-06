//element Variables
const searchBtnEl = $("#searchBtn");
const currWeatherEl = $("#currWeather");
const historyListEl = $("#historyList");
const searchBarEl = document.getElementById("searchBar");
const day1El = $("#day1");
const day2El = $("#day2");
const day3El = $("#day3");
const day4El = $("#day4");
const day5El = $("#day5");

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
//materialize init
M.AutoInit();

if (!localStorage.getItem("history")) {
  const tempStorage = [];
  localStorage.setItem("history", JSON.stringify(tempStorage));
}

function convertKelvinF(num) {
  //converts to degrees F and rounds
  return Math.round(((9 / 5) * (num - 273) + 32 + Number.EPSILON) * 100) / 100;
}

function buildUrl(type, name) {
  //api key
  const apiKey = "1cb5ab1c892661f75b5aa71453f49fd2";
  let workingUrl = "";
  if (type == "today") {
    workingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`;
  } else {
    workingUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}`;
  }
  return workingUrl;
}

function buildPageCurr(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //buildPageCurr(data);
      console.log("data, ", data);
      //console.log("response, ", response);
      const temp = convertKelvinF(data.main.temp);
      const wind = data.wind.speed;
      const rH = data.main.humidity;
      const weather = data.weather[0].icon;
      const date = new Date().toLocaleDateString();
      const name = data.name;

      console.log(temp, wind, rH, weather, date, name);

      //adding data
      currWeatherEl.html(
        `<h4>${name} (${date}) <img src="http://openweathermap.org/img/wn/${weather}@2x.png"></h4>
    <ul>
        <li>Temp: ${temp}°F</li>
        <hr>
        <li>Wind: ${wind} MPH</li>
        <hr>
        <li>Humidity: ${rH} %</li>
    </ul>`
      );
    });
}

function buildPageForecast(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("Forecast data, ", data);
      const dataHolder = [];

      let days = 1;

      for (let i = 0; i < data.list.length; i++) {
        const holder = data.list[i].dt_txt;
        const forecastDays = day + days;
        const forecastMonth = month + 1;
        const formattedDate =
          year +
          "-" +
          (forecastMonth < 10 ? "0" + forecastMonth : forecastMonth) +
          "-" +
          (forecastDays < 10 ? "0" + forecastDays : forecastDays);

        if (holder == `${formattedDate} 12:00:00`) {
          dataHolder.push({
            day: days,
            temp: convertKelvinF(data.list[i].main.temp),
            wind: data.list[i].wind.speed,
            rH: data.list[i].main.humidity,
            weather: data.list[i].weather[0].icon,
            date: `(${forecastMonth}/${forecastDays}/${year})`,
          });
          days++;
        }
      }
      //adding data
      day1El.html(`<ul>
      <li>Date: ${dataHolder[0].date}</li>
      <hr>
      <li><img src="http://openweathermap.org/img/wn/${dataHolder[0].weather}.png"></li>
      <hr>
      <li>Temp: ${dataHolder[0].temp}</li>
      <hr>
      <li>Wind: ${dataHolder[0].wind}</li>
      <hr>
      <li>Humidity: ${dataHolder[0].rH}</li>
  </ul>`);

      day2El.html(`<ul>
      <li>Date: ${dataHolder[1].date}</li>
      <hr>
      <li><img src="http://openweathermap.org/img/wn/${dataHolder[1].weather}.png"></li>
      <hr>
      <li>Temp: ${dataHolder[1].temp}</li>
      <hr>
      <li>Wind: ${dataHolder[1].wind}</li>
      <hr>
      <li>Humidity: ${dataHolder[1].rH}</li>
  </ul>`);

      day3El.html(`<ul>
      <li>Date: ${dataHolder[2].date}</li>
      <hr>
      <li><img src="http://openweathermap.org/img/wn/${dataHolder[2].weather}.png"></li>
      <hr>
      <li>Temp: ${dataHolder[2].temp}</li>
      <hr>
      <li>Wind: ${dataHolder[2].wind}</li>
      <hr>
      <li>Humidity: ${dataHolder[2].rH}</li>
  </ul>`);

      day4El.html(`<ul>
      <li>Date: ${dataHolder[3].date}</li>
      <hr>
      <li><img src="http://openweathermap.org/img/wn/${dataHolder[3].weather}.png"></li>
      <hr>
      <li>Temp: ${dataHolder[3].temp}</li>
      <hr>
      <li>Wind: ${dataHolder[3].wind}</li>
      <hr>
      <li>Humidity: ${dataHolder[3].rH}</li>
  </ul>`);

      day5El.html(`<ul>
      <li>Date: ${dataHolder[4].date}</li>
      <hr>
      <li><img src="http://openweathermap.org/img/wn/${dataHolder[4].weather}.png"></li>
      <hr>
      <li>Temp: ${dataHolder[4].temp}</li>
      <hr>
      <li>Wind: ${dataHolder[4].wind}</li>
      <hr>
      <li>Humidity: ${dataHolder[4].rH}</li>
  </ul>`);
    });
}

function buildHistory() {
  let storageArray = JSON.parse(localStorage.getItem("history"));
  for (let i = 0; i < storageArray.length; i++) {
    historyListEl.append(storageArray[i]);
  }
}

searchBtnEl.click(function () {
  console.log(searchBarEl.value);
  if (searchBarEl.value) {
    buildPageCurr(buildUrl("today", searchBarEl.value));
    buildPageForecast(buildUrl("Forecast", searchBarEl.value));
    let switcher = false;
    $(".historyBtn").each(function () {
      console.log($(this).text());
      if (searchBarEl.value.trim() == $(this).text().trim()) {
        switcher = true;
      }
    });
    if (!switcher) {
      historyListEl.append(`<a class="waves-effect waves-light btn grey darken-2 full-width historyBtn">${searchBarEl.value}</a>
    <hr>`);
      let storageArray = JSON.parse(localStorage.getItem("history"));
      storageArray.push(`<a class="waves-effect waves-light btn grey darken-2 full-width historyBtn">${searchBarEl.value}</a>
      <hr>`);
      localStorage.setItem("history", JSON.stringify(storageArray));
    }
  } else {
    console.log("No value");
  }
  console.log("clicked");
});

$(document).on("click", ".historyBtn", function () {
  console.log("clicked");
  buildPageCurr(buildUrl("today", $(this).text()));
  buildPageForecast(buildUrl("Forecast", $(this).text()));
});

buildHistory();
