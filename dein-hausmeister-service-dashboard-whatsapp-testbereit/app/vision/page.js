import Link from "next/link";

const roleSections = [
  {
    title: "Admin",
    description:
      "Legt Rollen und Objekte an, verwaltet Freigaben und stellt die Basis für professionelle Abläufe sicher.",
    points: [
      "Bis zu 50 Objekte/Hausverwaltungen inkl. Adress- und Eigentümerdaten anlegen.",
      "Für jedes Objekt den individuellen QR-Code-Link zur Schadenmeldung hinterlegen.",
      "Freigabe-Workflow: Weiterleitung zu Handwerkern nur nach Admin-Genehmigung.",
      "Rollen- und Rechte-Management für Hausverwaltungen, Hausmeister und Handwerker.",
      "Vorlagen für Rechnungs-PDFs und Preis-Pakete pflegen (1–2h = 150€, 3–4h = 300€, 5–6h = 500€)."
    ],
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Hausverwaltung",
    description:
      "Steuert alle Meldungen, priorisiert Aufgaben und delegiert an Hausmeister oder Handwerker.",
    points: [
      "Alle Objekte und Bewohner-Meldungen in einem Dashboard (Filter nach Objekt, Status, Verantwortung).",
      "Delegation an Hausmeister oder – nach Admin-Freigabe – an externe Handwerker per E-Mail-Weiterleitung.",
      "Aufgaben-Templates für wiederkehrende Arbeiten (Treppenhaus, Außenanlagen, Technikräume).",
      "Direkt Aufträge erteilen und Budget- oder Paketfreigaben erteilen.",
      "Reporting & Nachweise: Fotos, Zeitstempel, unterschriebene Übergaben sammeln."
    ],
    color: "bg-sky-50 border-sky-200",
  },
  {
    title: "Hausmeister",
    description:
      "Arbeitet strukturierte Listen ab, dokumentiert mit Fotos und bekommt automatische Routenplanung.",
    points: [
      "Sieht nur die zugewiesenen Objekte & Aufgaben mit klaren Prioritäten.",
      "Fotodokumentation inkl. Vorher/Nachher-Galerie für jede Meldung.",
      "KI-gestützter Routenplan: Tages- oder Wochenroute nach Dringlichkeit, Standort und Wettersituation.",
      "Routinearbeiten in Serien: z.B. Treppenhausreinigung, Außenpflege, Technik-Checks.",
      "Abfallkalender-Integration: Erinnerungen für Mülltonnen, Sperrmüll oder Sonderabholungen."
    ],
    color: "bg-amber-50 border-amber-200",
  },
  {
    title: "Bewohner / Melder",
    description:
      "QR-Code scannen, Schaden melden, Foto hochladen und automatisch an die richtige Stelle routen.",
    points: [
      "QR-Code pro Objekt führt direkt zur Meldeseite, optional mit Objekt-Vorbefüllung.",
      "Name, Kontakt (optional) und Fotos hinzufügen; Upload via Kamera oder Galerie.",
      "Status-Updates per E-Mail, SMS oder WhatsApp Business möglich.",
      "Klarer Datenschutz-Hinweis und Einwilligung zur Kontaktaufnahme.",
      "Mehrsprachige Meldestrecke (z.B. DE/EN/TR) für diverse Hausgemeinschaften."
    ],
    color: "bg-purple-50 border-purple-200",
  },
  {
    title: "Handwerker",
    description:
      "Bekommen nur freigegebene Aufträge, inklusive Dokumentation und Ansprechpartner.",
    points: [
      "E-Mail mit Schadensdetails, Fotos und gewünschtem Zeitfenster, erst nach Admin-Freigabe.",
      "Downloadbare Checkliste und Upload-Möglichkeit für Rückmeldungen/Rechnungen.",
      "Optionale Verfügbarkeits- bzw. SLAs hinterlegbar (z.B. Notfall 24h)."
    ],
    color: "bg-slate-50 border-slate-200",
  },
];

const processSteps = [
  {
    title: "1) QR-Code am Objekt",
    text: "Jedes Objekt erhält einen individuellen QR-Link. Bewohner scannen ihn, um eine Meldung mit Name und Foto zu erfassen.",
  },
  {
    title: "2) Smart Routing",
    text: "Je nach Kategorie oder Priorität landet die Meldung bei Hausverwaltung, Hausmeister oder – nach Freigabe – beim Handwerker.",
  },
  {
    title: "3) Bearbeitung & Dokumentation",
    text: "Hausmeister dokumentiert mit Fotos, Kommentaren und erledigt Routine-Checklisten. Fortschritt ist transparent einsehbar.",
  },
  {
    title: "4) Abschluss & Abrechnung",
    text: "Nach Abschluss wird ein PDF-Beleg mit Paketpreis erstellt. Hausverwaltung erhält automatisch den Nachweis.",
  },
];

