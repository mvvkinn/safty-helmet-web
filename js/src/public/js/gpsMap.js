var container = document.getElementById("gps");
var options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3,
};

var map = new kakao.maps.Map(container, options);

function setGeolocationByGPS(latitude, longitude) {
  if (latitude != 99 || longitude != 99) {
    var locPosition = new kakao.maps.LatLng(latitude, longitude);
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude, // latitude 위도
        lon = position.coords.longitude; // longitude 경도

      var locPosition = new kakao.maps.LatLng(lat, lon),
        message = '<div style="padding:5px;">사용자 위치</div>';

      displayMarker(locPosition, message);
    });
  } else {
    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
      message = "can't use Geolocation";

    displayMarker(locPosition, message);
  }
}

function displayMarker(locPosition, message) {
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  var iwContent = message,
    iwRemoveable = true;

  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  infowindow.open(map, marker);

  map.setCenter(locPosition);
}
