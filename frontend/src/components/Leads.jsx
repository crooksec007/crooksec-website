import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, ArrowLeft, Shield, Zap, Globe, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = "https://54.205.71.52/api";

const features = [
  { icon: Shield, title: "Enterprise Grade", desc: "Military-grade encryption for all data" },
  { icon: Zap, title: "Fast Response", desc: "Under 24-hour turnaround on all leads" },
  { icon: Globe, title: "Global Reach", desc: "Worldwide security infrastructure" },
  { icon: Lock, title: "Private", desc: "Your data is never shared with third parties" }
];

export const Leads = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
      return;
    }

    setStatus('sending');

    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* The main Navbar handles the brand, so we just focus on the content here */}
        <div className="pt-20 grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-space mb-6 leading-tight">
              Secure Your <span className="gradient-text">Digital Future</span> Today.
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">
              Join elite organizations already powered by CrookSec. Fill out the form to start your security transformation.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <f.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 md:p-10 rounded-3xl relative"
          >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 blur-3xl rounded-full" />
            
            <h2 className="text-2xl font-bold font-space mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-cyan-400 rounded-full" />
              Collect Leads
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="John Doe"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="john@example.com"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" name="subject" value={form.subject} onChange={handleChange} required
                    placeholder="Security Audit Inquiry"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
                <textarea 
                  name="message" value={form.message} onChange={handleChange} required
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all disabled:opacity-50 group"
              >
                {status === 'sending' ? (
                  "Initiating Protocol..."
                ) : (
                  <>
                    Submit Application
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 text-sm"
                  >
                    <CheckCircle size={20} />
                    Lead captured successfully. Agent will contact you.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
                  >
                    <AlertCircle size={20} />
                    System failure. Please check your connection and retry.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
