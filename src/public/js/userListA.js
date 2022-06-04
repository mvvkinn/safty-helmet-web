var socket = io();

$(document).ready(() => {
  socket.emit("join", helmet_id, () => {
    console.log("reading on id", helmet_id);
  });
  console.log(helmet_id);
});

socket.on("helmetMsg", data => {
  setListValues(data);
  socketCallback(data);
  console.log(data);
});

function setListValues(data) {
  setText(
    `${parseFloat(data.temp).toFixed(1)}ºC`,
    "#user" + data.helmet_id + "_temp"
  );
  setText(
    `${parseFloat(data.humid).toFixed(1)}%`,
    "#user" + data.helmet_id + "_humid"
  );
  setText(
    `${parseFloat(data.photoresistor).toFixed(1)}lx`,
    "#user" + data.helmet_id + "_lightness"
  );

  userStatus(data.temp, data.shock, data.helmet_id);
}

function setText(string, element) {
  const target_element = $(element);

  target_element.html(string);
}
