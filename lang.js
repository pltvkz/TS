const translations = {
  ru: {
    settingsTitle: "Настройки таймера",
    workTime: "Время работы (сек)",
    restTime: "Время отдыха (сек)",
    sets: "Количество упражнений",
    rounds: "Количество кругов",
    start: "▶ Старт",
    save: "💾 Сохранить",
    end: "⏹ Завершить"
  },
  kk: {
    settingsTitle: "Таймер баптаулары",
    workTime: "Жұмыс уақыты (сек)",
    restTime: "Демалу уақыты (сек)",
    sets: "Жаттығулар саны",
    rounds: "Раундтар саны",
    start: "▶ Бастау",
    save: "💾 Сақтау",
    end: "⏹ Аяқтау"
  },
  en: {
    settingsTitle: "Timer Settings",
    workTime: "Work time (sec)",
    restTime: "Rest time (sec)",
    sets: "Number of exercises",
    rounds: "Number of rounds",
    start: "▶ Start",
    save: "💾 Save",
    end: "⏹ End"
  }
};

function applyTranslation(lang) {
  const t = translations[lang];
  document.querySelector(".section-title").textContent = t.settingsTitle;
  document.querySelectorAll(".setting-box")[0].querySelector(".setting-title").textContent = t.workTime;
  document.querySelectorAll(".setting-box")[1].querySelector(".setting-title").textContent = t.restTime;
  document.querySelectorAll(".setting-box")[2].querySelector(".setting-title").textContent = t.sets;
  document.querySelectorAll(".setting-box")[3].querySelector(".setting-title").textContent = t.rounds;
  document.getElementById("start-button").textContent = t.start;
  document.getElementById("save-button").textContent = t.save;
  document.getElementById("end-button").textContent = t.end;
}
