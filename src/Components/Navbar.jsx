import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Features",     href: "#features" },
  { label: "Pricing",      href: "#pricing"  },
  { label: "Roadmap",      href: "#roadmap"  },
  { label: "Early Access", href: "#founding" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (href) => {
    closeMenu();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-[6%] py-4 bg-bg/85 backdrop-blur-[20px] border-b border-border transition-shadow duration-300 animate-fade-down ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-[0.6rem] text-[1.25rem] font-extrabold tracking-[-0.5px] no-underline text-text group">
          <div className="w-[34px] h-[34px] bg-gradient-to-br from-blue-primary to-cyan-primary rounded-[9px] flex items-center justify-center text-[0.9rem] font-black text-white transition-transform duration-200 group-hover:scale-[1.07]">
            E
          </div>
          EduCore <em className="not-italic text-blue-secondary">OS</em>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a 
                href={l.href} 
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="text-muted no-underline text-[0.88rem] font-medium transition-colors duration-200 hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3 items-center">
          <button className="bg-transparent text-muted border border-border-2 px-[1.2rem] py-2 rounded-lg font-inherit text-[0.88rem] font-medium cursor-pointer transition-all duration-200 hover:text-text hover:border-blue-primary">
            Sign In
          </button>
          <button 
            className="bg-blue-primary text-white border-none px-[1.3rem] py-[0.55rem] rounded-lg font-inherit text-[0.88rem] font-bold cursor-pointer transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:bg-[#2563eb] hover:-translate-y-[1px]"
            onClick={() => scrollTo("#founding")}
          >
            Get Early Access →
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-none border-none p-[0.3rem]"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span 
            className="w-[22px] h-[2px] bg-text rounded-sm transition-all duration-250"
            style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "" }} 
          />
          <span 
            className="w-[22px] h-[2px] bg-text rounded-sm transition-all duration-250"
            style={{ opacity: menuOpen ? 0 : 1 }} 
          />
          <span 
            className="w-[22px] h-[2px] bg-text rounded-sm transition-all duration-250"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "" }} 
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`fixed top-[72px] left-0 right-0 bg-bg/95 backdrop-blur-[20px] border-b border-border px-[6%] py-8 flex-col gap-6 z-[199] md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100 flex" : "-translate-y-10 opacity-0 pointer-events-none hidden"
        }`}
      >
        <div className="flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <a 
              key={l.label} 
              href={l.href} 
              onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
              className="text-muted no-underline text-[1.1rem] font-medium hover:text-text transition-colors py-2 border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col gap-3 mt-2">
          <button className="bg-transparent text-muted border border-border-2 w-full py-3 rounded-xl font-medium text-[1rem]">
            Sign In
          </button>
          <button 
            className="bg-blue-primary text-white border-none w-full py-3.5 rounded-xl font-bold text-[1rem] shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            onClick={() => scrollTo("#founding")}
          >
            Get Early Access →
          </button>
        </div>
      </div>
    </>
  );
}
