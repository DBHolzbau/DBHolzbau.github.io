document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  function updateSlider(card, newIndex) {
    const images = card.querySelectorAll(".service-image");
    const dots = card.querySelectorAll(".dot");

    if (!images.length) return;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    images.forEach((img, index) => {
      img.classList.toggle("active", index === newIndex);
    });

    dots.forEach((dot, index) => {
      const isActive = index === newIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    card.dataset.currentSlide = String(newIndex);
  }

  serviceCards.forEach((card) => {
    const slider = card.querySelector(".card-slider");
    if (!slider) return;

    slider.addEventListener("click", (event) => {
      const directionButton = event.target.closest("[data-slide-direction]");
      if (directionButton) {
        const currentIndex = parseInt(card.dataset.currentSlide || "0", 10);
        const direction = parseInt(directionButton.dataset.slideDirection || "0", 10);
        updateSlider(card, currentIndex + direction);
        return;
      }

      const dotButton = event.target.closest("[data-slide-to]");
      if (dotButton) {
        updateSlider(card, parseInt(dotButton.dataset.slideTo || "0", 10));
      }
    });

    slider.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      const currentIndex = parseInt(card.dataset.currentSlide || "0", 10);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      updateSlider(card, currentIndex + direction);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const nachrichtFeld = document.getElementById("nachricht");
  const leistung = params.get("leistung");

  if (leistung && nachrichtFeld) {
    nachrichtFeld.value =
`Grundanfrage:
Ich interessiere mich für die Leistung "${leistung}".

Weitere Anmerkungen:
`;
    const neueUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, neueUrl);
  }

  const form = document.getElementById("kontakt-form");
  const messageBox = document.getElementById("form-message");

  if (!form || !messageBox) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    if (!submitButton) return;

    submitButton.disabled = true;
    submitButton.textContent = "Wird gesendet…";
    messageBox.innerHTML = "";

    const data = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const json = await response.json();

      if (response.ok && json.success) {
        messageBox.innerHTML =
          "<p class='form-feedback form-feedback--success'>Danke! Ihre Anfrage wurde erfolgreich gesendet.</p>";
        form.reset();
      } else {
        throw new Error(json.message || "Fehler");
      }
    } catch {
      messageBox.innerHTML =
        "<p class='form-feedback form-feedback--error'>Fehler beim Senden. Bitte prüfen Sie Ihre Eingaben oder nutzen Sie alternativ den Button „Per E-Mail öffnen“.</p>";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Anfrage senden";
    }
  });
});
