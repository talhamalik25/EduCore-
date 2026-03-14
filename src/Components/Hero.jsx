const STATS = [
  { num: "10", suffix: "+",      label: "Problems Solved"  },
  { num: "4",  suffix: " Roles", label: "One Platform"     },
  { num: "5",  suffix: " Phases",label: "Phased Rollout"   },
  { num: "PKR",suffix: " 15K",   label: "Starting Price/mo"},
];

const MOCK_STATS = [
  { label: "Total Students", val: "1,284", sub: "+12% this month" },
  { label: "Fee Collection", val: "94%", sub: "6% outstanding", red: true },
  { label: "Avg Attendance", val: "92.4%", sub: "Last 7 days" },
  { label: "AI Risk Alerts", val: "14", sub: "Needs attention", red: true },
];

const BARS = [
  { h: "60%", op: 0.4 },
  { h: "80%", op: 0.6 },
  { h: "45%", op: 0.3 },
  { h: "90%", op: 1 },
  { h: "70%", op: 0.5 },
  { h: "85%", op: 0.8 },
];

const STUDENTS = [
  { name: "Ahmed Khan", detail: "Class 9-B · Absent 3 days", av: "AK", bg: "#3b82f6", badge: "Parent Alerted", badgeBg: "rgba(59,130,246,0.1)", badgeClr: "#60a5fa" },
  { name: "Sara Malik", detail: "Class 10-A · Fee Overdue", av: "SM", bg: "#f59e0b", badge: "Defaulter", badgeBg: "rgba(245,158,11,0.1)", badgeClr: "#f59e0b" },
  { name: "Zainab Ali", detail: "Class 8-C · Top Performer", av: "ZA", bg: "#10b981", badge: "AI Insight", badgeBg: "rgba(16,185,129,0.1)", badgeClr: "#10b981" },
];

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-[6%] pt-36 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(59,130,246,0.22)_0%,transparent_65%),radial-gradient(ellipse_50%_35%_at_15%_70%,rgba(34,211,238,0.1)_0%,transparent_55%),radial-gradient(ellipse_40%_30%_at_85%_60%,rgba(129,140,248,0.08)_0%,transparent_55%)]" />
      
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_85%_70%_at_50%_50%,black_20%,transparent_100%)]" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-[1400px] relative z-10">
        
        {/* Left - Content */}
        <div className="flex-[0_0_55%] text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-cyan-primary text-[0.75rem] font-bold tracking-widest uppercase px-[1.1rem] py-[0.4rem] rounded-full mb-[1.8rem] animate-fade-up [animation-delay:0.1s] [animation-fill-mode:both]">
            <span className="w-[7px] h-[7px] rounded-full bg-cyan-primary animate-pulse-slow" />
            AI-Powered · Built for Pakistan
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] font-black tracking-[-2px] leading-[0.95] animate-fade-up [animation-delay:0.2s] [animation-fill-mode:both]">
            The <span className="serif text-white tracking-[-2px]">Operating System</span>
            <br />
            for <span className="grad-text">Modern Schools</span>
          </h1>

          {/* Subheading */}
          <p className="text-muted text-[1.1rem] font-normal max-w-[560px] mx-auto lg:ml-0 mt-[1.8rem] mb-0 leading-[1.7] animate-fade-up [animation-delay:0.35s] [animation-fill-mode:both]">
            Replace paper registers, WhatsApp groups, fee notebooks, and Excel sheets —
            with one powerful, AI-driven platform built for Pakistani schools.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 mt-[2.5rem] flex-wrap justify-center lg:justify-start animate-fade-up [animation-delay:0.5s] [animation-fill-mode:both]">
            <button className="btn-primary" onClick={() => scrollTo("founding")}>
              🚀 Join Founding Members
            </button>
            <button className="btn-outline" onClick={() => scrollTo("features")}>
              Explore Features ↓
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-x-8 gap-y-6 md:gap-10 mt-[3.5rem] md:mt-[4rem] flex-wrap justify-center lg:justify-start animate-fade-up [animation-delay:0.65s] [animation-fill-mode:both]">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8 md:gap-10">
                <div className="text-center lg:text-left">
                  <div className="text-[1.5rem] md:text-[1.8rem] font-extrabold text-text tracking-[-1px]">
                    {s.num}<span className="text-blue-secondary">{s.suffix}</span>
                  </div>
                  <div className="text-[0.7rem] md:text-[0.75rem] text-muted font-medium mt-[0.1rem] uppercase tracking-wider">{s.label}</div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="hidden sm:block w-[1px] h-[32px] md:h-[40px] bg-border-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Dashboard Mockup */}
        <div className="hero-mockup-anim flex-[0_0_42%] hidden lg:block animate-fade-up [animation-delay:0.8s] [animation-fill-mode:both]">
          <div 
            className="animate-float-card rounded-[22px] overflow-hidden" 
            style={{ 
              background: "#0d1525", 
              boxShadow: "0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(59,130,246,.12)", 
            }} 
          > 
            {/* Topbar */} 
            <div 
              className="flex items-center gap-[.6rem] px-[1.3rem] py-[.9rem] 
                border-b border-white/[.06]" 
              style={{ background: "#0a1628" }} 
            > 
              {["#ff5f57","#febc2e","#28c840"].map(c => ( 
                <div key={c} className="w-[10px] h-[10px] rounded-full" style={{ background: c }} /> 
              ))} 
              <span className="text-white/40 text-[.72rem] font-medium ml-[.4rem]"> 
                EduCore OS — Principal Dashboard 
              </span> 
            </div> 

            {/* Body */} 
            <div className="p-[1.1rem]" style={{ background: "#080e1a" }}> 

              {/* Stat Cards */} 
              <div className="grid grid-cols-2 gap-[.6rem] mb-[.6rem]"> 
                {MOCK_STATS.map((s, i) => ( 
                  <div 
                    key={i} 
                    className={`rounded-[13px] p-[.85rem] border border-white/[.06] 
                      transition-all duration-200 
                      hover:border-[rgba(59,130,246,.25)] hover:-translate-y-px 
                      stat-anim-${i + 1}`} 
                    style={{ background: "#0d1525" }} 
                  > 
                    <div className="text-[.62rem] text-[#7a90b0] mb-[.35rem]">{s.label}</div> 
                    <div 
                      className="font-serif font-bold text-[1.3rem] leading-none" 
                      style={{ color: s.red ? "#f87171" : "#f0f4ff" }} 
                    > 
                      {s.val} 
                    </div> 
                    <div 
                      className="text-[.6rem] font-semibold mt-[.15rem]" 
                      style={{ color: s.red ? "#f87171" : "#10b981" }} 
                    > 
                      {s.sub} 
                    </div> 
                  </div> 
                ))} 
              </div> 

              {/* Bar Chart */} 
              <div 
                className="rounded-[13px] p-[.85rem] border border-white/[.06] mb-[.6rem]" 
                style={{ background: "#0d1525" }} 
              > 
                <div className="text-[.68rem] font-semibold text-[#7a90b0] mb-[.6rem]"> 
                  📊 Weekly Attendance Trend 
                </div> 
                <div className="flex items-end gap-[.28rem] h-[48px]"> 
                  {BARS.map((b, i) => ( 
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t-[3px] bar-anim`} 
                      style={{ 
                        height: b.h, 
                        opacity: b.op, 
                        background: "linear-gradient(180deg,#60a5fa,#3b82f6)", 
                      }} 
                    /> 
                  ))} 
                </div> 
                <div className="flex gap-[.28rem] mt-[.3rem]"> 
                  {["M","T","W","T","F","S"].map((d,i) => ( 
                    <div key={i} className="flex-1 text-center text-[.52rem] font-semibold text-[#3a5070]"> 
                      {d} 
                    </div> 
                  ))} 
                </div> 
              </div> 

              {/* Student Rows */} 
              <div className="flex flex-col gap-[.38rem]"> 
                {STUDENTS.map((s, i) => ( 
                  <div 
                    key={i} 
                    className={`flex items-center gap-[.55rem] rounded-[9px] 
                      px-[.7rem] py-[.52rem] border border-white/[.06] 
                      transition-all duration-150 
                      hover:border-[rgba(59,130,246,.2)] 
                      row-anim-${i + 1}`} 
                    style={{ background: "#0d1525" }} 
                  > 
                    <div 
                      className="w-[26px] h-[26px] rounded-full flex items-center 
                        justify-center text-[.62rem] font-bold text-white flex-shrink-0" 
                      style={{ background: s.bg }} 
                    > 
                      {s.av} 
                    </div> 
                    <div className="flex-1 min-w-0"> 
                      <div className="text-[.63rem] font-semibold text-[#f0f4ff] truncate"> 
                        {s.name} 
                      </div> 
                      <div className="text-[.57rem] text-[#7a90b0]">{s.detail}</div> 
                    </div> 
                    <span 
                      className="text-[.52rem] font-bold px-2 py-[.18rem] 
                        rounded-full flex-shrink-0 ml-auto" 
                      style={{ background: s.badgeBg, color: s.badgeClr }} 
                    > 
                      {s.badge} 
                    </span> 
                  </div> 
                ))} 
              </div> 
            </div> 
          </div> 
        </div>

      </div>
    </section>
  );
}
