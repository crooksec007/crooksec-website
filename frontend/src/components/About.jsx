import { motion } from 'framer-motion';
import { Shield, Brain, Code2, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const stats = [
  { icon: Shield, label: 'Security First', desc: 'Enterprise-grade defensive operations' },
  { icon: Brain, label: 'AI-Powered', desc: 'Machine learning at every layer' },
  { icon: Code2, label: 'Full-Stack', desc: 'End-to-end software engineering' },
  { icon: Zap, label: 'Fast Delivery', desc: 'Agile teams, rapid deployment' },
];

export const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" data-testid="about-section">
      <div
        className="absolute left-0 top-1/2 w-1/3 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.3))' }}
      />
      <div
        className="absolute right-0 top-1/2 w-1/3 h-px"
        style={{ background: 'linear-gradient(to left, transparent, rgba(112,0,255,0.3))' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text slides in from left */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5"
            >
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              About CrookSec
            </motion.div>

            <h2
              className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              data-testid="about-title"
            >
              Built for the{' '}
              <span className="gradient-text">Digital Frontier</span>
            </h2>

            <motion.p
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-slate-400 text-base leading-relaxed mb-6"
            >
              CrookSec is a technology-driven company specializing in defensive security, AI-powered solutions, and full-stack software development. We help organizations strengthen their digital infrastructure, build innovative products, and implement advanced technologies that drive efficiency, resilience, and scalability.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-slate-400 text-base leading-relaxed mb-8"
            >
              Our team combines expertise in digital investigations, defensive security operations, and modern software development to deliver reliable, high-performance solutions for businesses across industries.
            </motion.p>

            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mono"
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.96 }}
              data-testid="about-cta"
            >
              <span>Work with us</span>
              <motion.span
                className="h-px bg-cyan-400"
                initial={{ width: 24 }}
                whileHover={{ width: 40 }}
                style={{ display: 'inline-block' }}
              />
            </motion.button>
          </motion.div>

          {/* Right: Cards stagger in */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={i * 0.05}
                whileHover={{ y: -6, boxShadow: '0 0 24px -5px rgba(0,240,255,0.3)', borderColor: 'rgba(0,240,255,0.35)' }}
                className="glass-card p-6 rounded-2xl cursor-default"
                data-testid={`about-feature-${i}`}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)' }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {item.label}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              custom={0.4}
              className="col-span-2 rounded-2xl overflow-hidden relative h-40"
              style={{ border: '1px solid rgba(148, 163, 184, 0.1)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1664526936810-ec0856d31b92?w=800&q=60"
                alt="CrookSec team"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.5) saturate(0.8)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.1) 0%, rgba(112,0,255,0.1) 100%)' }}
              />
              <div className="absolute bottom-4 left-4">
                <div className="text-white text-sm font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Securing the digital world
                </div>
                <div className="text-slate-400 text-xs mono">est. 2020</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
