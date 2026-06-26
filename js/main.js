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
  /* Services accordion inside mobile menu */
  var mmToggle = document.querySelector(".mm-toggle");
  var mmDrop = document.getElementById("mm-services");
  if (mmToggle && mmDrop) {
    mmToggle.addEventListener("click", function () {
      var open = mmDrop.classList.toggle("open");
      mmToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

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

  /* ---- Portfolio filter + load more ---- */
  var filterBtns = document.querySelectorAll(".filter button");
  var figures = Array.prototype.slice.call(document.querySelectorAll(".gallery figure"));
  var moreWrap = document.querySelector(".gallery-more");
  var moreBtn = document.querySelector("[data-load-more]");
  var STEP = 10;          // how many to show per "page"
  var currentCat = "all";
  var shown = STEP;

  function renderGallery() {
    var matches = figures.filter(function (fig) {
      return currentCat === "all" || fig.getAttribute("data-cat") === currentCat;
    });
    figures.forEach(function (fig) { fig.classList.add("is-hidden"); });
    matches.slice(0, shown).forEach(function (fig) { fig.classList.remove("is-hidden"); });
    if (moreWrap) moreWrap.hidden = matches.length <= shown;
  }

  if (figures.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentCat = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        shown = STEP;          // reset to first 10 when switching category
        renderGallery();
      });
    });
    if (moreBtn) moreBtn.addEventListener("click", function () {
      shown += STEP;
      renderGallery();
    });
    renderGallery();
  }

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
