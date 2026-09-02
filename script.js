let playerName = "";
let playerXP = 0;


/* START GAME */

function startGame() {

  document.getElementById("home").style.display = "none";

  document.getElementById("account").style.display = "flex";

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


  document.getElementById("account").style.display = "none";

  document.getElementById("cases").style.display = "flex";


  document.getElementById("welcomeText").innerText =
    "بەخێربێیت، لێکۆڵەر " + playerName + " 🕵️‍♂️";


  updatePlayerStats();

}


/* UPDATE STATS */

function updatePlayerStats() {

  document.getElementById("xp").innerText =
    playerXP;


  document.getElementById("rank").innerText =
    getRank();

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

    playerXP += 100;


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

    alert(
      "❌ وەڵامەکەت هەڵەیە. دووبارە بەڵگەکان بخوێنەوە، لێکۆڵەر!"
    );

  }

}


/* BACK TO CASES */

function backToCases() {


  document.getElementById("casePage").style.display =
    "none";


  document.getElementById("resultPage").style.display =
    "none";


  document.getElementById("cases").style.display =
    "flex";


  updatePlayerStats();

}