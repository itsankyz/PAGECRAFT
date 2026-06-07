import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Coffee, Zap, Star, Copy, Check, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

const UPI_ID = 'ankurz@fam';
const UPI_LINK = `upi://pay?pa=${UPI_ID}&pn=PageCraft&cu=INR`;

const tiers = [
  { icon: <Coffee className="w-5 h-5" />, label: 'Buy a Coffee', amount: '₹49', desc: 'A small nudge that means a lot' },
  { icon: <Zap className="w-5 h-5" />, label: 'Power It Up', amount: '₹99', desc: 'Keep the servers humming' },
  { icon: <Star className="w-5 h-5" />, label: 'Super Support', amount: '₹199', desc: 'Help build new features faster' },
  { icon: <Heart className="w-5 h-5" />, label: 'Craft Patron', amount: '₹499', desc: 'You\'re a true artisan hero' },
];

export default function Donate() {
  const [copied, setCopied] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-body text-[#1b1c19] bg-[#fbf9f4] min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.06]"></div>
      <div className="fixed top-0 bottom-0 left-0 w-1 bg-[#FF6B35] z-50"></div>

      {/* Header */}
      <header className="border-b-2 border-[#00000b]/10 bg-[#fbf9f4] sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm overflow-hidden border border-[#00000b]/20">
              <img src="/logo.jpeg" alt="PageCraft" className="w-full h-full object-cover" />
            </div>
            <span className="font-label-accent text-lg font-bold text-[#00000b]">PageCraft</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 font-mono text-sm text-[#78767d] hover:text-[#FF6B35] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#00000b] rounded-full font-mono text-sm text-[#FF6B35] mb-6">
            <Heart className="w-4 h-4 fill-[#FF6B35]" /> Support the Workshop
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#00000b] mb-5 leading-tight">
            Keep PageCraft <br />
            <span className="relative inline-block mt-1">
              Free & Crafted
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#FF6B35]/30 -z-10 rounded-sm"></span>
            </span>
          </h1>
          <p className="text-[#78767d] text-lg max-w-xl mx-auto leading-relaxed">
            PageCraft is built and maintained by a solo developer. Every donation — big or small — directly funds new features, faster performance, and keeps it 100% free for everyone.
          </p>
        </motion.div>

        {/* What your support does */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          {[
            { emoji: '🛠️', title: 'New Tools', desc: 'Fund development of more PDF features like compress, sign, and OCR.' },
            { emoji: '⚡', title: 'Performance', desc: 'Better processing speed and support for larger file sizes.' },
            { emoji: '🔒', title: 'Stay Free', desc: 'No ads, no paywalls, no tracking. Your donation makes that possible.' },
          ].map((item, i) => (
            <div key={i} className="p-5 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[3px_3px_0px_rgba(26,26,46,0.06)] text-center">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-label-accent font-bold text-[#00000b] mb-1">{item.title}</h3>
              <p className="font-mono text-xs text-[#78767d] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Main donation area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: QR Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-full p-8 border-2 border-[#00000b]/10 rounded-sm bg-white shadow-[5px_5px_0px_rgba(26,26,46,0.08)] text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-[#FF6B35]" />
                <h2 className="font-display text-2xl font-bold text-[#00000b]">Scan & Pay</h2>
              </div>
              <p className="font-mono text-xs text-[#78767d] mb-6">Open GPay · PhonePe · Paytm · any UPI app</p>

              {/* QR Image */}
              <div className="relative mx-auto w-64 h-64 mb-6">
                <div className="absolute inset-0 border-2 border-[#FF6B35]/20 rounded-sm -m-2 animate-pulse"></div>
                <img
                  src="/upi-qr.jpeg"
                  alt="UPI QR Code"
                  className="w-full h-full object-contain rounded-sm border-2 border-[#00000b]/10 shadow-[4px_4px_0px_rgba(26,26,46,0.08)]"
                />
              </div>

              {/* UPI ID copy */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#f0eee9] border-2 border-[#00000b]/10 rounded-sm mb-4">
                <div className="text-left">
                  <p className="font-mono text-xs text-[#78767d]">UPI ID</p>
                  <p className="font-label-accent text-sm font-bold text-[#00000b]">{UPI_ID}</p>
                </div>
                <button
                  onClick={copyUPI}
                  className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#00000b]/20 bg-white hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all font-mono text-xs rounded-sm"
                >
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>

              {/* Direct UPI button */}
              <a
                href={UPI_LINK}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00000b] text-[#fbf9f4] font-label-accent shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hover:shadow-[2px_2px_0px_rgba(26,26,46,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Smartphone className="w-4 h-4" /> Open UPI App
              </a>
              <p className="mt-3 font-mono text-xs text-[#78767d]">Works on mobile · Opens your default UPI app</p>
            </div>
          </motion.div>

          {/* Right: Tiers + message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-[#00000b] mb-1">Choose Your Support</h2>
              <p className="font-mono text-sm text-[#78767d]">Every amount is appreciated equally 🙏</p>
            </div>

            <div className="space-y-3">
              {tiers.map((tier, i) => (
                <a
                  key={i}
                  href={`${UPI_LINK}&am=${tier.amount.replace('₹', '')}`}
                  className="flex items-center gap-4 p-4 border-2 border-[#00000b]/10 rounded-sm bg-white hover:border-[#FF6B35] hover:shadow-[3px_3px_0px_rgba(255,107,53,0.15)] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#FF6B35]/10 flex items-center justify-center rounded-sm border border-[#FF6B35]/20 text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all flex-shrink-0">
                    {tier.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-label-accent font-bold text-[#00000b] text-sm">{tier.label}</p>
                    <p className="font-mono text-xs text-[#78767d]">{tier.desc}</p>
                  </div>
                  <span className="font-display text-xl font-bold text-[#FF6B35]">{tier.amount}</span>
                </a>
              ))}
            </div>

            {/* Personal note */}
            <div className="p-5 border-2 border-[#FF6B35]/20 rounded-sm bg-[#FF6B35]/5">
              <p className="font-mono text-sm text-[#3a3a3a] leading-relaxed italic">
                "PageCraft started as a side project to solve my own PDF headaches. If it's saved you time too, even a small contribution helps me keep building. Thank you from the bottom of my heart. 🙏"
              </p>
              <p className="font-label-accent text-sm font-bold text-[#00000b] mt-3">— Ankur, Creator of PageCraft</p>
            </div>

            {/* No pressure note */}
            <div className="flex items-start gap-2 p-4 bg-[#f0eee9] border border-[#00000b]/10 rounded-sm">
              <Heart className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <p className="font-mono text-xs text-[#78767d] leading-relaxed">
                PageCraft will always be free. Donations are completely voluntary and go directly to the developer — no middleman, no platform fees.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-[#f0eee9] border-t-2 border-[#00000b]/10 py-8 mt-16">
        <div className="max-w-[860px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#78767d]">© {new Date().getFullYear()} PageCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Terms</Link>
            <Link to="/privacy" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Privacy</Link>
            <Link to="/support" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Support</Link>
            <Link to="/contact" className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
