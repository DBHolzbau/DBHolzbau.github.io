document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("kontakt-form");
  const messageBox = document.getElementById("form-message");

  if (!form || !messageBox) return;

  const submitButton = form.querySelector("button[type='submit']");
  if (!submitButton) return;

  const hiddenFields = ["access_key", "subject", "from_name"];
  hiddenFields.forEach((name) => {
    const field = form.querySelector(`input[name="${name}"]`);
    if (field) field.disabled = true;
  });

  submitButton.textContent = "Anfrage per E-Mail vorbereiten";

  const privacyNote = document.createElement("p");
  privacyNote.className = "form-note";
  privacyNote.textContent =
    "Das Formular uebergibt Ihre Anfrage an Ihr Standard-E-Mail-Programm. Es erfolgt keine automatische Uebertragung an einen externen Formulardienst.";
  submitButton.before(privacyNote);

  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      submitButton.disabled = true;
      submitButton.textContent = "E-Mail wird vorbereitet...";
      messageBox.innerHTML = "";

      const data = new FormData(form);
      const honeypot = (data.get("website") || "").toString().trim();

      if (honeypot) {
        submitButton.disabled = false;
        submitButton.textContent = "Anfrage per E-Mail vorbereiten";
        return;
      }

      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const telefon = (data.get("telefon") || "").toString().trim();
      const nachricht = (data.get("nachricht") || "").toString().trim();

      const subject = "Neue Anfrage ueber DP Holzbau Website";
      const body =
`Neue Anfrage ueber die Website

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon || "-"}

Nachricht:
${nachricht}`;

      const mailtoUrl =
        `mailto:doppelhoferpatrick62@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;

      messageBox.innerHTML =
        "<p class='form-feedback form-feedback--success'>Ihr E-Mail-Programm sollte sich jetzt oeffnen. Falls nicht, schreiben Sie bitte direkt an doppelhoferpatrick62@gmail.com oder rufen Sie unter 0660 1500644 an.</p>";

      submitButton.disabled = false;
      submitButton.textContent = "Anfrage per E-Mail vorbereiten";
    },
    true
  );
});
