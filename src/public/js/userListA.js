var socket = io();

socket.on("helmetMsg", data => {
  const sensor = data.sensor;
  setListValues(sensor);
  socketCallback(sensor);
});

function setListValues(data) {
  setText(`${data.dht.temp}ºC`, "#user_temp");
  setText(`${data.dht.humid}%`, "#user_humid");
  setText(`${data.photoresistor}lx`, "#user_lightness");
}

function setText(string, element) {
  const target_element = $(element);

  target_element.html(string);
}
