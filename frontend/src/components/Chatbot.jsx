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
    text: "You can reach CrookSec through multiple channels:\n\n📧 crooksec.contact@gmail.com\n🚨 Emergency: incident@crooksec.com\n\nOr scroll down to the Contact section — fill out the form and our team typically responds within 24 hours. What project would you like to discuss?",
  },
  {
    triggers: ['about', 'who are you', 'company', 'team', 'crooksec'],
    text: "CrookSec is a technology-driven company founded to bridge the gap between elite cybersecurity and modern software engineering. Our team combines 50+ combined years of expertise across digital forensics, AI engineering, and full-stack development — serving enterprises across 3 continents.",
  },
];

const DEFAULT_RESPONSE = "That's a great question. Our team at CrookSec specializes in exactly that kind of challenge. I'd recommend connecting with one of our experts for a tailored answer — you can use the Contact section below or email crooksec.contact@gmail.com directly.";

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

  return null;
};
