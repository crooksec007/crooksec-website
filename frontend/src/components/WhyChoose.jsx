import { motion } from 'framer-motion';
import { Cpu, Lock, Server, Rocket, Layers, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const features = [
  {
    icon: Cpu,
    title: 'Cutting-edge AI Solutions',
    desc: 'We implement state-of-the-art AI/ML models, LLMs, and intelligent automation pipelines tailored to your workflows.',
    highlight: true,
  },
  {
    icon: Lock,
    title: 'Enterprise-grade Security',
    desc: 'Security is not an afterthought — it is baked into every layer of our architecture and development process.',
    highlight: false,
  },
  {
    icon: Server,
    title: 'Scalable Cloud Architecture',
    desc: 'Multi-region deployments, auto-scaling infrastructure, and 99.9% uptime SLAs across AWS, Azure, and GCP.',
    highlight: false,
  },
  {
    icon: Layers,
    title: 'Experienced Dev Teams',
    desc: 'Battle-tested engineers with deep expertise across security, AI, blockchain, and full-stack development.',
    highlight: true,
  },
  {
    icon: Rocket,
    title: 'Innovative Product Engineering',
    desc: 'From ideation to production — we build products that users love and businesses depend on.',
    highlight: false,
  },
  {
    icon: CheckCircle,
    title: 'Proven Track Record',
    desc: '200+ projects delivered for enterprises, startups, and government entities across 3 continents.',
    highlight: false,
  },
];

export const WhyChoose = () => {
  return (
    <section id="why" className="relative py-32 px-6 overflow-hidden" data-testid="why-section">
      <div
        className="absolute -left-40 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -right-40 bottom-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Why CrookSec
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="why-title"
          >
            The CrookSec <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            We do not just build solutions — we engineer competitive advantages that last.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: f.highlight ? '0 20px 40px -10px rgba(0,240,255,0.2)' : '0 20px 40px -10px rgba(148,163,184,0.1)',
              }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl p-6 cursor-default overflow-hidden"
              style={{
                background: f.highlight
                  ? 'linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(112,0,255,0.08) 100%)'
                  : 'rgba(15, 23, 42, 0.4)',
                border: f.highlight
                  ? '1px solid rgba(0,240,255,0.2)'
                  : '1px solid rgba(148, 163, 184, 0.1)',
                backdropFilter: 'blur(12px)',
              }}
              data-testid={`why-feature-${i}`}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: f.highlight ? 'rgba(0,240,255,0.1)' : 'rgba(148,163,184,0.05)',
                  border: f.highlight ? '1px solid rgba(0,240,255,0.3)' : '1px solid rgba(148,163,184,0.1)',
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <f.icon
                  className="w-5 h-5"
                  style={{ color: f.highlight ? '#00F0FF' : '#94A3B8' }}
                  strokeWidth={1.5}
                />
              </motion.div>
              <h3 className="text-white font-semibold text-base mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
