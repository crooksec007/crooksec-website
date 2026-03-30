import "@/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { VideoIntro } from "./components/VideoIntro";
import { About } from "./components/About";
import { Team } from "./components/Team";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { WhyChoose } from "./components/WhyChoose";
import { Portfolio } from "./components/Portfolio";
import { SecurityScanner } from "./components/SecurityScanner";
import { Insights } from "./components/Insights";
import { Chatbot } from "./components/Chatbot";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingChat } from "./components/FloatingChat";
import { Leads } from "./components/Leads";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const StackedSection = ({ children, zIndex }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, zIndex }}
      className="relative bg-[#020617] w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => (
  <main className="relative bg-[#020617]">
    <StackedSection zIndex={10}><Hero /></StackedSection>
    <StackedSection zIndex={15}><VideoIntro /></StackedSection>
    <StackedSection zIndex={20}><About /></StackedSection>
    <StackedSection zIndex={30}><Team /></StackedSection>
    <StackedSection zIndex={40}><Services /></StackedSection>
    <StackedSection zIndex={50}><TechStack /></StackedSection>
    <StackedSection zIndex={60}><WhyChoose /></StackedSection>
    <StackedSection zIndex={70}><Portfolio /></StackedSection>
    <StackedSection zIndex={80}><SecurityScanner /></StackedSection>
    <StackedSection zIndex={90}><Insights /></StackedSection>
    <StackedSection zIndex={100}><Chatbot /></StackedSection>
    <StackedSection zIndex={110}><Contact /></StackedSection>
  </main>
);

function App() {
  return (
    <Router>
      <div className="App bg-[#020617] min-h-screen text-slate-200">
        <div className="relative z-[200]"><Navbar /></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vault" element={<Leads />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <div className="relative z-[90] bg-[#020617]">
          <Footer />
        </div>
        <FloatingChat />
      </div>
    </Router>
  );
}

export default App;


