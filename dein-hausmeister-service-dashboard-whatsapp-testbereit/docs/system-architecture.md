# Systemarchitektur (Schritt 1)

Diese Architektur ist auf eine marktreife, mehrmandantenfähige Hausmeister-App ausgelegt. Sie kombiniert ein mobiles-first Web-Frontend mit einem skalierbaren Backend und einer relationalen Datenbank. Alle Entscheidungen sind auf die geforderten QR-Workflows, Rollenlogik, DSGVO-Konformität und automatische Rechnungsstellung ausgerichtet.

## Architektur-Übersicht
- **Frontend:** Next.js (App Router) + React + Tailwind CSS, server-side rendered (SSR) für schnelle Startzeiten und SEO der öffentlichen QR-Seite, Client Components für interaktive Dashboards.
- **Backend:** Next.js API Routes als BFF (Backend for Frontend) plus optionale Serverless Functions (z. B. Vercel) oder Container-Deployment (Node.js). Enthält Domain-Services für Tickets, Sonderaufträge, Rechnungen, QR-Token, Audit-Log und Benachrichtigungen.
- **Datenbank:** Relationale Datenbank (PostgreSQL) für ACID-Transaktionen, strenge Referenzierung (Mandant → Objekte → Meldungen/Aufträge) und Audit-Logging. Nutzt Row-Level Security (RLS) für Mandanten- und Rollen-Trennung.
- **Datei-/Bildspeicher:** Objekt-Storage (z. B. S3-kompatibel) für Fotos, Rechnungs-PDFs und QR-PNGs mit signierten URLs.
- **Messaging/Benachrichtigung:** Asynchrone Queue (z. B. RabbitMQ/SQS) für WhatsApp/E-Mail-Versand, Webhooks zu externen Handwerkern und PDF-Generierung ohne UI-Blockierung.
- **PDF- und QR-Service:** Serverless Function oder Worker für PDF-Rechnungen (Headless Chromium/PDFKit) und QR-Code-Rendering (SVG/PNG + PDF-Sammelblatt).
- **Observability & Audit:** Zentrales Audit-Log in der DB, strukturierte Logs (OpenTelemetry), Health-Checks und Rate-Limits auf API-Ebene.

## Frontend-Schichten
- **Public QR Entry (Melder):** Leichtgewichtige Seite unter `/report/{qrToken}` mit Prefetch des Objekts, Formular (Beschreibung, Foto, DSGVO-Hinweis). Kein Login nötig, Token-basiert.
- **Authenticated Dashboard:** Rollenbasierte Layouts (Admin, Hausverwaltung, Hausmeister) mit server-side Daten-Fetching über API-Routen. Progressive Enhancement: Offline-Caching für Hausmeister-Routenliste.
- **Design System:** Wiederverwendbare UI-Komponenten (Formulare, Status-Badges, Karten, Timeline für Audit-Log) in `components/` mit Tailwind-Design-Tokens.
- **State Management:** React Query/TanStack Query für Server-Cache, Optimistic Updates bei Statuswechseln; Zod-Schemas für Validation und Type-Safety.

## Backend-Schichten
- **API Gateway/BFF:** Next.js API Routes validieren Eingaben (Zod/JOI), prüfen Auth & Mandant, mappen auf Domain-Services. Rate-Limits pro IP/Token für QR-Endpunkte.
- **Domain-Services:**
  - **QR-Schadenmeldung-Service:** Validiert QR-Token, erstellt Ticket, legt Audit-Eintrag an, stößt Benachrichtigung an HV/HM an.
  - **Routing/Assignment-Service:** Hausverwaltung weist Tickets Hausmeister oder externem Handwerker zu; respektiert Berechtigungen "Weiterleitung erlaubt".
  - **Aufgaben- & Routine-Service:** Generiert wiederkehrende Routineaufgaben (Cron/Serverless Scheduler) und Tagesroute.
  - **Sonderleistungen-Service:** Buchung → Bestätigung → Arbeit → Abnahme → PDF-Rechnung mit fortlaufender Nummer und Preispaketen (1–2h = 150 €, 3–4h = 300 €, 5–6h = 500 €).
  - **Rechnungs-Service:** Erstellt steuerkonforme PDFs, speichert Datei-Referenz, sendet E-Mail, markiert Rechnung als zugestellt.
  - **Audit-Log-Service:** Erzwingt Historisierung jeder Aktion (Statuswechsel, Zuordnung, Uploads, Rechnungen), inkl. Benutzer, Zeitstempel, Payload-Hash.
