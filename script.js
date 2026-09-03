let playerName = localStorage.getItem("playerName") || "";
let playerXP = Number(localStorage.getItem("playerXP")) || 0;
let playerPoints = Number(localStorage.getItem("playerPoints")) || 0;
let solvedCases = Number(localStorage.getItem("solvedCases")) || 0;

let caseSolved = JSON.parse(
  localStorage.getItem("caseSolved") || "{}"
);

let currentCase = null;

const cases = [
  {
    id: 1,
    title: "دۆسیەی ژووری داخراو",
    story:
      "لە شەوێکی تاریکدا کەسێک لە ژوورێکی داخراو دۆزرایەوە. هیچ نیشانەیەک لە شکاندنی دەرگا نەبوو. تۆ وەک لێکۆڵەر دەبێت ڕاستییەکە بدۆزیتەوە.",
    suspects: [
      "کاروان — هاوڕێی نزیکی قوربانی",
      "ئاراس — پاسەوانی بیناکە",
      "سارا — دراوسێی قوربانی"
    ],
    clues: [
      "دەرگاکە لە ناوەوە داخراو بوو.",
      "لەسەر مێزەکە کلیلێکی زیوین دۆزرایەوە.",
      "کامێرای چاودێری لە کاتی ڕووداوەکە کوژابوو."
    ],
    answer: "کاروان"
  },

  {
    id: 2,
    title: "دۆسیەی نامەی ونبوو",
    story:
      "نامەیەکی گرنگ لە ئۆفیسێک ون بووە. تەنها سێ کەس لە کاتی ونبوونی نامەکەدا لە شوێنەکە بوون.",
    suspects: [
      "ئاراس — کارمەندی ئۆفیس",
      "سارا — سکرتێر",
      "کاروان — میوان"
    ],
    clues: [
      "نامەکە لە کشووی داخراو بوو.",
      "کلیلەکە تەنها لەلایەن ساراوە بوو.",
      "کامێرا پیشانی دا سارا لە نزیک کشووکە بوو."
    ],
    answer: "سارا"
  },

  {
    id: 3,
    title: "دۆسیەی مۆبایلە ونبووەکە",
    story:
      "مۆبایلێکی گرنگ لە کافێیەک ون بووە. هەموو کەسێک دەڵێت هیچ شتێکی نەدزراوە.",
    suspects: [
      "سارا — دانیشتووی نزیک",
      "ئاراس — خاوەنی کافێ",
      "کاروان — کڕیار"
    ],
    clues: [
      "مۆبایلەکە لەسەر مێزێکی دوور دۆزرایەوە.",
      "کاروان وتی هیچ کاتێک لە مێزەکە نزیک نەبووە.",
      "کامێرا نیشانی دا کاروان بۆ ماوەیەک لەوێ بووە."
    ],
    answer: "کاروان"
  }
];

/* ---------------- BASIC PAGES ---------------- */

function hideAllPages() {
  document.querySelectorAll(".page").forEach(function(page) {
    page.style.display = "none";
  });
}

function startGame() {

  hideAllPages();

  if (!playerName) {
    document.getElementById("accountPage").style.display = "flex";
  } else {
    document.getElementById("cases").style.display = "flex";

    document.getElementById("welcomeText").innerText =
      "بەخێربێیت " + playerName + " 🕵️‍♂️";

    updatePlayerStats();
    renderCases();
  }
}

/* ---------------- ACCOUNT ---------------- */

function createAccount() {

  const name =
    document.getElementById("accountName").value.trim();

  const password =
    document.getElementById("accountPassword").value;

  if (!name || !password) {
    alert("تکایە ناو و وشەی نهێنی بنووسە.");
    return;
  }

  playerName = name;

  localStorage.setItem("playerName", playerName);
  localStorage.setItem("playerPassword", password);

  hideAllPages();

  document.getElementById("cases").style.display = "flex";

  document.getElementById("welcomeText").innerText =
    "بەخێربێیت " + playerName + " 🕵️‍♂️";

  updatePlayerStats();
  renderCases();
}

/* ---------------- STATS ---------------- */

function getRank() {

  if (playerXP < 100) return "نوێکار";
  if (playerXP < 300) return "ملازم";
  if (playerXP < 600) return "کاپتن";
  if (playerXP < 1000) return "عقید";

  return "سەرلێکۆڵەر 🕵️‍♂️";
}

