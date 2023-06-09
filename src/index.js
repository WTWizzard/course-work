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

const renderMainCard = (data, searchValue = false, city) => {
  const isDay = checkIsThisDay(city, data[0]);

  const imageName = selectIconByDescription(data[0].weather[0]);

  const mainIcon = document.querySelector(".main__weather-icon");
  mainIcon.setAttribute("width", "300px");
  mainIcon.setAttribute("height", "300px");
  mainIcon.setAttribute(
    "src",
    `./assets/images/${
      isDay || imageName === "mist.svg" || imageName === "dust.svg"
        ? imageName
        : "n-" + imageName
    }`
  );

  const timeElement = document.querySelector(".main__weather-info-time");

  const tempElement = document.querySelector(
    ".main__weather-info-city-temperature"
  );
  const cityNameElement = document.querySelector(
    ".main__weather-info-city-name"
  );
  const windSpeedElement = document.querySelector(
    ".main__weather-info-city-wind"
  );
  const humidityElement = document.querySelector(
    ".main__weather-info-city-humidity"
  );
  const sunriseTime = document.querySelector(".sunrise-time");
  const sunsetTime = document.querySelector(".sunset-time");
  const POPElement = document.querySelector(".main__weather-info-city-pop");
  const POPIcon = document.createElement("i");
  POPIcon.classList.add("main__weather-info-city-pop-i");

  sunriseTime.innerText = splitTime(city.sunrise);
  sunsetTime.innerText = splitTime(city.sunset);

  timeElement.innerText = new Date(data[0].dt_txt).toString().slice(0,21);
  tempElement.innerText = Math.ceil(data[0].main.temp) + "°";
  cityNameElement.innerText = searchValue
    ? checkingCityName(searchPanel.value.split(",")[0], city.name)
    : city.name;
  windSpeedElement.innerText = `Wind speed: ${data[0].wind.speed} m/s`;
  humidityElement.innerText = `Humidity level: ${data[0].main.humidity} %`;
  POPElement.innerText =
    "Probability of Rain: " + (data[0].pop * 100).toFixed(2);
  POPElement.appendChild(POPIcon);

  console.log("render");
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

const search = async () => {
  let result;

  const [city, countryCode] = searchPanel.value.split(",");
  if (!countryCode) {
    alert("Please add country code after city name, and separate by comma");
    return null;
  }
  result = await getWeatherData(city, countryCode);

  const separatedData = separateDataByDay(result.list);

  renderMainCard(separatedData[0], true, result.city);

  console.log(separatedData);

  renderSecondaryCards(separatedData, true);

  const cardItems = document.querySelectorAll(".main__cards-item");

  cardItems.forEach((element, index) => {
    element.addEventListener("click", () => {
      renderMainCard(separatedData[index], true, result.city);
    });
  });
};

window.onload = async function () {
  const result = await getWeatherData();

  const separatedData = separateDataByDay(result.list);

  renderMainCard(separatedData[0], false, result.city);
  console.log(separatedData);

  renderSecondaryCards(separatedData);

  const cardItems = document.querySelectorAll(".main__cards-item");

  cardItems.forEach((element, index) => {
    element.addEventListener("click", () => {
      renderMainCard(separatedData[index], false, result.city);
    });
  });
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
