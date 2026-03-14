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

const STEPS = [
  { num: "1", emoji: "🏫", title: "Sign Up Your School",  desc: "Register your school and choose your plan. Setup takes less than 10 minutes."                             },
  { num: "2", emoji: "📂", title: "Import Your Data",     desc: "Upload student and teacher lists. We migrate everything from Excel or paper records."                      },
  { num: "3", emoji: "👥", title: "Invite Your Team",     desc: "Add teachers, admin staff and send parent app invitations in one click."                                  },
  { num: "4", emoji: "✅", title: "Go Live 🚀",           desc: "Your school is fully digital. Attendance, fees, communication and AI analytics all active."               },
];

export default function HowItWorks() {
  const [hdrRef, hdrVisible] = useReveal(0);
  const [botRef, botVisible] = useReveal(200);
  const stepsRef = useRef(null);

  // Animate connector lines on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        stepsRef.current?.querySelectorAll(".how-connector").forEach((el, i) => {
          setTimeout(() => el.classList.add("w-full"), i * 200 + 300);
        });
      }
    }, { threshold: 0.15 });
    if (stepsRef.current) obs.observe(stepsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="how"
      className="px-8 py-28 relative overflow-hidden bg-bg"
    >
      {/* Dot pattern bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.02] bg-[radial-gradient(circle,#3b82f6_1px,transparent_1px)] bg-[length:32px_32px]"
      />

      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div
          ref={hdrRef}
          className={`reveal max-w-[520px] mb-20 ${hdrVisible ? "visible" : ""}`}
        >
          <div className="section-tag">
            How It Works
          </div>
          <h2
            className="section-title text-left"
          >
            Up and running<br />in 4 simple steps
          </h2>
          <p className="text-[1rem] text-muted leading-[1.75] max-w-[500px]">
            No tech expertise needed. We handle the setup — you focus on running your school.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-0 relative"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="flex flex-col items-center text-center px-5 relative"
            >
              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="how-connector hidden lg:block absolute top-[35px] left-[calc(50%+43px)] w-0 h-[2px] bg-gradient-to-r from-blue-primary to-transparent transition-all duration-1000 ease-in-out" />
              )}

              {/* Circle */}
              <div
                className="relative w-[64px] h-[64px] md:w-[70px] md:h-[70px] rounded-full flex items-center
                  justify-center font-bold text-[1.1rem] md:text-[1.25rem] text-white
                  mb-5 md:mb-6 z-10 cursor-default transition-all duration-250
                  hover:scale-110 bg-blue-primary shadow-[0_0_0_6px_rgba(59,130,246,0.1),0_4px_18px_rgba(59,130,246,0.25)]"
              >
                {step.num}
                {/* Emoji badge */}
                <div
                  className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full
                    flex items-center justify-center text-[.7rem] md:text-[.82rem]
                    border-2 border-border bg-bg-2 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                >
                  {step.emoji}
                </div>
              </div>

              <div className="text-[.92rem] md:text-[.97rem] font-bold text-text mb-2">
                {step.title}
              </div>
              <div className="text-[.8rem] md:text-[.82rem] text-muted leading-[1.65] max-w-[170px]">
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom card */}
        <div
          ref={botRef}
          className={`reveal mt-16 md:mt-[4.5rem] rounded-[22px] p-6 md:p-8 border
            border-border flex flex-col lg:flex-row justify-between items-center gap-8
            bg-surface/50 backdrop-blur-sm ${botVisible ? "visible" : ""}`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div
              className="w-[52px] h-[52px] rounded-[14px] flex-shrink-0
                flex items-center justify-center text-[1.35rem] bg-blue-primary/15 shadow-[0_4px_12px_rgba(59,130,246,0.1)]"
            >
              🎓
            </div>
            <div>
              <div className="text-[1rem] font-bold text-text mb-1.5">
                Free onboarding support included
              </div>
              <div className="text-[.85rem] text-muted leading-relaxed">
                Our team helps you migrate data and train your staff — at no extra cost.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 flex-shrink-0">
            {[
              ["10 min",   "Setup time"   ],
              ["3 months", "Free trial"  ],
              ["24/7",     "Support"    ],
            ].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-[1.3rem] font-extrabold text-blue-secondary leading-none">
                  {num}
                </div>
                <div className="text-[.68rem] font-bold text-muted/60 mt-1.5 uppercase tracking-wider">
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
