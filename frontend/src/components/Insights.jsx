import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

const posts = [
  {
    category: "Threat Intelligence",
    date: "March 15, 2026",
    readTime: "8 min read",
    title: "Bypassing Next-Gen WAFs: The Evolution of Polymorphic Payloads",
    desc: "An in-depth analysis of how modern attackers are mutating payloads dynamically to evade deterministic firewall rulesets and what your SOC can do to stop it.",
    image: "/services/service_offensive.png",
    color: "#00F0FF",
    link: "https://medium.com/tag/cyber-security"
  },
  {
    category: "Web3 Security",
    date: "March 02, 2026",
    readTime: "12 min read",
    title: "The Silent Drain: Auditing Flash Loan Vulnerabilities in DeFi",
    desc: "We dissect a recent $10M smart contract exploit to reveal how unconstrained flash loan architectures leave massive liquidity pools exposed to recursive attacks.",
    image: "/services/service_blockchain.png",
    color: "#F59E0B",
    link: "https://medium.com/tag/smart-contracts"
  },
  {
    category: "Zero Trust Architecture",
    date: "February 24, 2026",
    readTime: "6 min read",
    title: "Beyond the Perimeter: Why Legacy VPNs Are No Longer Sufficient",
    desc: "Examining the fundamental flaws of legacy VPN tunneling across remote workforces and the urgent transition towards identity-aware proxy networks.",
    image: "/services/service_defensive.png",
    color: "#7000FF",
    link: "https://medium.com/tag/zero-trust"
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const Insights = () => {
  return (
    <section id="insights" className="relative py-32 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(148,163,184,0.08)' }} data-testid="insights-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              Insights & Intel
            </div>
            <h2 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Latest <span className="gradient-text">Research</span>
            </h2>
            <p className="text-slate-400 max-w-lg">
              Grab a coffee and dive into our latest research. We genuinely love sharing what we learn out there on the digital frontier.
            </p>
          </div>

          <button className="hidden md:flex items-center gap-2 text-sm mono text-slate-300 hover:text-cyan-400 transition-colors group">
            View All Intel
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              onClick={() => { window.open(post.link, '_blank'); }}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(0,240,255,0.1)' }}
              className="glass-card flex flex-col rounded-3xl overflow-hidden border border-slate-700/50 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              style={{ background: 'rgba(15, 23, 42, 0.4)' }}
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] to-transparent z-10 opacity-80" />

                {/* Category Badge */}
                <div
                  className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] sm:text-xs mono font-bold backdrop-blur-md uppercase tracking-wider"
                  style={{ background: `${post.color}20`, color: post.color, border: `1px solid ${post.color}40` }}
                >
                  {post.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between relative z-20 -mt-6">
                <div>
                  <div className="flex items-center gap-4 text-xs mono text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs sm:text-sm mono font-semibold transition-colors" style={{ color: post.color }}>
                  Read Article
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <button className="mt-10 md:hidden flex flex-row items-center gap-2 text-sm mono text-slate-300 hover:text-cyan-400 transition-colors group mx-auto">
          View All Intel <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
