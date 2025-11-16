import { NextResponse } from "next/server";
import { getTickets, addTicket } from "./data";

// Sendet eine WhatsApp-Nachricht an die Hausverwaltung, wenn eine neue Meldung eingeht.
async function sendWhatsAppNotification(ticket) {
  try {
    const token = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    // Fallback: Deine Hausverwalter-Nummer, falls keine Umgebungsvariable gesetzt ist.
    // Hinweis: Für WhatsApp muss sie im internationalen Format ohne "+" sein.
    const fallbackAdminNumber = "4917666652052"; // aus 0176 66652052 gemacht
    const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER || fallbackAdminNumber;

    if (!token || !phoneNumberId || !adminNumber) {
      console.warn(
        "[WhatsApp] fehlende Konfiguration – Benachrichtigung wird übersprungen."
      );
      return;
    }

    const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;

    const body = {
      messaging_product: "whatsapp",
      to: adminNumber,
      type: "text",
      text: {
        preview_url: false,
        body:
          `Neue Schadenmeldung in ${ticket.objekt}\n` +
          `Von: ${ticket.melderName || "Anonym"}\n\n` +
          `${ticket.beschreibung}`
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[WhatsApp] Fehler beim Senden:", text);
    }
  } catch (err) {
    console.error("[WhatsApp] Unerwarteter Fehler:", err);
  }
}


export async function GET() {
  const tickets = getTickets();
  return NextResponse.json({ tickets });
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.beschreibung || !body.objekt) {
      return NextResponse.json(
        { error: "Objekt und Beschreibung sind Pflichtfelder." },
        { status: 400 }
      );
    }

    const ticket = addTicket({
      objekt: body.objekt,
      beschreibung: body.beschreibung,
      melderName: body.melderName || "Anonym",
      hasPhoto: !!body.hasPhoto
    });

    // WhatsApp-Benachrichtigung (best effort, Fehler brechen die Meldung nicht ab)
    sendWhatsAppNotification(ticket);

    const tickets = getTickets();
    return NextResponse.json({ ticket, tickets }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Fehler beim Speichern der Meldung." },
      { status: 500 }
    );
  }
}
