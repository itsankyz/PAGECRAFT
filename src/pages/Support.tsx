import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare, Zap } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    items: [
      {
        q: 'Is PageCraft free to use?',
        a: 'Yes, PageCraft is completely free. All core PDF tools — merge, extract, watermark, image-to-PDF, and password lock — are available at no cost with no sign-up required.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'No account is needed. You can start using PageCraft immediately without registering or logging in.',
      },
      {
        q: 'What browsers are supported?',
        a: 'PageCraft works best on modern browsers: Google Chrome (v90+), Mozilla Firefox (v88+), Microsoft Edge (v90+), and Safari (v14+). We recommend keeping your browser up to date for the best experience.',
      },
      {
        q: 'Does PageCraft work on mobile?',
        a: 'Yes, PageCraft is fully responsive and works on mobile browsers. However, for the best experience with large files or complex operations, a desktop browser is recommended.',
      },
    ],
  },
  {
    category: 'Files & Privacy',
    items: [
      {
        q: 'Are my PDF files uploaded to a server?',
        a: 'No. PageCraft processes all PDF operations entirely in your browser using client-side JavaScript. Your files never leave your device and are never uploaded, stored, or accessed by us.',
      },
      {
        q: 'Is my data safe?',
        a: 'Yes. Because everything runs in your browser, your files are never transmitted over the internet to our servers. We cannot see your documents even if we wanted to. See our Privacy Policy for full details.',
      },
      {
        q: 'What happens to my files after processing?',
        a: 'Nothing — your original files remain untouched on your device. The processed output is generated in your browser memory and downloaded directly to you. No copies are retained anywhere.',
      },
    ],
  },
  {
    category: 'PDF Tools',
    items: [
      {
        q: 'Is there a file size limit?',
        a: 'There is no hard server-side limit since processing happens in your browser. However, very large files (50MB+) may be slow or cause memory issues depending on your device. We recommend splitting very large PDFs into smaller parts first.',
      },
      {
        q: 'What file formats are supported?',
        a: 'For PDF tools: .pdf files. For Image to PDF: .jpg, .jpeg, .png, .webp. For watermarking, the output is always a .pdf file.',
      },
      {
        q: 'Can I merge more than 2 PDFs at once?',
        a: 'Yes! You can merge as many PDFs as you need in a single operation. Simply select or drag-drop all the files you want to combine.',
      },
      {
        q: 'How do I extract specific pages?',
        a: 'Use the Extract Pages tool, enter the page numbers or ranges you want (e.g. 1, 3, 5-8), and click Extract. The selected pages will be saved as a new PDF.',
      },
      {
        q: 'Will the password lock feature encrypt my PDF?',
        a: 'Yes. PageCraft uses AES-256 encryption (via pdf-lib) when applying password protection. This is a strong industry-standard encryption method.',
      },
      {
        q: 'Can I remove a password from a PDF?',
        a: 'Currently PageCraft supports adding password protection. A "remove password" feature is on the roadmap. If you already know the password, most PDF readers (including Chrome\'s built-in viewer) can export a copy without the password.',
      },
    ],
  },
  {
    category: 'AI Smart Formatting',
    items: [
      {
        q: 'What is AI Smart Formatting?',
        a: 'AI Smart Formatting is an upcoming feature powered by Google Gemini that will help you intelligently reformat, restructure, and enhance the layout of your PDF documents using natural language instructions.',
      },
      {
        q: 'When will AI Smart Formatting be available?',
        a: 'This feature is currently in development and marked as "coming soon". We will announce availability on our GitHub and through the app.',
      },
      {
        q: 'Will AI features be free?',
        a: 'We plan to offer a generous free tier for AI features. Specific limits will be announced when the feature launches.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-2 rounded-sm transition-all ${open ? 'border-[#FF6B35]/40 bg-white' : 'border-[#00000b]/10 bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left gap-4"
      >
        <span className="font-label-accent text-[#00000b] text-base">{q}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-[#FF6B35] flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-[#78767d] flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 font-body text-[#3a3a3a] leading-relaxed border-t border-[#00000b]/10 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Support() {
  return (
    <div className="font-body text-[#1b1c19] bg-[#fbf9f4] min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.06]"></div>
      <div className="fixed top-0 bottom-0 left-0 w-1 bg-[#FF6B35] z-50"></div>

      <header className="border-b-2 border-[#00000b]/10 bg-[#fbf9f4] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm overflow-hidden border border-[#00000b]/20">
              <img src="/logo.jpeg" alt="PageCraft logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-label-accent text-lg font-bold text-[#00000b]">PageCraft</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 font-mono text-sm text-[#78767d] hover:text-[#FF6B35] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-4 md:px-8 py-16">

        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#00000b] rounded-full font-mono text-sm text-[#FF6B35] mb-6">
            <HelpCircle className="w-4 h-4" /> Help Center
          </div>
          <h1 className="font-display text-5xl font-bold text-[#00000b] mb-4 leading-tight">Support</h1>
          <p className="text-[#78767d] text-lg max-w-lg">Find answers to common questions. Can't find what you're looking for? We're just an email away.</p>
        </div>

        {/* Quick help cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {[
            { icon: <Zap className="w-5 h-5 text-[#FF6B35]" />, title: 'Quick Start', desc: 'No sign-up needed. Pick a tool, drop your file, and download your result.' },
            { icon: <Mail className="w-5 h-5 text-[#FF6B35]" />, title: 'Email Support', desc: 'itsankyz@gmail.com — we typically respond within 48 hours.' },
            { icon: <MessageSquare className="w-5 h-5 text-[#FF6B35]" />, title: 'Send a Message', desc: <>Use our <Link to="/contact" className="text-[#FF6B35] underline">Contact form</Link> for detailed queries or bug reports.</> },
          ].map((card, i) => (
            <div key={i} className="p-5 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)]">
              <div className="w-9 h-9 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/20 mb-3">
                {card.icon}
              </div>
              <h3 className="font-label-accent font-bold text-[#00000b] mb-1">{card.title}</h3>
              <p className="font-mono text-xs text-[#78767d] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-display text-2xl font-bold text-[#00000b] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#FF6B35] rounded-sm inline-block"></span>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-14 p-8 border-2 border-[#FF6B35]/30 rounded-sm bg-[#FF6B35]/5 text-center">
          <h2 className="font-display text-2xl font-bold text-[#00000b] mb-2">Still need help?</h2>
          <p className="text-[#78767d] mb-6">We're happy to assist with anything not covered above.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:itsankyz@gmail.com"
              className="px-8 py-3 bg-[#00000b] text-[#fbf9f4] font-label-accent transition-all shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hover:shadow-[2px_2px_0px_rgba(26,26,46,0.15)] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Email Us
            </a>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-[#00000b] text-[#00000b] font-label-accent hover:bg-[#00000b] hover:text-white transition-all"
            >
              Contact Form
            </Link>
          </div>
        </div>

      </main>

      <footer className="bg-[#f0eee9] border-t-2 border-[#00000b]/10 py-8 mt-16">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#78767d]">© {new Date().getFullYear()} PageCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Terms</Link>
            <Link to="/privacy" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Privacy</Link>
            <Link to="/support" className="font-mono text-xs text-[#FF6B35]">Support</Link>
            <Link to="/contact" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
