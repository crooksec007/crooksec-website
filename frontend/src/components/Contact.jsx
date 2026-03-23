import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, Terminal } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/crooksec' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/crooksec' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/crooksec' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@crooksec.com' },
];

const formFields = [
  { name: 'name', label: '$ name --required', placeholder: 'Your full name', type: 'text', testId: 'contact-name-input', required: true },
  { name: 'email', label: '$ email --required', placeholder: 'your@email.com', type: 'email', testId: 'contact-email-input', required: true },
  { name: 'phone', label: '$ phone --required', placeholder: '+1 (555) 000-0000', type: 'tel', testId: 'contact-phone-input', required: true },
  { name: 'subject', label: '$ subject --required', placeholder: 'Security audit, AI integration...', type: 'text', testId: 'contact-subject-input', required: true },
];

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.45, delay: i * 0.1, ease: 'easeOut' } }),
};

export const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) return;
    setStatus('sending');
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full bg-transparent border-b py-3 text-white text-sm mono placeholder-slate-600 outline-none`;
  const inputStyle = { borderColor: 'rgba(0, 240, 255, 0.2)', fontFamily: 'Je1tBrains Mono, monospace' };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" data-testid="contact-section">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(112, 0, 255, 0.1) 0%, transparent 60%)' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.2), transparent)' }} />

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
            Contact
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="contact-title"
          >
            Let's Build Something{' '}
            <span className="gradient-text">Secure & Intelligent</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Ready to transform your digital infrastructure? Let's catch up over coffee, and the coffee is on me!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-t-2xl border border-b-0"
              style={{ background: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(0, 240, 255, 0.15)' }}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs mono">transmission_init.sh</span>
              <div className="flex gap-1.5 ml-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-b-2xl border border-t-0"
              style={{ background: 'rgba(15, 23, 42, 0.6)', borderColor: 'rgba(0, 240, 255, 0.15)', backdropFilter: 'blur(16px)' }}
              data-testid="contact-form"
            >
              {/* Staggered fields */}
              {formFields.map((field, i) => (
                <motion.div
                  key={field.name}
                  custom={i}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <label className="block text-xs mono text-cyan-400/60 mb-1 uppercase tracking-wider">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(0, 240, 255, 0.7)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)'; }}
                    data-testid={field.testId}
                    required={field.required}
                  />
                </motion.div>
              ))}

              <motion.div
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-8"
              >
                <label className="block text-xs mono text-cyan-400/60 mb-1 uppercase tracking-wider">$ message --required</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your project or security needs..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                  style={{ ...inputStyle, borderBottom: 'none', borderLeft: '1px solid rgba(0,240,255,0.2)', paddingLeft: '12px' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0, 240, 255, 0.7)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0, 240, 255, 0.2)'; }}
                  data-testid="contact-message-input"
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status !== 'sending' ? { scale: 1.02, boxShadow: '0 0 30px -5px rgba(0,240,255,0.6)' } : {}}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl font-semibold text-black flex items-center justify-center gap-2 mono tracking-wider"
                style={{
                  background: status === 'sending' ? 'rgba(0,240,255,0.3)' : 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
                  fontSize: '0.8rem',
                }}
                data-testid="contact-submit-btn"
              >
                <motion.span
                  animate={status === 'sending' ? { rotate: 360 } : { rotate: 0 }}
                  transition={status === 'sending' ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                >
                  <Send className="w-4 h-4" />
                </motion.span>
                {status === 'sending' ? 'TRANSMITTING...' : 'EXECUTE_TRANSMISSION'}
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-center text-sm mono text-green-400"
                    data-testid="contact-success-msg"
                  >
                    ✓ Transmission successful. We'll be in touch.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-center text-sm mono text-red-400"
                    data-testid="contact-error-msg"
                  >
                    ✗ Transmission failed. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Initiate Contact
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you need a security audit, AI system integration, or a full product build — our team is ready to collaborate. We typically respond within 24 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(0,240,255,0.1)' }}>
              <div className="flex items-center gap-3 text-slate-400 text-sm mono">
                <Mail className="w-4 h-4 text-cyan-400" />
                crooksec.contact@gmail.com
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs mono uppercase tracking-widest mb-4">// Social Channels</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    whileHover={{ y: -4, boxShadow: '0 0 20px -3px rgba(0,240,255,0.4)', borderColor: 'rgba(0,240,255,0.5)' }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(148,163,184,0.1)' }}
                    aria-label={s.label}
                    data-testid={`social-link-${s.label.toLowerCase().replace(/\s/g, '-').replace('/', '')}`}
                  >
                    <s.icon className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(112,0,255,0.08) 100%)', border: '1px solid rgba(0,240,255,0.15)' }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.15), transparent)' }} />
              <h4 className="text-white font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Emergency Security Response
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Active breach? Our incident response team is available 24/7.
              </p>
              <a
                href="mailto:incident@crooksec.com"
                className="inline-flex items-center gap-2 text-sm mono font-semibold text-cyan-400"
                data-testid="emergency-contact-link"
              >
                incident@crooksec.com →
              </a>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
