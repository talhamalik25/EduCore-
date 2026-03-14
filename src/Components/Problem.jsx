import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

const PROBLEMS = [
  { icon: "📋", label: "Attendance",    title: "Manual Registers",        desc: "Paper registers, human errors",    impact: "→ No parent alerts"        },
  { icon: "💸", label: "Fee Tracking",   title: "Messy Notebooks",         desc: "Fee notebooks & Excel sheets",     impact: "→ Revenue loss, defaults"   },
  { icon: "📱", label: "Communication",  title: "WhatsApp Chaos",          desc: "Unstructured communication",       impact: "→ Missed messages"          },
  { icon: "📉", label: "Analytics",      title: "Zero Insights",           desc: "No performance data",              impact: "→ Decisions made blindly"   },
  { icon: "📚", label: "Homework",       title: "No Accountability",       desc: "Verbal assignments only",          impact: "→ No homework tracking"     },
  { icon: "🗓️", label: "Timetable",      title: "Clash Schedules",          desc: "Manual scheduling errors",         impact: "→ Teacher conflicts"        },
  { icon: "😟", label: "Mental Health",  title: "Blind Spots",             desc: "Student stress undetected",        impact: "→ Crisis goes unnoticed"    },
  { icon: "🏫", label: "Dashboard",      title: "No Command Center",       desc: "Disconnected school tools",        impact: "→ Data is scattered"        },
];

export default function Problem() {
  const [headRef, headVisible] = useReveal(0);
  const [gridRef, gridVisible] = useReveal(100);

  return (
    <section id="problem" className="bg-bg-2 py-24 px-[6%]">
      {/* Header */}
      <div
        ref={headRef}
        className={`reveal text-center ${headVisible ? "visible" : ""}`}
      >
        <div className="section-tag">📋 The Reality</div>
        <h2 className="section-title">
          Schools are running on <span className="serif">broken systems</span>
        </h2>
        <p className="section-sub">
          The majority of schools across Pakistan and South Asia are operating on
          outdated, disconnected tools — resulting in chaos, inefficiency, and poor outcomes.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border rounded-2xl overflow-hidden mt-16 reveal ${gridVisible ? "visible" : ""}`}
      >
        {PROBLEMS.map((p) => (
          <div key={p.title} className="bg-surface p-6 md:p-8 transition-colors duration-200 cursor-default hover:bg-surface-2">
            <span className="text-[1.8rem] mb-4 block">{p.icon}</span>
            <div className="text-[0.7rem] font-bold tracking-widest uppercase text-muted mb-1">{p.label}</div>
            <div className="text-[1.1rem] font-bold text-text mb-2">{p.title}</div>
            <div className="text-[0.88rem] text-red-400 font-medium leading-relaxed">{p.impact}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
