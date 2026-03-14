import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

const PILLS = [
  "3-month free trial",
  "No credit card required",
  "Free data migration",
  "Setup in 10 minutes",
  "24/7 support",
];

export default function Cta() {
  const [eyeRef, eyeVisible]   = useReveal(0);
  const [titleRef, titleVisible] = useReveal(100);
  const [subRef, subVisible]   = useReveal(200);
  const [btnsRef, btnsVisible] = useReveal(300);
  const [pillsRef, pillsVisible] = useReveal(400);

  return (
    <section
      id="cta"
      className="px-8 py-28 relative overflow-hidden text-center bg-bg"
    >
      {/* Glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
          w-[600px] h-[300px] pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_65%)] animate-pulse-slow"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] pointer-events-none bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)]"
      />

      {/* Expanding rings - using classes from index.css or local tailwind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[220px] h-[220px] -ml-[110px] -mt-[110px] rounded-full border border-blue-primary/20 animate-ping opacity-20"
            style={{ animationDelay: `${i}s`, animationDuration: '3s' }}
          />
        ))}
      </div>

      {/* Floating dots */}
      {[
        { size: 8,  top: "15%", left: "8%",   bg: "rgba(59,130,246,0.4)",  delay: "0s"    },
        { size: 12, top: "70%", left: "5%",   bg: "rgba(34,211,238,0.25)", delay: "0.5s"   },
        { size: 6,  top: "20%", right: "6%",  bg: "rgba(59,130,246,0.35)", delay: "0.8s"   },
        { size: 10, top: "75%", right: "9%",  bg: "rgba(34,211,238,0.2)",  delay: "1.2s"  },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none animate-pulse-slow"
          style={{
            width: d.size, height: d.size,
            top: d.top, left: d.left, right: d.right,
            background: d.bg,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-[650px] mx-auto">

        {/* Eyebrow */}
        <div
          ref={eyeRef}
          className={`section-tag reveal ${eyeVisible ? "visible" : ""}`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse-slow" />
          Get Started Today
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className={`section-title reveal ${titleVisible ? "visible" : ""}`}
        >
          Ready to modernize<br />
          <span className="serif text-white">your school?</span>
        </h2>

        {/* Sub */}
        <p
          ref={subRef}
          className={`section-sub mb-10 reveal ${subVisible ? "visible" : ""}`}
        >
          Join the schools already running on EduCore OS. 3-month free trial,
          full setup support included. No technical knowledge required.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 reveal ${btnsVisible ? "visible" : ""}`}
        >
          <button
            className="btn-primary w-full sm:w-auto text-center"
            onClick={() => document.getElementById("founding")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Free Trial →
          </button>
          <button
            className="btn-outline w-full sm:w-auto text-center"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          >
            📅 Book a Demo
          </button>
        </div>

        {/* Pills */}
        <div
          ref={pillsRef}
          className={`flex flex-wrap justify-center gap-2.5 reveal ${pillsVisible ? "visible" : ""}`}
        >
          {PILLS.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2 text-[0.82rem] font-medium text-muted px-4 py-1.5 rounded-full border border-border bg-bg-2 transition-all duration-200 hover:border-border-2 hover:-translate-y-0.5 cursor-default"
            >
              <span className="text-blue-secondary font-bold text-[0.7rem]">✓</span>
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
