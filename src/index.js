const API_KEY = "93b4145fb1475a05aa9038221f49e696";

const getWeatherData = async (name, countryCode) => {
  const cityData = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${name},_,${countryCode}&limit=5&appid=${API_KEY}`
  ).then((res) => res.json());

  const { lat, lon } = cityData[0];

  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&cnt=4&appid=${API_KEY}`
  ).then(res => res.json());

  return weatherData
};
