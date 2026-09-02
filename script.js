let playerName = localStorage.getItem("playerName") || "";
let playerXP = Number(localStorage.getItem("playerXP")) || 0;
let playerPoints = Number(localStorage.getItem("playerPoints")) || 0;
let solvedCases = Number(localStorage.getItem("solvedCases")) || 0;
let case1Solved = localStorage.getItem("case1Solved") === "true";
let case2Solved = localStorage.getItem("case2Solved") === "true";
let case3Solved = localStorage.getItem("case3Solved") === "true";

function startGame() {

  document.getElementById("home").style.display = "none";

  if (playerName === "") {

    document.getElementById("account").style.display = "flex";
    document.getElementById("cases").style.display = "none";

  } else {

    document.getElementById("account").style.display = "none";
    document.getElementById("cases").style.display = "flex";

    document.getElementById("welcomeText").innerText =
      "بەخێربێیت، لێکۆڵەر " + playerName + " 🕵️‍♂️";

    updatePlayerStats();
    updateCaseLocks();

  }
}

/* CREATE ACCOUNT */

function createAccount() {

  const name =
    document.getElementById("playerName").value;

  const password =
    document.getElementById("playerPassword").value;


  if (name.trim() === "") {

    alert("تکایە ناوی لێکۆڵەر بنووسە");

    return;

  }


  if (password.trim() === "") {

    alert("تکایە وشەی نهێنی بنووسە");

    return;

  }


  playerName = name;

localStorage.setItem("playerName", playerName);
localStorage.setItem("playerXP", playerXP);

  document.getElementById("account").style.display = "none";

  document.getElementById("cases").style.display = "flex";


  document.getElementById("welcomeText").innerText =
    "بەخێربێیت، لێکۆڵەر " + playerName + " 🕵️‍♂️";


  updatePlayerStats();
  updateCaseLocks();

}


/* UPDATE STATS */

function updatePlayerStats() {

  document.getElementById("xp").innerText =
    playerXP;


  document.getElementById("rank").innerText =
    getRank();

}
function updateCaseLocks() {

  const caseCards = document.querySelectorAll("[data-case]");

  caseCards.forEach(function(caseCard) {

    const caseNumber = Number(caseCard.dataset.case);
    const button = caseCard.querySelector("button");

    if (solvedCases >= caseNumber - 1) {

      caseCard.classList.remove("locked-case");

      button.innerText =
        "دەستکردن بە لێکۆڵینەوە";

      if (caseNumber === 2) {
  button.onclick = openCase2;
}

if (caseNumber === 3) {
  button.onclick = openCase3;
}

    } else {

      caseCard.classList.add("locked-case");

      button.innerText = "🔒 قفڵە";

      button.onclick = function() {

        alert(
          "🔒 سەرەتا دۆسیەی " +
          (caseNumber - 1) +
          " چارەسەر بکە!"
        );

      };

    }

  });

}


/* GET RANK */

function getRank() {

  if (playerXP < 100) {

    return "نوێکار";

  }


  if (playerXP < 300) {

    return "ملازم";

  }


  if (playerXP < 600) {

    return "کاپتن";

  }


  if (playerXP < 1000) {

    return "عقید";

  }


  return "سەرلێکۆڵەر 🕵️‍♂️";

}


/* OPEN CASE */

function openCase() {

  document.getElementById("cases").style.display = "none";

  document.getElementById("casePage").style.display = "flex";

}


/* SHOW CLUES */

function showClue(number) {

  const clueText =
    document.getElementById("clueText");


  if (number === 1) {

    clueText.innerText =
      "🔎 بەڵگەی ١: لەسەر شوێنی تاوان پێی پێیەک دۆزرایەوە.";


  }


  if (number === 2) {

    clueText.innerText =
      "📱 بەڵگەی ٢: کاروان دەڵێت لە دەرەوە بووە، بەڵام کەسێک بینیویەتی لە نزیک ژوورەکە.";


  }


  if (number === 3) {

    clueText.innerText =
      "🧩 بەڵگەی ٣: لە مۆبایلەکە پەنجەمۆری کاروان دۆزرایەوە.";

  }

}


/* SOLVE CASE */

