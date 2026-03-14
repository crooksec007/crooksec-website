import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, Bot, User, Zap, Shield, Brain, Code2, ChevronRight } from 'lucide-react';
import { AIOrb } from './3d/AIOrb';

// ── Mock response engine ─────────────────────────────────────────────────────
const MOCK_RESPONSES = [
  {
    triggers: ['hello', 'hi', 'hey', 'start', 'greet'],
    text: "Hello! I'm NOVA, CrookSec's AI assistant. I can help you with information about our services — from defensive security and AI solutions to blockchain development. What would you like to know?",
  },
  {
    triggers: ['service', 'offer', 'what do you do', 'capabilities', 'what can'],
    text: "CrookSec offers 9 core services:\n\n• Defensive Security & Digital Intelligence\n• Red Team & Penetration Testing\n• Blockchain & Smart Contract Development\n• Web & Application Development\n• E-Commerce Solutions\n• AI-Powered Solutions\n• Mobile App Development\n• Cloud Platforms & DevOps\n• Dedicated Development Teams\n\nWhich area interests you most?",
  },
  {
    triggers: ['security', 'pentest', 'penetration', 'red team', 'audit', 'vulnerability'],
    text: "Our security practice covers the full spectrum:\n\n→ Offensive: Red team operations, penetration testing, social engineering simulations\n→ Defensive: SOC setup, SIEM/SOAR implementation, threat hunting, incident response\n→ Compliance: ISO 27001, SOC 2, NIST framework alignment\n\nWe typically start with a security assessment. Want me to connect you with our team?",
  },
  {
    triggers: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'chatbot', 'automation'],
    text: "Our AI division builds production-grade systems:\n\n• Custom LLM integrations & fine-tuning\n• RAG pipelines & knowledge bases\n• AI voice & chat systems\n• Intelligent process automation\n• Computer vision solutions\n\nWe've deployed AI systems across finance, healthcare, and e-commerce sectors. What's your use case?",
  },
  {
    triggers: ['blockchain', 'smart contract', 'defi', 'web3', 'crypto', 'nft', 'solidity'],
    text: "Our blockchain team specializes in:\n\n• Ethereum & Solana smart contract development\n• DeFi protocol architecture\n• Custom chain deployments\n• Smart contract security audits\n• NFT platforms & marketplaces\n\nAll contracts undergo rigorous security auditing before deployment. What blockchain project are you envisioning?",
  },
  {
    triggers: ['mobile', 'app', 'ios', 'android', 'react native'],
    text: "We build cross-platform mobile applications with React Native that deliver native performance. Our mobile projects include fintech apps, e-commerce platforms, and enterprise tools — all with biometric auth, real-time sync, and regulatory compliance built in.",
  },
  {
    triggers: ['cloud', 'devops', 'aws', 'azure', 'kubernetes', 'infrastructure'],
    text: "Our cloud & DevOps practice covers:\n\n• Multi-cloud architecture (AWS, Azure, GCP)\n• Kubernetes orchestration & scaling\n• CI/CD pipeline automation\n• Infrastructure as Code (Terraform)\n• 99.9% uptime SLA with proactive monitoring\n\nWe can audit your existing infrastructure or build from scratch.",
  },
  {
    triggers: ['price', 'cost', 'pricing', 'rate', 'quote', 'budget', 'how much'],
    text: "Our pricing is project-based and depends on scope, timeline, and complexity. We offer:\n\n• Fixed-price projects for defined deliverables\n• Dedicated team retainers (monthly)\n• Security audit packages (one-time)\n\nFor an accurate estimate, I'd recommend a free 30-min discovery call with our team. Ready to connect?",
  },
  {
    triggers: ['contact', 'reach', 'talk', 'call', 'email', 'connect', 'meet', 'start a project'],
    text: "You can reach CrookSec through multiple channels:\n\n📧 contact@crooksec.com\n🚨 Emergency: incident@crooksec.com\n\nOr scroll down to the Contact section — fill out the form and our team typically responds within 24 hours. What project would you like to discuss?",
  },
  {
    triggers: ['about', 'who are you', 'company', 'team', 'crooksec'],
    text: "CrookSec is a technology-driven company founded to bridge the gap between elite cybersecurity and modern software engineering. Our team combines 50+ combined years of expertise across digital forensics, AI engineering, and full-stack development — serving enterprises across 3 continents.",
  },
];

const DEFAULT_RESPONSE = "That's a great question. Our team at CrookSec specializes in exactly that kind of challenge. I'd recommend connecting with one of our experts for a tailored answer — you can use the Contact section below or email contact@crooksec.com directly.";

const QUICK_CHIPS = [
  { label: 'Our Services', icon: Zap },
  { label: 'Security Audit', icon: Shield },
  { label: 'AI Solutions', icon: Brain },
  { label: 'Start a Project', icon: Code2 },
];

