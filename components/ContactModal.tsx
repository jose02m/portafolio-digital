"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaPaperclip, FaXmark } from "react-icons/fa6";

export const OPEN_CONTACT_EVENT = "portfolio:open-contact";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => { setOpen(true); setStatus("idle"); setMessage(""); };
    window.addEventListener(OPEN_CONTACT_EVENT, show);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.setTimeout(() => dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 0);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/contact", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "No fue posible enviar el mensaje.");
      setStatus("success");
      setMessage(result.message || "Mensaje enviado correctamente.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No fue posible enviar el mensaje.");
    }
  }

  if (!open) return null;
  return <div className="modal-backdrop contact-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
    <div ref={dialogRef} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="modal-close-bar"><button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Cerrar formulario"><FaXmark/></button></div>
      <p className="eyebrow">Conversemos</p>
      <h2 id="contact-modal-title">Cuéntame sobre tu proyecto.</h2>
      <p className="contact-intro">Déjame el contexto esencial. Tu mensaje llegará directamente a mi bandeja y tu correo se usará únicamente para responderte.</p>
      <form className="contact-form" onSubmit={submit}>
        <div className="contact-form-row"><label>Nombre<input name="name" type="text" autoComplete="name" maxLength={80} required placeholder="¿Cómo te llamas?"/></label><label>Tu correo<input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="nombre@empresa.com"/></label></div>
        <label>Asunto<input name="subject" type="text" maxLength={140} required placeholder="Ej. Automatización de un proceso"/></label>
        <label>¿En qué puedo ayudarte?<textarea name="body" rows={6} maxLength={4000} required placeholder="Describe el reto, el resultado que buscas y cualquier plazo importante."/></label>
        <label className="attachment-field"><span><FaPaperclip/> Adjuntar archivos <small>Opcional · PDF, Word o imagen · máximo 3 archivos / 5 MB</small></span><input name="attachments" type="file" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"/></label>
        <input className="contact-honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
        {message && <p className={`contact-status ${status}`} role="status">{message}</p>}
        <button className="button contact-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : <>Enviar mensaje <FaArrowRight/></>}</button>
      </form>
    </div>
  </div>;
}
