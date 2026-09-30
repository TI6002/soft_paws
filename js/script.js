document.addEventListener("DOMContentLoaded", function () {

  // =====================================================
  // 1. MOBILĀ IZVĒLNE
  // =====================================================

  // Atrodam izvēlnes pogu un pašu izvēlni
  var button = document.getElementById("navToggle");
  var menu = document.getElementById("primaryNav");

  // Pārbaudām, vai poga un izvēlne pastāv
  if (button && menu) {

    // Pēc pogas nospiešanas atveram vai aizveram izvēlni
    button.onclick = function () {

      // Pievienojam vai noņemam klasi "is-open"
      menu.classList.toggle("is-open");

      // Mainām aria-expanded vērtību
      if (menu.classList.contains("is-open")) {
        button.setAttribute("aria-expanded", "true");
      } else {
        button.setAttribute("aria-expanded", "false");
      }
    };

    // Pēc saites izvēles aizveram izvēlni
    menu.querySelectorAll("a").forEach(function (link) {

      link.onclick = function () {
        menu.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      };

    });
  }


  // =====================================================
  // 2. DZĪVNIEKU FILTRS
  // =====================================================

  // Atrodam filtra pogas, dzīvnieku kartītes
  // un ziņojumu, ja dzīvnieki nav atrasti
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".animal-card");
  var empty = document.getElementById("animalEmpty");

  // Katrai filtra pogai pievienojam darbību
  buttons.forEach(function (button) {

    button.onclick = function () {

      // Noņemam aktīvo klasi visām pogām
      buttons.forEach(function (b) {
        b.classList.remove("is-active");
      });

      // Pievienojam aktīvo klasi nospiestajai pogai
      button.classList.add("is-active");

      // Iegūstam izvēlēto filtru
      // Piemēram: "cat", "dog" vai "all"
      var filter = button.getAttribute("data-filter");

      // Skaitām parādīto dzīvnieku skaitu
      var count = 0;

      // Pārbaudām katru dzīvnieku kartīti
      cards.forEach(function (card) {

        // Iegūstam dzīvnieka sugu
        var species = card.getAttribute("data-species");

        // Pārbaudām, vai dzīvnieks atbilst filtram
        if (filter === "all" || species === filter) {

          // Parādām kartīti
          card.style.display = "";
          count++;

        } else {

          // Paslēpjam kartīti
          card.style.display = "none";
        }
      });

      // Ja dzīvnieku nav, parādām ziņojumu
      if (empty) {
        empty.hidden = count > 0;
      }
    };
  });


  // =====================================================
  // 3. STATISTIKAS SKAITĪTĀJI
  // =====================================================

  // Atrodam visus statistikas skaitītājus
  var numbers = document.querySelectorAll(".stat-number");

  // Funkcija palielina skaitli no 0 līdz vajadzīgajam skaitlim
  function countUp(element) {

    // Iegūstam beigu skaitli no data-count
    var target = parseInt(element.getAttribute("data-count"));

    // Sākam skaitīšanu no nulles
    var number = 0;

    // Pakāpeniski palielinām skaitli
    var timer = setInterval(function () {

      number++;
      element.textContent = number;

      // Kad sasniegts vajadzīgais skaitlis, apturam skaitītāju
      if (number >= target) {
        clearInterval(timer);
      }

    }, 1200 / target);
  }


  // Palaižam skaitītājus, kad tie parādās ekrānā
  if ("IntersectionObserver" in window) {

    var observer = new IntersectionObserver(function (entries) {

      entries.forEach(function (entry) {

        // Pārbaudām, vai elements ir redzams ekrānā
        if (entry.isIntersecting) {

          // Palaižam skaitītāju
          countUp(entry.target);

          // Vairs neuzraugām šo skaitītāju
          observer.unobserve(entry.target);
        }
      });

    });

    // Uzraugām katru skaitītāju
    numbers.forEach(function (number) {
      observer.observe(number);
    });

  } else {

    // Ja IntersectionObserver nav pieejams,
    // palaižam visus skaitītājus uzreiz
    numbers.forEach(function (number) {
      countUp(number);
    });
  }


  // =====================================================
  // 4. BRĪVPRĀTĪGĀ PIETEIKUMA FORMA
  // =====================================================

  // Atrodam formu un vietu, kur parādīt ziņojumu
  var form = document.getElementById("volunteerForm");
  var message = document.getElementById("formFeedback");

  // Pārbaudām, vai forma pastāv
  if (form) {

    // Kad lietotājs nosūta formu
    form.onsubmit = function (event) {

      // Neļaujam lapai pārlādēties
      event.preventDefault();

      // Pārbaudām obligātos laukus
      if (!form.checkValidity()) {

        message.textContent =
          "Lūdzu, aizpildiet visus obligātos laukus (atzīmēti ar *).";

        message.className = "form-feedback error";

        return;
      }

      // Iegūstam lietotāja vārdu
      var name = document.getElementById("fullName").value.trim();

      // Parādām ziņojumu par veiksmīgu pieteikumu
      message.textContent =
        "Paldies, " + name +
        "! Pieteikums nosūtīts, kurators sazināsies ar jums divu darba dienu laikā.";

      message.className = "form-feedback ok";

      // Notīrām formas laukus
      form.reset();
    };
  }


  // =====================================================
  // 5. PAŠREIZĒJAIS GADS KĀJENĒ
  // =====================================================

  // Atrodam elementu, kurā jāparāda gads
  var year = document.getElementById("year");

  // Ievietojam pašreizējo gadu
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});