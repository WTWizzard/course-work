const API_KEY = "93b4145fb1475a05aa9038221f49e696";

const coordinates = [];

const getLocationByName = async (name, countryCode) => {
  // const coordinates = [];
  await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${name},_,${countryCode}&limit=5&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      console.log(new Date(data.dt))
    });
  // return coordinates;
};


getLocationByName("Chisinau","MD");

const getWeather = async (lat, lon) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&cnt=4&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });

};

// coordinates.push(getLocationByName("Одеса", "UA"));

// console.log(coordinates);

getWeather(47.0245117, 28.8322923);