function solveCase(answer) {


if (answer === "karwan") {

  if (!case1Solved) {

    case1Solved = true;
    localStorage.setItem("case1Solved", "true");

    solvedCases = 1;
    localStorage.setItem("solvedCases", solvedCases);

    playerPoints += 100;
    localStorage.setItem("playerPoints", playerPoints);

    playerXP += 100;
    localStorage.setItem("playerXP", playerXP);

  }

  updateCaseLocks();


    document.getElementById("casePage").style.display =
      "none";


    document.getElementById("resultPage").style.display =
      "flex";


    document.getElementById("resultTitle").innerText =
      "🎉 دۆسیەکە چارەسەر کرا!";


    document.getElementById("resultText").innerText =
      "پیرۆزە گەورەم بۆ چارەسەر کردنی دۆسیەکە 🫡🎉";


    document.getElementById("finalXP").innerText =
      playerXP;


    document.getElementById("finalRank").innerText =
      getRank();


    updatePlayerStats();


  } else {

  playerPoints -= 50;

  if (playerPoints < 0) {
    playerPoints = 0;
  }

  localStorage.setItem("playerPoints", playerPoints);

  document.getElementById("casePage").style.display = "none";
  document.getElementById("judgePage").style.display = "flex";

  document.getElementById("judgeText").innerText =
    "❌ وەڵامەکەت هەڵەیە!\nدادوەر بڕیاری دا 50 Points لێت کەم بکرێت. ⚖️";

  document.getElementById("judgePoints").innerText =
    playerPoints;

}

}


/* BACK TO CASES */

function backToCases() {

  document.getElementById("casePage").style.display =
    "none";

  document.getElementById("resultPage").style.display =
    "none";

  document.getElementById("judgePage").style.display =
    "none";

  document.getElementById("cases").style.display =
    "flex";

    document.getElementById("case2Page").style.display = "none";
document.getElementById("case3Page").style.display = "none";

  updatePlayerStats();
  updateCaseLocks();

}
/* PROFILE */

function openProfile() {

  document.getElementById("cases").style.display = "none";
  document.getElementById("profilePage").style.display = "flex";

  document.getElementById("newPlayerName").value = playerName;
  document.getElementById("profileName").innerText = playerName;
document.getElementById("profileXP").innerText = playerXP;
document.getElementById("profilePoints").innerText = playerPoints;
document.getElementById("solvedCases").innerText = solvedCases;
document.getElementById("profileRank").innerText = getRank();

  const savedImage = localStorage.getItem("profileImage");

  if (savedImage) {
    document.getElementById("profilePreview").src = savedImage;
  }

}


function closeProfile() {

  document.getElementById("profilePage").style.display = "none";
  document.getElementById("cases").style.display = "flex";
  updatePlayerStats();

}


function saveProfile() {

  const newName =
    document.getElementById("newPlayerName").value.trim();


  if (newName === "") {

    alert("تکایە ناوێک بنووسە");

    return;

  }


  playerName = newName;

  localStorage.setItem("playerName", playerName);


  document.getElementById("welcomeText").innerText =
    "بەخێربێیت، لێکۆڵەر " + playerName + " 🕵️‍♂️";


  alert("✅ پرۆفایلەکەت پاشەکەوت کرا");

}


/* LOGOUT */

function logout() {

  localStorage.removeItem("playerName");
  localStorage.removeItem("playerXP");

  playerName = "";
  playerXP = 0;


  document.getElementById("cases").style.display = "none";
  document.getElementById("home").style.display = "flex";

}
/* PROFILE IMAGE */

