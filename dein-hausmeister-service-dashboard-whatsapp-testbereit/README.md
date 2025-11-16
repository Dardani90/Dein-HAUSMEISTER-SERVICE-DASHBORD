# Dein-Hausmeister-Service Dashboard

Dieses Projekt ist ein simples Dashboard für deinen Hausmeister-Service:

- Bewohner scannen einen QR-Code und können **Schäden melden** (mit Name & optional Foto-Hinweis).
- Die Hausverwaltung sieht alle Meldungen im **Dashboard**, kann filtern und
  entscheiden, ob **Hausmeister** oder **Handwerker** zuständig ist.
- Status-Workflow: `Eingegangen` → `In Bearbeitung` → `Freigegeben` → `Erledigt`.

> **Wichtig:** Die Tickets werden aktuell nur **im Arbeitsspeicher** gespeichert
> (In-Memory-Datenbank in `app/api/tickets/data.js`). Für den echten produktiven
> Einsatz solltest du eine richtige Datenbank (PostgreSQL, MySQL, Supabase etc.)
> anbinden.

## Tech-Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React
- Tailwind CSS
- Deployment z. B. bei Vercel

## Entwicklung

```bash
npm install
npm run dev
```

Dann im Browser: http://localhost:3000

- `http://localhost:3000/` → Dashboard (Hausverwaltung)
- `http://localhost:3000/report` → Schaden melden (für Bewohner, QR-Code-Ziel)

## QR-Code verwenden

1. Projekt deployen (z. B. `https://dein-hausmeister-service-dashbord-f-iota.vercel.app`).
2. Die URL `https://deine-domain/report` in einen QR-Code-Generator einfügen.
3. QR-Code im Hausflur / Aufzug / Infotafel aushängen.

## Deployment auf Vercel

1. Repository bei GitHub anlegen und diesen Code pushen.
2. In Vercel ein neues Projekt erstellen und das GitHub-Repo verbinden.
3. Framework: **Next.js**
4. Build Command: `npm run build`
5. Output: `.next`

Fertig 🙂 Jetzt kannst du Bewohnern den QR-Code geben und im Dashboard arbeiten.

## WhatsApp-Benachrichtigung (Test mit deiner Hausverwalter-Nummer)

Dieses Projekt kann bei jeder neuen Meldung eine WhatsApp-Nachricht an die Hausverwaltung schicken.

In `app/api/tickets/route.js` ist eine Funktion `sendWhatsAppNotification(ticket)` hinterlegt.
Standardmäßig verwendet sie deine Nummer **0176 66652052** im internationalen Format `4917666652052`,
wenn keine Umgebungsvariable `WHATSAPP_ADMIN_NUMBER` gesetzt ist.

Für den echten Betrieb richtest du die WhatsApp Business Cloud API ein und setzt folgende Umgebungsvariablen
(z.B. in Vercel unter "Environment Variables"):

- `WHATSAPP_API_TOKEN` – dein Zugangstoken von Meta
- `WHATSAPP_PHONE_NUMBER_ID` – die Phone Number ID aus dem WhatsApp Business Dashboard
- `WHATSAPP_ADMIN_NUMBER` – (optional) deine WhatsApp-Nummer im internationalen Format, z.B. `4917666652052`

Wenn `WHATSAPP_API_TOKEN` oder `WHATSAPP_PHONE_NUMBER_ID` fehlen, wird die Benachrichtigung übersprungen,
die Meldung wird aber trotzdem ganz normal gespeichert.
