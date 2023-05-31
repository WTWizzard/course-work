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

const checkingCityName = (searchValue = "", responseValue) => {
  let result;

  if (searchValue.toLocaleLowerCase() === responseValue.toLocaleLowerCase()) {
    result = responseValue;
    return result;
  }
  let lowerCaseValue = searchValue.toLowerCase();
  let firstLetter = lowerCaseValue.charAt(0);
  result = lowerCaseValue.replace(firstLetter, firstLetter.toUpperCase());

  return result;
};

const separateDataByDay = (data) => {
  let currentDate = new Date().getDate();

  const tempArray = [];

  const separated = data.reduce((acc, curr) => {
    let date = new Date(curr.dt_txt);

    if (date.getDate() === currentDate) {
      tempArray.push(curr);
    } else {
      acc.push([...tempArray]);
      currentDate = date.getDate();
      tempArray.splice(0, tempArray.length);
      return acc;
    }
    return acc;
  }, []);

  return separated;
};

const render = (data, searchValue = false) => {
  const tempElement = document.querySelector(".main__weather-info-city-temperature");
  const cityNameElement = document.querySelector(".main__weather-info-city-name");
  const windSpeedElement = document.querySelector(".main__weather-info-city-wind");
  const POPElement = document.querySelector(".main__weather-info-city-pop");
  const POPIcon = document.createElement("i");
  POPIcon.classList.add("main__weather-info-city-pop-i");

  tempElement.innerText = Math.ceil(data.list[0].main.temp);
  cityNameElement.innerText = searchValue ? checkingCityName(searchPanel.value.split(",")[0], data.city.name) : data.city.name;
  windSpeedElement.innerText = `Wind speed: ${data.list[0].wind.speed} m/s`;
  POPElement.innerText = "Probability of Rain: " + (data.list[0].pop * 100).toFixed(2);
  POPElement.appendChild(POPIcon);
};

const geoLocationSuccess = (position) => position;

const geoLocationError = (position) => {
  console.log("[Error] Access denied: " + position);
};

const search = async (onload = false) => {
  let result;

  if (onload) {
    result = await getWeatherData();
  } else {
    const [city, countryCode] = searchPanel.value.split(",");
    if (!countryCode) {
      alert("Please add country code after city name, and separate by comma");
      return null;
    }
    result = await getWeatherData(city, countryCode);
  }

  render(result, true);
};

window.onload = async function () {
  navigator.geolocation.getCurrentPosition(
    geoLocationSuccess,
    geoLocationError
  );
  const result = await getWeatherData();
  const geoLocationLabel = document.querySelector(".header__current-loc-text");
  geoLocationLabel.innerText = result.city.name;

  render(result);
   
  const separatedData = separateDataByDay(result.list)

  console.log(separatedData);
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
