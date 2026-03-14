import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   PLAN DATA
═══════════════════════════════════════════════════════════ */
const PLANS = [
  {
    id: "starter",
    tier: "Starter",
    tagline: "Perfect for small schools",
    base: 12000,
    perStudent: 35,
    minStudents: 50,
    maxStudents: 200,
    featured: false,
    cta: "Start Free Trial",
    accentColor: "rgba(96,165,250,.85)",   // blue2
    accentBg: "rgba(59,130,246,.1)",
    accentBorder: "rgba(59,130,246,.2)",
    features: [
      { label: "Fee Management",           phase: 1 },
      { label: "Attendance Tracking",      phase: 1 },
      { label: "Parent Notifications",     phase: 1 },
      { label: "Basic School Dashboard",   phase: 1 },
      { label: "Student Records Management", phase: 1 },
    ],
  },
  {
    id: "growth",
    tier: "Growth",
    tagline: "Most popular for mid-size schools",
    base: 28000,
    perStudent: 48,
    minStudents: 201,
    maxStudents: 500,
    featured: true,
    cta: "Start Free Trial",
    accentColor: "#60a5fa",
    accentBg: "rgba(59,130,246,.15)",
    accentBorder: "rgba(59,130,246,.4)",
    features: [
      { label: "Everything in Starter",    phase: 1 },
      { label: "Homework Tracker",         phase: 2 },
      { label: "Timetable Generator",      phase: 2 },
      { label: "Teacher Dashboard",        phase: 2 },
      { label: "Performance Reports",      phase: 2 },
      { label: "Student Progress Tracking", phase: 2 },
    ],
  },
  {
    id: "pro",
    tier: "Pro / AI",
    tagline: "Full AI power for large schools",
    base: 55000,
    perStudent: 65,
    minStudents: 501,
    maxStudents: 1000,
    featured: false,
    cta: "Start Free Trial",
    accentColor: "rgba(167,139,250,.9)",   // purple
    accentBg: "rgba(139,92,246,.1)",
    accentBorder: "rgba(139,92,246,.25)",
    features: [
      { label: "Everything in Growth",     phase: 2 },
      { label: "AI Performance Analyzer",  phase: 3 },
      { label: "Mental Health Indicator",  phase: 3 },
      { label: "Advanced Analytics Dashboard", phase: 3 },
      { label: "School Insights for Management", phase: 3 },
      { label: "Smart Performance Reports", phase: 3 },
    ],
  },
  {
    id: "enterprise",
    tier: "Enterprise",
    tagline: "For school chains & networks",
    base: 95000,
    perStudent: 80,
    minStudents: 1001,
    maxStudents: 5000,
    featured: false,
    cta: "Contact Sales",
    accentColor: "rgba(245,158,11,.9)",   // gold
    accentBg: "rgba(245,158,11,.1)",
    accentBorder: "rgba(245,158,11,.25)",
    features: [
      { label: "Everything in Pro",        phase: 3 },
      { label: "Full Parent Mobile App",   phase: 4 },
      { label: "Transport GPS Tracking",   phase: 4 },
      { label: "Face Recognition Attendance", phase: 5 },
      { label: "Advanced AI Insights",     phase: 5 },
      { label: "Third-Party API Integration", phase: 5 },
    ],
  },
];

