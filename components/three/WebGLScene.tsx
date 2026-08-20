"use client";
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const InteractiveEcosystem = dynamic(() => import("./DigitalEcosystem3D"), { ssr:false });
const InteractiveFlow = dynamic(() => import("./TransformationCanvas"), { ssr:false });

function useWebGL(){
  const [supported,setSupported]=useState<boolean|null>(null);
  useEffect(()=>{const frame=requestAnimationFrame(()=>{try{const canvas=document.createElement("canvas");const gl=canvas.getContext("webgl2")||canvas.getContext("webgl");setSupported(Boolean(gl));}catch{setSupported(false)}});return()=>cancelAnimationFrame(frame)},[]);
  return supported;
}

export function HeroScene(){const supported=useWebGL();if(supported===true)return <InteractiveEcosystem/>;return <img className="ecosystem-fallback" src="/ecosystem-fallback.png" width={1122} height={1402} alt="Ecosistema digital que transforma datos mediante sistemas y automatización para producir decisiones claras"/>}
export function FlowScene(){const supported=useWebGL();if(supported===true)return <InteractiveFlow/>;return <img className="flow-fallback" src="/transformation-journey-v2.png" width={2069} height={760} loading="lazy" alt="Datos dispersos que pasan por automatización y análisis para convertirse en conocimiento"/>}
