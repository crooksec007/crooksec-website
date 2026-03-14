import { motion } from 'framer-motion';
import { Shield, Target, Layers, Globe, ShoppingCart, Brain, Smartphone, Cloud, Users } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const services = [
  {
    icon: Shield,
    title: 'Defensive Security & Digital Intelligence',
    desc: 'SOC operations, threat hunting, SIEM/SOAR implementation, and digital forensics to protect your infrastructure.',
    color: '#00F0FF',
  },
  {
    icon: Target,
    title: 'Red Team & Security Assessments',
    desc: 'Adversarial simulation, penetration testing, and vulnerability assessments to identify gaps before attackers do.',
    color: '#EF4444',
  },
  {
    icon: Layers,
    title: 'Blockchain Development & Smart Contracts',
    desc: 'Ethereum, Solana, and custom chain deployments with audited smart contracts and DeFi protocol development.',
    color: '#F59E0B',
  },
  {
    icon: Globe,
    title: 'Web & Application Development',
    desc: 'Scalable, high-performance web applications built with modern frameworks and clean architecture patterns.',
    color: '#7000FF',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    desc: 'Custom storefronts, headless commerce, payment integrations, and inventory management systems.',
    color: '#10B981',
  },
  {
    icon: Brain,
    title: 'AI-Powered Solutions',
    desc: 'LLM integration, custom model training, RAG pipelines, AI agents, and intelligent automation workflows.',
    color: '#00F0FF',
  },
  {
    icon: Smartphone,
    title: 'Mobile Application Development',
    desc: 'Cross-platform iOS & Android applications with React Native delivering native performance at scale.',
    color: '#7000FF',
  },
  {
    icon: Cloud,
    title: 'Cloud Platforms & DevOps',
    desc: 'AWS, Azure, and GCP infrastructure design, CI/CD pipelines, Kubernetes orchestration, and IaC.',
    color: '#00F0FF',
  },
  {
    icon: Users,
    title: 'Dedicated Development Teams',
    desc: 'Embedded engineering squads that integrate seamlessly with your organization and accelerate delivery.',
    color: '#10B981',
  },
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 40px -10px ${service.color}35`,
        borderColor: `${service.color}50`,
      }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-6 rounded-2xl relative overflow-hidden cursor-default"
      data-testid={`service-card-${index}`}
    >
      {/* Corner glow — shows on hover via CSS group */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${service.color}18, transparent 70%)` }}
      />

      {/* Icon with spin on hover */}
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <service.icon className="w-5 h-5" style={{ color: service.color }} strokeWidth={1.5} />
      </motion.div>

      <h3 className="text-white font-semibold text-base mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {service.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>

      <motion.div
        className="flex items-center gap-1 mt-4 text-xs mono"
        style={{ color: service.color }}
        initial={{ opacity: 0, x: -8 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        <span>Learn more</span>
        <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>→</motion.span>
      </motion.div>
    </motion.div>
  );
};

export const Services = () => {
  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden" data-testid="services-section">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-purple-500/20 rounded-full bg-purple-500/5">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            Core Expertise
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="services-title"
          >
            What We <span className="gradient-text">Build & Defend</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            From penetration testing to AI-powered applications — we deliver end-to-end solutions that scale.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
