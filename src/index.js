const API_KEY = "93b4145fb1475a05aa9038221f49e696";

const getWeatherData = async (name = "Odesa", countryCode = "UA") => {
  const cityData = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${name},_,${countryCode}&limit=5&appid=${API_KEY}`
  ).then((res) => res.json());

  const { lat, lon } = cityData[0];
  console.log(cityData);

  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=456&appid=${API_KEY}`
  ).then((res) => res.json());

  console.log(weatherData);
  return weatherData;
};

const renderMainCard = (data, searchValue = false) => {
  const tempElement = document.querySelector(
    ".main__weather-info-city-temperature"
  );
  const cityNameElement = document.querySelector(
    ".main__weather-info-city-name"
  );
  const windSpeedElement = document.querySelector(
    ".main__weather-info-city-wind"
  );
  const POPElement = document.querySelector(".main__weather-info-city-pop");
  const POPIcon = document.createElement("i");
  POPIcon.classList.add("main__weather-info-city-pop-i");

  tempElement.innerText = Math.ceil(data.list[0].main.temp) + "°";
  cityNameElement.innerText = searchValue
    ? checkingCityName(searchPanel.value.split(",")[0], data.city.name)
    : data.city.name;
  windSpeedElement.innerText = `Wind speed: ${data.list[0].wind.speed} m/s`;
  POPElement.innerText =
    "Probability of Rain: " + (data.list[0].pop * 100).toFixed(2);
  POPElement.appendChild(POPIcon);
};

const createSecondaryCard = (data) => {
  const fromattedData = fromatDataForSecondaryCard(data);
  console.log(fromattedData);

  const cardItem = document.createElement("div");
  cardItem.className = "main__cards-item sky-gradient-13";

  const cardIcon = document.createElement("img");
  cardIcon.className = "main__cards-item-icon";
  cardIcon.src = `./assets/images/${fromattedData.weatherIcon}`;

  const cardInfo = document.createElement("div");
  cardInfo.className = "main__cards-item-info";

  const cardDay = document.createElement("p");
  cardDay.className = "main__cards-item-day";
  cardDay.innerText = fromattedData.dayOfTheWeek;

  const cardTemp = document.createElement("p");
  cardTemp.className = "main__cards-item-temp";

  const cardTempMin = document.createElement("span");
  cardTempMin.className = "main__cards-item-temp min";
  cardTempMin.innerText = Math.ceil(fromattedData.minTemp) + "°";

  const cardTempMax = document.createElement("span");
  cardTempMax.className = "main__cards-item-temp max";
  cardTempMax.innerText = Math.ceil(fromattedData.maxTemp) + "°";

  cardTemp.append(cardTempMax, cardTempMin);
  cardInfo.append(cardDay, cardTemp);
  cardItem.append(cardIcon, cardInfo);

  return cardItem;
};

const renderSecondaryCards = (separatedData, secondRender = false) => {
  const cardWrapper = document.querySelector(".main__cards");

  if (secondRender) {
    cardWrapper.innerHTML = "";
  }

  if (separatedData.length > 0) {
    for (let i = 0; i < separatedData.length; i++) {
      const el = createSecondaryCard(separatedData[i]);

      el.id = `${el.classList[0]}-${i}`;

      cardWrapper.append(el);
    }
  }
};

const geoLocationSuccess = (position) => position;

const geoLocationError = (position) => {
  console.log("[Error] Access denied: " + position);
};

const search = async () => {
  let result;

  const [city, countryCode] = searchPanel.value.split(",");
  if (!countryCode) {
    alert("Please add country code after city name, and separate by comma");
    return null;
  }
  result = await getWeatherData(city, countryCode);

  renderMainCard(result, true);

  const separatedData = separateDataByDay(result.list);

  console.log(separatedData);

  renderSecondaryCards(separatedData, true);
};

window.onload = async function () {
  navigator.geolocation.getCurrentPosition(
    geoLocationSuccess,
    geoLocationError
  );
  const result = await getWeatherData();
  const geoLocationLabel = document.querySelector(".header__current-loc-text");
  geoLocationLabel.innerText = result.city.name;

  
  const separatedData = separateDataByDay(result.list);
  
  renderMainCard(result);
  console.log(separatedData);

  renderSecondaryCards(separatedData);
};

const searchPanel = document.getElementById("search");
const searchBtn = document.querySelector(".header__search-icon");

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  await search();
});

searchPanel.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    await search();
  }
});
