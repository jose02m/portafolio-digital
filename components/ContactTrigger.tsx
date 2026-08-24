"use client";

import type { ReactNode } from "react";
import { OPEN_CONTACT_EVENT } from "./ContactModal";

export default function ContactTrigger({ className, children }: { className: string; children: ReactNode }) {
  return <button className={className} type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONTACT_EVENT))}>{children}</button>;
}
