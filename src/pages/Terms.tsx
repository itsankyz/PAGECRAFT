import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, ArrowLeft, ScrollText, FileCheck, AlertTriangle, Ban, Scale } from 'lucide-react';

export default function Terms() {
  return (
    <div className="font-body text-[#1b1c19] bg-[#fbf9f4] min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.06]"></div>
      <div className="fixed top-0 bottom-0 left-0 w-1 bg-[#FF6B35] z-50"></div>

      <header className="border-b-2 border-[#00000b]/10 bg-[#fbf9f4] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00000b] flex items-center justify-center rounded-sm">
              <Feather className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <span className="font-label-accent text-lg font-bold text-[#00000b]">PageCraft</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 font-mono text-sm text-[#78767d] hover:text-[#FF6B35] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#00000b] rounded-full font-mono text-sm text-[#FF6B35] mb-6">
            <ScrollText className="w-4 h-4" /> Legal Document
          </div>
          <h1 className="font-display text-5xl font-bold text-[#00000b] mb-4 leading-tight">Terms of Service</h1>
          <p className="font-mono text-sm text-[#78767d]">Last updated: June 2025 · Effective immediately</p>
        </div>

        <div className="space-y-10 text-[#3a3a3a] leading-relaxed">

          <section className="p-6 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)]">
            <p>
              By accessing or using <strong>PageCraft</strong> at any URL where it is hosted, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service. These terms apply to all visitors and users of PageCraft.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <FileCheck className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">1. Description of Service</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>PageCraft is a free, browser-based PDF utility tool that allows you to:</p>
              <ul className="space-y-2">
                {[
                  'Merge multiple PDF files into one.',
                  'Extract specific pages from a PDF.',
                  'Add watermarks or stamps to PDF documents.',
                  'Convert images to PDF format.',
                  'Password-protect PDF files.',
                  'Use AI-assisted formatting (when available).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2">All core PDF operations are performed <strong>client-side in your browser</strong>. Your files are never uploaded to or stored on our servers.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <Scale className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">2. Your Files & Ownership</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>You retain full ownership of all files you process through PageCraft. We make no claim to any document, image, or content you use with this service.</p>
              <ul className="space-y-2">
                {[
                  'You are solely responsible for the files you process.',
                  'You confirm you have the legal right to use and modify any file you upload.',
                  'PageCraft does not access, read, store, or transmit your file contents.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <Ban className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">3. Acceptable Use</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>You agree <strong>not</strong> to use PageCraft to process, create, or distribute:</p>
              <ul className="space-y-2">
                {[
                  'Content that infringes on copyright, trademarks, or intellectual property rights.',
                  'Illegal content of any kind, including but not limited to CSAM.',
                  'Documents intended to defraud, deceive, or mislead others.',
                  'Malware, viruses, or harmful code embedded in documents.',
                  'Content that violates any applicable local, national, or international law.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2">We reserve the right to terminate access for any user we reasonably believe is violating these terms.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <AlertTriangle className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">4. Disclaimer of Warranties</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>PageCraft is provided <strong>"as is"</strong> and <strong>"as available"</strong> without any warranty of any kind, express or implied, including but not limited to:</p>
              <ul className="space-y-2">
                {[
                  'Warranties of merchantability or fitness for a particular purpose.',
                  'Guarantees that the service will be uninterrupted, error-free, or secure.',
                  'Guarantees of accuracy or completeness of output files.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm bg-[#f0eee9] p-3 rounded-sm border-l-4 border-[#FF6B35] text-[#78767d]">
                <strong>Recommendation:</strong> Always keep backups of your original files. While PageCraft processes files client-side and doesn't alter originals, we are not liable for any data loss during processing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">5. Limitation of Liability</h2>
            <div className="space-y-3">
              <p>To the fullest extent permitted by applicable law, PageCraft and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
              <ul className="space-y-2">
                {[
                  'Loss of data or documents during processing.',
                  'Corruption of output files.',
                  'Loss of business, revenue, or profits.',
                  'Any damages arising from reliance on the service.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">6. Intellectual Property</h2>
            <p>The PageCraft name, logo, design, and source code are the intellectual property of PageCraft's creator. You may not reproduce, copy, or redistribute any part of PageCraft's branding or interface without explicit written permission. The underlying open-source libraries used (such as <code className="bg-[#f0eee9] px-1.5 py-0.5 rounded text-sm">pdf-lib</code>) are subject to their own respective licenses.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">7. Third-Party Services</h2>
            <p className="mb-3">PageCraft uses the following third-party services, each governed by their own terms:</p>
            <ul className="space-y-2">
              {[
                { name: 'Vercel', url: 'https://vercel.com/legal/terms', desc: 'Hosting and deployment' },
                { name: 'Google Gemini API', url: 'https://ai.google.dev/terms', desc: 'AI Smart Formatting feature' },
                { name: 'Formspree', url: 'https://formspree.io/legal/terms-of-service', desc: 'Contact form submissions' },
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                  <span><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">{s.name}</a> — {s.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">8. Service Availability & Changes</h2>
            <p>We reserve the right to modify, suspend, or discontinue PageCraft (or any part of it) at any time without notice. We may also update these Terms of Service at any time. The "Last updated" date will reflect changes. Continued use after updates constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">9. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of PageCraft shall first be attempted to be resolved amicably by contacting us at <a href="mailto:itsankyz@gmail.com" className="text-[#FF6B35] underline">itsankyz@gmail.com</a>.</p>
          </section>

          <section className="p-6 border-2 border-[#FF6B35]/30 rounded-sm bg-[#FF6B35]/5">
            <h2 className="font-display text-xl font-bold text-[#00000b] mb-2">Questions About These Terms?</h2>
            <p>Contact us at <a href="mailto:itsankyz@gmail.com" className="text-[#FF6B35] underline font-medium">itsankyz@gmail.com</a>. We typically respond within 48 hours.</p>
          </section>

        </div>
      </main>

      <footer className="bg-[#f0eee9] border-t-2 border-[#00000b]/10 py-8 mt-16">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#78767d]">© {new Date().getFullYear()} PageCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="font-mono text-xs text-[#FF6B35]">Terms</Link>
            <Link to="/privacy" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Privacy</Link>
            <Link to="/support" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Support</Link>
            <Link to="/contact" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
