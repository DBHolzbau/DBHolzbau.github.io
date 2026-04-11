document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("kontakt-form");
  const fallbackButton = document.getElementById("mail-fallback-btn");
  const messageBox = document.getElementById("form-message");

  if (!form || !fallbackButton) return;

  function openMailClientFromForm(formElement) {
    const formData = new FormData(formElement);
    const recipientName = "Patrick Doppelhofer";
    const recipientEmail = "patrick.doppelhofer@dpholzbau.com";
    const recipient = `"${recipientName}" <${recipientEmail}>`;
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const telefon = (formData.get("telefon") || "").toString().trim();
    const nachricht = (formData.get("nachricht") || "").toString().trim();

    const subject = `Anfrage ueber DP Holzbau Website${name ? ` - ${name}` : ""}`;
    const body =
`Guten Tag,

ich moechte eine Anfrage stellen.

Name: ${name}
E-Mail: ${email}
Telefon: ${telefon || "-"}

Nachricht:
${nachricht}
`;

    const mailtoUrl =
      `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

  fallbackButton.addEventListener("click", () => {
    openMailClientFromForm(form);

    if (messageBox) {
      messageBox.innerHTML =
        "<p class='form-feedback form-feedback--success'>Ihr E-Mail-Programm sollte sich jetzt mit den vorausgefuellten Daten oeffnen.</p>";
    }
  });
});
