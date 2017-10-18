var timeEle = document.getElementById('time');
var activity = document.getElementById('activity');
var activityInput = document.getElementById('activityInput');
var time, minutes, hours, interval;

function startTimer() {
  if (activityInput.value == "") activity.innerHTML = "Please Enter an activity to continue";
  else {    
    var start = new Date();
    activity.innerHTML = activityInput.value;
    activityInput.value = "";
    document.getElementById('startTimer').className = "btn btn-success btn-lg disabled";
    document.getElementById('stopTimer').className = "btn btn-danger btn-lg";
    interval = setInterval(function () {
      console.log(hours + ":" + minutes + ":" + time);
      time = Math.floor((Date.now() - start) / 1000) % 60;
      minutes = Math.floor(time / 60);
      hours = Math.floor(minutes / 60);
      if (time < 10) time = "0" + time;
      if (minutes < 10) minutes = "0" + minutes;
      if (hours < 10) hours = "0" + hours;
      timeEle.innerHTML = hours + " Hour(s) : " + minutes + " Minute(s) : " + time + " Second(s)";
    }, 1000);
  }
}

function sendPostReq(date, month, year, day, hours, minutes, seconds, activity) {
  const http = new XMLHttpRequest();
  http.open('POST', '/',true);
  http.setRequestHeader('Content-type', 'application/json')
  http.send(JSON.stringify({
    date: date + "-" + month + "-" + year + "-" + day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    activity: activity
  }));

  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200) {       
           console.log('successful');
           window.location.href="http://localhost:1000/";
    } else {       
           console.log('failed');
    }
  }
}

function stopTimer() {
  var today = new Date();
  sendPostReq(today.getDate(), today.getMonth(), today.getFullYear(), today.getDay(), Number(hours), Number(minutes), Number(time), activity.innerHTML);
  clearInterval(interval);
}