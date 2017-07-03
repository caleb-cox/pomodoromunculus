var pomodoros = 0;

function setTimerText(min, sec) {
  function timeNumToString(n) {
    var string = n < 10
      ? '0' + n
      : '' + n;

    if (string === '60') string = '00';
    return string;
  }

  document.getElementById('pomodoro-timer-min')
    .innerText = timeNumToString(min);

  document.getElementById('pomodoro-timer-sec')
    .innerText = timeNumToString(sec);
}

function setButtonText(text) {
  document.getElementById('pomodoro-button')
    .innerText = text;
}

function onButtonPress() {
  // I don't know
}

document.getElementById('pomodoro-button')
  .addEventListener('click', onButtonPress);
