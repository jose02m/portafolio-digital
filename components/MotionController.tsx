"use client";

import { useEffect } from "react";

export default function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });

    const register = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(element => {
        if (observed.has(element)) return;
        observed.add(element);
        if (reduced) element.classList.add("is-visible");
        else observer.observe(element);
      });
    };

    register();
    const mutation = new MutationObserver(register);
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutation.disconnect(); root.classList.remove("motion-ready"); };
  }, []);

  return null;
}
