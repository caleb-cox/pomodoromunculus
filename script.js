var POMODORO = 'POMODORO',
    SHORT_BREAK = 'SHORT_BREAK',
    LONG_BREAK = 'LONG_BREAK',
    progressCells = document.querySelectorAll('.progress-cell'),
    currentInterval = null;

var pTimer = {
  mode: POMODORO,
  duration: 0,
  interval: null,
  pomodoros: 0,
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
        this.stop().onEnd()
      }
    }

    this.interval = setInterval(timer.bind(this), 200);

    return this;
  },
  stop: function() {
    clearInterval(this.interval);
    this.interval = null;
    return this;
  },
  reset: function() {
    setTimerText(this.duration, 0);
    return this;
  },
  onEnd: function() {
    switch (this.mode) {
      case POMODORO:
        // make pomodoro-end sound
        this.pomodoros++;
        if (this.pomodoros === 4) {
          this.mode = LONG_BREAK;
        } else {
          this.mode = SHORT_BREAK;
        }
        break;
      case LONG_BREAK:
        this.pomodoros = 0;
      case SHORT_BREAK:
        // make break-end sound
        this.mode = POMODORO;
        break;
      default:
        break;
    }

    updateProgressBar();
    updateButtonText();
  },
};

function updateProgressBar() {
  progressCells.forEach(function(cell) {
    cell.classList.remove('filled');
  })

  for (var i = 0; i < pTimer.pomodoros; i++) {
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

function updateButtonText() {
  var text = '';

  if (!pTimer.interval) {
    text += 'start ';
  } else {
    text += 'reset ';
  }

  text += pTimer.mode.split('_').join(' ');

  document.getElementById('pomodoro-button')
    .innerText = text;
}

function onButtonPress() {
  if (!pTimer.interval) {
    pTimer.set().start();
  } else {
    pTimer.stop().reset();
  }

  updateButtonText();
  console.log(pTimer.mode);
}

document.getElementById('pomodoro-button')
  .addEventListener('click', onButtonPress);
