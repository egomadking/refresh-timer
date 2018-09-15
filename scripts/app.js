var min, resetTime, sec;
var cancel = false;
var oldSec;


function startTimer() {
  cancel = false; //allows timer to resume if cancelled and restarted
  sec = parseInt(document.getElementById('set-seconds').value);
  min = parseInt(document.getElementById('set-minutes').value);
  setCookie(min, sec);
  setTimer(min, sec);
  countDown();
}

function cancelTimer() {
  cancel = true;
  //reset min, sec fields by cookie
}

function setTimer(min, sec) {
  var start = new Date();
  resetTime = new Date(start.getTime() + (min * 60 + sec) * 1000);
}

function countDown() {
  var currentTime = new Date();
  var interval;
  var reset = resetTime.getTime();
  var current = currentTime.getTime();
  if (reset > current) {
    interval = reset - current;
  } else {
    window.location.reload();
  }
  var timeLeft = Math.round(interval / 1000);
  var minLeft = Math.floor(timeLeft / 60) || 0;
  var secLeft = timeLeft % 60 || 0;

  //minimizes DOM changes to 1 per sec
  if (oldSec != secLeft) {
    oldSec = secLeft;
    setClock(minLeft, secLeft);
  }
  if (!cancel) {
    setTimeout(countDown, 100);
  }
}

function setClock(min, sec) {
  if (sec < 10) {
    sec = '0' + sec.toString();
  }
  var clockDiv = document.getElementById('timer');
  var clock = clockDiv.getElementsByTagName('h2')[0];
  clock.innerHTML = min + ':' + sec;
}

function getCookie() {
  var cookies = document.cookie;
  var parsedCookies;
  if (cookies != '') {
    parseCookie(cookies);
  }

}

function parseCookie(cookies) {
  var parseMin = /min=[0-9]+/;
  var parseSec = /sec=[0-9]+/;
  var min = cookies.match(parseMin);
  var sec = cookies.match(parseSec);
  return {
    min: min,
    sec: sec
  };
}

function setCookie(min, sec) {
  min = min || 0;
  sec = sec || 0;

  var minStr = '"min=' + min + '"';
  var secStr = '"sec=' + sec + '"';
  document.cookie = minStr;
  document.cookie = secStr;
}

//set time from cookie, autostart countDown

document.addEventListener('DOMContentLoaded', function () {
  getCookie();
});