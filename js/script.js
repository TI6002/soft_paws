/* =========================================================
   ТЁПЛЫЕ ЛАПКИ — скрипты сайта
   1) мобильное меню
   2) фильтр карточек питомцев по виду
   3) анимированные счётчики статистики (запускаются при показе)
   4) проверка и "отправка" формы волонтёра
   5) текущий год в подвале
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1) мобильное меню ---------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // закрываем меню после выбора пункта
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2) фильтр питомцев ---------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var animalCards = document.querySelectorAll(".animal-card");
  var emptyMessage = document.getElementById("animalEmpty");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      var species = btn.getAttribute("data-filter");
      var visibleCount = 0;

      animalCards.forEach(function (card) {
        var matches = species === "all" || card.getAttribute("data-species") === species;
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    });
  });

  /* ---------- 3) счётчики статистики ---------- */
  var statNumbers = document.querySelectorAll(".stat-number");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && statNumbers.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    statNumbers.forEach(function (el) { observer.observe(el); });
  } else {
    // на всякий случай, если IntersectionObserver недоступен
    statNumbers.forEach(animateCount);
  }

  /* ---------- 4) форма волонтёра ---------- */
  var form = document.getElementById("volunteerForm");
  var feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = "Lūdzu, aizpildiet visus obligātos laukus (atzīmēti ar *).";
        feedback.className = "form-feedback error";
        return;
      }

      var name = document.getElementById("fullName").value.trim();
      feedback.textContent = "Paldies, " + name + "! Pieteikums nosūtīts, kurators sazināsies ar jums divu darba dienu laikā.";
      feedback.className = "form-feedback ok";
      form.reset();
    });
  }

  /* ---------- 5) текущий год в подвале ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
