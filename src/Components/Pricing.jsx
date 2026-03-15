import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════
   SHARED FEATURES — same in all 3 plans
═══════════════════════════════════════ */
const ALL_FEATURES = [
  { label: "Smart Attendance (QR codes)",    phase: 1 },
  { label: "Fee Management + Auto Receipts", phase: 1 },
  { label: "Parent SMS Alerts",              phase: 1 },
  { label: "Student Management",             phase: 1 },
  { label: "Basic Reports",                  phase: 1 },
  { label: "Role-Based Access",              phase: 1 },
  { label: "Homework Tracker",               phase: 2 },
  { label: "Smart Timetable Generator",      phase: 2 },
  { label: "Result Management",              phase: 2 },
  { label: "Teacher–Parent Chat",            phase: 2 },
  { label: "Complaint Portal",               phase: 2 },
  { label: "AI Performance Analyzer",        phase: 3 },
  { label: "At-Risk Student Alerts",         phase: 3 },
  { label: "Mental Health Monitor",          phase: 3 },
  { label: "Principal Analytics Dashboard",  phase: 3 },
  { label: "Parent Mobile App",              phase: 4 },
  { label: "Transport GPS Tracking",         phase: 4 },
  { label: "Face Recognition Attendance",    phase: 5 },
  { label: "Public API Access",              phase: 5 },
  { label: "Multi-Branch Support",           phase: 5 },
];

const FEAT_PHASE_STYLE = {
  1: { bg: "rgba(16,185,129,.1)",  color: "#34d399", border: "rgba(16,185,129,.2)", label: "P1" },
  2: { bg: "rgba(59,130,246,.1)",  color: "#60a5fa", border: "rgba(59,130,246,.2)", label: "P2" },
  3: { bg: "rgba(139,92,246,.1)",  color: "#a78bfa", border: "rgba(139,92,246,.2)", label: "P3" },
  4: { bg: "rgba(245,158,11,.1)",  color: "#fbbf24", border: "rgba(245,158,11,.2)", label: "P4" },
  5: { bg: "rgba(236,72,153,.1)",  color: "#f472b6", border: "rgba(236,72,153,.2)", label: "P5" },
};

/* ═══════════════════════════════════════
   PLANS
═══════════════════════════════════════ */
const PLANS = [
  {
    id:          "starter",
    tier:        "Starter",
    tagline:     "For small schools",
    price:       10000,
    maxStudents: 200,
    admins:      2,
    featured:    false,
  },
  {
    id:          "growth",
    tier:        "Growth",
    tagline:     "Most popular",
    price:       25000,
    maxStudents: 500,
    admins:      5,
    featured:    true,
  },
  {
    id:          "pro",
    tier:        "Pro",
    tagline:     "For large schools",
    price:       50000,
    maxStudents: 1000,
    admins:      10,
    featured:    false,
  },
];

function fmtPKR(n) {
  if (n >= 100000) return (n / 1000).toFixed(0) + "K";
  return (n / 1000).toFixed(1).replace(".0", "") + "K";
}

