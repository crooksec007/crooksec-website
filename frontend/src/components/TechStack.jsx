import { motion } from 'framer-motion';

const row1 = [
  { name: 'Python', color: '#3B82F6' },
  { name: 'Django', color: '#10B981' },
  { name: 'Flask', color: '#94A3B8' },
  { name: 'React', color: '#00F0FF' },
  { name: 'React Native', color: '#00F0FF' },
  { name: 'TypeScript', color: '#3B82F6' },
  { name: 'Node.js', color: '#10B981' },
  { name: 'FastAPI', color: '#10B981' },
];

const row2 = [
  { name: 'Blockchain', color: '#F59E0B' },
  { name: 'AI / ML', color: '#7000FF' },
  { name: 'AWS', color: '#F59E0B' },
  { name: 'Azure', color: '#3B82F6' },
  { name: 'DevOps', color: '#EF4444' },
  { name: 'Docker', color: '#00F0FF' },
  { name: 'Kubernetes', color: '#3B82F6' },
  { name: 'PostgreSQL', color: '#3B82F6' },
];

const TechBadge = ({ name, color }) => (
  <div
    className="flex-shrink-0 px-5 py-2.5 rounded-xl mono text-sm font-medium cursor-default mx-2"
    style={{
      background: 'rgba(15, 23, 42, 0.8)',
      border: `1px solid ${color}30`,
      color: color,
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = `0 0 15px -3px ${color}60`;
      e.currentTarget.style.borderColor = `${color}80`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = `${color}30`;
    }}
  >
    {name}
  </div>
);

export const TechStack = () => {
  return (
    <section id="tech" className="relative py-32 overflow-hidden" data-testid="tech-section">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(112,0,255,0.2), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Technology Stack
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="tech-title"
          >
            Powered By <span className="gradient-text">Modern Stack</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Industry-leading tools and frameworks, battle-tested at enterprise scale.
          </p>
        </motion.div>
      </div>

      {/* Row 1 - Left */}
      <div className="relative overflow-hidden mb-4" data-testid="tech-row-1">
        <div className="flex items-center" style={{ width: 'max-content' }}>
          <div className="marquee-left flex items-center">
            {[...row1, ...row1].map((tech, i) => (
              <TechBadge key={`r1-${i}`} name={tech.name} color={tech.color} />
            ))}
          </div>
        </div>
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to right, #020617, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to left, #020617, transparent)' }} />
      </div>

      {/* Row 2 - Right */}
      <div className="relative overflow-hidden" data-testid="tech-row-2">
        <div className="flex items-center" style={{ width: 'max-content' }}>
          <div className="marquee-right flex items-center">
            {[...row2, ...row2].map((tech, i) => (
              <TechBadge key={`r2-${i}`} name={tech.name} color={tech.color} />
            ))}
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to right, #020617, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to left, #020617, transparent)' }} />
      </div>
    </section>
  );
};
