import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldAlert, Terminal as TerminalIcon, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export const SecurityScanner = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle | scanning | results
  const [logs, setLogs] = useState([]);

  const startScan = (e) => {
    e.preventDefault();
    if (!url || !url.includes('.')) return;
    
    setStatus('scanning');
    setLogs(['[*] Initializing external penetration sequence...', '[*] Resolving target IP architecture...']);
    
    // Fake hacking sequence to build immense anticipation
    setTimeout(() => setLogs(l => [...l, '[*] Bypassing localized CDN caching...', '[*] Scanning open TCP/UDP ports (stealth synth)...']), 1200);
    setTimeout(() => setLogs(l => [...l, '[*] Verifying SSL/TLS cipher suites...', '[*] Analyzing HTTP strict security headers...']), 2200);
    setTimeout(() => setLogs(l => [...l, '[!] WARN: Suboptimal X-Frame-Options detected!', '[*] Fingerprinting Web Application Firewall...']), 3300);
    setTimeout(() => setLogs(l => [...l, '[+] Reconnaissance complete. 3 Critical insights found.']), 4400);
    setTimeout(() => setStatus('results'), 5200);
  };

  const handleReset = (e) => {
    e.preventDefault(); 
    setStatus('idle'); 
    setUrl(''); 
    setLogs([]); 
  };

  return (
    <section id="scanner" className="relative py-32 px-6 overflow-hidden border-t" style={{ borderColor: 'rgba(148,163,184,0.08)' }} data-testid="scanner-section">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-4 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Lead Magnet Tool
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Free Attack Surface <span className="gradient-text">Analysis</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Discover how an attacker sees your domain. Enter your website URL below to run a rapid 5-second reconnaissance scan against your public infrastructure.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
          style={{ background: 'rgba(15, 23, 42, 0.5)' }}
        >
          {/* Fake Mac Header */}
          <div className="bg-black/60 px-4 py-3 border-b border-slate-800/80 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="mx-auto text-xs text-slate-500 mono flex items-center gap-2">
              <TerminalIcon className="w-3 h-3" />
              crooksec-recon-suite
            </div>
          </div>

          <div className="p-6 md:p-10 min-h-[300px] flex flex-col justify-center bg-black/20">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.form 
                  key="idle"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  onSubmit={startScan}
                  className="w-full flex flex-col gap-6 items-center"
                >
                  <ShieldCheck className="w-16 h-16 text-cyan-500/40 mb-2" />
                  <div className="relative w-full max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="e.g. yourcompany.com" 
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      className="w-full bg-black/60 border border-slate-700/60 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono shadow-inner"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={!url}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-black hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)' }}
                  >
                    Initiate Scan <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              )}

              {status === 'scanning' && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="w-full max-w-lg mx-auto font-mono text-xs sm:text-sm flex flex-col gap-3"
                >
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-3 ${log.includes('WARN') ? 'text-amber-400' : 'text-cyan-400'}`}
                    >
                      <span className="shrink-0 font-bold opacity-60">{'>'}</span>
                      <span className="tracking-tight">{log}</span>
                    </motion.div>
                  ))}
                  <motion.div 
                    animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-cyan-400 ml-[26px] mt-1"
                  />
                </motion.div>
              )}

              {status === 'results' && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-lg mx-auto flex flex-col items-center text-center"
                >
                  <ShieldAlert className="w-16 h-16 text-rose-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Scan Complete
                  </h3>
                  <p className="text-slate-400 mb-8">
                    We discovered <span className="text-rose-400 font-semibold">3 potential attack vectors</span> on <b className="text-slate-300">{url}</b>. Enter your email below to instantly receive the full PDF technical report.
                  </p>
                  
                  <form className="w-full flex flex-col sm:flex-row gap-3" onSubmit={handleReset}>
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        required
                        placeholder="Work Email Address" 
                        className="w-full bg-black/60 border border-slate-700/60 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm font-mono shadow-inner"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 text-white bg-slate-800 hover:bg-slate-700 border border-slate-600"
                    >
                      Get Report
                    </button>
                  </form>
                  <p className="text-xs text-slate-600 mt-5 mono">By clicking, you consent to receive tech insights. No spam ever.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
