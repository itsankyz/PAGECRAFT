import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, ArrowLeft, Shield, Eye, Database, Globe, Mail } from 'lucide-react';

export default function Privacy() {
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
            <Shield className="w-4 h-4" /> Legal Document
          </div>
          <h1 className="font-display text-5xl font-bold text-[#00000b] mb-4 leading-tight">Privacy Policy</h1>
          <p className="font-mono text-sm text-[#78767d]">Last updated: June 2025 · Effective immediately</p>
        </div>

        <div className="space-y-10 text-[#3a3a3a] leading-relaxed">

          <section className="p-6 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)]">
            <p className="text-base">
              At <strong>PageCraft</strong>, your privacy is built into the foundation of how this tool works. This Privacy Policy explains what data we collect, how we use it, and why we collect as little as possible. Questions? Email us at{' '}
              <a href="mailto:itsankyz@gmail.com" className="text-[#FF6B35] underline underline-offset-2">itsankyz@gmail.com</a>.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <Database className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">1. Data We Do NOT Collect</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>PageCraft processes all PDF operations <strong>entirely in your browser</strong> using client-side JavaScript. This means:</p>
              <ul className="space-y-2">
                {[
                  'Your PDF files are never uploaded to our servers.',
                  'Your documents are never stored, cached, or logged anywhere.',
                  'File contents, names, or metadata are never transmitted.',
                  'No account or registration is required to use PageCraft.',
                  'We do not use cookies for tracking or advertising.',
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
                <Eye className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">2. Analytics Data</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>We use <strong>Vercel Analytics</strong> to understand how visitors use PageCraft. This collects:</p>
              <ul className="space-y-2">
                {[
                  'Page views and navigation patterns (e.g. which tools are most used).',
                  'Approximate geographic region (country-level only, not precise location).',
                  'Browser type and device category (desktop/mobile).',
                  'Referrer URL (how you arrived at PageCraft).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-[#78767d] bg-[#f0eee9] p-3 rounded-sm border-l-4 border-[#FF6B35]">
                <strong>Note:</strong> Vercel Analytics is privacy-friendly — no cookies, no cross-site tracking, no ad profiles. Data is aggregated and anonymous. See{' '}
                <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">Vercel's Privacy Policy</a>.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <Globe className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">3. AI Features & Google Gemini</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>The optional <strong>AI Smart Formatting</strong> feature is powered by the Google Gemini API. It is:</p>
              <ul className="space-y-2">
                {[
                  'Clearly labeled and opt-in — it never activates without your explicit action.',
                  'Only used to process formatting instructions you provide.',
                  'Subject to Google\'s own privacy practices.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2">We recommend not including sensitive personal information in AI prompts. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">Google's Privacy Policy</a>.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/30">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[#00000b]">4. Contact Form</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p>When you submit the <Link to="/contact" className="text-[#FF6B35] underline">Contact form</Link>, your name, email, and message are sent via <strong>Formspree</strong>. This data is:</p>
              <ul className="space-y-2">
                {[
                  'Used solely to respond to your inquiry.',
                  'Never sold or shared with third parties.',
                  'Retained only as long as necessary to resolve your query.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>See <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">Formspree's Privacy Policy</a>.</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">5. Hosting & Infrastructure</h2>
            <p>PageCraft is hosted on <strong>Vercel</strong>. Standard server logs (IP, timestamp, response status) may be recorded by Vercel — these are not accessible to PageCraft for individual tracking. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">Vercel's Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">6. Children's Privacy</h2>
            <p>PageCraft is not directed at children under 13. We do not knowingly collect personal data from children. If you believe a child has submitted information via our contact form, email us and we will delete it promptly.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">7. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws, including:</p>
            <ul className="space-y-2">
              {[
                'The right to know what personal data we hold about you.',
                'The right to request deletion of your data.',
                'The right to opt out of any data processing.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF6B35] flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">Email us at <a href="mailto:itsankyz@gmail.com" className="text-[#FF6B35] underline">itsankyz@gmail.com</a> for any requests.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The "Last updated" date at the top will reflect any changes. Continued use of PageCraft after changes are posted constitutes your acceptance of the revised policy.</p>
          </section>

          <section className="p-6 border-2 border-[#FF6B35]/30 rounded-sm bg-[#FF6B35]/5">
            <h2 className="font-display text-xl font-bold text-[#00000b] mb-2">Questions or Concerns?</h2>
            <p>Reach out at <a href="mailto:itsankyz@gmail.com" className="text-[#FF6B35] underline font-medium">itsankyz@gmail.com</a>. We typically respond within 48 hours.</p>
          </section>

        </div>
      </main>

      <footer className="bg-[#f0eee9] border-t-2 border-[#00000b]/10 py-8 mt-16">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#78767d]">© {new Date().getFullYear()} PageCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Terms</Link>
            <Link to="/privacy" className="font-mono text-xs text-[#FF6B35]">Privacy</Link>
            <Link to="/support" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Support</Link>
            <Link to="/contact" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
