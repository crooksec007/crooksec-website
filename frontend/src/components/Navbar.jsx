import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
      data-testid="navbar"
    >
      <div
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-2xl transition-colors duration-300 ${scrolled
          ? 'backdrop-blur-2xl bg-black/70 border border-white/10'
          : 'backdrop-blur-xl bg-slate-950/40 border border-slate-800/60'
          }`}
        style={{ boxShadow: scrolled ? '0 0 40px -10px rgba(0, 240, 255, 0.15)' : 'none' }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 group"
          data-testid="navbar-logo"
        >
          <motion.div 
            className="w-14 h-14 flex items-center justify-center relative -ml-2"
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src="/logo.png" 
              alt="CrookSec Logo" 
              className="w-full h-full object-contain scale-[1.35]"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.6)) brightness(1.1)' }}
            />
          </motion.div>
          <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            CrookSec
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-sm text-slate-400 hover:text-cyan-400 relative group"
              style={{ transition: 'color 0.2s ease' }}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full"
                style={{ transition: 'width 0.3s ease' }} />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNav('/vault')}
            className="px-5 py-2 text-sm font-semibold text-black rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            data-testid="navbar-cta"
          >
            Get Audit
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan-400"
          style={{ transition: 'color 0.2s ease' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="navbar-mobile-toggle"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-6 right-6 backdrop-blur-2xl bg-black/90 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
          data-testid="mobile-menu"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-left text-slate-300 hover:text-cyan-400 text-base py-2 border-b border-white/5"
              style={{ transition: 'color 0.2s ease' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('/vault')}
            className="mt-2 px-5 py-2.5 text-sm font-semibold text-black rounded-xl text-center"
            style={{ background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)' }}
          >
            Get Audit
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};
