import "@/index.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { WhyChoose } from "./components/WhyChoose";
import { Portfolio } from "./components/Portfolio";
import { Chatbot } from "./components/Chatbot";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App" style={{ background: '#020617', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <WhyChoose />
        <Portfolio />
        <Chatbot />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
