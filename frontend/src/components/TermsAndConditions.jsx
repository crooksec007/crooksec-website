import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const sections = [
  {
    title: "01 — Acceptance of Terms",
    body: "By accessing or using CrookSec's website, services, platforms, or any associated content (collectively, \"Services\"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our Services.",
  },
  {
    title: "02 — Description of Services",
    body: "CrookSec provides cybersecurity consulting, defensive security assessments, red-team engagements, AI-driven security solutions, blockchain development, and cloud/DevOps services. The specific scope of each engagement is defined in a separate Statement of Work (SOW) or service agreement.",
  },
  {
    title: "03 — Acceptable Use",
    bullets: [
      "Violate any applicable local, national, or international law or regulation.",
      "Infringe the intellectual property rights of any third party.",
      "Transmit unsolicited or unauthorized advertising or promotional material.",
      "Introduce malware, viruses, or any other harmful material into our systems.",
    ],
    prefix: "You agree not to use our Services to:",
  },
  {
    title: "04 — Intellectual Property",
    body: "All content, trademarks, logos, software, and materials published on this website are the exclusive property of CrookSec or its licensors. Unauthorized reproduction, distribution, or modification is strictly prohibited.",
  },
  {
    title: "05 — Confidentiality",
    body: "Any non-public information exchanged during an engagement is treated as confidential. Both parties agree not to disclose such information to third parties without prior written consent, unless required by law.",
  },
  {
    title: "06 — Disclaimer of Warranties",
    body: 'Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.',
  },
  {
    title: "07 — Limitation of Liability",
    body: "To the fullest extent permitted by law, CrookSec shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our Services — even if we have been advised of the possibility of such damages.",
  },
  {
    title: "08 — Indemnification",
    body: "You agree to indemnify and hold harmless CrookSec, its officers, employees, and partners from any claims, liabilities, damages, or expenses (including legal fees) arising out of your use of the Services or your breach of these Terms.",
  },
  {
    title: "09 — Changes to Terms",
    body: "We reserve the right to update these Terms at any time. Continued use of our Services after changes are published constitutes acceptance of the revised Terms. We recommend reviewing this page periodically.",
  },
  {
    title: "10 — Governing Law",
    body: "These Terms are governed by and construed in accordance with applicable laws. Any disputes shall be resolved in the competent courts of the jurisdiction in which CrookSec operates.",
  },
  {
    title: "11 — Contact",
    body: null,
    contact: true,
  },
];

export const TermsAndConditions = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Cyber grid */}
      <div className="cyber-grid absolute inset-0 pointer-events-none opacity-30" />

      {/* Ambient glows */}
      <div
        className="absolute -right-40 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -left-40 bottom-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(112,0,255,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 text-cyan-400 text-xs mono uppercase tracking-widest mb-6 px-3 py-1.5 border border-cyan-500/20 rounded-full bg-cyan-500/5"
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Legal Document
          </motion.div>

          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Terms &amp;{" "}
            <span className="gradient-text">Conditions</span>
          </h1>

          <p className="text-slate-400 text-base max-w-xl mx-auto mb-3">
            Please read these terms carefully before using any of our services or platforms.
          </p>
          <p className="text-slate-600 text-xs mono">Last updated: March 30, 2026</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="space-y-4"
        >
          {sections.map((sec) => (
            <motion.div
              key={sec.title}
              variants={cardVariants}
              className="glass-card rounded-2xl border border-slate-700/50 p-6 group hover:border-cyan-500/20 transition-colors duration-300"
            >
              <h2
                className="text-xs mono uppercase tracking-widest text-cyan-400 mb-3"
              >
                {sec.title}
              </h2>

              {sec.prefix && (
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{sec.prefix}</p>
              )}

              {sec.body && (
                <p className="text-slate-400 text-sm leading-relaxed">{sec.body}</p>
              )}

              {sec.bullets && (
                <ul className="space-y-2">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-slate-400 text-sm">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(0,240,255,0.6)" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {sec.contact && (
                <p className="text-slate-400 text-sm leading-relaxed">
                  For questions about these Terms, please contact us at{" "}
                  <a
                    href="mailto:contact@crooksec.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    contact@crooksec.com
                  </a>
                  .
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
