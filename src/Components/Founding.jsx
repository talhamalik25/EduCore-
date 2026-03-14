import { useEffect, useRef, useState } from "react";

const PERKS = [
  "✓ 3 Months Free Trial",
  "✓ Locked-in Pricing Forever",
  "✓ Priority Onboarding",
  "✓ Direct Line to Founder",
  "✓ Shape the Product Roadmap",
];

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

export default function Founding() {
  const [ref, visible] = useReveal(0);

  return (
    <section id="founding" className="bg-bg relative overflow-hidden py-24 px-[6%]">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(245,158,11,0.08)_0%,transparent_65%)]" />
      
      <div ref={ref} className={`max-w-[780px] mx-auto text-center bg-surface/80 backdrop-blur-md border border-gold/20 rounded-[32px] p-8 md:p-16 relative shadow-[0_0_80px_rgba(245,158,11,0.1)] reveal ${visible ? "visible" : ""}`}>
        <div className="inline-flex items-center gap-[0.4rem] text-[0.7rem] md:text-[0.72rem] font-bold tracking-[0.12em] uppercase text-gold bg-gold/12 border border-gold/25 px-4 py-1.5 rounded-full mb-6">
          🏅 Limited Offer
        </div>
        <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold tracking-[-1.5px] mb-4 text-text leading-tight">
          Become a <span className="serif">Founding Member</span>
        </h2>
        <p className="text-muted text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-[540px] mx-auto mb-10">
          We're offering the first 5 schools a free 3-month trial — and permanent
          grandfathered pricing that locks in your rate forever, even as EduCore OS grows.
        </p>
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-12">
          {PERKS.map((p) => (
            <div key={p} className="flex items-center gap-2 text-[0.75rem] md:text-[0.82rem] font-bold text-gold bg-gold/10 border border-gold/20 px-4 py-2 rounded-xl transition-colors hover:bg-gold/15">
              {p}
            </div>
          ))}
        </div>
        <button className="bg-gradient-to-br from-gold to-[#d97706] text-black border-none w-full sm:w-auto px-12 py-4 rounded-2xl font-inherit text-[1.05rem] font-black cursor-pointer transition-all duration-300 shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_12px_45px_rgba(245,158,11,0.5)] active:scale-100">
          Claim Your Founding Spot →
        </button>
        <div className="text-[0.8rem] md:text-[0.85rem] text-muted/60 mt-8 flex items-center justify-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-primary shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse-slow" />
          Only 5 founding spots available — secure yours now
        </div>
      </div>
    </section>
  );
}
