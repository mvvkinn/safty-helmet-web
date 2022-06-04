var options_temp = {
  type: "line",
  data: {
    labels: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
    ],
    datasets: [
      {
        label: "Temperatures",
        data: [],
        backgroundColor: "rgba(113, 254, 141, 0.4)",
        borderColor: "rgba(113, 254, 141)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
var ctx = document.getElementById("graph").getContext("2d");
var graph = Chart.Line(ctx, options_temp);
var options_temp = {
  label: "Temperature",
  data: [],
  backgroundColor: "rgba(113, 254, 141, 0.4)",
  borderColor: "rgba(113, 254, 141)",
  borderWidth: 1,
};
var options_hum = {
  label: "Humidity",
  data: [],
  backgroundColor: "rgba(81, 141, 220, 0.4)",
  borderColor: "rgba(81, 141, 220)",
  borderWidth: 1,
};
var options_light = {
  label: "Lightness",
  data: [],
  backgroundColor: "rgba(255, 255, 154, 0.4)",
  borderColor: "rgba(255, 255, 154)",
  borderWidth: 1,
};
function insertDataOnChart(chart_data, new_data) {
  chart_data.data.push(new_data); // insert value last on array
  if (chart_data.data.length >= 26) {
    chart_data.data.shift();
  }
}

function changeData(chart, data) {
  var new_data = data.data;

  chart.data.datasets.push(data);
  chart.update();
}
function removeData(chart, data) {
  chart.data.datasets.pop({
    data: data,
  });
  chart.update();
}

function viewTemp() {
  removeData(graph);
  changeData(graph, options_temp);
}

function viewHum() {
  removeData(graph);
  changeData(graph, options_hum);
}

function viewLight() {
  removeData(graph);
  changeData(graph, options_light);
}

viewTemp();
