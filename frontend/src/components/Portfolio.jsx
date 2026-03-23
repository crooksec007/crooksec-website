import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    desc: 'Enterprise-grade conversational AI with multi-turn dialogue, RAG pipelines, and custom knowledge bases.',
    tags: ['GPT-4', 'RAG', 'LangChain', 'FastAPI'],
    image: '/services/service_ai.png',
    accent: '#00F0FF',
    challenge: "The client's support team was overwhelmed by a 300% surge in complex technical inquiries, leading to 48-hour response times.",
    solution: "We deployed a highly tuned RAG pipeline leveraging GPT-4, digesting their entire 50GB technical documentation repository for instant, highly accurate querying.",
    result: "Support resolution times plummeted from 48 hours to 3 seconds, saving $1.2M annually while maintaining a 98% CSAT score."
  },
  {
    title: 'AI Voice Calling System',
    category: 'AI Communications',
    desc: 'Real-time AI voice assistant platform with sub-200ms latency, natural TTS/STT, and seamless CRM integrations.',
    tags: ['Whisper', 'TTS', 'WebRTC', 'Python'],
    image: 'https://images.unsplash.com/photo-1713464044292-e6798c8bb0e2?w=600&q=60',
    accent: '#7000FF',
    challenge: "A massive outbound sales center faced high turnover rates and inconsistent lead qualification across hundreds of human agents.",
    solution: "Engineered a low-latency WebRTC voice agent mimicking human pacing and intonation, deeply integrated into Salesforce.",
    result: "Increased daily qualified leads by 400% while allowing the human operators to focus entirely on closing warm, high-intent prospects."
  },
  {
    title: 'Blockchain DeFi Platform',
    category: 'Blockchain',
    desc: 'Decentralized finance protocol with audited smart contracts, liquidity pools, yield farming, and governance tokens.',
    tags: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    image: '/services/service_blockchain.png',
    accent: '#F59E0B',
    challenge: "The startup needed an un-hackable, massively scalable decentralized exchange with zero liquidity fragmentation.",
    solution: "Architected custom automated market maker (AMM) contracts with built-in flash loan resistance and extensive formal verification.",
    result: "The protocol attained $50M Total Value Locked (TVL) in month one, with zero security incidents despite continuous adversarial pressure."
  },
  {
    title: 'Luxury Jewelry E-Commerce Platform',
    category: 'Secure Web & E-Commerce',
    desc: 'A high-end, lightning-fast luxury e-commerce platform featuring highly secure, high-value transaction pipelines and real-time inventory sync.',
    tags: ['React', 'Node.js', 'Stripe', 'Tailwind CSS'],
    image: '/services/service_ecommerce.png',
    accent: '#F43F5E',
    challenge: "The luxury retailer was losing high-net-worth clients due to an insecure, clunky legacy website that suffered from checkout crashes and lacked real-time synchronization for one-of-a-kind high-value items.",
    solution: "We engineered a stunning, buttery-smooth frontend experience backed by a heavily fortified headless architecture. The platform includes end-to-end encrypted checkouts specifically designed for handling massive transaction limits seamlessly.",
    result: "Delivered a flawless shopping experience that increased ultra-high-net-worth client conversion rates by 210% and successfully secured 100% of all high-value transactions during peak seasons.",
    link: "https://jewellery-crooksec.lovable.app",
    liveThumbnail: true
  },
  {
    title: 'Enterprise Security Platform',
    category: 'Cybersecurity',
    desc: 'Full-stack SIEM/SOAR platform with threat intelligence feeds, automated incident response, and real-time dashboards.',
    tags: ['Python', 'Elasticsearch', 'Grafana', 'AWS'],
    image: '/services/service_defensive.png',
    accent: '#EF4444',
    challenge: "The MSSP provider was drowning in false positives, causing alert fatigue and missing critical infiltration attempts.",
    solution: "Built a robust SIEM data pipeline using Elasticsearch paired with machine-learning heuristics to auto-triage anomalies.",
    result: "Reduced alert noise by 94% and cut the Mean Time To Respond (MTTR) from 5 hours to under 4 minutes."
  },
  {
    title: 'vSign ERP Secure Platform',
    category: 'Secure Architecture',
    desc: 'A cryptographically secure Enterprise Resource Planning prototype featuring immutable document signing and zero-trust authentication.',
    tags: ['React', 'Node.js', 'Cryptography', 'Zero-Trust'],
    image: '/services/service_blockchain.png',
    accent: '#00F0FF',
    challenge: "The client required a highly secure, tamper-proof Enterprise Resource Planning (ERP) and document signing platform (vSign) to safely handle sensitive legal agreements across distributed global teams without risking document forgery or interception.",
    solution: "We rapidly engineered an end-to-end encrypted ERP prototype built on scalable web infrastructure. The system features immutable audit logs, strict zero-trust authentication protocols, and verifiable cryptographic signatures for every document state change.",
    result: "Delivered a high-fidelity, secure prototype that successfully proved the concept to stakeholders, paving the way for the client to safely process and manage confidential legal documents at enterprise scale.",
    link: "https://vsign-crooksec-com.lovable.app/",
    liveThumbnail: true
  },
];