/* Phase badge colours */
const PHASE_STYLES = {
  1: { bg: "rgba(16,185,129,.12)",  color: "#34d399", label: "Phase 1" },
  2: { bg: "rgba(59,130,246,.12)",  color: "#60a5fa", label: "Phase 2" },
  3: { bg: "rgba(139,92,246,.12)",  color: "#a78bfa", label: "Phase 3" },
  4: { bg: "rgba(245,158,11,.12)",  color: "#fbbf24", label: "Phase 4" },
  5: { bg: "rgba(219,39,119,.12)",  color: "#f472b6", label: "Phase 5" },
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
function calcPrice(plan, students, yearly) {
  const capped  = Math.min(Math.max(students, plan.minStudents), plan.maxStudents);
  const monthly = plan.base + capped * plan.perStudent;
  return yearly ? Math.round(monthly * 0.8) : monthly;
}

function fmtPKR(n) {
  if (n >= 100000) return (n / 1000).toFixed(0) + "K";
  return (n / 1000).toFixed(1).replace(".0", "") + "K";
}

/* Which plan is "recommended" for this student count */
function recommendedPlan(students) {
  if (students <= 200) return "starter";
  if (students <= 500) return "growth";
  if (students <= 1000) return "pro";
  return "enterprise";
}

/* ═══════════════════════════════════════════════════════════
   CARD
═══════════════════════════════════════════════════════════ */
function PricingCard({ plan, students, yearly, visible, delay, isRecommended }) {
  const price     = calcPrice(plan, students, yearly);
  const formatted = fmtPKR(price);
  const monthly   = fmtPKR(calcPrice(plan, students, false));

  return (
    <div
      className={`
        relative rounded-[22px] flex flex-col border p-6 md:p-7
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${isRecommended
          ? "lg:scale-[1.035] z-10"
          : "hover:-translate-y-[3px]"
        }
      `}
      style={{
        transitionDelay: `${delay}ms`,
        background: isRecommended
          ? "linear-gradient(150deg,rgba(59,130,246,.16),rgba(34,211,238,.07))"
          : "#0d1525",
        borderColor: isRecommended
          ? "rgba(59,130,246,.45)"
          : "rgba(255,255,255,.07)",
        boxShadow: isRecommended
          ? "0 0 0 1px rgba(59,130,246,.3), 0 24px 60px rgba(59,130,246,.18)"
          : "0 4px 24px rgba(0,0,0,.35)",
        animation: isRecommended ? "cardGlow 3s 1s ease-in-out infinite" : "none",
      }}
    >
      {/* Recommended ribbon */}
      {isRecommended && (
        <div
          className="absolute -top-[13px] left-1/2 -translate-x-1/2
            text-white text-[.68rem] font-extrabold tracking-[.08em]
            uppercase px-4 py-[.28rem] rounded-full whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#22d3ee)",
            boxShadow: "0 4px 14px rgba(59,130,246,.5)",
          }}
        >
          ⭐ Recommended for you
        </div>
      )}

      {/* ── TOP ── */}
      <div className="mb-5">
        <div
          className="text-[.72rem] font-bold tracking-[.1em] uppercase mb-1"
          style={{ color: isRecommended ? "rgba(147,197,253,.7)" : "#60a5fa" }}
        >
          {plan.tier}
        </div>
        <div
          className="text-[.8rem] mb-4"
          style={{ color: isRecommended ? "rgba(255,255,255,.45)" : "#7a90b0" }}
        >
          {plan.tagline}
        </div>

        {/* Price display */}
        <div className="flex items-end gap-2 mb-1">
          <div
            className="font-serif font-black tracking-[-2px] leading-none"
            style={{
              fontSize: "clamp(2rem,3.5vw,2.6rem)",
              color: "#f0f4ff",
            }}
          >
            {formatted}
          </div>
          <div className="pb-[.35rem]">
            <div
              className="text-[.72rem] font-semibold leading-none"
              style={{ color: isRecommended ? "rgba(255,255,255,.4)" : "#7a90b0" }}
            >
              PKR
            </div>
            <div
              className="text-[.68rem] leading-none mt-[.2rem]"
              style={{ color: isRecommended ? "rgba(255,255,255,.3)" : "#3a5070" }}
            >
              / {yearly ? "year" : "month"}
            </div>
          </div>
        </div>

        {/* Yearly saving */}
        {yearly && (
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[.7rem] font-semibold line-through"
              style={{ color: "#3a5070" }}
            >
              {monthly}K/mo
            </span>
            <span
              className="text-[.7rem] font-bold px-2 py-[.18rem] rounded-full"
              style={{
                background: "rgba(16,185,129,.14)",
                color: "#34d399",
                border: "1px solid rgba(16,185,129,.22)",
              }}
            >
              20% off
            </span>
          </div>
        )}

        {/* Student range badge */}
        <div
          className="inline-flex items-center gap-[.4rem] text-[.7rem] font-semibold
            px-3 py-[.28rem] rounded-full"
          style={{
            color: plan.accentColor,
            background: plan.accentBg,
            border: `1px solid ${plan.accentBorder}`,
          }}
        >
          👥 {plan.minStudents}{plan.maxStudents >= 5000 ? "+" : `–${plan.maxStudents}`} students
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-5"
        style={{
          background: isRecommended
            ? "rgba(255,255,255,.1)"
            : "rgba(255,255,255,.06)",
        }}
      />

      {/* ── FEATURES ── */}
      <div className="flex flex-col gap-[.55rem] flex-1 mb-6">
        {plan.features.map((f) => {
          const ps = PHASE_STYLES[f.phase];
          return (
            <div key={f.label} className="flex items-start gap-[.6rem]">
              <div
                className="w-[16px] h-[16px] rounded-full flex-shrink-0 flex items-center
                  justify-center text-[.58rem] font-bold mt-[2px]"
                style={{
                  background: isRecommended
                    ? "rgba(59,130,246,.28)"
                    : "rgba(59,130,246,.15)",
                  color: "#60a5fa",
                }}
              >
                ✓
              </div>
              <div className="flex items-center gap-[.45rem] flex-wrap flex-1">
                <span
                  className="text-[.8rem] leading-[1.4]"
                  style={{
                    color: isRecommended
                      ? "rgba(255,255,255,.72)"
                      : "#7a90b0",
                  }}
                >
                  {f.label}
                </span>
                <span
                  className="text-[.55rem] font-bold px-[.4rem] py-[.1rem]
                    rounded-full flex-shrink-0"
                  style={{
                    background: ps.bg,
                    color: ps.color,
                    border: `1px solid ${ps.color}33`,
                  }}
                >
                  {ps.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <a
        href="#cta"
        className="block w-full text-center py-[.8rem] rounded-full
          font-serif text-[.88rem] font-bold no-underline
          transition-all duration-200"
        style={
          isRecommended
            ? { background: "#fff", color: "#0a1628" }
            : {
                background: "rgba(255,255,255,.06)",
                color: "#f0f4ff",
                border: "1px solid rgba(255,255,255,.08)",
              }
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isRecommended
            ? "rgba(147,197,253,.92)"
            : "rgba(255,255,255,.11)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isRecommended
            ? "#fff"
            : "rgba(255,255,255,.06)";
        }}
      >
        {plan.cta} →
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function Pricing() {
  const [students, setStudents] = useState(200);
  const [yearly,   setYearly]   = useState(false);
  const [visible,  setVisible]  = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const recommended = recommendedPlan(students);
  const sliderPct   = ((students - 50) / (1000 - 50)) * 100;

  // Determine label for current slider position
  const rangeLabel =
    students <= 200 ? "Small school" :
    students <= 500 ? "Mid-size school" :
    students <= 1000 ? "Large school" :
    "School network";

  return (
    <section
      id="pricing"
      ref={ref}
      className="px-[6%] py-28 relative overflow-hidden"
      style={{ background: "#04080f" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(59,130,246,.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ── HEADER ── */}
        <div
          className={`flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-[580px]">
            <span className="section-tag">💰 Pricing</span>
            <h2 className="section-title text-left">
              Price that grows <span className="grad-text">with you</span>
            </h2>
            <p className="section-sub text-left ml-0">
              Drag the slider to see your exact monthly cost. No hidden fees, no surprises — just transparent pricing based on your school size.
            </p>
          </div>

          {/* Yearly toggle */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-[14px] border border-white/[.07] self-center lg:self-auto"
            style={{ background: "#0d1525" }}
          >
            <span
              className="text-[.82rem] font-medium"
              style={{ color: yearly ? "#3a5070" : "#f0f4ff" }}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className="relative w-[44px] h-[24px] rounded-full border
                transition-all duration-250 cursor-pointer outline-none"
              style={{
                background: yearly ? "rgba(59,130,246,.2)" : "rgba(255,255,255,.07)",
                borderColor: yearly ? "rgba(59,130,246,.4)" : "rgba(255,255,255,.12)",
              }}
            >
              <div
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full transition-all duration-250"
                style={{
                  left: yearly ? "23px" : "3px",
                  background: yearly ? "#60a5fa" : "#7a90b0",
                }}
              />
            </button>
            <span
              className="text-[.82rem] font-medium"
              style={{ color: yearly ? "#f0f4ff" : "#3a5070" }}
            >
              Yearly
            </span>
            {yearly && (
              <span
                className="text-[.7rem] font-bold px-2 py-[.2rem] rounded-full"
                style={{
                  background: "rgba(16,185,129,.14)",
                  color: "#34d399",
                  border: "1px solid rgba(16,185,129,.22)",
                }}
              >
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* ── SLIDER CONTROL ── */}
        <div
          className={`mb-14 rounded-[20px] border border-white/[.07]
            transition-all duration-700 delay-100 overflow-hidden
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ background: "#0d1525" }}
        >
          {/* Top info bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5
              border-b border-white/[.05]"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-[42px] h-[42px] rounded-[12px] flex items-center
                  justify-center text-[1.1rem]"
                style={{ background: "rgba(59,130,246,.12)" }}
              >
                🏫
              </div>
              <div>
                <div className="font-serif font-bold text-[1.6rem] text-[#60a5fa] leading-none">
                  {students >= 1000 ? "1000+" : students}
                  <span className="font-dm text-[.85rem] font-normal text-[#7a90b0] ml-2">
                    students
                  </span>
                </div>
                <div className="text-[.72rem] text-[#3a5070] mt-[.2rem] font-semibold uppercase tracking-wider">
                  {rangeLabel}
                </div>
              </div>
            </div>

            {/* Recommended plan indicator */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] border"
              style={{
                background: "rgba(59,130,246,.08)",
                borderColor: "rgba(59,130,246,.2)",
              }}
            >
              <span className="text-[.75rem] text-[#7a90b0]">Recommended:</span>
              <span className="font-serif font-bold text-[.9rem] text-[#60a5fa]">
                {PLANS.find(p => p.id === recommended)?.tier} Plan
              </span>
            </div>
          </div>

          {/* Slider area */}
          <div className="px-7 py-8">
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={students}
              onChange={(e) => setStudents(Number(e.target.value))}
              className="w-full h-[6px] rounded-full outline-none cursor-pointer appearance-none"
              style={{
                background: `linear-gradient(to right, #3b82f6 ${sliderPct}%, rgba(255,255,255,.1) ${sliderPct}%)`,
              }}
            />

            {/* Bracket labels */}
            <div className="relative mt-6 h-8 hidden sm:block">
              {/* Plan range markers */}
              {[
                { label: "Starter",  left: "0%",   right: "19.1%",  color: "rgba(59,130,246,.5)" },
                { label: "Growth",   left: "19.5%", right: "47.4%", color: "rgba(59,130,246,.7)" },
                { label: "Pro",      left: "47.8%", right: "75%",   color: "rgba(139,92,246,.6)" },
                { label: "Enterprise", left: "75.4%", right: "100%", color: "rgba(245,158,11,.6)" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="absolute top-0 flex flex-col items-center"
                  style={{ left: m.left, right: m.right }}
                >
                  <div
                    className="w-full h-[2px] rounded-full mb-2"
                    style={{ background: m.color }}
                  />
                  <span
                    className="text-[.62rem] font-bold tracking-[.08em] uppercase whitespace-nowrap"
                    style={{ color: m.color }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tick numbers */}
            <div className="flex justify-between mt-6 sm:mt-2">
              {[50, 200, 400, 600, 800, "1000+"].map((t) => (
                <span key={t} className="text-[.7rem] font-medium" style={{ color: "#3a5070" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              students={students}
              yearly={yearly}
              visible={visible}
              delay={200 + i * 100}
              isRecommended={plan.id === recommended}
            />
          ))}
        </div>

        {/* ── PHASE LEGEND ── */}
        <div
          className={`mt-12 rounded-[16px] px-6 py-5 border border-white/[.06]
            flex flex-wrap items-center gap-4
            transition-all duration-700 delay-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ background: "#0d1525" }}
        >
          <span className="text-[.78rem] font-bold text-[#7a90b0] uppercase tracking-wider flex-shrink-0">
            Feature phases:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {Object.entries(PHASE_STYLES).map(([phase, s]) => (
              <span
                key={phase}
                className="text-[.65rem] font-black px-3.5 py-[.3rem] rounded-full uppercase tracking-widest"
                style={{
                  background: s.bg,
                  color: s.color,
                  border: `1px solid ${s.color}33`,
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/10 mx-2" />
          <span className="text-[.75rem] text-[#3a5070] font-medium">
            All future phases included for early adopters at no extra cost.
          </span>
        </div>

        {/* ── FOOTER ── */}
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-between gap-6
            pt-10 border-t border-white/[.06]
            transition-all duration-700 delay-[600ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-3 text-[.88rem] text-[#7a90b0] text-center sm:text-left">
            <span className="text-[1.2rem]">🇵🇰</span>
            <p>Prices in PKR. Enterprise plans available for 1000+ students — contact us.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["🔒 Secure", "🎓 3-month trial", "💬 Free onboarding", "🚀 10-min setup"].map((b) => (
              <div
                key={b}
                className="text-[.72rem] font-bold text-[#7a90b0]
                  px-4 py-[.4rem] rounded-full border border-white/[.06] transition-colors hover:border-white/20"
                style={{ background: "#0d1525" }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider thumb styles */}
      <style>{`
        #pricing input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid #0d1525;
          box-shadow: 0 0 0 4px rgba(59,130,246,.25);
          transition: box-shadow .2s, transform .2s;
        }
        #pricing input[type='range']::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 8px rgba(59,130,246,.18);
          transform: scale(1.1);
        }
        #pricing input[type='range']::-moz-range-thumb {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid #0d1525;
        }
      `}</style>
    </section>
  );
}
