(function () {
  "use strict";

  /* ---------- views (Home, About, Resume, Portfolio) ---------- */
  var ids = ["home", "about", "resume", "portfolio"];
  var titles = { home: "Home", about: "About", resume: "Resume", portfolio: "Portfolio" };
  var views = {};
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-view]"));
  ids.forEach(function (id) { views[id] = document.getElementById(id); });
  var first = true;

  function show(id, focus) {
    if (!views[id]) id = "home";
    ids.forEach(function (k) { views[k].hidden = k !== id; });
    links.forEach(function (a) {
      if (a.getAttribute("data-view") === id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    document.title = (id === "home" ? "" : titles[id] + " | ") + "Stefane Ballad Cerezo";
    var v = views[id];
    v.classList.remove("enter");
    void v.offsetWidth;
    if (!first) v.classList.add("enter");
    window.scrollTo(0, 0);
    if (focus) {
      var h = v.querySelector("[tabindex='-1']");
      if (h) h.focus({ preventScroll: true });
    }
    first = false;
  }

  function fromHash() { return (location.hash || "#home").slice(1); }
  window.addEventListener("hashchange", function () { show(fromHash(), true); });
  show(fromHash(), false);

  /* ---------- gallery dialog ---------- */
  var dlg = document.getElementById("gallery");
  var gImg = document.getElementById("g-img");
  var gTitle = document.getElementById("g-title");
  var gSub = document.getElementById("g-sub");
  var gCap = document.getElementById("g-cap");
  var gCount = document.getElementById("g-count");
  var prev = document.getElementById("g-prev");
  var next = document.getElementById("g-next");
  var shots = [];
  var idx = 0;

  function render() {
    var s = shots[idx];
    gImg.src = s.src;
    gImg.alt = s.cap;
    gCap.textContent = s.cap;
    gCount.textContent = "Screenshot " + (idx + 1) + " of " + shots.length;
    prev.disabled = shots.length < 2;
    next.disabled = shots.length < 2;
  }
  function step(d) { idx = (idx + d + shots.length) % shots.length; render(); }

  Array.prototype.forEach.call(document.querySelectorAll("[data-open]"), function (btn) {
    btn.addEventListener("click", function () {
      shots = btn.getAttribute("data-shots").split("|").map(function (p) {
        var parts = p.split("::");
        return { src: parts[0], cap: parts[1] || "" };
      });
      idx = 0;
      gTitle.textContent = btn.getAttribute("data-open");
      gSub.textContent = btn.getAttribute("data-sub") || "";
      render();
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    });
  });
  prev.addEventListener("click", function () { step(-1); });
  next.addEventListener("click", function () { step(1); });
  document.getElementById("g-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
    if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
  });

  /* ---------- full screen toggle (only where supported) ---------- */
  var fs = document.getElementById("fs");
  if (document.fullscreenEnabled) {
    fs.hidden = false;
    fs.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
