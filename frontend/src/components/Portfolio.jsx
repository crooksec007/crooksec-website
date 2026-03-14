import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const projects = [
  {
    title: 'AI Chatbot System',
    category: 'Artificial Intelligence',
    desc: 'Enterprise-grade conversational AI with multi-turn dialogue, RAG pipelines, and custom knowledge bases deployed across 3 sectors.',
    tags: ['GPT-4', 'RAG', 'LangChain', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1676911809746-85d90edbbe4a?w=600&q=60',
    accent: '#00F0FF',
  },
  {
    title: 'AI Voice Calling System',
    category: 'AI Communications',
    desc: 'Real-time AI voice assistant platform with sub-200ms latency, natural TTS/STT, and seamless CRM integrations for outbound sales.',
    tags: ['Whisper', 'TTS', 'WebRTC', 'Python'],
    image: 'https://images.unsplash.com/photo-1713464044292-e6798c8bb0e2?w=600&q=60',
    accent: '#7000FF',
  },
  {
    title: 'Blockchain DeFi Platform',
    category: 'Blockchain',
    desc: 'Decentralized finance protocol with audited smart contracts, liquidity pools, yield farming, and a custom governance token.',
    tags: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    image: 'https://images.unsplash.com/photo-1736196075570-1ca367e50927?w=600&q=60',
    accent: '#F59E0B',
  },
  {
    title: 'Cross-platform Mobile App',
    category: 'Mobile Development',
    desc: 'React Native fintech application with biometric auth, real-time transaction tracking, and regulatory compliance for 3 markets.',
    tags: ['React Native', 'Expo', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1758520144667-3041caeff3c1?w=600&q=60',
    accent: '#10B981',
  },
  {
    title: 'Enterprise Security Platform',
    category: 'Cybersecurity',
    desc: 'Full-stack SIEM/SOAR platform with threat intelligence feeds, automated incident response, and real-time dashboard for SOC analysts.',
    tags: ['Python', 'Elasticsearch', 'Grafana', 'AWS'],
    image: 'https://images.unsplash.com/photo-1664526936810-ec0856d31b92?w=600&q=60',
    accent: '#EF4444',
  },
  {
    title: 'E-Commerce Web Platform',
    category: 'Web Development',
    desc: 'High-traffic e-commerce platform serving 100K+ daily users with headless architecture, custom checkout, and AI-driven recommendations.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1676911809746-85d90edbbe4a?w=600&q=60',
    accent: '#00F0FF',
  },
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow: `0 30px 50px -12px ${project.accent}35`,
        borderColor: `${project.accent}45`,
      }}
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl overflow-hidden cursor-default relative"
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(16px)',
      }}
      data-testid={`project-card-${index}`}
    >
      {/* Image with scale on hover */}
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4) saturate(0.6)' }}
          whileHover={{ scale: 1.08, filter: 'brightness(0.6) saturate(1)' }}
          transition={{ duration: 0.4 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${project.accent}15 0%, transparent 60%)` }}
        />
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs mono font-medium"
          style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}40`, color: project.accent }}
        >
          {project.category}
        </div>
        <motion.div
          className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(2, 6, 23, 0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </motion.div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-base mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ borderColor: `${project.accent}60`, color: project.accent }}
              className="px-2 py-1 text-xs mono rounded-md"
              style={{
                background: 'rgba(148,163,184,0.05)',
                border: '1px solid rgba(148,163,184,0.1)',
                color: '#64748B',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-32 px-6 overflow-hidden" data-testid="portfolio-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-purple-500/20 rounded-full bg-purple-500/5">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            Portfolio
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="portfolio-title"
          >
            Work That <span className="gradient-text">Speaks</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            A curated selection of projects delivered for leading enterprises and innovative startups.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