/* ═══════════════════════════════════════
   FEATURE LIST — collapsible
═══════════════════════════════════════ */
function FeatureList({ isRecommended }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? ALL_FEATURES : ALL_FEATURES.slice(0, 6);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col gap-[.5rem] mb-2">
        {shown.map((f) => {
          const ps = FEAT_PHASE_STYLE[f.phase];
          return (
            <div key={f.label} className="flex items-start gap-[.5rem]">
              <div
                className="w-[15px] h-[15px] rounded-full flex-shrink-0 flex items-center
                  justify-center text-[.55rem] font-bold mt-[2px]"
                style={{
                  background: isRecommended ? "rgba(59,130,246,.28)" : "rgba(59,130,246,.15)",
                  color: "#60a5fa",
                }}
              >
                ✓
              </div>
              <div className="flex items-center gap-[.38rem] flex-wrap flex-1">
                <span
                  className="text-[.8rem] leading-[1.4]"
                  style={{ color: isRecommended ? "rgba(255,255,255,.72)" : "#7a90b0" }}
                >
                  {f.label}
                </span>
                <span
                  className="text-[.58rem] font-bold px-[.38rem] py-[.08rem] rounded-full flex-shrink-0"
                  style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}` }}
                >
                  {ps.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[.74rem] font-semibold mb-5 w-fit hover:opacity-70 transition-opacity duration-200"
        style={{ color: "#60a5fa", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        {expanded ? "↑ Show less" : `+ ${ALL_FEATURES.length - 6} more features →`}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════
   PRICING CARD
═══════════════════════════════════════ */
function PricingCard({ plan, yearly, visible, delay }) {
  const isRecommended = plan.featured;
  const price         = yearly ? Math.round(plan.price * 0.8) : plan.price;
  const monthlyPrice  = plan.price;

  return (
    <div
      className={`
        relative rounded-[22px] p-[1.9rem] border flex flex-col
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${isRecommended
          ? "scale-[1.035] z-10"
          : "hover:-translate-y-[4px] hover:border-white/[.12]"
        }
      `}
      style={{
        transitionDelay: `${delay}ms`,
        background: isRecommended
          ? "linear-gradient(150deg,rgba(59,130,246,.16),rgba(34,211,238,.07))"
          : "#0d1525",
        borderColor: isRecommended ? "rgba(59,130,246,.45)" : "rgba(255,255,255,.07)",
        boxShadow: isRecommended
          ? "0 0 0 1px rgba(59,130,246,.3), 0 24px 60px rgba(59,130,246,.18)"
          : "0 4px 24px rgba(0,0,0,.35)",
        animation: isRecommended ? "cardGlow 3s 1s ease-in-out infinite" : "none",
      }}
    >
      {/* Popular ribbon */}
      {isRecommended && (
        <div
          className="absolute -top-[13px] left-1/2 -translate-x-1/2 text-white
            text-[.67rem] font-extrabold tracking-[.08em] uppercase
            px-4 py-[.28rem] rounded-full whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg,#3b82f6,#22d3ee)",
            boxShadow: "0 4px 14px rgba(59,130,246,.5)",
          }}
        >
          ⭐ Most Popular
        </div>
      )}

      {/* Tier */}
      <div
        className="text-[.72rem] font-bold tracking-[.1em] uppercase mb-[.25rem]"
        style={{ color: isRecommended ? "rgba(147,197,253,.7)" : "#60a5fa" }}
      >
        {plan.tier}
      </div>
      <div
        className="text-[.78rem] mb-4"
        style={{ color: isRecommended ? "rgba(255,255,255,.38)" : "#3a5070" }}
      >
        {plan.tagline}
      </div>

      {/* Price */}
      <div className="flex items-end gap-2 mb-[.15rem]">
        <div
          className="font-syne font-black tracking-[-2px] leading-none"
          style={{ fontSize: "clamp(2rem,3.2vw,2.6rem)", color: "#f0f4ff" }}
        >
          {fmtPKR(price)}
        </div>
        <div className="pb-[.3rem]">
          <div
            className="text-[.7rem] font-semibold leading-none"
            style={{ color: isRecommended ? "rgba(255,255,255,.38)" : "#7a90b0" }}
          >
            PKR
          </div>
          <div
            className="text-[.62rem] leading-none mt-[.15rem]"
            style={{ color: isRecommended ? "rgba(255,255,255,.25)" : "#3a5070" }}
          >
            / {yearly ? "year" : "month"}
          </div>
        </div>
      </div>

      {/* Yearly saving */}
      {yearly && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[.68rem] line-through" style={{ color: "#3a5070" }}>
            {fmtPKR(monthlyPrice)}/mo
          </span>
          <span
            className="text-[.68rem] font-bold px-2 py-[.15rem] rounded-full"
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

      {/* Plan limits */}
      <div
        className="rounded-[12px] p-3 mb-5 grid grid-cols-2 gap-2"
        style={{
          background: isRecommended ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        {[
          { icon: "👥", label: "Students", val: `Up to ${plan.maxStudents}` },
          { icon: "🛡️", label: "Admins",   val: `${plan.admins} admins`     },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-[.62rem] mb-[.18rem]" style={{ color: "#3a5070" }}>
              {item.icon} {item.label}
            </div>
            <div
              className="font-syne font-bold text-[.82rem]"
              style={{ color: isRecommended ? "rgba(255,255,255,.8)" : "#f0f4ff" }}
            >
              {item.val}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="h-px mb-4"
        style={{ background: isRecommended ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.06)" }}
      />

      {/* Features */}
      <FeatureList isRecommended={isRecommended} />

      {/* CTA */}
      <a
        href="#cta"
        className="block w-full text-center py-[.88rem] rounded-full
          font-syne text-[.88rem] font-bold no-underline
          transition-all duration-200 mt-auto"
        style={
          isRecommended
            ? { background: "#fff", color: "#0a1628" }
            : { background: "rgba(255,255,255,.06)", color: "#f0f4ff", border: "1px solid rgba(255,255,255,.08)" }
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
        Start Free Trial →
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════ */
export default function Pricing() {
  const [yearly,  setYearly]  = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={ref}
      className="px-8 py-28 relative overflow-hidden"
      style={{ background: "#04080f" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(59,130,246,.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* ── Header ── */}
        <div
          className={`flex flex-wrap items-end justify-between gap-8 mb-14
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-[560px]">
            <span
              className="inline-flex items-center gap-[.4rem] text-[.7rem] font-bold
                tracking-[.12em] uppercase text-[#60a5fa] px-[.9rem] py-[.32rem]
                rounded-full mb-[1.1rem] border"
              style={{ background: "rgba(59,130,246,.1)", borderColor: "rgba(59,130,246,.22)" }}
            >
              💰 Pricing
            </span>
            <h2
              className="font-syne font-extrabold leading-[1.05] tracking-[-1.5px] text-[#f0f4ff] mb-[.8rem]"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
            >
              Same features,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#60a5fa,#22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                every plan
              </span>
            </h2>
            <p className="text-[1rem] text-[#7a90b0] leading-[1.75] mb-4">
              All schools get every feature as phases launch — price only depends on your school size.
            </p>
            {/* Phase increase note */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] border text-[.78rem]"
              style={{
                background: "rgba(245,158,11,.08)",
                borderColor: "rgba(245,158,11,.22)",
                color: "#fbbf24",
              }}
            >
              <span>⚠️</span>
              Price increases with each new phase launch — for all schools.
            </div>
          </div>

          {/* Yearly toggle */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-[14px] border border-white/[.07] flex-shrink-0"
            style={{ background: "#0d1525" }}
          >
            <span className="text-[.82rem]" style={{ color: yearly ? "#3a5070" : "#f0f4ff" }}>
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className="relative w-[44px] h-[24px] rounded-full border transition-all duration-250 cursor-pointer outline-none"
              style={{
                background: yearly ? "rgba(59,130,246,.2)" : "rgba(255,255,255,.07)",
                borderColor: yearly ? "rgba(59,130,246,.4)" : "rgba(255,255,255,.12)",
              }}
            >
              <div
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full transition-all duration-250"
                style={{ left: yearly ? "23px" : "3px", background: yearly ? "#60a5fa" : "#7a90b0" }}
              />
            </button>
            <span className="text-[.82rem]" style={{ color: yearly ? "#f0f4ff" : "#3a5070" }}>
              Yearly
            </span>
            {yearly && (
              <span
                className="text-[.7rem] font-bold px-2 py-[.22rem] rounded-full"
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

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.3rem] items-start">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              yearly={yearly}
              visible={visible}
              delay={150 + i * 100}
            />
          ))}
        </div>

        {/* ── Phase pricing note ── */}
        <div
          className={`mt-8 rounded-[16px] px-5 py-4 border border-white/[.06]
            flex flex-wrap items-start gap-3
            transition-all duration-700 delay-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ background: "#0d1525" }}
        >
          <span className="text-[.88rem] flex-shrink-0 mt-[.1rem]">📈</span>
          <div>
            <div className="font-syne font-bold text-[.85rem] text-[#f0f4ff] mb-1">
              How pricing grows with phases
            </div>
            <p className="text-[.78rem] text-[#7a90b0] leading-[1.6]">
              Current prices are <span style={{ color: "#34d399" }}>Phase 1 rates</span>. As each new phase launches with new features,
              pricing will be updated for all schools. You will always be notified in advance before any price change.
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className={`mt-8 flex flex-wrap items-center justify-between gap-5
            pt-8 border-t border-white/[.06]
            transition-all duration-700 delay-[600ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-2 text-[.84rem] text-[#7a90b0]">
            <span>🇵🇰</span>
            Prices in PKR. Enterprise plans for 1000+ students — contact us.
          </div>
          <div className="flex flex-wrap gap-2">
            {["🔒 Secure payments", "🎓 3-month free trial", "💬 Free onboarding", "🚀 10-min setup"].map((b) => (
              <div
                key={b}
                className="text-[.7rem] font-semibold text-[#7a90b0] px-3 py-[.3rem]
                  rounded-full border border-white/[.06]"
                style={{ background: "#0d1525" }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}