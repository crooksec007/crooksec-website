import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Minimize2, Zap, Shield, Brain, Code2 } from 'lucide-react';

// ── Shared mock response engine (same as Chatbot section) ───────────────────
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
    text: "Our security practice covers the full spectrum:\n\n→ Offensive: Red team ops, penetration testing, social engineering\n→ Defensive: SOC setup, SIEM/SOAR, threat hunting, incident response\n→ Compliance: ISO 27001, SOC 2, NIST framework alignment\n\nWant me to connect you with our team?",
  },
  {
    triggers: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'chatbot', 'automation'],
    text: "Our AI division builds production-grade systems:\n\n• Custom LLM integrations & fine-tuning\n• RAG pipelines & knowledge bases\n• AI voice & chat systems\n• Intelligent process automation\n• Computer vision solutions\n\nWhat's your use case?",
  },
  {
    triggers: ['blockchain', 'smart contract', 'defi', 'web3', 'crypto', 'solidity'],
    text: "Our blockchain team specializes in:\n\n• Ethereum & Solana smart contracts\n• DeFi protocol architecture\n• Smart contract security audits\n• NFT platforms & marketplaces\n\nAll contracts undergo rigorous security auditing before deployment.",
  },
  {
    triggers: ['mobile', 'app', 'ios', 'android', 'react native'],
    text: "We build cross-platform mobile applications with React Native — native performance at scale. Our apps cover fintech, e-commerce, and enterprise tools with biometric auth & real-time sync.",
  },
  {
    triggers: ['cloud', 'devops', 'aws', 'azure', 'kubernetes', 'infrastructure'],
    text: "Our cloud & DevOps practice covers AWS, Azure, GCP architecture, Kubernetes orchestration, CI/CD automation, and Terraform IaC — with 99.9% uptime SLAs.",
  },
  {
    triggers: ['price', 'cost', 'pricing', 'rate', 'quote', 'budget', 'how much'],
    text: "Our pricing is project-based:\n\n• Fixed-price for defined deliverables\n• Dedicated team retainers (monthly)\n• Security audit packages (one-time)\n\nFor an accurate estimate, reach out via the Contact section below.",
  },
  {
    triggers: ['contact', 'reach', 'talk', 'call', 'email', 'connect', 'meet', 'start a project'],
    text: "You can reach CrookSec at:\n\n📧 crooksec.contact@gmail.com\n🚨 Emergency: incident@crooksec.com\n\nOr use the Contact section on this page — we respond within 24 hours.",
  },
  {
    triggers: ['about', 'who are you', 'company', 'team', 'crooksec'],
    text: "CrookSec is a technology-driven company bridging elite cybersecurity and modern software engineering. Our team has 50+ combined years of expertise across digital forensics, AI engineering, and full-stack development.",
  },
];

const DEFAULT_RESPONSE = "Great question! Our experts at CrookSec would be best placed to answer that in detail. Reach out at crooksec.contact@gmail.com or use the Contact section below.";

function getMockResponse(input) {
  const lower = input.toLowerCase();
  for (const r of MOCK_RESPONSES) {
    if (r.triggers.some(t => lower.includes(t))) return r.text;
  }
  return DEFAULT_RESPONSE;
}

const QUICK_CHIPS = [
  { label: 'Services', icon: Zap },
  { label: 'Security Audit', icon: Shield },
  { label: 'AI Solutions', icon: Brain },
  { label: 'Get a Quote', icon: Code2 },
];

