var socket = io();

$(document).ready(() => {
  helmet_id.forEach(id => {
    socket.emit("join", id.toString(), () => {
      console.log(`Socket room join at: ${id}`);
    });
  });
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

  userStatus(data.temp, data.shock, data.helmet_id, data.worker_danger);
}

function setText(string, element) {
  const target_element = $(element);

  target_element.html(string);
}