function updatePlayerStats() {

  document.getElementById("xp").innerText = playerXP;
  document.getElementById("points").innerText = playerPoints;
  document.getElementById("rank").innerText = getRank();
}

/* ---------------- CASES ---------------- */

function renderCases() {

  const list = document.getElementById("caseList");

  list.innerHTML = "";

  cases.forEach(function(gameCase) {

    const card = document.createElement("div");

    card.className = "case-card";

    const unlocked =
      gameCase.id === 1 ||
      solvedCases >= gameCase.id - 1;

    card.innerHTML = `
      <h2>🔎 دۆسیەی ${gameCase.id}</h2>
      <p>${gameCase.title}</p>
      <button>
        ${unlocked ? "دەستکردن بە لێکۆڵینەوە" : "🔒 قفڵە"}
      </button>
    `;

    const button = card.querySelector("button");

    if (unlocked) {

      button.onclick = function() {
        openCase(gameCase.id);
      };

    } else {

      button.onclick = function() {

        alert(
          "🔒 سەرەتا دۆسیەی " +
          (gameCase.id - 1) +
          " چارەسەر بکە!"
        );

      };

      card.classList.add("locked-case");
    }

    list.appendChild(card);
  });
}

/* ---------------- OPEN CASE ---------------- */

function openCase(caseId) {

  currentCase =
    cases.find(function(item) {
      return item.id === caseId;
    });

  if (!currentCase) return;

  hideAllPages();

  document.getElementById("casePage").style.display = "flex";

  document.getElementById("caseTitle").innerText =
    "🔎 " + currentCase.title;

  document.getElementById("caseStory").innerText =
    currentCase.story;

  renderSuspects();
  renderClues();
  renderAnswers();
}

/* ---------------- SUSPECTS ---------------- */

function renderSuspects() {

  const list =
    document.getElementById("suspectList");

  list.innerHTML = "";

  currentCase.suspects.forEach(function(suspect) {

    const div = document.createElement("div");

    div.className = "suspect";

    div.innerText = "👤 " + suspect;

    list.appendChild(div);
  });
}

/* ---------------- CLUES ---------------- */

function renderClues() {

  const list =
    document.getElementById("clueList");

  list.innerHTML = "";

  currentCase.clues.forEach(function(clue, index) {

    const wrapper =
      document.createElement("div");

    const title =
      document.createElement("div");

    const text =
      document.createElement("div");

    title.className = "clue";
    text.className = "clue-text";

    title.innerText =
      "🔍 بەڵگەی " + (index + 1);

    text.innerText = clue;

    title.onclick = function() {

      if (text.style.display === "block") {
        text.style.display = "none";
      } else {
        text.style.display = "block";
      }

    };

    wrapper.appendChild(title);
    wrapper.appendChild(text);

    list.appendChild(wrapper);
  });
}

/* ---------------- ANSWERS ---------------- */

function renderAnswers() {

  const list =
    document.getElementById("answerList");

  list.innerHTML = "";

  currentCase.suspects.forEach(function(suspect) {

    const name =
      suspect.split(" — ")[0];

    const button =
      document.createElement("button");

    button.className = "answer-button";

    button.innerText = name;

    button.onclick = function() {
      solveCase(name);
    };

    list.appendChild(button);
  });
}

/* ---------------- SOLVE CASE ---------------- */