// ── Typing dots ─────────────────────────────────────────────────────────────
const TypingDot = ({ delay }) => (
  <motion.span
    className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"
    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 0.7, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ── Message bubble ───────────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isBot = msg.role === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex gap-2 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
    >
      <div
        className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
        style={isBot
          ? { background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.25)' }
          : { background: 'rgba(112,0,255,0.15)', border: '1px solid rgba(112,0,255,0.3)' }
        }
      >
        {isBot
          ? <Bot className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
          : <User className="w-3 h-3 text-purple-400" strokeWidth={1.5} />
        }
      </div>
      <div
        className="max-w-[82%] px-3 py-2 text-xs leading-relaxed whitespace-pre-line"
        style={isBot ? {
          background: 'rgba(15,23,42,0.85)',
          border: '1px solid rgba(0,240,255,0.1)',
          color: '#CBD5E1',
          borderRadius: '3px 12px 12px 12px',
          backdropFilter: 'blur(8px)',
        } : {
          background: 'linear-gradient(135deg, rgba(112,0,255,0.22), rgba(0,240,255,0.08))',
          border: '1px solid rgba(112,0,255,0.2)',
          color: '#F1F5F9',
          borderRadius: '12px 3px 12px 12px',
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  );
};

// ── Main floating widget ────────────────────────────────────────────────────
export const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm NOVA — CrookSec's AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, open]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText || isTyping) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }]);
    setIsTyping(true);

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      const reply = getMockResponse(userText);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply }]);
      if (!open) setUnread(n => n + 1);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="fixed bottom-20 right-6 flex flex-col items-end gap-3" style={{ zIndex: 9999 }} data-testid="floating-chat-widget">

      {/* ── Chat popup ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-popup"
            initial={{ opacity: 0, scale: 0.88, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="flex flex-col rounded-2xl overflow-hidden w-80 sm:w-96"
            style={{
              height: '480px',
              background: 'rgba(7, 10, 24, 0.95)',
              border: '1px solid rgba(0,240,255,0.15)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 30px 70px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,240,255,0.05), 0 0 40px -10px rgba(0,240,255,0.15)',
            }}
            data-testid="chat-popup"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0 border-b"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.06) 0%, rgba(112,0,255,0.06) 100%)',
                borderColor: 'rgba(0,240,255,0.1)',
              }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(112,0,255,0.2))',
                    border: '1px solid rgba(0,240,255,0.3)',
                  }}
                >
                  <Bot className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                </div>
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                  style={{ border: '1.5px solid #07090A' }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-none mb-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  NOVA
                </p>
                <p className="text-green-400 text-xs mono">Online · CrookSec AI</p>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300"
                  style={{ background: 'rgba(148,163,184,0.06)', transition: 'color 0.2s' }}
                  data-testid="chat-minimize-btn"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400"
                  style={{ background: 'rgba(148,163,184,0.06)', transition: 'color 0.2s' }}
                  data-testid="chat-close-btn"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.15) transparent' }}
            >
              <AnimatePresence initial={false}>
                {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2"
                    data-testid="floating-typing-indicator"
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.25)' }}
                    >
                      <Bot className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                      style={{
                        background: 'rgba(15,23,42,0.85)',
                        border: '1px solid rgba(0,240,255,0.1)',
                        borderRadius: '3px 12px 12px 12px',
                      }}
                    >
                      <TypingDot delay={0} />
                      <TypingDot delay={0.16} />
                      <TypingDot delay={0.32} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            <div className="px-3 pb-2 flex gap-1.5 flex-wrap flex-shrink-0">
              {QUICK_CHIPS.map(chip => (
                <motion.button
                  key={chip.label}
                  onClick={() => sendMessage(chip.label)}
                  disabled={isTyping}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0,240,255,0.45)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs mono text-slate-400"
                  style={{
                    background: 'rgba(15,23,42,0.7)',
                    border: '1px solid rgba(148,163,184,0.1)',
                  }}
                  data-testid={`floating-chip-${chip.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <chip.icon className="w-2.5 h-2.5" strokeWidth={1.5} />
                  {chip.label}
                </motion.button>
              ))}
            </div>

            {/* Input row */}
            <div
              className="flex items-center gap-2 px-3 py-3 border-t flex-shrink-0"
              style={{ borderColor: 'rgba(0,240,255,0.08)' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message NOVA..."
                disabled={isTyping}
                className="flex-1 bg-transparent text-white text-xs mono placeholder-slate-600 outline-none"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
                data-testid="floating-chat-input"
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                whileHover={input.trim() && !isTyping
                  ? { scale: 1.1, boxShadow: '0 0 18px -3px rgba(0,240,255,0.7)' }
                  : {}}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: input.trim() && !isTyping
                    ? 'linear-gradient(135deg, #00F0FF, #7000FF)'
                    : 'rgba(148,163,184,0.06)',
                  border: '1px solid rgba(148,163,184,0.1)',
                }}
                data-testid="floating-send-btn"
              >
                <Send
                  className="w-3 h-3"
                  style={{ color: input.trim() && !isTyping ? '#000' : '#475569' }}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger button ─────────────────────────────────────── */}
      <div className="relative">
        {/* Outer pulse ring - pointer-events none so it never blocks clicks */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(0,240,255,0.15)', pointerEvents: 'none', zIndex: 0 }}
          animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(112,0,255,0.12)', pointerEvents: 'none', zIndex: 0 }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 0.4, ease: 'easeInOut' }}
        />

        <motion.button
          onClick={() => setOpen(prev => !prev)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: open
              ? 'linear-gradient(135deg, #7000FF, #00F0FF)'
              : 'linear-gradient(135deg, #00F0FF, #7000FF)',
            boxShadow: '0 8px 32px -8px rgba(0,240,255,0.55), 0 0 0 1px rgba(0,240,255,0.2)',
            zIndex: 1,
          }}
          aria-label="Open NOVA chat"
          data-testid="floating-chat-btn"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-black" strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="w-5 h-5 text-black" strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          <AnimatePresence>
            {unread > 0 && !open && (
              <motion.div
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: '#EF4444', border: '2px solid #020617' }}
                data-testid="chat-unread-badge"
              >
                {unread}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Tooltip on first view ───────────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 1.2, duration: 0.35 } }}
            exit={{ opacity: 0, x: 10, transition: { duration: 0.15, delay: 0 } }}
            className="absolute bottom-16 right-0 px-3 py-2 rounded-xl text-xs mono text-white whitespace-nowrap pointer-events-none"
            style={{
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(0,240,255,0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            Chat with NOVA
            <div
              className="absolute -bottom-1.5 right-5 w-3 h-3 rotate-45"
              style={{ background: 'rgba(15,23,42,0.9)', borderRight: '1px solid rgba(0,240,255,0.15)', borderBottom: '1px solid rgba(0,240,255,0.15)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
