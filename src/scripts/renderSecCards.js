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
