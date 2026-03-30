import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

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
    title: "01 — Introduction",
    body: 'CrookSec ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
  },
  {
    title: "02 — Information We Collect",
    prefix: "We may collect the following categories of personal information:",
    bullets: [
      "Contact information — name, email address, phone number, company name.",
      "Usage data — IP address, browser type, pages visited, time spent, and referring URLs.",
      "Communication data — messages or inquiries sent via contact forms or email.",
      "Technical data — information provided during security assessments or consulting engagements.",
    ],
  },
  {
    title: "03 — How We Use Your Information",
    prefix: "We use the information we collect to:",
    bullets: [
      "Provide, operate, and improve our services.",
      "Respond to inquiries and deliver customer support.",
      "Send administrative information, updates, and security notices.",
      "Analyse usage trends to enhance user experience.",
      "Comply with legal obligations and enforce our agreements.",
    ],
  },
  {
    title: "04 — Sharing of Information",
    prefix: "We do not sell, trade, or rent your personal information. We may share data with:",
    bullets: [
      "Service providers who assist us in operating our website, under strict confidentiality obligations.",
      "Legal authorities when required by law, regulation, or valid legal process.",
      "Business successors in the event of a merger, acquisition, or asset sale, with prior notice.",
    ],
  },
  {
    title: "05 — Cookies & Tracking",
    body: "Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and understand visitor origins. You can control cookie settings through your browser. Disabling cookies may affect some features of the site.",
  },
  {
    title: "06 — Data Retention",
    body: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    title: "07 — Data Security",
    body: "We implement industry-standard technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "08 — Your Rights",
    prefix: "Depending on your jurisdiction, you may have the right to:",
    bullets: [
      "Access the personal information we hold about you.",
      "Request correction of inaccurate or incomplete data.",
      "Request deletion of your personal data (right to be forgotten).",
      "Object to or restrict certain processing activities.",
      "Data portability — receive your data in a structured, machine-readable format.",
    ],
  },
  {
    title: "09 — Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.",
  },
  {
    title: "10 — Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of our Services after any changes constitutes your acceptance of the updated policy.",
  },
  {
    title: "11 — Contact Us",
    contact: true,
  },
];

export const PrivacyPolicy = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden min-h-screen">
      {/* Cyber grid */}
      <div className="cyber-grid absolute inset-0 pointer-events-none opacity-30" />

      {/* Ambient glows */}
      <div
        className="absolute -left-40 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(112,0,255,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -right-40 bottom-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)" }}
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
            Privacy{" "}
            <span className="gradient-text">Policy</span>
          </h1>

          <p className="text-slate-400 text-base max-w-xl mx-auto mb-3">
            We take your privacy seriously. Here is how we handle your data.
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
              className="glass-card rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/20 transition-colors duration-300"
            >
              <h2 className="text-xs mono uppercase tracking-widest text-cyan-400 mb-3">
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
                  If you have any questions about this Privacy Policy, contact us at{" "}
                  <a
                    href="mailto:crooksec.contact@gmail.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    crooksec.contact@gmail.com
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
