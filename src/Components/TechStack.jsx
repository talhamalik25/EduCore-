import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return [ref, visible];
}

const STACK = [
  { layer: "Frontend",  name: "React.js",              purpose: "Admin & teacher dashboard"  },
  { layer: "Mobile",    name: "React Native",           purpose: "Parent & student app"        },
  { layer: "Backend",   name: "Node.js + Express",      purpose: "API & business logic"        },
  { layer: "Database",  name: "MongoDB",                purpose: "Flexible data storage"       },
  { layer: "AI / ML",   name: "Python + OpenAI",        purpose: "Performance analysis"        },
  { layer: "Real-time", name: "Socket.io",              purpose: "Live notifications"          },
  { layer: "Payments",  name: "JazzCash / EasyPaisa",   purpose: "Local payment gateway"       },
  { layer: "GPS",       name: "Google Maps API",        purpose: "Transport tracking"          },
  { layer: "SMS",       name: "Twilio / Local Gateway", purpose: "Parent notifications"        },
  { layer: "Hosting",   name: "AWS / DigitalOcean",     purpose: "Scalable cloud infra"        },
  { layer: "Auth",      name: "JWT + RBAC",             purpose: "Multi-role secure login"     },
];

export default function TechStack() {
  const [headRef, headVisible] = useReveal(0);
  const [gridRef, gridVisible] = useReveal(100);

  return (
    <section id="tech" className="bg-bg-2 py-24 px-[6%]">
      <div ref={headRef} className={`text-center reveal ${headVisible ? "visible" : ""}`}>
        <div className="section-tag">🛠️ Technology</div>
        <h2 className="section-title">
          Built on <span className="serif">modern infrastructure</span>
        </h2>
        <p className="section-sub">
          Every component chosen for performance, reliability, and scalability
          in the Pakistani market.
        </p>
      </div>

      <div ref={gridRef} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-border border border-border rounded-2xl overflow-hidden mt-14 reveal ${gridVisible ? "visible" : ""}`}>
        {STACK.map((item) => (
          <div key={item.name} className="bg-surface p-6 md:p-8 transition-colors duration-200 cursor-default hover:bg-surface-2">
            <div className="text-[0.65rem] md:text-[0.7rem] font-bold tracking-widest uppercase text-muted-2 mb-1.5 md:mb-2">{item.layer}</div>
            <div className="text-[0.95rem] md:text-[1.1rem] font-bold text-text mb-1">{item.name}</div>
            <div className="text-[0.75rem] md:text-[0.82rem] text-muted leading-snug">{item.purpose}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
