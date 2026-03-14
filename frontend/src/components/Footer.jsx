import { Shield, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const links = {
  Services: ['Defensive Security', 'Red Team', 'AI Solutions', 'Blockchain Dev', 'Cloud & DevOps'],
  Company: ['About Us', 'Portfolio', 'Careers', 'Blog', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Security Policy'],
};

const socials = [
  { icon: Github, href: 'https://github.com/crooksec', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/crooksec', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/crooksec', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contact@crooksec.com', label: 'Email' },
];

export const Footer = () => {
  return (
    <footer className="relative border-t overflow-hidden" style={{ borderColor: 'rgba(148,163,184,0.08)' }} data-testid="footer">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.4), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)' }}
              >
                <Shield className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Crook<span className="text-cyan-400">Sec</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Defensive Security, AI & Technology Solutions. Securing the digital frontier, one system at a time.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(148,163,184,0.1)',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,240,255,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)'}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs mono uppercase tracking-widest text-slate-500 mb-4">{group}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-cyan-400"
                      style={{ transition: 'color 0.2s ease' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(148,163,184,0.08)' }}
        >
          <p className="text-slate-600 text-xs mono">
            © {new Date().getFullYear()} CrookSec. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs mono">
            Built with precision. Secured by design.
          </p>
        </div>
      </div>
    </footer>
  );
};
