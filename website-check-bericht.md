# Website-Check Bericht: DP Holzbau
**Erstellt:** 2026-04-09
**Geprüft von:** Claude Code
**Status:** Vor Go-Live – Handlungsbedarf

---

## 1. Projektübersicht

| Merkmal | Details |
|---------|---------|
| **Betreiber** | Patrick Doppelhofer, DP Holzbau |
| **Adresse** | Schlosstal 41, 8191 Birkfeld, Österreich |
| **Telefon** | 0660 1500644 |
| **E-Mail** | doppelhoferpatrick62@gmail.com |
| **Technik-Stack** | HTML5, CSS3, JavaScript, PHP (Kontaktformular) |
| **Hosting-Anforderung** | PHP-fähiger Webserver (wegen `kontakt.php`) |
| **Dateien gesamt** | 33 (3 HTML, 1 CSS, 1 PHP, 25 Bilder, 3 DOCX) |
| **Bildgröße gesamt** | ca. 14,7 MB |

---

## 2. Dateistruktur

```
DPHolzbau/
├── index.html              ← Hauptseite
├── impressum.html          ← Impressum
├── agb.html                ← AGB
├── kontakt.php             ← Formular-Backend
├── style.css               ← Stylesheet
├── Bilder/
│   ├── logohell.svg        ← Logo (hell, 116 KB)
│   ├── logodunkel.png      ← Logo (dunkel, 1,4 MB)
│   ├── StartseiteohneText.png  ← Hero-Hintergrundbild (2,0 MB)
│   ├── Halle3.png          ← Hallenbau Foto (3,5 MB – zu groß!)
│   └── [21 weitere JPEG-Bilder]
├── DP_Holzbau_Homepage.docx
├── DP_Holzbau_Mehr_Kunden.docx
└── DP_Holzbau_SEO.docx
```

---

## 3. Technische Prüfung

### 3.1 Fehler (müssen behoben werden)

#### Logo-Pfad kaputt in impressum.html und agb.html
- **Problem:** Beide Seiten referenzieren `Logo Transparent.png` im Root-Verzeichnis – diese Datei existiert nicht.
- **Auswirkung:** Das Logo wird auf Impressum- und AGB-Seite nicht angezeigt (gebrochenes Bild-Icon).
- **Lösung:** Pfad auf `Bilder/logohell.svg` ändern.
- **Betroffene Zeilen:** `impressum.html:15`, `impressum.html:69`, `agb.html:15`, `agb.html:90`

#### Instagram-Link ist ein generischer Platzhalter
- **Problem:** Der "Instagram"-Button in der Hero-Sektion verlinkt auf `https://instagram.com/` (die Instagram-Startseite), nicht auf das Profil von DP Holzbau.
- **Auswirkung:** Besucher landen auf Instagram-Login statt auf dem Firmenprofil – schlechter Eindruck.
- **Lösung:** Entweder auf das echte Instagram-Profil verlinken (`https://instagram.com/dp.holzbau` o.ä.) oder den Button bis zur Profilerstellung entfernen.
- **Betroffene Zeile:** `index.html:52`

### 3.2 Warnungen (sollten optimiert werden)

#### Dateigröße: Halle3.png
- **Problem:** 3,5 MB für eine einzige Projektfoto ist sehr groß.
- **Auswirkung:** Langsame Ladezeit, schlechtere Google-Rankings (Core Web Vitals).
- **Lösung:** Als JPEG mit ca. 80% Qualität exportieren oder mit einem Tool wie Squoosh/TinyPNG komprimieren → Zielgröße unter 300 KB.

#### Dateigröße: logodunkel.png
- **Problem:** 1,4 MB für ein Logo (das auch als SVG vorliegt).
- **Auswirkung:** Wird im Footer geladen, verlangsamt die Seite.
- **Lösung:** Entweder `logohell.svg` auch im Footer verwenden oder ein komprimiertes PNG erstellen.

#### Hero-Hintergrundbild: StartseiteohneText.png
- **Problem:** 2,0 MB PNG – PNGs sind für Fotos ungeeignet.
- **Lösung:** Als JPEG oder WebP exportieren → Zielgröße unter 500 KB.

### 3.3 Positive Aspekte (technisch)

- Responsives Design mit Breakpoints bei 1100px, 900px, 700px
- Hamburger-Menü für Mobilgeräte vorhanden
- Kontaktformular mit Sicherheitsmaßnahmen:
  - Honeypot-Feld gegen Spam-Bots (`name="website"`)
  - E-Mail-Validierung mit `filter_var()`
  - Schutz gegen Header-Injection (Regex auf `\r\n`)
  - `strip_tags()` zur Eingabereinigung