document.getElementById("profileImage").addEventListener("change", function(event) {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {

    const imageData = e.target.result;

    localStorage.setItem("profileImage", imageData);

    document.getElementById("profilePreview").src = imageData;

  };

  reader.readAsDataURL(file);

});
function openCase2() {

  document.getElementById("cases").style.display = "none";

  document.getElementById("case2Page").style.display = "flex";

}
function showCase2Clue(number) {

  const clueText =
    document.getElementById("case2ClueText");

  if (number === 1) {
    clueText.innerText =
      "🔎 بەڵگەی ١: لە پەنجەرەکەدا نیشانەی پەنجەمۆری ئاراس دۆزرایەوە.";
  }

  if (number === 2) {
    clueText.innerText =
      "🔎 بەڵگەی ٢: دیلان دەڵێت لە ئاشپەزخانە بووە، بەڵام چرای ئاشپەزخانە لەو کاتەدا کوژاوە بوو.";
  }

  if (number === 3) {
    clueText.innerText =
      "🔎 بەڵگەی ٣: لە حەوشەکەدا شوێنی پێیەک دۆزرایەوە کە بەرەو پەنجەرەی ماڵ دەچوو.";
  }

  if (number === 4) {
    clueText.innerText =
      "🧩 بەڵگەی ٤: کەمێک خاک لەسەر جلوبەرگی هێمن دۆزرایەوە، بەڵام ئەو دەڵێت هەموو شەوەکە لە حەوشە نەبووە.";
  }

}
function solveCase2(answer) {

  if (answer === "aras") {

  if (!case2Solved) {

    case2Solved = true;
    localStorage.setItem("case2Solved", "true");

    solvedCases = 2;
    localStorage.setItem("solvedCases", solvedCases);

    playerPoints += 100;
    localStorage.setItem("playerPoints", playerPoints);

    playerXP += 100;
    localStorage.setItem("playerXP", playerXP);
  }

    document.getElementById("case2Page").style.display = "none";
    document.getElementById("resultPage").style.display = "flex";

    document.getElementById("resultTitle").innerText =
      "🎉 دۆسیەی دووەم چارەسەر کرا!";

    document.getElementById("resultText").innerText =
      "پیرۆزە گەورەم بۆ چارەسەر کردنی دۆسیەکە 🫡🎉";

    document.getElementById("finalXP").innerText =
      playerXP;

    document.getElementById("finalRank").innerText =
      getRank();

    updatePlayerStats();

  } else {

    playerPoints -= 50;

    if (playerPoints < 0) {
      playerPoints = 0;
    }

    localStorage.setItem("playerPoints", playerPoints);

    document.getElementById("case2Page").style.display = "none";
    document.getElementById("judgePage").style.display = "flex";

    document.getElementById("judgeText").innerText =
      "❌ وەڵامەکەت هەڵەیە!\nدادوەر بڕیاری دا 50 Points لێت کەم بکرێت. ⚖️";

    document.getElementById("judgePoints").innerText =
      playerPoints;

  }

}
function openCase3() {

  document.getElementById("cases").style.display = "none";

  document.getElementById("case3Page").style.display = "flex";

}
function showCase3Clue(number) {

  const clueText =
    document.getElementById("case3ClueText");

  if (number === 1) {
    clueText.innerText =
      "🔎 بەڵگەی ١: لەسەر دەستەکانی سارا پەنجەمۆری ڕۆنی دۆزرایەوە.";
  }

  if (number === 2) {
    clueText.innerText =
      "🔎 بەڵگەی ٢: کامێرای کۆگا پیشانی داوە ناز لە کاتی ونبوونەکەدا لە کۆگا بووە.";
  }

  if (number === 3) {
    clueText.innerText =
      "🔎 بەڵگەی ٣: رێباز دەڵێت لە دەرەوە بووە، بەڵام شوێنی پێی لە ناو بیناکە دۆزرایەوە.";
  }

  if (number === 4) {
    clueText.innerText =
      "🧩 بەڵگەی ٤: کلیلی شوێنی ئەڵماسەکە لە ژووری میوان دۆزرایەوە، شوێنێک کە سارا دەڵێت تێیدا بووە.";
  }

}
function solveCase3(answer) {

  if (answer === "sara") {

    if (!case3Solved) {

  case3Solved = true;
  localStorage.setItem("case3Solved", "true");

  solvedCases = 3;
  localStorage.setItem("solvedCases", solvedCases);

  playerPoints += 100;
  localStorage.setItem("playerPoints", playerPoints);

  playerXP += 100;
  localStorage.setItem("playerXP", playerXP);
}

    document.getElementById("case3Page").style.display = "none";
    document.getElementById("resultPage").style.display = "flex";

    document.getElementById("resultTitle").innerText =
      "🎉 دۆسیەی سێیەم چارەسەر کرا!";

    document.getElementById("resultText").innerText =
      "پیرۆزە گەورەم بۆ چارەسەر کردنی دۆسیەکە 🫡🎉";

    document.getElementById("finalXP").innerText =
      playerXP;

    document.getElementById("finalRank").innerText =
      getRank();

    updatePlayerStats();

  } else {

    playerPoints -= 50;

    if (playerPoints < 0) {
      playerPoints = 0;
    }

    localStorage.setItem("playerPoints", playerPoints);

    document.getElementById("case3Page").style.display = "none";
    document.getElementById("judgePage").style.display = "flex";

    document.getElementById("judgeText").innerText =
      "❌ وەڵامەکەت هەڵەیە!\nدادوەر بڕیاری دا 50 Points لێت کەم بکرێت. ⚖️";

    document.getElementById("judgePoints").innerText =
      playerPoints;

  }

}