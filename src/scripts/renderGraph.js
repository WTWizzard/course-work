const createGraph = (data) => {
  const graph = document.createElement("div");
  graph.className = "graph-item";

  graph.setAttribute("data-time", splitTime(data.dt_txt));
  graph.setAttribute("data-temp", Math.ceil(data.main.temp) + "°");

  graph.style.height = Math.ceil(data.main.temp * 5).toString() + "px";

  return graph;
};

const renderGraph = (timestapms, secondRender = false) => {
  const graphWrapper = document.querySelector(".main__weather-time-graph");

  if (secondRender) {
    graphWrapper.innerHTML = "";
  }

  if (timestapms.length > 0) {
    for (let i = 0; i < timestapms.length; i++) {
      const el = createGraph(timestapms[i]);

      el.id = `${el.className}-${i}`;

      graphWrapper.append(el);
    }
  }
};
