import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { ParticleNetwork } from './3d/ParticleNetwork';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 1.0 + i * 0.15, ease: 'easeOut' },
  }),
};

export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
      data-testid="hero-section"
    >
      <ParticleNetwork />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(112, 0, 255, 0.2) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #020617)' }}
      />

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mono mb-8"
            data-testid="hero-badge"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            ADVANCED CYBERSECURITY & AI SYSTEMS
          </motion.div>

          {/* Title — each line staggers in */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-none"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="hero-title"
          >
            {['CrookSec', 'Defensive Security,', 'AI & Technology'].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                variants={{
                  hidden: { opacity: 0, y: 40, skewY: 3 },
                  visible: {
                    opacity: 1, y: 0, skewY: 0,
                    transition: { duration: 0.75, delay: 0.35 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                style={i === 1 ? {
                  background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : { color: '#F8FAFC' }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
            data-testid="hero-tagline"
          >
            We build and protect digital infrastructure like it's our own. AI-powered security and enterprise engineering—delivered by a team that genuinely cares about your success.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            data-testid="hero-cta-group"
          >
            <motion.button
              onClick={() => handleScroll('#services')}
              whileHover={{ scale: 1.06, boxShadow: '0 0 50px -5px rgba(0, 240, 255, 0.7)' }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-black font-semibold text-base"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #0099AA 100%)',
                boxShadow: '0 0 30px -5px rgba(0, 240, 255, 0.5)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
              data-testid="hero-cta-services"
            >
              Explore Our Services
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => handleScroll('#contact')}
              whileHover={{ scale: 1.06, boxShadow: '0 0 30px -5px rgba(112, 0, 255, 0.6)', borderColor: 'rgba(112, 0, 255, 0.9)' }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base border"
              style={{
                borderColor: 'rgba(112, 0, 255, 0.5)',
                background: 'rgba(112, 0, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
              data-testid="hero-cta-project"
            >
              <Play className="w-4 h-4" />
              Start a Project
            </motion.button>
          </motion.div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-20" data-testid="hero-stats">
            {[
              { value: '200+', label: 'Projects Delivered' },
              { value: '50+', label: 'Enterprise Clients' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <motion.div
                  className="text-2xl font-bold mono text-cyan-400"
                  whileHover={{ scale: 1.1, textShadow: '0 0 20px rgba(0,240,255,0.8)' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          className="text-xs text-slate-600 uppercase tracking-widest mono"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-cyan-400/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};
