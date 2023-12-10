// rod controls
var rodOne = document.getElementById("rod-one");
var rodTwo = document.getElementById("rod-two");
var deta_rod = rodOne.getBoundingClientRect();
var leftPos = deta_rod.left;
const default_left = deta_rod.left;
var score = 0;
var max_score = 0;
var going = 0;
var winner = 2;
max_score_holder = 2;
// to show notification
var showNotification = document.getElementById("notification");

function set(val) {
  var t = 0;
  var id = setInterval(function () {
    showNotification.innerHTML = val;
    showNotification.style.display = "block";
    showNotification.style.scale = t;
    showNotification.style.transition = "1s";
    t += 2;
    if (t == 4) {
      clearInterval(id);
    }
  }, 300);
}
set("Press Enter to start game and A and D to play");

function notificationdone() {
  var id = setInterval(function () {
    showNotification.style.scale = 0;
    showNotification.style.transition = "1s";
    // showNotification.style.display="none";
    clearInterval(id);
  }, 300);
}

// keypress events
document.addEventListener("keydown", function (event) {
  var deta_body = document.body.getBoundingClientRect();
  var maxWidth = 8 + deta_body.width - 236;
  if (event.key == "a" || event.key == "A") {
    leftPos -= 40;
    if (leftPos < 0) {
      leftPos = 0;
    }
  } else if (event.key == "d" || event.key == "D") {
    leftPos += 40;
    if (leftPos >= maxWidth) {
      leftPos = maxWidth;
    }
  }
  if (event.key == "Enter") {
    if (going == 0) {
      notificationdone();
      leftPos = default_left;
      go();
    }
  }
  rodOne.style.left = leftPos + "px";
  rodTwo.style.left = leftPos + "px";
});
// ball controls
var ball = document.getElementById("ball");
function go() {
  var tl = 0,
    tr = 0,
    bl = 0,
    br = 1;
  going = 1;
  ball.style.top = "50%";
  ball.style.left = "30%";
  ball.style.backgroundColor = "#003700";
  document.body.style.border = "4px dashed #003700";

  var start = setInterval(function () {
    // current data of ball and rodes
    var data_ball = ball.getBoundingClientRect();
    var body_data = document.body.getBoundingClientRect();
    var max_right = 12 + body_data.width - 50;
    //rod-1-data
    var data_rod_one = rodOne.getBoundingClientRect();
    var touch_rod_one = data_rod_one.top + 20;
    var left_rod_one = data_rod_one.left;
    var max_left_rod_one = left_rod_one + 220;
    //rod-2-data
    var data_rod_two = rodTwo.getBoundingClientRect();
    var touch_rod_two = data_rod_two.top - 30;
    var left_rod_two = data_rod_two.left;
    var max_left_rod_two = left_rod_two + 220;
    //   when ball hit rod-1
    if (
      data_ball.left >= left_rod_one &&
      data_ball.left <= max_left_rod_one &&
      Math.trunc(data_ball.top) == touch_rod_one
    ) {
      if (tr == 1) {
        tr = 0;
        br = 1;
      } else if (tl == 1) {
        tl = 0;
        bl = 1;
      }
      score++;
    }
    // when ball hit rod-2
    if (
      data_ball.left >= left_rod_two &&
      data_ball.left <= max_left_rod_two &&
      Math.trunc(data_ball.top) >= Math.trunc(touch_rod_two) - 2 &&
      Math.trunc(data_ball.top) <= Math.trunc(touch_rod_two) + 2
    ) {
      if (br == 1) {
        br = 0;
        tr = 1;
      }
      if (bl == 1) {
        bl = 0;
        tl = 1;
      }
      score++;
    }

    //   when ball hir right wall
    if (data_ball.left >= max_right) {
      if (tr == 1) {
        tr = 0;
        tl = 1;
      } else if (br == 1) {
        br = 0;
        bl = 1;
      }
    }
    //   when ball hit left wall
    if (data_ball.left <= 12) {
      if (tl == 1) {
        tl = 0;
        tr = 1;
      } else if (bl == 1) {
        bl = 0;
        br = 1;
      }
    }
    //   if ball is outside screen
    var data_body = document.body.getBoundingClientRect();
    if (data_ball.top <= 0 || data_ball.top >= data_body.height - 12) {
      ball.style.backgroundColor = "rgb(159, 1, 1)";
      document.body.style.border = "4px dashed rgb(159, 1, 1)";
      going = 0;
      if (data_ball.top <= 100) {
        winner = 2;
      } else {
        winner = 1;
      }
      if (score > max_score) {
        set("Rod-" + winner + " has maximum score: " + score);
        max_score = score;
        max_score_holder = winner;
      } else {
        set(
          "Rod-" +
            winner +
            " win with score of " +
            score +
            " maximum score is " +
            max_score
        );
      }
      score = 0;
      clearInterval(start);
    }
    // console.log(data_body.height);
    //   directions
    if (tr == 1) {
      topright();
    }
    if (br == 1) {
      bottomright();
    }
    if (tl == 1) {
      topleft();
    }
    if (bl == 1) {
      bottomleft();
    }
  }, 20);
}

// for direction top-left
function topleft() {
  var top_height = ball.getBoundingClientRect().top;
  var left_width = ball.getBoundingClientRect().left;
  top_height -= 16;
  left_width -= 16;
  ball.style.top = top_height + "px";
  ball.style.left = left_width + "px";
}
// for direction top-right
function topright() {
  var top_height = ball.getBoundingClientRect().top;
  var left_width = ball.getBoundingClientRect().left;
  top_height -= 16;
  left_width += -8;
  ball.style.top = top_height + "px";
  ball.style.left = left_width + "px";
}
// for direction bottom-left
function bottomleft() {
  var top_height = ball.getBoundingClientRect().top;
  var left_width = ball.getBoundingClientRect().left;
  top_height += -8;
  left_width -= 16;
  ball.style.top = top_height + "px";
  ball.style.left = left_width + "px";
}
// for direction bottom-right
function bottomright() {
  var top_height = ball.getBoundingClientRect().top;
  var left_width = ball.getBoundingClientRect().left;
  top_height += -8;
  left_width += -8;
  ball.style.top = top_height + "px";
  ball.style.left = left_width + "px";
}