- SEO-Meta-Tags vorhanden (Title, Description)
- `rel="noopener noreferrer"` bei externen Links korrekt gesetzt
- Smooth Scroll, CSS-Animationen und Hover-Effekte vorhanden

---

## 4. Rechtliche Prüfung (Österreich)

### 4.1 KRITISCH – vor Go-Live zwingend erforderlich

#### Datenschutzerklärung fehlt komplett

**Rechtsgrundlage:** Art. 13 DSGVO (EU-Datenschutz-Grundverordnung), gültig in Österreich seit 25.05.2018.

**Problem:** Das Kontaktformular erhebt personenbezogene Daten:
- Name
- E-Mail-Adresse
- Telefonnummer
- Nachrichteninhalt (kann personenbezogene Daten enthalten)

Diese Daten werden per E-Mail an `doppelhoferpatrick62@gmail.com` weitergeleitet. Damit liegt eine Verarbeitung personenbezogener Daten vor, die eine Datenschutzerklärung **zwingend** erfordert.

**Risiko ohne Datenschutzerklärung:**
- Abmahnungen durch Mitbewerber oder Abmahnvereine
- Beschwerden bei der österreichischen Datenschutzbehörde (DSB)
- Bußgelder bis zu 20 Mio. EUR oder 4% des Jahresumsatzes (Art. 83 DSGVO) – in der Praxis bei KMU deutlich geringer, aber reales Risiko