function getMockResponse(input) {
  const lower = input.toLowerCase();
  for (const r of MOCK_RESPONSES) {
    if (r.triggers.some(t => lower.includes(t))) return r.text;
  }
  return DEFAULT_RESPONSE;
}

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingDot = ({ delay }) => (
  <motion.span
    className="inline-block w-2 h-2 rounded-full bg-cyan-400"
    animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ── Single message bubble ─────────────────────────────────────────────────────
const MessageBubble = ({ msg, index }) => {
  const isBot = msg.role === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold`}
        style={isBot
          ? { background: 'linear-gradient(135deg, #00F0FF22, #7000FF22)', border: '1px solid rgba(0,240,255,0.3)' }
          : { background: 'rgba(112,0,255,0.2)', border: '1px solid rgba(112,0,255,0.3)' }
        }
      >
        {isBot
          ? <Bot className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
          : <User className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
        }
      </motion.div>

      {/* Bubble */}
      <motion.div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line`}
        style={isBot ? {
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(0,240,255,0.12)',
          color: '#CBD5E1',
          backdropFilter: 'blur(12px)',
          borderRadius: '4px 16px 16px 16px',
        } : {
          background: 'linear-gradient(135deg, rgba(112,0,255,0.25), rgba(0,240,255,0.1))',
          border: '1px solid rgba(112,0,255,0.25)',
          color: '#F1F5F9',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px 4px 16px 16px',
        }}
      >
        {msg.text}
      </motion.div>
    </motion.div>
  );
};

// ── Main Chatbot component ────────────────────────────────────────────────────
export const Chatbot = () => {
  const sectionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hello! I'm NOVA — CrookSec's AI assistant. Ask me anything about our services, security, or how we can help your business." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText || isTyping) return;
    setInput('');

    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }]);
    setIsTyping(true);

    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      const reply = getMockResponse(userText);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }]);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      id="chatbot"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      data-testid="chatbot-section"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(112,0,255,0.07) 0%, transparent 70%)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(112,0,255,0.2), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
            <motion.span
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            AI Assistant
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            data-testid="chatbot-title"
          >
            Meet <span className="gradient-text">NOVA</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            Our AI-powered assistant — trained on CrookSec's knowledge base. Ask about services, security, or anything tech.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT — 3D Orb panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center"
          >
            {/* Orb container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
              {/* Glow rings behind orb */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(112,0,255,0.1) 0%, transparent 70%)' }}
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5, ease: 'easeInOut' }}
              />
              <AIOrb />
            </div>

            {/* Status indicator under orb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid rgba(0,240,255,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className="text-white text-sm mono font-medium">NOVA</span>
              <span className="text-slate-500 text-xs">Online · Powered by CrookSec AI</span>
            </motion.div>

            {/* Feature list */}
            <div className="mt-8 space-y-3 w-full max-w-xs">
              {[
                { icon: Shield, label: 'Security knowledge base', color: '#00F0FF' },
                { icon: Brain, label: 'AI services expertise', color: '#7000FF' },
                { icon: Code2, label: 'Tech stack guidance', color: '#10B981' },
                { icon: Zap, label: 'Instant responses', color: '#F59E0B' },
              ].map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm text-slate-400"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${feat.color}18`, border: `1px solid ${feat.color}30` }}
                  >
                    <feat.icon className="w-3 h-3" style={{ color: feat.color }} strokeWidth={1.5} />
                  </div>
                  {feat.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Chat window */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(8, 12, 30, 0.85)',
              border: '1px solid rgba(0,240,255,0.14)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,240,255,0.05)',
              height: '540px',
            }}
            data-testid="chat-window"
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
              style={{ borderColor: 'rgba(0,240,255,0.1)', background: 'rgba(15,23,42,0.6)' }}
            >
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #00F0FF22, #7000FF44)', border: '1px solid rgba(0,240,255,0.3)' }}
                >
                  <Bot className="w-4.5 h-4.5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2"
                  style={{ borderColor: '#0a0f1e' }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>NOVA</p>
                <p className="text-green-400 text-xs mono">Active · AI Assistant</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {['#EF4444', '#F59E0B', '#10B981'].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.2) transparent' }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <MessageBubble key={msg.id} msg={msg} index={i} />
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-start gap-3"
                    data-testid="typing-indicator"
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #00F0FF22, #7000FF22)', border: '1px solid rgba(0,240,255,0.3)' }}
                    >
                      <Bot className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                      style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(0,240,255,0.12)', borderRadius: '4px 16px 16px 16px' }}
                    >
                      <TypingDot delay={0} />
                      <TypingDot delay={0.18} />
                      <TypingDot delay={0.36} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0">
              {QUICK_CHIPS.map((chip) => (
                <motion.button
                  key={chip.label}
                  onClick={() => sendMessage(chip.label)}
                  disabled={isTyping}
                  whileHover={{ scale: 1.04, borderColor: 'rgba(0,240,255,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs mono text-slate-400"
                  style={{
                    background: 'rgba(15,23,42,0.6)',
                    border: '1px solid rgba(148,163,184,0.12)',
                  }}
                  data-testid={`chip-${chip.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <chip.icon className="w-3 h-3" strokeWidth={1.5} />
                  {chip.label}
                </motion.button>
              ))}
            </div>

            {/* Input row */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-t flex-shrink-0"
              style={{ borderColor: 'rgba(0,240,255,0.08)' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask NOVA anything..."
                disabled={isTyping}
                className="flex-1 bg-transparent text-white text-sm mono placeholder-slate-600 outline-none"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
                data-testid="chat-input"
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                whileHover={input.trim() && !isTyping ? { scale: 1.08, boxShadow: '0 0 20px -4px rgba(0,240,255,0.6)' } : {}}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: input.trim() && !isTyping
                    ? 'linear-gradient(135deg, #00F0FF, #7000FF)'
                    : 'rgba(148,163,184,0.08)',
                  border: '1px solid rgba(148,163,184,0.1)',
                }}
                data-testid="chat-send-btn"
              >
                <Send className="w-3.5 h-3.5" style={{ color: input.trim() && !isTyping ? '#000' : '#475569' }} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
