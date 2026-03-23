import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const partners = [
  "Acme Corp", "Stark Industries", "CyberDyne Systems", "Wayne Enterprises", "Aperture Science", "Umbrella Corp", "Omni Consumer Products", "Tyrell Corp"
];

const testimonials = [
  {
    quote: "CrookSec identified 3 critical zero-day vulnerabilities before our Series B funding. Their offensive security team is completely unmatched in the industry.",
    author: "CTO, Fortune 500 Fintech",
  },
  {
    quote: "Their exhaustive constraints auditing secured $50M in TVL. They are unequivocally the premier security partners in the entire Web3 ecosystem.",
    author: "Founder, Leading DeFi Protocol",
  },
  {
    quote: "The fastest, most security-conscious development team we've ever embedded. Flawless execution from day one without writing a single bug.",
    author: "VP Engineering, Enterprise SaaS",
  }
];

export const TrustedBy = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(148,163,184,0.08)' }} data-testid="trusted-by-section">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Social Proof
          </div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Trusted By Global <span className="gradient-text">Enterprises</span>
          </h2>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative flex overflow-hidden w-full mb-32 mask-edges py-4">
          <motion.div
            className="flex gap-20 items-center flex-nowrap shrink-0 pr-20"
            // We use a CSS technique to animate infinitely smoothly
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
          >
            {/* Render the list twice to create a seamless looping effect */}
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div key={i} className="text-2xl md:text-3xl font-bold text-slate-700/60 uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {partner}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto h-[350px] md:h-72"
        >
          {/* Glow behind testimonial */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-cyan-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative glass-card p-8 md:p-14 rounded-3xl border border-slate-700/50 flex flex-col items-center text-center shadow-2xl overflow-hidden h-full">
            <Quote className="w-12 h-12 text-cyan-500/30 mb-8" />
            
            <div className="relative w-full h-full flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-x-0 top-0 flex flex-col items-center"
                >
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 font-medium max-w-2xl">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div className="text-sm mono text-cyan-400">
                    — {testimonials[activeTestimonial].author}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="absolute bottom-8 flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-cyan-400 w-8' : 'bg-slate-700 w-2 hover:bg-slate-500'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .mask-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
};
