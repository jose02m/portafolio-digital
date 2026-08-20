"use client";
import { useEffect, useRef } from "react";

export default function DynamicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let x = -100, y = -100, rx = -100, ry = -100, frame = 0;
    const animate = () => { rx += (x-rx)*.2; ry += (y-ry)*.2; dot.style.transform=`translate3d(${x}px,${y}px,0)`; ring.style.transform=`translate3d(${rx}px,${ry}px,0)`; frame=requestAnimationFrame(animate); };
    const move = (event: MouseEvent) => { x=event.clientX; y=event.clientY; document.documentElement.classList.add("cursor-visible"); };
    const over = (event: MouseEvent) => ring.classList.toggle("cursor-active", Boolean((event.target as Element).closest("a,button,[role='button'],input,textarea,select,.tool-card")));
    const down = () => ring.classList.add("cursor-pressed");
    const up = () => ring.classList.remove("cursor-pressed");
    const leave = () => document.documentElement.classList.remove("cursor-visible");
    window.addEventListener("mousemove",move); document.addEventListener("mouseover",over); window.addEventListener("mousedown",down); window.addEventListener("mouseup",up); document.addEventListener("mouseleave",leave); animate();
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("mousemove",move);document.removeEventListener("mouseover",over);window.removeEventListener("mousedown",down);window.removeEventListener("mouseup",up);document.removeEventListener("mouseleave",leave)};
  },[]);
  return <><div ref={ringRef} className="cursor-ring" aria-hidden="true"/><div ref={dotRef} className="cursor-dot" aria-hidden="true"/></>;
}
