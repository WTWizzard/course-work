const findMostFrequentElement = (arr) => {
  let occurrences = {};
  // Iterate through the array and count the occurrences
  arr.forEach((obj) => {
    let weather = obj.weather[0];

    if (occurrences[weather.main]) {
      occurrences[weather.main].count++;
    } else {
      occurrences[weather.main] = {
        count: 1,
        weather: weather,
      };
    }
  });

  let maxElement = null;
  let maxCount = 0;
  // Iterate through the occurrences object to find the element with the highest occurrence
  for (let element in occurrences) {
    if (occurrences[element].count > maxCount) {
      maxCount = occurrences[element].count;
      maxElement = occurrences[element].weather;
    }
  }

  return maxElement;
};

const fromattedDataForSecondaryCard = (data) => {
  const temperatureArray = data.map((item) => item.main.temp);
  const date = new Date(data[0].dt_txt);

  const minTemp = Math.min(...temperatureArray);
  const maxTemp = Math.max(...temperatureArray);
  const mainWeatherOfTheDay = findMostFrequentElement(data);
  const dayOfTheWeek = date.toString().split(" ")[0];

  return {
    dayOfTheWeek,
    mainWeatherOfTheDay,
    maxTemp,
    minTemp,
  };
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
