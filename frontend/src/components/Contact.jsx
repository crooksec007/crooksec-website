import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, Terminal } from 'lucide-react';
import axios from 'axios';

// ✅ Direct API URL
const API = "https://54.205.71.52/api";

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/crooksec' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/crooksec' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/crooksec' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@crooksec.com' },
];

const formFields = [
  { name: 'name', label: '$ name --required', placeholder: 'Your full name', type: 'text', required: true },
  { name: 'email', label: '$ email --required', placeholder: 'your@email.com', type: 'email', required: true },
  { name: 'phone', label: '$ phone --required', placeholder: '+91 9876543210', type: 'tel', required: true },
  { name: 'subject', label: '$ subject --required', placeholder: 'Security audit, AI integration...', type: 'text', required: true },
];

export const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) {
      alert("Please fill all fields");
      return;
    }

    setStatus('sending');

    try {
      await axios.post(`${API}/contact`, form, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setStatus('success');

      // Reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  const inputClass = `w-full bg-transparent border-b py-3 text-white text-sm placeholder-gray-500 outline-none`;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Contact Us
          </h2>
          <p className="text-gray-400 mt-2">
            Let’s build something amazing together 🚀
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* FORM */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">

              {formFields.map((field, i) => (
                <div key={i}>
                  <label className="text-sm text-gray-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={inputClass}
                    required
                  />
                </div>
              ))}

              {/* Message */}
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  $ message --required
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your project..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {status === 'sending' ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    className="text-green-400 text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✅ Message sent successfully!
                  </motion.p>
                )}

                {status === 'error' && (
                  <motion.p
                    className="text-red-400 text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ❌ Failed to send message. Try again.
                  </motion.p>
                )}
              </AnimatePresence>

            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            <div>
              <h3 className="text-xl text-white font-semibold">
                Get in Touch
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                We usually respond within 24 hours.
              </p>
            </div>

            <div className="text-gray-300 flex items-center gap-2">
              <Mail size={16} /> contact@crooksec.com
            </div>

            <div className="flex gap-4 mt-4">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};