const API_KEY = "93b4145fb1475a05aa9038221f49e696";

const getWeatherData = async (name = "Odesa", countryCode = "UA") => {
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


const search = async () => {
  const result = await getWeatherData(searchPanel.value, "UA");

    const tempElement = document.querySelector(".main__wather-info-city-temperature");
    const cityNameElement = document.querySelector(".main__wather-info-city-name");
    const windSpeedElement = document.querySelector(".main__weather-info-city-wind");
    const POPElement = document.querySelector(".main__wather-info-city-pop");
    
    cityNameElement.innerText = result.city.name;
    tempElement.innerText = Math.ceil(result.list[0].main.temp);
    windSpeedElement.innerText = `Wind speed: ${result.list[0].wind.speed} m/s`;
    POPElement.innerText = result.list[0].pop * 100;
}

window.onload = async function () {
  const result = await getWeatherData();
  const tempElement = document.querySelector(".main__wather-info-city-temperature");
  const cityNameElement = document.querySelector(".main__wather-info-city-name");

  const POPIcon = document.createElement("i");
  POPIcon.classList.add("main__weather-info-city-pop-i");

  const POPElement = document.querySelector(".main__wather-info-city-pop");
  POPElement.innerText = result.list[0].pop * 100;
  POPElement.appendChild(POPIcon);

  const windSpeedElement = document.querySelector(".main__weather-info-city-wind");
  windSpeedElement.innerText = `Wind speed: ${result.list[0].wind.speed} m/s`;

  cityNameElement.innerText = result.city.name;
  tempElement.innerText = Math.ceil(result.list[0].main.temp);

}

const searchPanel = document.getElementById("search")
const searchBtn = document.querySelector('.header__search-icon');

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault()
  await search();
});

searchPanel.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    await search();
  }
})
