var POMODORO = 'POMODORO',
    SHORT_BREAK = 'SHORT_BREAK',
    LONG_BREAK = 'LONG_BREAK',
    pomodoros = 0,
    progressCells = document.querySelectorAll('.progress-cell'),
    currentInterval = null;

var timer = {
  mode: POMODORO,
  duration: 0,
  interval: null,
  set: function() {
    switch (this.mode) {
      case POMODORO:
        this.duration = 25;
        break;
      case SHORT_BREAK:
        this.duration = 5;
        break;
      case LONG_BREAK:
        this.duration = 15;
        break;
      default:
        break;
    }

    setTimerText(this.duration, 0);
    return this;
  },
  start: function() {
    var startTime = new Date().getTime();

    function timer() {
      var elapsedSeconds = Math.floor((new Date().getTime() - startTime) / 1000),
          remainingMinutes = this.duration - Math.ceil(elapsedSeconds / 60),
          remainingSeconds = 60 - (elapsedSeconds % 60);

      setTimerText(remainingMinutes, remainingSeconds);

      if (remainingMinutes === 0 && remainingSeconds === 60) {
        this.stop();
        onTimerEnd();
      }
    }

    this.interval = setInterval(timer.bind(this), 200);

    return this;
  },
  stop: function() {
    clearInterval(this.interval);
    return this;
  },
  reset: function() {
    setTimerText(this.duration, 0);
    return this;
  }
};

function updateProgressBar() {
  progressCells.forEach(function(cell) {
    cell.classList.remove('filled');
  })

  for (var i = 0; i < pomodoros; i++) {
    progressCells[i].classList.add('filled');
  }
}

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

function onTimerEnd() {
  console.log('what up, timer ended');
}

function onButtonPress() {
  timer.mode = SHORT_BREAK;
  timer.set().start();
}

document.getElementById('pomodoro-button')
  .addEventListener('click', onButtonPress);
