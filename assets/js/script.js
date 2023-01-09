//element Variables
const searchBtnEl = $('#searchBtn');
const day1El = $('#day1');
const day2El = $('#day2');
const day3El = $('#day3');
const day4El = $('#day4');
const day5El = $('#day5');
//materialize init
M.AutoInit();

function buildUrl(lat, lon){
    //api key
    const apiKey = '1cb5ab1c892661f75b5aa71453f49fd2';
    const workingUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    return workingUrl;
}
//api Fetch request
function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }

testBtnEl.click(function() {
    let requestURL = buildUrl(44.3,10.99);
    getApi(requestURL);
    console.log(requestURL);
    console.log('clicked');
  });