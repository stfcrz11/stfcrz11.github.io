(function () {
  "use strict";

  /* ---------- one-page navigation: highlight the section in view ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".top nav a"));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  var top = document.querySelector(".top");

  function onScroll() {
    var y = window.scrollY + 120;
    var current = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
    // At the very bottom, the last section is the one being read
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.length - 1;
    navLinks.forEach(function (a, i) {
      if (i === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    top.classList.toggle("scrolled", window.scrollY > 4);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- reveal sections as they scroll into view ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var targets = document.querySelectorAll(".strip-bar, .about > *, .sec-head, .card, .panel, .cta");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(targets, function (el) { el.classList.add("reveal"); io.observe(el); });
  }

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
  var kind = "Screenshot";

  function render() {
    var s = shots[idx];
    gImg.src = s.src;
    gImg.alt = s.cap;
    gCap.textContent = s.cap;
    gCount.textContent = kind + " " + (idx + 1) + " of " + shots.length;
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
      kind = btn.getAttribute("data-kind") || "Screenshot";
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

  /* ---------- light / dark theme (follows the system until the visitor picks one) ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme");
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return darkQuery && darkQuery.matches ? "dark" : "light";
  }
  function labelTheme() {
    var other = currentTheme() === "dark" ? "light" : "dark";
    themeBtn.setAttribute("aria-label", "Switch to " + other + " theme");
    themeBtn.title = "Switch to " + other + " theme";
  }
  themeBtn.addEventListener("click", function () {
    var other = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", other);
    try { localStorage.setItem("theme", other); } catch (e) {}
    labelTheme();
  });
  if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener("change", labelTheme);
  labelTheme();

  document.getElementById("year").textContent = new Date().getFullYear();
})();
