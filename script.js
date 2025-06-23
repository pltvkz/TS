let phase = 'prepare';
let currentSet = 1;
let currentRound = 1;
let timeLeft = 5;
let work = 0;
let rest = 0;
let sets = 0;
let rounds = 0;
let timerInterval;

const timerEl = document.getElementById("timer");
const languageSelect = document.getElementById("language");
const audioYerzhan = document.getElementById("yerzhan");

function updateDisplay(time) {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  timerEl.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  work = parseInt(document.getElementById("input-work").value);
  rest = parseInt(document.getElementById("input-rest").value);
  sets = parseInt(document.getElementById("input-sets").value);
  rounds = parseInt(document.getElementById("input-rounds").value);

  phase = 'prepare';
  timeLeft = 5;
  currentSet = 1;
  currentRound = 1;
  updateDisplay(timeLeft);
  document.body.className = 'prepare-phase';

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(tick, 1000);
}

function tick() {
  timeLeft--;
  updateDisplay(timeLeft);

  if (timeLeft <= 0) {
    if (phase === 'prepare') {
      phase = 'work';
      timeLeft = work;
      document.body.className = 'work-phase';
    } else if (phase === 'work') {
      phase = 'rest-pre';
      timeLeft = 5;
      document.body.className = 'prepare-phase';
    } else if (phase === 'rest-pre') {
      phase = 'rest';
      timeLeft = rest;
      document.body.className = 'rest-phase';
    } else if (phase === 'rest') {
      audioYerzhan.play();
      if (currentSet < sets) {
        currentSet++;
        phase = 'prepare';
        timeLeft = 5;
        document.body.className = 'prepare-phase';
      } else if (currentRound < rounds) {
        currentRound++;
        currentSet = 1;
        phase = 'prepare';
        timeLeft = 5;
        document.body.className = 'prepare-phase';
      } else {
        clearInterval(timerInterval);
        alert("Тренировка завершена!");
        document.body.className = '';
      }
    }
  }
}

function saveWorkout() {
  const config = {
    work: document.getElementById("input-work").value,
    rest: document.getElementById("input-rest").value,
    sets: document.getElementById("input-sets").value,
    rounds: document.getElementById("input-rounds").value,
    language: languageSelect.value,
  };
  localStorage.setItem("timerSamConfig", JSON.stringify(config));
  alert("Настройки сохранены!");
}

function loadWorkout() {
  const config = JSON.parse(localStorage.getItem("timerSamConfig"));
  if (config) {
    document.getElementById("input-work").value = config.work;
    document.getElementById("input-rest").value = config.rest;
    document.getElementById("input-sets").value = config.sets;
    document.getElementById("input-rounds").value = config.rounds;
    languageSelect.value = config.language;
  }
}

function endWorkout() {
  if (timerInterval) clearInterval(timerInterval);
  timerEl.textContent = "00:00";
  document.body.className = '';
}

function registerEvents() {
  document.getElementById("start-button").addEventListener("click", startTimer);
  document.getElementById("save-button").addEventListener("click", saveWorkout);
  document.getElementById("end-button").addEventListener("click", endWorkout);
languageSelect.addEventListener("change", () => {
  saveWorkout();
  applyTranslation(languageSelect.value); // обновит текст без перезагрузки
});
}

loadWorkout();
registerEvents();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function(reg) {
    console.log('Service Worker зарегистрирован', reg);
  }).catch(function(err) {
    console.warn('Ошибка при регистрации Service Worker', err);
  });
}
