/* =========================================================
   IRON CAGE MMA — site behaviour (vanilla JS, ~3 KB)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry, i) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
            el.classList.add("is-visible");
            io.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealables.forEach(function (el) { io.observe(el); });
    } else {
      revealables.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq__item.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Booking form validation (front-end only) ---------- */
  var form = document.querySelector("#booking-form");
  if (form) {
    var status = form.querySelector(".form__status");

    var setFieldError = function (field, message) {
      var wrap = field.closest(".field");
      var err = wrap ? wrap.querySelector(".field__error") : null;
      if (err) err.textContent = message || "";
      wrap.classList.toggle("has-error", Boolean(message));
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;

      var name = form.elements.name;
      var email = form.elements.email;
      var program = form.elements.program;
      var message = form.elements.message;

      if (!name.value.trim() || name.value.trim().length < 2) {
        setFieldError(name, "Please enter your name.");
        ok = false; firstBad = firstBad || name;
      } else setFieldError(name, "");

      var emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
      if (!emailRe.test(email.value.trim())) {
        setFieldError(email, "Please enter a valid email address.");
        ok = false; firstBad = firstBad || email;
      } else setFieldError(email, "");

      if (!program.value) {
        setFieldError(program, "Please choose a workshop.");
        ok = false; firstBad = firstBad || program;
      } else setFieldError(program, "");

      if (message.value.trim().length < 10) {
        setFieldError(message, "Tell us a little more (10+ characters).");
        ok = false; firstBad = firstBad || message;
      } else setFieldError(message, "");

      if (!ok) {
        if (status) {
          status.textContent = "Please fix the highlighted fields.";
          status.className = "form__status form__status--error";
        }
        if (firstBad) firstBad.focus();
        return;
      }

      if (status) {
        status.textContent =
          "Thanks " + name.value.trim().split(" ")[0] +
          "! Your trial request is noted. A coach will confirm by email within 24 hours.";
        status.className = "form__status form__status--ok";
      }
      form.reset();
    });

    form.addEventListener("input", function (e) {
      if (e.target.closest(".field")) setFieldError(e.target, "");
    });
  }
})();