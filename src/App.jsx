import "./index.css";

import Navbar    from "./Components/Navbar";
import Hero      from "./Components/Hero";
import Problem   from "./Components/Problem";
import Features  from "./Components/Features";
import Pricing   from "./Components/Pricing";
import HowItWorks from "./Components/HowItWorks";
import Roadmap   from "./Components/Roadmap";
import Cta       from "./Components/Cta";
import Footer    from "./Components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Pricing />
        <HowItWorks />  
        <Roadmap />

        <Cta />
      </main>
      <Footer />
    </>
  );
}
