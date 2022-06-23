function doReport() {
  $("#report_popup").css("display", "block");
}

function doWarning() {
  $("#report_font_1").html("WARNING 충격감지");
  $("#report_font_2").html("신고하시겠습니까?");
  $("#report_popup, #popup_yes_btn, #popup_no_btn").css("display", "block");
}

function doMove() {
  $("#report_font_1").html("WARNING 근로자 위험");
  $("#report_font_2").html(
    "충격 감지 후 근로자의 동작이 없습니다. 신고하시겠습니까?"
  );
  $("#report_popup, #popup_yes_btn, #popup_no_btn").css("display", "block");
}

function successReport() {
  socket.emit("report", "1");
  $("#report_font_1").html("신고 완료되었습니다.");
  $("#report_font_2").html("가까운 구급대에 자동으로 신고가 완료되었습니다.");
  $("#popup_close_btn").css("display", "block");
  $("#popup_yes_btn, #popup_no_btn").css("display", "none");
}

function closeReport() {
  $("#report_font_1").html("신고하시겠습니까?");
  $("#report_font_2").html("구급차가 빠르게 현장으로 출동합니다.");
  $("#popup_yes_btn, #popup_no_btn").css("display", "block");
  $("#popup_close_btn, #report_popup").css("display", "none");
}
