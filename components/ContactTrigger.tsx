"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { CONTACT_SENT_EVENT, OPEN_CONTACT_EVENT } from "./ContactModal";

export default function ContactTrigger({ className, children }: { className: string; children: ReactNode }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let timer = 0;
    const showSent = () => {
      window.clearTimeout(timer);
      setSent(true);
      timer = window.setTimeout(() => setSent(false), 3200);
    };
    window.addEventListener(CONTACT_SENT_EVENT, showSent);
    return () => { window.clearTimeout(timer); window.removeEventListener(CONTACT_SENT_EVENT, showSent); };
  }, []);

  return <button className={`${className}${sent ? " contact-trigger-sent" : ""}`} type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONTACT_EVENT))}>
    <span className="contact-trigger-content" key={sent ? "sent" : "idle"}>{sent ? <><FaCircleCheck aria-hidden="true"/>Mensaje enviado</> : children}</span>
  </button>;
}