- **Integration Layer:** Abstraktion für WhatsApp Business API/E-Mail, QR-Generator und Storage; austauschbar via Adapter.

## Datenhaltung & Sicherheit
- **Mandantenfähigkeit:** Jede Entität enthält `tenant_id` (Hausverwaltung). RLS in PostgreSQL verhindert Cross-Tenant-Zugriffe. Admin-Sicht scoped per Hausverwaltung.
- **Rollenbasiert (RBAC):** Rechteprüfung im API-Layer; Claims in JWT/Session enthalten Rolle, Benutzer-ID, tenant_id und erlaubte Aktionen (z. B. Weiterleitung extern).
- **QR-Token-Sicherheit:** Token generiert als zufälliger, nicht erratbarer `uuid_v4` + HMAC-Signatur; Mapping auf Objekt-ID und Gültigkeitsfenster. Kein direkter Objekt-Slug im Link.
- **DSGVO & Datenschutz:**
  - Minimaldatenspeicherung für Melder (freiwilliger Name, Foto, Beschreibung).
  - Verschlüsselung at-rest (DB/Storage) und in-transit (HTTPS/TLS).
  - Lösch- & Export-Routinen (nicht umgesetzt, aber vorgesehen) via personenbezogenem Schlüssel.
  - Access-Logs, Consent-Hinweise und Auftragsverarbeitung (AVV) mit Storage/Notification-Providern.
- **Backup & Wiederherstellung:** Point-in-time Recovery (PITR) der DB, versionierte Objekt-Storage-Buckets.

## Deployment- & Laufzeitmodell
- **Empfohlen:** Vercel/Netlify für Frontend+BFF; Datenbank als verwalteter Postgres (z. B. Supabase/RDS). Alternativ Docker/Kubernetes für On-Prem-Mandanten.
- **Skalierung:**
  - Horizontal über stateless API-Routen/Serverless Functions.
  - Hintergrundjobs (Queue Worker/Cron) für Wiederholer, Rechnungen und Benachrichtigungen.
  - CDN für statische Assets und QR-PDF-Downloads.
- **CI/CD:** Linting, Tests, Security-Checks (SAST/Dependabot), Preview-Deployments. Secrets über Environment Variablen/Secret Manager.

## Begründung der Architektur
- **Next.js BFF:** Minimiert Roundtrips, erlaubt serverseitiges Rendern des QR-Formulars und schützt APIs mit denselben Auth-Zugriffskontrollen.
- **PostgreSQL + RLS:** Garantiert referenzielle Integrität, Mandantentrennung und Audit-Fähigkeit für Statusmodelle und Rechnungsnummern.
- **Queue + Worker:** Entkoppelt Benachrichtigungen, PDF-Generierung und Routineaufgaben vom Request-Flow → bessere UX und Skalierbarkeit.
- **Objekt-Storage + signierte URLs:** Sichere Handhabung von Fotos/PDFs, kein direkter Public-Zugriff, DSGVO-konformes Ablagemodell.
- **Token-basierte QR-Logik:** verhindert URL-Guesing, erlaubt Widerruf/Rotation einzelner QR-Codes ohne die Objekt-URL öffentlich zu machen.

Diese Grundlage erfüllt Schritt 1 (Systemarchitektur). Nächste Schritte: Datenmodelle und Rollen-/Rechte-Matrix.
