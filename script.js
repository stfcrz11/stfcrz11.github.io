(function () {
  var root = document.documentElement;

  // Theme: reversible, remembered, labelled with the action it performs.
  var themeBtn = document.getElementById("theme");
  function currentTheme() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function label() { themeBtn.textContent = currentTheme() === "dark" ? "Light theme" : "Dark theme"; }
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  label();
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  // Copy email with visible, announced feedback. Falls back to mailto text if copy fails.
  var copyBtn = document.getElementById("copy-email");
  var status = document.getElementById("status");
  var email = copyBtn.getAttribute("data-email");
  var timer;
  function say(msg) {
    status.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ""; }, 4000);
  }
  copyBtn.addEventListener("click", function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        function () { say("Email address copied: " + email); },
        function () { say("Could not copy. Select the address and copy it: " + email); }
      );
    } else {
      say("Copy is not available here. The address is " + email);
    }
  });

  // "You are here": mark the nav link of the section in view.
  var links = Array.prototype.slice.call(document.querySelectorAll(".bar nav a"));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          var a = map[en.target.id];
          if (a) a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
