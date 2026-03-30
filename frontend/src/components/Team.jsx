import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: "Anuj Kumar",
    role: "Head of Offensive Security",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=80",
    bio: "Specializes in advanced penetration testing and red team operations. Passionate about uncovering complex infrastructure flaws before threat actors do.",
    github: "#",
    linkedin: "#"
  },
  {
    name: "Tanya Angra",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
    bio: "Expert in zero-trust architecture and scalable cloud security. Dedicated to building robust, compliant, and resilient engineering systems from the ground up.",
    github: "#",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Sahil Dhiman",
    role: "Principal Blockchain & AI Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
    bio: "Web3 researcher and AI engineer. Focused on formal verification of smart contracts and fortifying decentralized protocols alongside machine learning models.",
    github: "#",
    twitter: "#"
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

export const Team = () => {
  return null;
  // (
    <section id="team" className="relative py-32 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(148,163,184,0.08)' }} data-testid="team-section">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-purple-500/20 rounded-full bg-purple-500/5">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            Leadership
          </div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Meet The <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Elite engineering requires elite talent, but more importantly, it requires people who genuinely care about your success. Meet the humans behind the code.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px -10px rgba(112,0,255,0.15)' }}
              className="glass-card rounded-3xl overflow-hidden border border-slate-700/50 group"
              style={{ background: 'rgba(15, 23, 42, 0.4)' }}
            >
              {/* Abstract Header without Images */}
              <div className="relative w-full h-24 overflow-hidden mb-6">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700" />
                <div className="absolute top-8 left-6 z-20 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-500/50" style={{ background: 'rgba(112, 0, 255, 0.1)', border: '1px solid rgba(112, 0, 255, 0.3)' }}>
                  <span className="text-xl font-bold font-mono text-cyan-400">{member.name.charAt(0)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-20 p-8 pt-0 mt-4">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {member.name}
                </h3>
                <div className="inline-block px-3 py-1 mb-6 rounded-full text-xs mono font-bold" style={{ background: 'rgba(0, 240, 255, 0.05)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                  {member.role}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 h-20">
                  {member.bio}
                </p>

                {/* Socials Separator */}
                <div className="flex gap-4 pt-6 mt-4 border-t border-slate-700/50">
                  {member.github && (
                    <a href={member.github} className="text-slate-500 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} className="text-slate-500 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} className="text-slate-500 hover:text-[#1DA1F2] transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  // );
};
