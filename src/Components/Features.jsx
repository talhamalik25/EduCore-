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

const FEATURES = [
  {
    num: "Feature 01", icon: "📡", title: "Smart Attendance",
    desc: "QR code-based attendance with instant SMS to parents when a student is absent. Late arrival tracking and monthly analytics included.",
    tags: ["QR Scanning", "SMS Alerts", "Analytics"],
    featured: false,
  },
  {
    num: "Feature 02", icon: "🤖", title: "AI Performance Analyzer",
    desc: "The brain of EduCore OS. Continuously monitors marks, attendance, and behavior to predict at-risk students weeks before they fail.",
    tags: ["Predictive AI", "Early Warning", "Auto Plans"],
    featured: true,
    checks: [
      "Predicts failure risk weeks in advance",
      "Identifies weak subjects per student",
      "Auto-generates improvement plans",
      "Sends early warning alerts to teachers",
    ],
  },
  {
    num: "Feature 03", icon: "💳", title: "Fee Management",
    desc: "Online payments via JazzCash & EasyPaisa. Auto late fines, digital receipts, installment tracking and defaulter list auto-generated.",
    tags: ["JazzCash", "EasyPaisa", "Auto Receipts"],
    featured: false,
  },
  {
    num: "Feature 04", icon: "📲", title: "Parent Mobile App",
    desc: "Parents can check attendance, pay fees, view results, message teachers and track the school van — all in one app.",
    tags: ["React Native", "Real-time", "Live GPS"],
    featured: false,
  },
  {
    num: "Feature 05", icon: "📝", title: "Homework Tracker",
    desc: "Teachers upload assignments, students submit online. Late submissions tracked automatically with MCQ auto-grading.",
    tags: ["Auto-grading", "Deadlines", "Submissions"],
    featured: false,
  },
  {
    num: "Feature 06", icon: "🗓️", title: "Smart Timetable",
    desc: "AI creates clash-free timetables automatically, balancing teacher workload and optimizing classroom allocation with substitution handling.",
    tags: ["AI-Generated", "Conflict-Free", "Substitutions"],
    featured: false,
  },
  {
    num: "Feature 07", icon: "🚌", title: "Transport Tracking",
    desc: "Live GPS tracking of school vans. Parents see real-time map and get pickup/drop-off alerts directly on their phone.",
    tags: ["Live GPS", "Google Maps", "Auto Alerts"],
    featured: false,
  },
  {
    num: "Feature 08", icon: "💚", title: "Mental Health Monitor",
    desc: "Weekly mood check-ins. AI detects stress and anxiety patterns, and alerts the school counselor before a crisis develops. Completely private.",
    tags: ["AI Detection", "Private", "Counselor Alert"],
    featured: false,
  },
  {
    num: "Feature 09", icon: "📊", title: "Principal Dashboard",
    desc: "Real-time command center. Attendance, fees, performance, complaints and teacher metrics — all in one view. Export any report as PDF instantly.",
    tags: ["Real-time", "PDF Export", "AI Insights"],
    featured: false,
  },
];

function FeatureCard({ feat, delay }) {
  const [ref, visible] = useReveal(delay);

  if (feat.featured) {
    return (
      <div
        ref={ref}
        className={`reveal group relative rounded-[20px] p-8 border border-blue-primary/30
          overflow-hidden cursor-default transition-all duration-300
          hover:-translate-y-[5px] hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)]
          ${visible ? "visible" : ""}`}
        style={{
          background: "linear-gradient(150deg, rgba(59,130,246,0.14), rgba(34,211,238,0.07))",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-secondary to-transparent" />
        <div className="text-[0.67rem] font-bold tracking-[0.1em] uppercase text-muted-2 mb-3">
          {feat.num}
        </div>
        <div
          className="w-12 h-12 rounded-[13px] flex items-center justify-center
            text-[1.3rem] mb-4 bg-blue-primary/20"
        >
          {feat.icon}
        </div>
        <div className="text-[1.02rem] font-bold text-text mb-2 tracking-tight">
          {feat.title}
        </div>
        <div className="text-[0.84rem] text-muted leading-relaxed">{feat.desc}</div>

        {feat.checks && (
          <div className="mt-5 flex flex-col gap-2">
            {feat.checks.map((c) => (
              <div key={c} className="flex items-center gap-2 text-[0.82rem] text-muted/80">
                <div
                  className="w-[17px] h-[17px] rounded-full flex-shrink-0 flex items-center
                    justify-center text-[0.62rem] font-bold text-blue-secondary bg-blue-primary/20"
                >
                  ✓
                </div>
                {c}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-5">
          {feat.tags.map((t) => (
            <span
              key={t}
              className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-md bg-blue-primary/15 text-blue-secondary/90"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`reveal group relative rounded-[20px] p-8 border border-border
        overflow-hidden cursor-default transition-all duration-300
        hover:-translate-y-[5px] hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)]
        hover:border-border-2 bg-surface
        ${visible ? "visible" : ""}`}
    >
      <div className="text-[0.67rem] font-bold tracking-[0.1em] uppercase text-muted-2 mb-3">
        {feat.num}
      </div>
      <div
        className="w-12 h-12 rounded-[13px] flex items-center justify-center
          text-[1.3rem] mb-4 bg-blue-primary/10"
      >
        {feat.icon}
      </div>
      <div className="text-[1.02rem] font-bold text-text mb-2 tracking-tight">
        {feat.title}
      </div>
      <div className="text-[0.84rem] text-muted leading-relaxed">{feat.desc}</div>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {feat.tags.map((t) => (
          <span
            key={t}
            className="text-[0.68rem] font-semibold px-2.5 py-1 rounded-md bg-white/5 text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const [headRef, headVisible] = useReveal(0);

  return (
    <section id="features" className="bg-bg py-24 px-[6%]">
      <div
        ref={headRef}
        className={`max-w-[600px] mb-16 reveal ${headVisible ? "visible" : ""}`}
      >
        <div className="section-tag">⚡ Features</div>
        <h2 className="section-title">
          Everything a school needs,<br />
          <span className="serif">in one OS</span>
        </h2>
        <p className="section-sub ml-0 text-left">
          10 powerful modules that replace every disconnected tool your school uses today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.num} feat={f} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
