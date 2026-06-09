import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Trophy } from 'lucide-react';

interface Supporter {
  name: string;
  amount: number;
  message?: string;
  date: string;
}

const recentSupporters: Supporter[] = [
  { name: 'Gilles D.', amount: 18, message: 'Flickering UI is lovely, Pip is so cute!', date: 'Today' },
  { name: 'Sarah Miller', amount: 9, message: 'The AI re-format tool is super clean!', date: 'Yesterday' },
  { name: 'Renato S.', amount: 3, message: 'Keep the craft wheel spinning!', date: '2 days ago' },
];

export default function Donation() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#f0eee9] relative" id="donation-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-xs font-mono border border-[#FF6B35]/20 mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>NO SUBSCRIPTIONS. ZERO ADS.</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">Support Our Tiny Workshop</h2>
          <p className="text-[#47464c] font-body text-lg max-w-xl mx-auto">
            We removed subscriptions so that PageCraft remains fair and accessible. If these digital tools save you time, consider throwing a coin our way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">

          {/* CTA Card */}
          <div className="lg:col-span-7 bg-white p-10 hand-drawn-border flex flex-col items-center justify-center text-center gap-6">
            <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center border-2 border-[#FF6B35]/30">
              <Heart className="w-8 h-8 text-[#FF6B35] fill-[#FF6B35]" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#00000b] mb-2">Support the Workshop</h3>
              <p className="text-[#78767d] font-body text-sm max-w-sm mx-auto leading-relaxed">
                PageCraft is free for everyone. If it saved you time, a small donation goes directly to the developer — zero fees, zero middlemen.
              </p>
            </div>
            <button
              onClick={() => navigate('/donate')}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-[#00000b] text-[#fbf9f4] font-label-accent text-base hover:bg-[#FF6B35] active:translate-y-0.5 active:translate-x-0.5 transition-all shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hand-drawn-border"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate Now
            </button>
            <p className="font-mono text-xs text-[#78767d]">UPI · GPay · PhonePe · Paytm · Zero fees</p>
          </div>

          {/* Ledger of Honor */}
          <div className="lg:col-span-5 bg-[#fbf9f4] hand-drawn-border p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-[#FF6B35]" />
                <h3 className="font-display text-xl font-bold text-[#00000b]">Ledger of Honor</h3>
              </div>
              <p className="text-xs text-[#78767d] font-body leading-relaxed mb-6">
                A historical scroll of legendary patrons who help sustain the development of these digital tools.
              </p>
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {recentSupporters.map((supporter, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={index}
                    className="p-3.5 bg-white border border-[#00000b]/10 hover:border-[#FF6B35]/30 rounded-xs transition-colors text-left"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-display text-[#00000b] font-bold text-sm">{supporter.name}</span>
                      <span className="font-mono text-xs font-bold text-[#FF6B35] bg-[#FF6B35]/5 px-2 py-0.5 rounded-sm">
                        ₹{supporter.amount}
                      </span>
                    </div>
                    {supporter.message && (
                      <p className="text-xs text-[#47464c] italic font-body mt-1">"{supporter.message}"</p>
                    )}
                    <span className="text-[10px] text-[#78767d] font-mono block mt-2">{supporter.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#00000b]/10 text-center">
              <span className="font-accent italic text-xs text-[#845400]">
                "Every coin keeps Pip's engines fully greased!"
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
