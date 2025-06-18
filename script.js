const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const saveBtn = document.getElementById("save");
const timerDisplay = document.getElementById("timer");
const langSelect = document.getElementById("language");

const translations = {
  ru: {
    start: "Старт",
    stop: "Завершить",
    save: "Сохранить",
    done: "Готово!",
    prep: "Подготовка",
    work: "Работа",
    rest: "Отдых",
    saved: "Тренировка сохранена!"
  },
  kk: {
    start: "Бастау",
    stop: "Аяқтау",
    save: "Сақтау",
    done: "Дайын!",
    prep: "Дайындық",
    work: "Жұмыс",
    rest: "Демалыс",
    saved: "Жаттығу сақталды!"
  },
  en: {
    start: "Start",
    stop: "Finish",
    save: "Save",
    done: "Done!",
    prep: "Preparation",
    work: "Work",
    rest: "Rest",
    saved: "Workout saved!"
  }
};

let currentLang = localStorage.getItem("lang") || langSelect.value;
langSelect.value = currentLang;

langSelect.onchange = () => {
  currentLang = langSelect.value;
  localStorage.setItem("lang", currentLang);
  updateUI();
};

function updateUI() {
  startBtn.textContent = translations[currentLang].start;
  stopBtn.textContent = translations[currentLang].stop;
  saveBtn.textContent = translations[currentLang].save;
}

updateUI();

let timer;
let steps = [];
let currentIndex = 0;
let isRunning = false;

function getSteps() {
  return [
    { label: translations[currentLang].prep, time: 5, color: "yellow" },
    { label: translations[currentLang].work, time: 20, color: "blue" },
    { label: translations[currentLang].rest, time: 10, color: "green", afterSound: true },
    { label: translations[currentLang].work, time: 20, color: "blue" }
  ];
}

function startNextStep() {
  if (currentIndex >= steps.length) {
    timerDisplay.textContent = translations[currentLang].done;
    document.body.style.backgroundColor = "white";
    return;
  }

  const step = steps[currentIndex];
  let remaining = step.time;
  document.body.style.backgroundColor = step.color;
  timerDisplay.textContent = `${step.label}: ${remaining}`;

  if (step.afterSound) {
    const audio = new Audio("audio.m4a"); // файл должен быть в корне
    audio.play();
  }

  timer = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(timer);
      currentIndex++;
      startNextStep();
    } else {
      timerDisplay.textContent = `${step.label}: ${remaining}`;
    }
  }, 1000);
}

startBtn.onclick = () => {
  if (!isRunning) {
    steps = getSteps();
    currentIndex = 0;
    isRunning = true;
    startNextStep();
  }
};

stopBtn.onclick = () => {
  clearInterval(timer);
  isRunning = false;
  timerDisplay.textContent = "00:00";
  document.body.style.backgroundColor = "white";
};

saveBtn.onclick = () => {
  localStorage.setItem("timerSamSteps", JSON.stringify(steps));
  alert(translations[currentLang].saved);
};
