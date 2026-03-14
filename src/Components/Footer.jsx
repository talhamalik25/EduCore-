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

const FOOTER_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Features",     href: "#features" },
      { label: "How It Works", href: "#how"      },
      { label: "Pricing",      href: "#pricing"  },
      { label: "Roadmap",      href: "#roadmap"  },
    ],
  },
  {
    heading: "Modules",
    links: [
      { label: "Attendance",     href: "#" },
      { label: "Fee Management", href: "#" },
      { label: "Homework",       href: "#" },
      { label: "AI Analyzer",    href: "#" },
      { label: "Parent App",     href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About CoreCraft", href: "#" },
      { label: "Contact Us",      href: "#" },
      { label: "Blog",            href: "#" },
      { label: "Careers",         href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",   href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy",    href: "#" },
      { label: "Refund Policy",    href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: "𝕏",  label: "Twitter"  },
  { icon: "in", label: "LinkedIn" },
  { icon: "f",  label: "Facebook" },
  { icon: "▶",  label: "YouTube"  },
];

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="text-[0.83rem] no-underline transition-colors duration-200 text-muted/60 hover:text-blue-secondary relative inline-block group"
      >
        {children}
        <span className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-blue-secondary group-hover:w-full transition-all duration-250" />
      </a>
    </li>
  );
}

export default function Footer() {
  const [brandRef, brandVisible] = useReveal(0);
  const [botRef, botVisible]     = useReveal(300);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg relative overflow-hidden border-t border-border">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-[600px] h-[180px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.04)_0%,transparent_70%)]"
      />

      {/* Top grid */}
      <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 lg:gap-8">
        {/* Brand */}
        <div
          ref={brandRef}
          className={`reveal ${brandVisible ? "visible" : ""}`}
        >
          <a href="#" className="inline-flex items-center gap-[.65rem] no-underline mb-5 group">
            <div className="w-9 h-9 rounded-[10px] flex-shrink-0 flex items-center justify-center text-[.95rem] group-hover:scale-[1.07] transition-transform duration-200 bg-gradient-to-br from-blue-primary to-cyan-primary">
              🎓
            </div>
            <span className="text-[1.15rem] font-extrabold text-text">
              EduCore <em className="not-italic text-blue-secondary">OS</em>
            </span>
          </a>

          <p className="text-[0.82rem] leading-[1.7] mb-6 max-w-[210px] text-muted/60">
            The AI-powered operating system for modern schools in Pakistan and South Asia.
          </p>

          <div className="flex gap-2 mb-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-[.72rem] font-bold no-underline border border-border bg-bg-2 transition-all duration-200 text-muted/60 hover:bg-blue-primary/15 hover:text-blue-secondary hover:-translate-y-0.5"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="inline-flex items-center gap-[.42rem] text-[.73rem] font-semibold px-[.88rem] py-[.38rem] rounded-full border border-border bg-bg-2 text-muted/60">
            <span className="animate-pulse-slow">🇵🇰</span>
            Built with ❤️ in Pakistan
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col, i) => (
          <div
            key={col.heading}
            className={`reveal ${brandVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${(i + 1) * 80}ms` }}
          >
            <div className="text-[0.68rem] font-bold tracking-widest uppercase mb-5 text-muted/40">
              {col.heading}
            </div>
            <ul className="flex flex-col gap-3 list-none p-0">
              {col.links.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto h-px bg-white/5" />

      {/* Bottom bar */}
      <div
        ref={botRef}
        className={`reveal max-w-[1200px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6 ${botVisible ? "visible" : ""}`}
      >
        <div className="text-[0.76rem] text-muted/40">
          © {year} CoreCraft Technologies. All rights reserved.
        </div>

        <div className="inline-flex items-center gap-[0.38rem] text-[0.68rem] font-semibold px-[0.72rem] py-[0.22rem] rounded-full border border-blue-primary/10 text-blue-primary/50 bg-blue-primary/5">
          <div className="w-[5px] h-[5px] rounded-full bg-blue-secondary animate-pulse-slow" />
          EduCore OS v1.0 — Phase 1
        </div>

        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-[0.76rem] no-underline transition-colors duration-200 text-muted/40 hover:text-white/45"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