**Was die Datenschutzerklärung enthalten muss:**
1. Wer ist Verantwortlicher (Name, Adresse, Kontakt)
2. Welche Daten werden erhoben (Kontaktformular: Name, E-Mail, Tel., Nachricht)
3. Zweck der Verarbeitung (Bearbeitung von Anfragen)
4. Rechtsgrundlage (Art. 6 Abs. 1 lit. b DSGVO – Vertragsanbahnung oder lit. f – berechtigtes Interesse)
5. Speicherdauer (z.B. „Solange für die Bearbeitung erforderlich, danach gemäß gesetzlicher Aufbewahrungspflicht")
6. Empfänger der Daten (Gmail als E-Mail-Dienst von Google)
7. Rechte der Betroffenen: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Beschwerde bei DSB
8. Kontakt Datenschutzbehörde Österreich: www.dsb.gv.at

**Fehlende Verlinkung:**
- Kein Link zur Datenschutzerklärung im Footer aller Seiten
- Kein Datenschutzhinweis beim Kontaktformular (vor dem Absenden-Button)

---

#### Kein Datenschutzhinweis beim Kontaktformular

**Rechtsgrundlage:** Art. 13 DSGVO – Information zum Zeitpunkt der Erhebung.

**Problem:** Beim Kontaktformular fehlt ein sichtbarer Hinweis, dass die eingegebenen Daten verarbeitet werden und wie. Beim Absenden muss der Nutzer zumindest auf die Datenschutzerklärung hingewiesen werden.

**Lösung:** Unterhalb des Formulars / über dem Absenden-Button folgender Text:
> „Mit dem Absenden Ihrer Anfrage stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer [Datenschutzerklärung] zu."

---

### 4.2 WICHTIG – sollte vor Go-Live ergänzt werden

#### Impressum unvollständig

**Rechtsgrundlage:** § 5 ECG (E-Commerce-Gesetz), § 25 MedienG (Mediengesetz)

**Vorhandene Angaben:** Name, Adresse, Telefon, E-Mail, Unternehmensgegenstand – korrekt.

**Möglicherweise fehlende Angaben** (je nach Gewerbeanmeldung):

| Angabe | Pflicht wenn... | Status |
|--------|----------------|--------|
| **GISA-Nummer** (Gewerbeinformationssystem Austria) | Gewerbe angemeldet | Fehlt |
| **Zuständige Gewerbebehörde** | Gewerbe angemeldet | Fehlt |
| **WKO-Mitgliedschaft** | Pflichtmitglied WKO | Fehlt |
| **UID-Nummer** (Umsatzsteuer-ID) | USt-pflichtig | Fehlt |
| **Grundlegende Richtung** (§ 25 MedienG) | Immer bei Websites | Fehlt |

**Was fehlt konkret:**

Für § 25 MedienG muss die **grundlegende Richtung** der Website angegeben werden, z.B.:
> „Unternehmenswebsite zur Präsentation der Dienstleistungen von DP Holzbau."

Falls ein Gewerbe angemeldet ist (was für Zimmerei/Holzbau zu erwarten ist):
- GISA-Nummer nachschlagen unter: www.gisa.gv.at
- Zuständige Behörde: Bezirkshauptmannschaft Weiz
- WKO-Mitgliedschaft: Sparte Gewerbe und Handwerk, Innung der Zimmermeister

---

### 4.3 NIEDRIG – empfohlen

#### AGB-Ergänzungen

Die AGB sind grundsätzlich in Ordnung. Folgende Ergänzungen wären empfehlenswert:

- **Gerichtsstand** fehlt: „Als Gerichtsstand wird [Weiz/Graz] vereinbart." (bei B2B-Verträgen möglich)
- **Verbraucherrecht:** Bei Privatkundengeschäften gelten zwingende Verbraucherschutzregeln (FAGG bei Online-Vertragsschluss – 14 Tage Rücktrittsrecht). Da das Kontaktformular nur eine „unverbindliche Anfrage" ist und kein Vertragsschluss stattfindet, ist dies möglicherweise nicht unmittelbar relevant, aber ein Hinweis wäre sauber.

#### E-Mail-Adresse professionalisieren

- **Aktuell:** `doppelhoferpatrick62@gmail.com`
- **Empfehlung:** Bei Registrierung einer Domain (z.B. `dp-holzbau.at`) auch eine professionelle E-Mail anlegen: `office@dp-holzbau.at`
- **Auswirkung:** Rein optisch/professionell – keine rechtliche Pflicht.

---

## 5. Hosting-Anforderungen

Das Projekt ist **nicht vollständig statisch**, da `kontakt.php` PHP benötigt:

| Anforderung | Details |
|-------------|---------|
| **PHP** | Mindestens PHP 7.4, besser 8.x |
| **PHP mail()** | Muss auf dem Server aktiviert und konfiguriert sein |
| **SMTP-Alternative** | Falls `mail()` nicht zuverlässig funktioniert: PHPMailer + SMTP empfohlen |
| **HTTPS/SSL** | Zwingend erforderlich (DSGVO, Formular sendet personenbezogene Daten) |

**Empfohlene österreichische Hoster mit PHP & SSL:**
- Domaintechnik.at
- World4You.com
- Anexia.at
- Hosteurope.at

**Wichtig:** Der Hoster muss ein SSL-Zertifikat bereitstellen (Let's Encrypt kostenlos). Formulardaten dürfen nicht über HTTP (unverschlüsselt) übertragen werden.

---

## 6. Zusammenfassung: Offene Punkte vor Go-Live

| # | Priorität | Aufgabe | Aufwand |
|---|-----------|---------|---------|
| 1 | 🔴 Kritisch | Datenschutzerklärung erstellen (`datenschutz.html`) | Mittel |
| 2 | 🔴 Kritisch | Datenschutz-Link in Footer aller Seiten ergänzen | Niedrig |
| 3 | 🔴 Kritisch | Datenschutzhinweis beim Kontaktformular einbauen | Niedrig |
| 4 | 🟡 Wichtig | Logo-Pfad in `impressum.html` + `agb.html` reparieren | Niedrig |
| 5 | 🟡 Wichtig | Impressum: § 25 MedienG Grundrichtung ergänzen | Niedrig |
| 6 | 🟡 Wichtig | Impressum: GISA-Nr., Behörde, WKO prüfen & ergänzen | Niedrig |
| 7 | 🟡 Wichtig | Instagram-Link reparieren oder entfernen | Niedrig |
| 8 | 🟡 Wichtig | SSL/HTTPS sicherstellen beim Hoster | Niedrig |
| 9 | 🟢 Empfohlen | Bilder komprimieren (Halle3.png, logodunkel.png, Hero-Bild) | Mittel |
| 10 | 🟢 Empfohlen | AGB: Gerichtsstand ergänzen | Niedrig |

---

## 7. Nächste Schritte (empfohlene Reihenfolge)

1. **GISA-Nummer klären:** Unter www.gisa.gv.at nachschlagen (Stichwort: Patrick Doppelhofer / Holzbau / Birkfeld)
2. **Datenschutzerklärung erstellen** und auf allen Seiten verlinken
3. **Impressum vervollständigen** (Grundrichtung + gewerberechtliche Angaben)
4. **Logo-Pfad reparieren** in impressum.html und agb.html
5. **Formular-Datenschutzhinweis** einbauen
6. **Instagram-Link** klären (echtes Profil verlinken oder entfernen)
7. **Hoster auswählen** mit PHP + SSL
8. **Bilder optimieren** vor dem Upload
9. **Testlauf:** Kontaktformular auf Live-Server testen (PHP mail() prüfen)
10. **Go-Live**

---

*Dieser Bericht wurde automatisiert durch Codeanalyse erstellt. Er ersetzt keine Rechtsberatung. Für verbindliche rechtliche Auskunft empfiehlt sich die Konsultation eines österreichischen Rechtsanwalts oder der WKO-Rechtsberatung (kostenlos für WKO-Mitglieder).*
