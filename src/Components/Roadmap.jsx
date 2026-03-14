import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

const PHASES = [ 
  { 
    num: "01", title: "Fee Management + Attendance + Parent Notifications", timeline: "Month 1 – 4", 
    status: "live", statusLabel: "Phase 1 — Core", 
    dotGrad: "linear-gradient(135deg,#1e7a40,#4eca78)", active: true, 
    badgeBg: "transparent", badgeBorder: "rgba(34,197,94,.3)", badgeClr: "live", 
    barClr: "#1e7a40", 
    desc: "Get first paying schools. Validate the product with real users in the field.", 
  }, 
  { 
    num: "02", title: "Homework Tracker + Timetable Generator + Performance Reports", timeline: "Month 5 – 8", 
    status: "planned", statusLabel: "Phase 2 — Expand", 
    dotGrad: "linear-gradient(135deg,#1d4ed8,#3b82f6)", active: false, 
    badgeBg: "rgba(59,130,246,.1)", badgeBorder: "rgba(59,130,246,.25)", badgeClr: "#60a5fa", 
    barClr: "#1d4ed8", 
    desc: "Grow to 10+ schools. Expand utility for teachers and students.", 
  }, 
  { 
    num: "03", title: "AI Performance Analyzer + Mental Health Indicator + Analytics Dashboard", timeline: "Month 9 – 14", 
    status: "planned", statusLabel: "Phase 3 — Intelligence", 
    dotGrad: "linear-gradient(135deg,#7c3aed,#a78bfa)", active: false, 
    badgeBg: "rgba(139,92,246,.1)", badgeBorder: "rgba(139,92,246,.25)", badgeClr: "#a78bfa", 
    barClr: "#7c3aed", 
    desc: "Launch premium pricing tier. Unlock AI-powered insights for school leadership.", 
  }, 
  { 
    num: "04", title: "Full Parent Mobile App + Transport GPS Tracking", timeline: "Month 15 – 18", 
    status: "planned", statusLabel: "Phase 4 — Mobile", 
    dotGrad: "linear-gradient(135deg,#d97706,#f59e0b)", active: false, 
    badgeBg: "rgba(245,158,11,.1)", badgeBorder: "rgba(245,158,11,.25)", badgeClr: "#f59e0b", 
    barClr: "#d97706", 
    desc: "Dramatically increase retention and parent engagement across all schools.", 
  }, 
  { 
    num: "05", title: "Face Recognition + Advanced AI + API for 3rd Parties", timeline: "Month 19 – 24", 
    status: "vision", statusLabel: "Phase 5 — Scale", 
    dotGrad: "linear-gradient(135deg,#db2777,#f472b6)", active: false, 
    badgeBg: "rgba(236,72,153,.1)", badgeBorder: "rgba(236,72,153,.25)", badgeClr: "#f472b6", 
    barClr: "#db2777", 
    desc: "Enterprise contracts. International expansion across South Asia.", 
  }, 
]; 

