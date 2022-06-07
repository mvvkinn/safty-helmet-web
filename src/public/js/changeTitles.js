function setListValues(temp, humid, lightness, shock) {
  $("#user_temp").html(parseFloat(temp).toFixed(1) + "ºC");
  $("#user_humid").html(parseFloat(humid).toFixed(1) + "%");
  $("#user_lightness").html(lightness + "lx");
  userStatus(temp, shock);
}
function userStatus(temp, shock) {
  if (shock) {
    $("#user_status").html("충격감지");
    $("#user_status").css("color", "#ED1C24");
  } else if (temp > 35) {
    $("#user_status").html("현장 온도 높음");
    $("#user_status").css("color", "#ED1C24");
  } else if (temp < 30 && !shock) {
    $("#user_status").html("양호");
    $("#user_status").css("color", "#081547");
  }
}
