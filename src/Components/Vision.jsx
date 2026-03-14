import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

export default function Vision() {
  const [quoteRef, quoteVisible] = useReveal(0);
  const [authorRef, authorVisible] = useReveal(150);

  return (
    <section id="vision" className="bg-bg-2 text-center py-32 px-[6%] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_60%,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
      
      <p 
        ref={quoteRef} 
        className={`font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] italic text-text max-w-[780px] mx-auto leading-[1.4] tracking-tight opacity-90 relative z-[1] reveal ${quoteVisible ? "visible" : ""}`}
      >
        "EduCore OS is not just a school management tool. It is the operating system
        for education in South Asia — making data-driven, AI-powered management
        the new standard."
      </p>
      <p 
        ref={authorRef} 
        className={`text-[0.85rem] text-muted mt-6 font-medium relative z-[1] reveal ${authorVisible ? "visible" : ""}`}
      >
        — Talha Malik, Founder · CoreCraft
      </p>
    </section>
  );
}
