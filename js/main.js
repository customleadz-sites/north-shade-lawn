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
    /* Arrange "All work": the 10 featured photos first (in client's order),
       then every other photo shuffled into a random mix — no repeats, none lost. */
    var gallery = document.querySelector(".gallery");
    if (gallery) {
      var featured = figures.filter(function (f) { return f.hasAttribute("data-featured"); })
        .sort(function (a, b) {
          return (+a.getAttribute("data-featured")) - (+b.getAttribute("data-featured"));
        });
      var rest = figures.filter(function (f) { return !f.hasAttribute("data-featured"); });
      for (var i = rest.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = rest[i]; rest[i] = rest[j]; rest[j] = tmp;
      }
      figures = featured.concat(rest);
      figures.forEach(function (f) { gallery.appendChild(f); });
    }

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

    /* ---- Lightbox (click a photo to open full size) ---- */
    var lb = document.getElementById("lightbox");
    if (lb) {
      var lbImg = lb.querySelector(".lightbox__img");
      var curIndex = 0;

      function visibleFigures() {
        return figures.filter(function (f) { return !f.classList.contains("is-hidden"); });
      }
      function showAt(list, i) {
        if (!list.length) return;
        curIndex = (i + list.length) % list.length;
        var img = list[curIndex].querySelector("img");
        lbImg.setAttribute("src", img.getAttribute("src"));
        lbImg.setAttribute("alt", img.getAttribute("alt") || "");
      }
      function openLb(fig) {
        var list = visibleFigures();
        var i = list.indexOf(fig);
        showAt(list, i < 0 ? 0 : i);
        lb.classList.add("open");
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
      function closeLb() {
        lb.classList.remove("open");
        lb.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      figures.forEach(function (fig) {
        fig.addEventListener("click", function () { openLb(fig); });
      });
      lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
      lb.querySelector(".lightbox__prev").addEventListener("click", function (e) {
        e.stopPropagation(); showAt(visibleFigures(), curIndex - 1);
      });
      lb.querySelector(".lightbox__next").addEventListener("click", function (e) {
        e.stopPropagation(); showAt(visibleFigures(), curIndex + 1);
      });
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") closeLb();
        else if (e.key === "ArrowLeft") showAt(visibleFigures(), curIndex - 1);
        else if (e.key === "ArrowRight") showAt(visibleFigures(), curIndex + 1);
      });
    }
  }

  /* ---- Contact form (Web3Forms via AJAX) ----
     Submits in the background to Web3Forms so the visitor stays on the
     page and sees the on-page "Thanks — we got it!" card. The access key
     and recipient are configured in contact.html. */
  var form = document.querySelector("form[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Native HTML5 validation (incl. US phone pattern) before sending.
      if (typeof form.reportValidity === "function" && !form.reportValidity()) {
        return;
      }

      var action = form.getAttribute("action") || "";
      var submitBtn = form.querySelector("button[type=submit]");
      var showSuccess = function () {
        form.classList.add("sent");
        var ok = form.querySelector(".form__success");
        if (ok) ok.classList.add("show");
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      };

      // No live endpoint configured → fall back to friendly demo message.
      if (action.indexOf("api.web3forms.com") === -1) {
        showSuccess();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.label = submitBtn.textContent;
        submitBtn.textContent = "Sending…";
      }

      fetch(action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success) {
            showSuccess();
          } else {
            alert("Sorry — something went wrong sending your request. Please call or text (989) 763-3899 and we'll take care of you.");
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = submitBtn.dataset.label || "Send my request";
            }
          }
        })
        .catch(function () {
          alert("Sorry — something went wrong sending your request. Please call or text (989) 763-3899 and we'll take care of you.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.label || "Send my request";
          }
        });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
