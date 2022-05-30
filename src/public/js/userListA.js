var socket = io();

socket.on("helmetMsg", data => {
  setListValues(data);
  socketCallback(data);
});

function setListValues(data) {
  setText(`${parseFloat(data.temp).toFixed(1)}ºC`, "#user_temp");
  setText(`${parseFloat(data.humid).toFixed(1)}%`, "#user_humid");
  setText(`${parseFloat(data.photoresistor).toFixed(1)}lx`, "#user_lightness");
}

function setText(string, element) {
  const target_element = $(element);

  target_element.html(string);
}
