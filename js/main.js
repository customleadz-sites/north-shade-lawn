/* North Shade Lawn — interactions */
(function () {
  "use strict";

  /* ---- Sticky header solid state ---- */
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero, .page-hero");
  function onScroll() {
    if (!header) return;
    var trigger = hero ? hero.offsetHeight - 90 : 60;
    header.classList.toggle("is-solid", window.scrollY > trigger);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  var closeBtn = document.querySelector(".mobile-menu__close");
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
  if (menu) menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Portfolio filter ---- */
  var filterBtns = document.querySelectorAll(".filter button");
  var figures = document.querySelectorAll(".gallery figure");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      figures.forEach(function (fig) {
        var show = cat === "all" || fig.getAttribute("data-cat") === cat;
        fig.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---- Contact form (no-backend friendly) ----
     Works out of the box as a friendly "thank you" demo.
     To send real emails, set the <form> action to a Formspree
     endpoint (https://formspree.io) — instructions in README. */
  var form = document.querySelector("form[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      var isLive = action.indexOf("formspree.io") !== -1 || form.hasAttribute("data-live");
      if (!isLive) {
        e.preventDefault();
        form.classList.add("sent");
        var ok = form.querySelector(".form__success");
        if (ok) ok.classList.add("show");
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