function PhaseItem({ phase, isLast, delay }) { 
  const [ref, visible] = useReveal(delay); 
  const lineRef = useRef(null); 

  useEffect(() => { 
    if (!visible || isLast) return; 
    const t = setTimeout(() => lineRef.current?.classList.add("on"), 400); 
    return () => clearTimeout(t); 
  }, [visible, isLast]); 

  return ( 
    <div 
      ref={ref} 
      className={`reveal flex gap-4 md:gap-8 ${visible ? "visible" : ""}`} 
    > 
      {/* Track */} 
      <div className="flex flex-col items-center w-[40px] md:w-[52px] flex-shrink-0"> 
        <div 
          className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center 
            font-serif font-extrabold text-[0.7rem] md:text-[.82rem] text-white relative z-10 
            cursor-default transition-transform duration-250 hover:scale-110" 
          style={{ 
            background: phase.dotGrad, 
            boxShadow: phase.active 
              ? "0 0 0 6px rgba(59,130,246,.1), 0 0 18px rgba(59,130,246,.4)" 
              : "0 0 0 6px rgba(255,255,255,.04)", 
          }} 
        > 
          {phase.num} 
          {phase.active && ( 
            <> 
              <div className="ring-expand" /> 
              <div className="ring-expand ring-expand-2" /> 
            </> 
          )} 
        </div> 
        {!isLast && ( 
          <div 
            ref={lineRef} 
            className="tl-line-fill" 
          /> 
        )} 
      </div> 

      {/* Card */} 
      <div className="flex-1 pb-10 md:pb-12"> 
        <div 
          className={`relative rounded-[20px] p-[1.4rem] md:p-[1.8rem] border border-white/[.06] 
            overflow-hidden cursor-default transition-all duration-300 
            hover:shadow-[0_12px_48px_rgba(0,0,0,.4)] hover:border-white/[.11] 
            ${phase.active ? "animate-card-glow" : ""}`} 
          style={{ 
            background: "#0d1525", 
            boxShadow: "0 4px 20px rgba(0,0,0,.3)", 
          }} 
        > 
          {/* Big ghost number */} 
          <div 
            className="absolute right-3 md:right-5 top-1 md:top-3 font-serif font-extrabold leading-none 
              pointer-events-none select-none text-[#f0f4ff]" 
            style={{ fontSize: "clamp(60px,12vw,110px)", opacity: 0.02 }} 
          > 
            {phase.num} 
          </div> 

          {/* Header */} 
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 md:gap-4 mb-[.7rem]"> 
            <div> 
              <div className="text-[.62rem] md:text-[.68rem] font-semibold text-[#7a90b0] uppercase tracking-[.06em] mb-[.15rem] md:mb-[.22rem]"> 
                {phase.timeline} 
              </div> 
              <div className="font-serif text-[1.1rem] md:text-[1.22rem] font-extrabold text-[#f0f4ff] tracking-[-0.3px] leading-tight"> 
                {phase.title} 
              </div> 
            </div> 
            <div 
              className="flex-shrink-0 px-[.7rem] py-[.22rem] md:px-[.78rem] md:py-[.28rem] rounded-full 
                text-[.62rem] md:text-[.68rem] font-bold border whitespace-nowrap" 
              style={{ 
                background: phase.badgeBg, 
                borderColor: phase.badgeBorder, 
                color: phase.badgeClr === "live" ? undefined : phase.badgeClr, 
              }} 
            > 
              {phase.badgeClr === "live" 
                ? <span className="animate-shimmer-live">{phase.statusLabel}</span> 
                : phase.statusLabel 
              } 
            </div> 
          </div> 

          <p className="text-[.82rem] md:text-[.86rem] text-[#7a90b0] leading-[1.6] md:leading-[1.65] mb-[1rem] md:mb-[1.1rem] relative z-10"> 
            {phase.desc} 
          </p> 

          {/* Bottom accent bar */} 
          <div 
            className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[20px]" 
            style={{ 
              background: `linear-gradient(90deg, ${phase.barClr}, ${phase.barClr}44)`, 
              opacity: phase.active ? 1 : 0.4, 
            }} 
          /> 
        </div> 
      </div> 
    </div> 
  ); 
} 

export default function Roadmap() { 
  const [hdrRef, hdrVisible] = useReveal(0); 
  const [botRef, botVisible] = useReveal(200); 

  return ( 
    <section 
      id="roadmap" 
      className="px-[6%] py-24 md:py-32 relative overflow-hidden bg-bg"
    > 
      {/* Dot bg */} 
      <div 
        className="absolute inset-0 pointer-events-none opacity-[.02] bg-[radial-gradient(circle,#3b82f6_1px,transparent_1px)] bg-[length:40px_40px]"
      /> 
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(59,130,246,0.07)_0%,transparent_70%)]"
      /> 

      <div className="max-w-[1200px] mx-auto"> 

        {/* Header */} 
        <div 
          ref={hdrRef} 
          className={`reveal max-w-[580px] mb-16 md:mb-20 ${hdrVisible ? "visible" : ""}`} 
        > 
          <span 
            className="section-tag"
          > 
            🗺️ Roadmap 
          </span> 
          <h2 
            className="section-title text-left"
          > 
            Built in phases that <span className="grad-text">generate revenue</span>
          </h2> 
          <p className="section-sub ml-0 text-left"> 
            Each phase ships a working product and funds the next. No feature bloat — just focused, real-world value delivered on schedule. 
          </p> 
        </div> 

        {/* Timeline */} 
        <div className="max-w-[900px]"> 
          {PHASES.map((phase, i) => ( 
            <PhaseItem 
              key={phase.num} 
              phase={phase} 
              isLast={i === PHASES.length - 1} 
              delay={i * 100} 
            /> 
          ))} 
        </div> 

        {/* Bottom card */} 
        <div 
          ref={botRef} 
          className={`reveal mt-12 md:mt-16 rounded-[22px] p-6 md:p-10 border border-white/[.11] 
            flex flex-col lg:flex-row justify-between items-center gap-8 max-w-[900px] bg-surface-2/40 backdrop-blur-sm
            ${botVisible ? "visible" : ""}`} 
        > 
          <div className="flex items-center gap-6"> 
            <div 
              className="w-14 h-14 rounded-[18px] flex-shrink-0 flex items-center 
                justify-center text-[1.6rem] bg-blue-primary/15 shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
            > 
              🎁 
            </div> 
            <div> 
              <div className="text-[1.1rem] font-bold text-text mb-1.5"> 
                Early adopters get everything — forever 
              </div> 
              <div className="text-[0.88rem] text-muted leading-relaxed"> 
                Schools that join now are locked into founding pricing and receive every future phase at no extra cost. 
              </div> 
            </div> 
          </div> 
          <a 
            href="#founding" 
            className="btn-primary w-full lg:w-auto text-center"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("founding")?.scrollIntoView({ behavior: "smooth" });
            }}
          > 
            Claim Founding Pricing → 
          </a> 
        </div> 
      </div> 
    </section> 
  ); 
} 