function solveCase(answer) {

  if (!currentCase) return;

  if (answer === currentCase.answer) {

    if (!caseSolved[currentCase.id]) {

      caseSolved[currentCase.id] = true;

      localStorage.setItem(
        "caseSolved",
        JSON.stringify(caseSolved)
      );

      solvedCases = Math.max(
        solvedCases,
        currentCase.id
      );

      localStorage.setItem(
        "solvedCases",
        solvedCases
      );

      playerXP += 100;
      playerPoints += 100;

      localStorage.setItem(
        "playerXP",
        playerXP
      );

      localStorage.setItem(
        "playerPoints",
        playerPoints
      );
    }

    hideAllPages();

    document.getElementById("resultPage")
      .style.display = "flex";

    document.getElementById("resultTitle")
      .innerText =
      "🎉 دۆسیەکە چارەسەر کرا!";

    document.getElementById("resultText")
      .innerText =
      "پیرۆزە گەورەم بۆ چارەسەر کردنی دۆسیەکە 🫡🎉";

    document.getElementById("finalXP")
      .innerText = playerXP;

    document.getElementById("finalPoints")
      .innerText = playerPoints;

    document.getElementById("finalRank")
      .innerText = getRank();

    updatePlayerStats();

  } else {

    playerPoints -= 50;

    if (playerPoints < 0) {
      playerPoints = 0;
    }

    localStorage.setItem(
      "playerPoints",
      playerPoints
    );

    hideAllPages();

    document.getElementById("judgePage")
      .style.display = "flex";

    document.getElementById("judgeText")
      .innerText =
      "❌ وەڵامەکەت هەڵەیە!\nدادوەر بڕیاری دا 50 Points لێت کەم بکرێت. ⚖️";

    document.getElementById("judgePoints")
      .innerText = playerPoints;
  }
}

/* ---------------- BACK ---------------- */

function backToCases() {

  hideAllPages();

  document.getElementById("cases")
    .style.display = "flex";

  updatePlayerStats();
  renderCases();
}

/* ---------------- PROFILE ---------------- */

function openProfile() {

  hideAllPages();

  document.getElementById("profilePage")
    .style.display = "flex";

  document.getElementById("profileNameInput")
    .value = playerName;

  document.getElementById("profileXP")
    .innerText = playerXP;

  document.getElementById("profilePoints")
    .innerText = playerPoints;

  document.getElementById("profileRank")
    .innerText = getRank();

  document.getElementById("profileSolved")
    .innerText = solvedCases;

  const savedImage =
    localStorage.getItem("profileImage");

  if (savedImage) {

    document.getElementById("profileImage")
      .src = savedImage;

  } else {

    document.getElementById("profileImage")
      .src =
      "https://via.placeholder.com/150/333333/ffffff?text=🕵️";
  }
}

function closeProfile() {

  hideAllPages();

  document.getElementById("cases")
    .style.display = "flex";

  updatePlayerStats();
  renderCases();
}

function saveProfile() {

  const newName =
    document.getElementById("profileNameInput")
      .value.trim();

  if (!newName) {
    alert("تکایە ناو بنووسە.");
    return;
  }

  playerName = newName;

  localStorage.setItem(
    "playerName",
    playerName
  );

  document.getElementById("welcomeText")
    .innerText =
    "بەخێربێیت " + playerName + " 🕵️‍♂️";

  alert("✅ Profile ـەکەت Save کرا.");

  closeProfile();
}

/* ---------------- PROFILE IMAGE ---------------- */

document.addEventListener("DOMContentLoaded", function() {

  const input =
    document.getElementById("profileImageInput");

  if (input) {

    input.addEventListener(
      "change",
      function(event) {

        const file =
          event.target.files[0];

        if (!file) return;

        const reader =
          new FileReader();

        reader.onload = function(e) {

          localStorage.setItem(
            "profileImage",
            e.target.result
          );

          document.getElementById("profileImage")
            .src = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    );
  }

});

/* ---------------- SETTINGS ---------------- */

function openSettings() {

  hideAllPages();

  document.getElementById("settingsPage")
    .style.display = "flex";
}

function closeSettings() {

  hideAllPages();

  document.getElementById("cases")
    .style.display = "flex";

  updatePlayerStats();
  renderCases();
}

function toggleLanguage() {

  alert(
    "🌐 سیستەمی Kurdish / English دواتر بە تەواوی چالاک دەکرێت."
  );
}

/* ---------------- ACCOUNT ---------------- */

function switchAccount() {

  const confirmSwitch =
    confirm(
      "دڵنیایت دەتەوێت ئەکاونتەکەت بگۆڕیت؟"
    );

  if (!confirmSwitch) return;

  logout();
}

function logout() {

  localStorage.removeItem("playerName");
  localStorage.removeItem("playerPassword");

  playerName = "";

  hideAllPages();

  document.getElementById("accountPage")
    .style.display = "flex";
}

/* ---------------- START ---------------- */

window.addEventListener("load", function() {

  if (playerName) {

    document.getElementById("home")
      .style.display = "none";

  } else {

    document.getElementById("home")
      .style.display = "flex";
  }

});