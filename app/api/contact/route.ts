import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg"]);

function text(form: FormData, key: string, maxLength: number) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    if (text(form, "website", 100)) return NextResponse.json({ message: "Mensaje recibido." });

    const name = text(form, "name", 80);
    const email = text(form, "email", 160);
    const subject = text(form, "subject", 140);
    const body = text(form, "body", 4000);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !emailPattern.test(email) || !subject || !body) return NextResponse.json({ message: "Completa correctamente los campos obligatorios." }, { status: 400 });

    const files = form.getAll("attachments").filter((item): item is File => item instanceof File && item.size > 0);
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (files.length > MAX_FILES || totalBytes > MAX_TOTAL_BYTES || files.some(file => !ALLOWED_TYPES.has(file.type))) return NextResponse.json({ message: "Adjunta hasta 3 archivos PDF, Word o imagen con un peso total máximo de 5 MB." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_RECIPIENT;
    const from = process.env.CONTACT_FROM_EMAIL || "Portafolio José Carlos <onboarding@resend.dev>";
    if (!apiKey || !recipient) return NextResponse.json({ message: "El formulario está listo, pero el envío aún no está activado en esta vista previa." }, { status: 503 });

    const attachments = await Promise.all(files.map(async file => ({ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") })));
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeBody = escapeHtml(body).replace(/\n/g, "<br>");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [recipient], reply_to: email, subject: `[Portafolio] ${subject}`, html: `<h2>Nuevo contacto desde el portafolio</h2><p><strong>Nombre:</strong> ${safeName}</p><p><strong>Correo de respuesta:</strong> ${safeEmail}</p><p><strong>Mensaje:</strong></p><p>${safeBody}</p>`, text: `Nombre: ${name}\nCorreo: ${email}\n\n${body}`, attachments }),
    });
    if (!response.ok) return NextResponse.json({ message: "El servicio de correo no pudo completar el envío. Intenta nuevamente." }, { status: 502 });
    return NextResponse.json({ message: "¡Mensaje enviado! Te responderé lo antes posible." });
  } catch {
    return NextResponse.json({ message: "No fue posible procesar el mensaje. Intenta nuevamente." }, { status: 500 });
  }
}