const ProjectCard = ({ project, index, onClick }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow: `0 30px 50px -12px ${project.accent}35`,
        borderColor: `${project.accent}45`,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer relative group"
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(16px)',
      }}
      data-testid={`project-card-${index}`}
    >
      <div className="relative h-44 overflow-hidden">
        {project.liveThumbnail && project.link ? (
          <div className="w-[300%] h-[300%] absolute top-0 left-0" style={{ transform: 'scale(0.334)', transformOrigin: 'top left' }}>
            <iframe src={project.link} title={project.title} className="w-full h-full border-0 pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ) : (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.4) saturate(0.6)' }}
            whileHover={{ scale: 1.08, filter: 'brightness(0.6) saturate(1)' }}
            transition={{ duration: 0.4 }}
          />
        )}
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
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs mono rounded-md transition-colors"
              style={{
                background: 'rgba(148,163,184,0.05)',
                border: '1px solid rgba(148,163,184,0.1)',
                color: '#64748B',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

import { createPortal } from 'react-dom';

export const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (activeProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeProject]);

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
            Portfolio & Case Studies
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="portfolio-title"
          >
            Work That <span className="gradient-text">Speaks</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            A curated selection of projects delivered for leading enterprises. Click on any project to explore the deep technical case study.
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
            <ProjectCard key={project.title} project={project} index={i} onClick={() => setActiveProject(project)} />
          ))}
        </motion.div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
              style={{ background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-slate-700/50 shadow-2xl relative"
                style={{ background: 'rgba(15, 23, 42, 0.95)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-rose-500/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090b14] via-[#090b14]/50 to-transparent z-10" />
                  {activeProject.liveThumbnail && activeProject.link ? (
                    <div className="w-[150%] h-[150%] absolute top-0 left-0" style={{ transform: 'scale(0.667)', transformOrigin: 'top left' }}>
                      <iframe src={activeProject.link} className="w-full h-[600px] border-0 pointer-events-none opacity-70" />
                      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#090b14] to-transparent opacity-80" />
                    </div>
                  ) : (
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(0.6) saturate(0.8)' }}
                    />
                  )}
                  <div className="absolute bottom-6 left-6 md:left-10 z-20">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs mono font-medium mb-3"
                      style={{ background: `${activeProject.accent}20`, border: `1px solid ${activeProject.accent}40`, color: activeProject.accent }}
                    >
                      {activeProject.category}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {activeProject.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 md:p-10 flex flex-col gap-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-rose-400 mono font-semibold tracking-wider text-sm uppercase">
                        <Target className="w-5 h-5" /> The Challenge
                      </div>
                      <p className="text-slate-300 leading-relaxed text-base">
                        {activeProject.challenge}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-cyan-400 mono font-semibold tracking-wider text-sm uppercase">
                        <Lightbulb className="w-5 h-5" /> The Solution
                      </div>
                      <p className="text-slate-300 leading-relaxed text-base">
                        {activeProject.solution}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-2xl p-6 border border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />
                    <div className="flex items-center gap-2 text-emerald-400 mono font-semibold tracking-wider text-sm uppercase mb-4 relative z-10">
                      <TrendingUp className="w-5 h-5" /> The Result & ROI
                    </div>
                    <p className="text-emerald-50/90 leading-relaxed text-lg font-medium relative z-10 w-full pr-4 mb-6">
                      {activeProject.result}
                    </p>

                    {activeProject.link && (
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:scale-105 transition-all font-semibold mono text-sm shadow-[0_0_20px_rgba(0,240,255,0.15)] relative z-10"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live Prototype
                      </a>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <div className="text-xs mono mb-4 text-slate-500 uppercase tracking-widest">Technologies Used</div>
                    <div className="flex flex-wrap gap-3">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs sm:text-sm mono rounded-lg transition-colors border border-slate-700/50 bg-slate-800/30 text-cyan-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
