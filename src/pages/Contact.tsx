import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, ArrowLeft, Send, Mail, Github, CheckCircle, AlertCircle, Loader } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xwvjlbog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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

      <main className="max-w-[1100px] mx-auto px-4 md:px-8 py-16">

        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#00000b] rounded-full font-mono text-sm text-[#FF6B35] mb-6">
            <Send className="w-4 h-4" /> Get In Touch
          </div>
          <h1 className="font-display text-5xl font-bold text-[#00000b] mb-4 leading-tight">Contact Us</h1>
          <p className="text-[#78767d] text-lg max-w-lg">Have a question, bug report, feature request, or just want to say hello? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: Info */}
          <div className="space-y-6">
            <div className="p-6 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)]">
              <h2 className="font-display text-xl font-bold text-[#00000b] mb-4">Contact Info</h2>
              <div className="space-y-4">
                <a href="mailto:itsankyz@gmail.com" className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/20 flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#78767d] mb-0.5">Email</p>
                    <p className="font-label-accent text-sm text-[#00000b] group-hover:text-[#FF6B35] transition-colors break-all">itsankyz@gmail.com</p>
                  </div>
                </a>
                <a href="https://github.com/itsankyz/PAGECRAFT" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/20 flex-shrink-0 mt-0.5">
                    <Github className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#78767d] mb-0.5">GitHub</p>
                    <p className="font-label-accent text-sm text-[#00000b] group-hover:text-[#FF6B35] transition-colors">itsankyz/PAGECRAFT</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)]">
              <h2 className="font-display text-xl font-bold text-[#00000b] mb-3">Response Time</h2>
              <p className="font-mono text-sm text-[#78767d] leading-relaxed">We typically respond to all inquiries within <strong className="text-[#00000b]">48 hours</strong>. For urgent issues, email directly at itsankyz@gmail.com.</p>
            </div>

            <div className="p-6 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)]">
              <h2 className="font-display text-xl font-bold text-[#00000b] mb-3">Before You Write</h2>
              <p className="font-mono text-sm text-[#78767d] leading-relaxed mb-3">You might find an instant answer in our help center.</p>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#00000b] text-[#00000b] font-mono text-xs hover:bg-[#00000b] hover:text-white transition-all"
              >
                Browse FAQ →
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-[#FF6B35]/30 rounded-sm bg-[#FF6B35]/5 text-center">
                <CheckCircle className="w-16 h-16 text-[#FF6B35] mb-4" />
                <h2 className="font-display text-3xl font-bold text-[#00000b] mb-3">Message Sent!</h2>
                <p className="text-[#78767d] mb-8 max-w-sm">Thanks for reaching out. We've received your message and will get back to you within 48 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-[#00000b] text-[#fbf9f4] font-label-accent shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hover:shadow-[2px_2px_0px_rgba(26,26,46,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[4px_4px_0px_rgba(26,26,46,0.06)]">
                <h2 className="font-display text-2xl font-bold text-[#00000b] mb-6">Send a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block font-mono text-xs text-[#78767d] mb-2 uppercase tracking-wide">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border-2 border-[#00000b]/20 rounded-sm bg-[#fbf9f4] font-body text-[#00000b] placeholder:text-[#78767d]/60 focus:outline-none focus:border-[#FF6B35] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#78767d] mb-2 uppercase tracking-wide">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border-2 border-[#00000b]/20 rounded-sm bg-[#fbf9f4] font-body text-[#00000b] placeholder:text-[#78767d]/60 focus:outline-none focus:border-[#FF6B35] transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block font-mono text-xs text-[#78767d] mb-2 uppercase tracking-wide">Subject *</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#00000b]/20 rounded-sm bg-[#fbf9f4] font-body text-[#00000b] focus:outline-none focus:border-[#FF6B35] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a topic...</option>
                    <option value="Bug Report">🐛 Bug Report</option>
                    <option value="Feature Request">✨ Feature Request</option>
                    <option value="General Question">❓ General Question</option>
                    <option value="Privacy Inquiry">🔒 Privacy Inquiry</option>
                    <option value="Business / Partnership">🤝 Business / Partnership</option>
                    <option value="Other">💬 Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block font-mono text-xs text-[#78767d] mb-2 uppercase tracking-wide">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Describe your question or issue in detail. If reporting a bug, include your browser, OS, and steps to reproduce."
                    className="w-full px-4 py-3 border-2 border-[#00000b]/20 rounded-sm bg-[#fbf9f4] font-body text-[#00000b] placeholder:text-[#78767d]/60 focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 mb-5 border border-red-200 bg-red-50 rounded-sm text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again or email us directly at itsankyz@gmail.com.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-[#00000b] text-[#fbf9f4] font-label-accent text-base shadow-[5px_5px_0px_rgba(26,26,46,0.15)] hover:shadow-[2px_2px_0px_rgba(26,26,46,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading'
                    ? <><Loader className="w-4 h-4 animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4" /> Send Message</>
                  }
                </button>

                <p className="mt-4 font-mono text-xs text-[#78767d]">
                  By submitting this form, you agree to our{' '}
                  <Link to="/privacy" className="text-[#FF6B35] underline">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-[#f0eee9] border-t-2 border-[#00000b]/10 py-8 mt-16">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#78767d]">© {new Date().getFullYear()} PageCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Terms</Link>
            <Link to="/privacy" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Privacy</Link>
            <Link to="/support" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Support</Link>
            <Link to="/contact" className="font-mono text-xs text-[#FF6B35]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
