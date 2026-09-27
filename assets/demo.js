(function () {
  "use strict";
  var box = document.getElementById("petbox");
  if (!box) return;

  /* ---------- Sevme denemesi ---------- */
  var petBtn = document.getElementById("btn-pet");
  var bankBtn = document.getElementById("btn-bank");
  var els = {
    mood: document.getElementById("mood"),
    note: document.getElementById("mood-note"),
    meter: document.getElementById("meter"),
    fill: document.getElementById("meter-fill"),
    score: document.getElementById("s-score"),
    combo: document.getElementById("s-combo"),
    bank: document.getElementById("s-bank"),
    toast: document.getElementById("toast"),
    earL: document.getElementById("ear-l"),
    earR: document.getElementById("ear-r"),
    eyeL: document.getElementById("eye-l"),
    eyeR: document.getElementById("eye-r")
  };
  var S = { heat: 0, score: 0, combo: 1, bank: 0, holding: false, warn: 0, stroke: 0, last: 0, running: false };

  var MOODS = [
    { max: 39, name: "Rahat", note: "Mırlıyor. Devam edebilirsin." },
    { max: 64, name: "Doyuyor", note: "Kuyruğunun ucu oynamaya başladı." },
    { max: 84, name: "Rahatsız", note: "Kulaklar geride, mırlama azaldı." },
    { max: 99, name: "Son uyarı", note: "Tıslıyor. Şimdi bırakırsan bonus alırsın." },
    { max: 100, name: "Pati hazır!", note: "Hemen puanı al!" }
  ];

  function moodFor(h) {
    for (var i = 0; i < MOODS.length; i++) if (h <= MOODS[i].max) return MOODS[i];
    return MOODS[MOODS.length - 1];
  }

  function say(text, kind) {
    els.toast.textContent = text;
    els.toast.className = "toast" + (kind ? " " + kind : "");
  }

  function draw() {
    var h = Math.round(S.heat);
    var m = S.warn > 0 ? MOODS[4] : moodFor(h);
    els.mood.textContent = m.name;
    els.note.textContent = S.heat === 0 && S.score === 0 ? "Mırlıyor. Basılı tut ve sev." : m.note;
    els.fill.style.width = h + "%";
    els.fill.style.backgroundSize = (h > 0 ? 10000 / h : 100) + "% 100%";
    els.meter.setAttribute("aria-valuenow", String(h));
    els.score.textContent = String(S.score);
    els.combo.textContent = "x" + S.combo.toFixed(1);
    els.bank.textContent = String(S.bank);
    var back = Math.min(1, Math.max(0, (S.heat - 50) / 50));
    els.earL.style.transform = "rotate(" + (-back * 38) + "deg)";
    els.earR.style.transform = "rotate(" + (back * 38) + "deg)";
    var squint = S.holding && S.heat < 40 ? 1.5 : 6 - back * 2;
    els.eyeL.setAttribute("ry", String(squint));
    els.eyeR.setAttribute("ry", String(squint));
  }

  function paw() {
    var kept = Math.round(S.score * 0.25);
    S.bank += kept;
    S.score = 0; S.combo = 1; S.heat = 0; S.warn = 0; S.holding = false;
    petBtn.setAttribute("aria-pressed", "false");
    box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
    say("Pati! Seans puanının %75'i gitti, " + kept + " Mırlama kaldı.", "bad");
  }

  function tick(t) {
    var dt = S.last ? Math.min(0.1, (t - S.last) / 1000) : 0;
    S.last = t;
    if (S.warn > 0) {
      S.warn -= dt;
      if (S.warn <= 0) paw();
    } else if (S.holding) {
      S.heat = Math.min(100, S.heat + 24 * dt);
      S.stroke += dt;
      if (S.stroke >= 0.45) {
        S.stroke -= 0.45;
        S.score += Math.round(10 * S.combo);
        S.combo = Math.min(3, Math.round((S.combo + 0.1) * 10) / 10);
      }
      if (S.heat >= 100) { S.heat = 100; S.warn = 0.8; }
    } else {
      S.heat = Math.max(0, S.heat - 16 * dt);
    }
    draw();
    if (S.holding || S.warn > 0 || S.heat > 0) { requestAnimationFrame(tick); }
    else { S.running = false; S.last = 0; }
  }

  function run() {
    if (!S.running) { S.running = true; S.last = 0; requestAnimationFrame(tick); }
  }

  function startPet() {
    if (S.warn > 0) return;
    S.holding = true; S.stroke = 0;
    petBtn.setAttribute("aria-pressed", "true");
    if (els.toast.className.indexOf("bad") >= 0 || els.toast.className.indexOf("good") >= 0) say("");
    run();
  }

  function stopPet() {
    if (!S.holding) return;
    S.holding = false;
    petBtn.setAttribute("aria-pressed", "false");
    run();
  }

  function bankScore() {
    if (S.score === 0) { say("Önce biraz sev."); return; }
    var bonus = S.heat >= 70;
    var gained = Math.round(S.score * (bonus ? 1.15 : 1));
    S.bank += gained;
    S.score = 0; S.combo = 1; S.warn = 0; S.holding = false;
    petBtn.setAttribute("aria-pressed", "false");
    say(bonus ? "Tam zamanında! +%15 bonusla " + gained + " Mırlama." : gained + " Mırlama güvende.", "good");
    run();
    draw();
  }

  petBtn.addEventListener("pointerdown", function (e) { if (e.button === 0) { e.preventDefault(); try { petBtn.setPointerCapture(e.pointerId); } catch (x) {} startPet(); } });
  petBtn.addEventListener("pointerup", stopPet);
  petBtn.addEventListener("pointercancel", stopPet);
  petBtn.addEventListener("lostpointercapture", stopPet);
  petBtn.addEventListener("keydown", function (e) { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); startPet(); } });
  petBtn.addEventListener("keyup", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); stopPet(); } });
  petBtn.addEventListener("click", function (e) { e.preventDefault(); });
  bankBtn.addEventListener("click", bankScore);
  box.addEventListener("contextmenu", function (e) { e.preventDefault(); bankScore(); });
  draw();
})();