const automationHighlights = [
  {
    title: "Glätte- und Wetterwarnungen",
    text: "Verknüpft die App mit einem Wetterdienst: Bei Glättegefahr Reminder für Streu- und Räumrouten auslösen.",
  },
  {
    title: "Abfallkalender",
    text: "Automatische Erinnerungen an Mülltage pro Objekt; Aufgaben direkt in die Tagesliste des Hausmeisters legen.",
  },
  {
    title: "Serien-Aufgaben",
    text: "Treppenhaus-Reinigung, Filterwechsel oder Außenpflege als wiederkehrende Routinen anlegen – inkl. Prüf- & Fotonachweis.",
  },
  {
    title: "Routenplanung mit KI",
    text: "Die App plant effiziente Wege über mehrere Objekte – berücksichtigt Dringlichkeit, Entfernung und Wettersituation.",
  },
];

const billingPackages = [
  { label: "Projektpaket S", details: "1–2 Stunden", price: "150 €" },
  { label: "Projektpaket M", details: "3–4 Stunden", price: "300 €" },
  { label: "Projektpaket L", details: "5–6 Stunden", price: "500 €" },
];

const ideaList = [
  "Push-Benachrichtigungen und WhatsApp-Updates für Statusänderungen.",
  "Offene Punkte pro Objekt als monatlicher PDF-Report an die Hausverwaltung.",
  "SLA-Boards für Notfälle (Aufzug, Heizung) mit Eskalationsmatrix.",
  "Self-Service-Bereich für Bewohner: Bedienungsanleitungen, Hausordnung, Notfallkontakte.",
  "Mehrere Hausverwaltungen in einem Account abbilden, inkl. Branding/Logo pro Mandant.",
];

export default function VisionPage() {
  return (
    <>
      <header className="app-header">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Hausmeister-Service Logo" className="h-12 w-auto" />
          <div>
            <div className="text-base font-semibold text-slate-800">
              Hausmeister-Service Pro – App-Konzept
            </div>
            <div className="text-xs text-slate-500 -mt-1">
              Professionelle Abläufe für Verwaltung, Hausmeister und Bewohner
            </div>
          </div>
        </div>
        <div className="flex gap-3 text-sm font-medium">
          <Link
            href="/"
            className="text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-xl hover:bg-slate-100"
          >
            Dashboard
          </Link>
          <Link
            href="/report"
            className="text-white bg-emerald-500 px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-600"
          >
            QR-Meldung testen
          </Link>
        </div>
      </header>

      <main className="app-main space-y-6">
        <section className="card">
          <div className="card-body space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                  Produktvision
                </p>
                <h1 className="text-2xl font-bold text-slate-900">
                  Smarte Hausmeister-Service App mit QR-Meldungen & Mehrrollen-Modell
                </h1>
                <p className="text-sm text-slate-600 mt-2 max-w-3xl">
                  Alleinstellungsmerkmal: Bewohner melden Schäden per QR-Code, Hausverwaltungen delegieren digital,
                  Hausmeister dokumentieren per Foto, und Admins steuern Freigaben, KI-Routen sowie rechtssichere PDF-Belege.
                </p>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
                Verbindet QR-Meldungen, Wetter-Warnungen, Abfallkalender & Abrechnungspakete in einer Oberfläche.
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roleSections.map((role) => (
            <div
              key={role.title}
              className={`card border ${role.color} p-4 flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-slate-800">{role.title}</h2>
                <span className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-full text-slate-500">
                  Rollen-Feature
                </span>
              </div>
              <p className="text-sm text-slate-600">{role.description}</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Objekt-QR-Codes & Meldestrecke</h2>
            <span className="badge badge-blue">Workflow</span>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step) => (
              <div key={step.title} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-sm font-semibold text-slate-800">{step.title}</div>
                <p className="text-sm text-slate-600 mt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Automationen für Professionalität</h2>
            <span className="badge badge-green">Smart</span>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationHighlights.map((item) => (
              <div key={item.title} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card lg:col-span-2">
            <div className="card-header">
              <h2 className="card-title">Abrechnung & Freigaben</h2>
              <span className="badge badge-amber">Transparenz</span>
            </div>
            <div className="card-body space-y-3 text-sm text-slate-700">
              <p>
                Hausverwaltungen können Aufgaben an den Hausmeister delegieren und wahlweise Pakete buchen.
                Nach Bestätigung und Abschluss wird automatisch ein rechtssicheres PDF mit Leistungsumfang,
                Zeitstempel und Preis erstellt.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Optionale Weiterleitung zu Handwerkern per E-Mail – nur nach Admin-Freigabe.</li>
                <li>Rechnungs-PDF mit Pflichtangaben (Adresse, Steuernummer, Leistungsdatum, Beschreibung).</li>
                <li>Preis-Pakete als Auswahl: {billingPackages.map((pkg) => `${pkg.details} (${pkg.price})`).join(", ")}</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Paketpreise</h2>
              <span className="badge badge-slate">Fix</span>
            </div>
            <div className="card-body space-y-3">
              {billingPackages.map((pkg) => (
                <div key={pkg.label} className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{pkg.label}</div>
                    <div className="text-xs text-slate-500">{pkg.details}</div>
                  </div>
                  <div className="text-sm font-bold text-emerald-600">{pkg.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Weitere Ideen für das Alleinstellungsmerkmal</h2>
            <span className="badge badge-purple">Ideen</span>
          </div>
          <div className="card-body">
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
              {ideaList.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
