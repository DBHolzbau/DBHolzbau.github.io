(() => {
  const STORAGE_KEY = "dp-cookie-consent-v1";
  const defaults = {
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: null,
  };

  const labels = {
    analytics: "Statistik",
    marketing: "Marketing",
  };

  let preferences = loadPreferences();
  let banner;
  let modal;
  let statusButton;

  function loadPreferences() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      return {
        ...defaults,
        ...parsed,
        necessary: true,
      };
    } catch {
      return null;
    }
  }

  function savePreferences(nextPreferences) {
    preferences = {
      ...defaults,
      ...nextPreferences,
      necessary: true,
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    applyPreferences();
    syncForm();
    toggleBanner(false);
    toggleModal(false);
    updateStatusButton();
  }

  function hasConsent(category) {
    return Boolean(preferences && preferences[category]);
  }

  function applyPreferences() {
    document.documentElement.dataset.cookieAnalytics = hasConsent("analytics") ? "granted" : "denied";
    document.documentElement.dataset.cookieMarketing = hasConsent("marketing") ? "granted" : "denied";

    activateDeferredNodes("analytics");
    activateDeferredNodes("marketing");

    window.dispatchEvent(
      new CustomEvent("dp-cookie-consent:updated", {
        detail: getPreferences(),
      })
    );
  }

  function activateDeferredNodes(category) {
    if (!hasConsent(category)) return;

    document
      .querySelectorAll(`[data-consent-category="${category}"]:not([data-consent-loaded="true"])`)
      .forEach((node) => {
        if (node.tagName === "SCRIPT") {
          const script = document.createElement("script");

          Array.from(node.attributes).forEach((attribute) => {
            if (
              attribute.name !== "type" &&
              attribute.name !== "data-consent-category" &&
              attribute.name !== "data-consent-loaded"
            ) {
              script.setAttribute(attribute.name, attribute.value);
            }
          });

          script.textContent = node.textContent;
          node.replaceWith(script);
          return;
        }

        if (node.tagName === "IFRAME" && node.dataset.src) {
          node.src = node.dataset.src;
          node.dataset.consentLoaded = "true";
        }
      });
  }

  function getPreferences() {
    return preferences ? { ...preferences } : { ...defaults };
  }

  function buildUi() {
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "cookie-banner-title");
    banner.setAttribute("aria-describedby", "cookie-banner-text");
    banner.innerHTML = `
      <div class="cookie-banner__content">
        <p class="cookie-banner__eyebrow">Datenschutz &amp; Cookies</p>
        <h2 id="cookie-banner-title">Ihre Privatsphaere bleibt auf dieser Website die Vorgabe.</h2>
        <p id="cookie-banner-text">
          Wir verwenden nur technisch notwendige Speicherungen, um Ihre Cookie-Entscheidung zu merken.
          Optionale Kategorien wie Statistik oder Marketing bleiben standardmaessig deaktiviert und
          duerfen erst nach Ihrer ausdruecklichen Einwilligung eingesetzt werden.
          Details finden Sie in unserer <a href="datenschutz.html">Datenschutzerklaerung</a>.
        </p>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn-secondary cookie-action" data-cookie-action="reject">Ablehnen</button>
          <button type="button" class="btn btn-outline cookie-action cookie-action--light" data-cookie-action="settings">Einstellungen</button>
          <button type="button" class="btn btn-primary cookie-action" data-cookie-action="accept">Alle akzeptieren</button>
        </div>
      </div>
    `;

    modal = document.createElement("div");
    modal.className = "cookie-modal";
    modal.setAttribute("hidden", "");
    modal.innerHTML = `
      <div class="cookie-modal__backdrop" data-cookie-close></div>
      <div class="cookie-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
        <button type="button" class="cookie-modal__close" aria-label="Dialog schliessen" data-cookie-close>&times;</button>
        <p class="cookie-banner__eyebrow">Cookie-Einstellungen</p>
        <h2 id="cookie-modal-title">Einwilligungen verwalten</h2>
        <p class="cookie-modal__intro">
          Notwendige Speicherungen sind fuer die sichere Funktion und fuer die Speicherung Ihrer Auswahl erforderlich.
          Optionale Kategorien koennen Sie jederzeit zusaetzlich erlauben oder widerrufen.
        </p>
        <div class="cookie-option">
          <div>
            <h3>Notwendig</h3>
            <p>Erforderlich fuer Grundfunktionen der Website und um Ihre Datenschutz-Auswahl zu speichern.</p>
          </div>
          <label class="cookie-switch">
            <input type="checkbox" checked disabled />
            <span>Immer aktiv</span>
          </label>
        </div>
        <div class="cookie-option">
          <div>
            <h3>Statistik</h3>
            <p>Nur fuer Reichweitenmessung oder Analyse. Auf dieser Website derzeit nicht aktiv eingebunden.</p>
          </div>
          <label class="cookie-switch">
            <input type="checkbox" data-cookie-checkbox="analytics" />
            <span>Erlauben</span>
          </label>
        </div>
        <div class="cookie-option">
          <div>
            <h3>Marketing</h3>
            <p>Nur fuer externe Werbe-, Tracking- oder Remarketing-Dienste. Auf dieser Website derzeit nicht aktiv eingebunden.</p>
          </div>
          <label class="cookie-switch">
            <input type="checkbox" data-cookie-checkbox="marketing" />
            <span>Erlauben</span>
          </label>
        </div>
        <div class="cookie-modal__actions">
          <button type="button" class="btn btn-secondary cookie-action" data-cookie-action="reject">Nur notwendige</button>
          <button type="button" class="btn btn-outline cookie-action cookie-action--dark" data-cookie-action="save">Auswahl speichern</button>
          <button type="button" class="btn btn-primary cookie-action" data-cookie-action="accept">Alle akzeptieren</button>
        </div>
      </div>
    `;

    statusButton = document.createElement("button");
    statusButton.type = "button";
    statusButton.className = "cookie-status-button";
    statusButton.textContent = "Cookie-Einstellungen";
    statusButton.addEventListener("click", openSettings);

    document.body.append(banner, modal, statusButton);
    bindUi();
    syncForm();
    updateStatusButton();
  }

  function bindUi() {
    document.querySelectorAll("[data-open-cookie-settings]").forEach((button) => {
      button.addEventListener("click", openSettings);
    });

    banner.querySelector('[data-cookie-action="accept"]').addEventListener("click", acceptAll);
    banner.querySelector('[data-cookie-action="reject"]').addEventListener("click", rejectAll);
    banner.querySelector('[data-cookie-action="settings"]').addEventListener("click", openSettings);

    modal.querySelectorAll('[data-cookie-action="accept"]').forEach((button) => {
      button.addEventListener("click", acceptAll);
    });
    modal.querySelectorAll('[data-cookie-action="reject"]').forEach((button) => {
      button.addEventListener("click", rejectAll);
    });
    modal.querySelector('[data-cookie-action="save"]').addEventListener("click", saveSelection);
    modal.querySelectorAll("[data-cookie-close]").forEach((button) => {
      button.addEventListener("click", () => toggleModal(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") toggleModal(false);
    });
  }

  function syncForm() {
    if (!modal) return;

    modal.querySelector('[data-cookie-checkbox="analytics"]').checked = hasConsent("analytics");
    modal.querySelector('[data-cookie-checkbox="marketing"]').checked = hasConsent("marketing");
  }

  function acceptAll() {
    savePreferences({
      analytics: true,
      marketing: true,
    });
  }

  function rejectAll() {
    savePreferences({
      analytics: false,
      marketing: false,
    });
  }

  function saveSelection() {
    savePreferences({
      analytics: modal.querySelector('[data-cookie-checkbox="analytics"]').checked,
      marketing: modal.querySelector('[data-cookie-checkbox="marketing"]').checked,
    });
  }

  function openSettings() {
    syncForm();
    toggleModal(true);
  }

  function toggleBanner(visible) {
    if (!banner) return;
    banner.hidden = !visible;
  }

  function toggleModal(open) {
    if (!modal) return;
    modal.hidden = !open;
    document.body.classList.toggle("cookie-modal-open", open);
  }

  function updateStatusButton() {
    if (!statusButton) return;

    if (!preferences) {
      statusButton.classList.remove("is-visible");
      return;
    }

    const activeCategories = ["analytics", "marketing"].filter(hasConsent);
    const suffix = activeCategories.length
      ? `: ${activeCategories.map((category) => labels[category]).join(", ")}`
      : ": nur notwendig";

    statusButton.textContent = `Cookie-Einstellungen${suffix}`;
    statusButton.classList.add("is-visible");
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildUi();
    applyPreferences();
    toggleBanner(!preferences);

    window.DPHolzbauCookieConsent = {
      getPreferences,
      hasConsent,
      openSettings,
    };
  });
})();
