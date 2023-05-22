const API_KEY = "93b4145fb1475a05aa9038221f49e696";

const getWeatherData = async (name = "Odessa", countryCode = "UA") => {
  const cityData = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${name},_,${countryCode}&limit=5&appid=${API_KEY}`
  ).then((res) => res.json());

  const { lat, lon } = cityData[0];
  console.log(cityData);

  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=456&appid=${API_KEY}`
  ).then(res => res.json());


  console.log(weatherData);
  return weatherData
};


window.onload = async function () {
  const result = await getWeatherData();
  const tempElement = document.querySelector(".main__wather-info-city-temperature");
  const cityNameElement = document.querySelector(".main__wather-info-city-name")

  cityNameElement.innerText = result.city.name;
  tempElement.innerText = Math.ceil(result.list[0].main.temp);
}

const searchPanel = document.getElementById("search")
const searchBtn = document.querySelector('.header__search-icon');

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault()
  const result = await getWeatherData(searchPanel.value, "IE");

  const tempElement = document.querySelector(".main__wather-info-city-temperature");
  const cityNameElement = document.querySelector(".main__wather-info-city-name")

  cityNameElement.innerText = result.city.name;
  tempElement.innerText = Math.ceil(result.list[0].main.temp);
})
