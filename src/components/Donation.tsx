import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Coffee, BatteryCharging, PenTool, Sparkles, Trophy } from 'lucide-react';

interface Supporter {
  name: string;
  amount: number;
  message?: string;
  date: string;
}

export default function Donation() {
  const navigate = useNavigate();
  const [selectedPreset, setSelectedPreset] = useState<number | null>(9);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [supporterName, setSupporterName] = useState<string>('');
  const [supporterMsg, setSupporterMsg] = useState<string>('');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [recentSupporters, setRecentSupporters] = useState<Supporter[]>(() => {
    const saved = localStorage.getItem('pagecraft_supporters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing supporters from localStorage', e);
      }
    }
    return [
      { name: 'Gilles D.', amount: 18, message: 'Flickering UI is lovely, Pip is so cute!', date: 'Today' },
      { name: 'Sarah Miller', amount: 9, message: 'The AI re-format tool is super clean!', date: 'Yesterday' },
      { name: 'Renato S.', amount: 3, message: 'Keep the craft wheel spinning!', date: '2 days ago' },
    ];
  });

  const presets = [
    { amount: 3, label: 'Pip’s Spark Batteries', icon: BatteryCharging, desc: 'Energize Pip to think even faster.' },
    { amount: 9, label: 'Felt Pen Ink Refill', icon: PenTool, desc: 'Keep our virtual stamps clean & crisp.' },
    { amount: 18, label: 'Artisan Tea Blend', icon: Coffee, desc: 'Fuel the developer’s late-night stitching.' }
  ];

  const getActiveAmount = (): number => {
    if (selectedPreset !== null) return selectedPreset;
    const num = parseFloat(customAmount);
    return isNaN(num) ? 0 : num;
  };

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset(null);
    setCustomAmount(e.target.value);
  };

  const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim();

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/donate');
  };

  const resetForm = () => {
    setDonationSuccess(false);
    setSupporterName('');
    setSupporterMsg('');
    setCustomAmount('');
    setSelectedPreset(9);
  };

  const activeAmount = getActiveAmount();

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
            We removed subscriptions so that PageCraft remains fair and accessible. If these digital files save you time, throw a coin in Pip's coin slot.
          </p>
          <p className="mt-3 text-xs font-mono text-[#78767d] bg-[#00000b]/5 inline-block px-3 py-1 rounded-full">
            ⚠ Demo only — no real payments are processed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Main Donation Selection Coin Slot Card (8 cols) */}
          <div className="lg:col-span-7 bg-white p-8 hand-drawn-border flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!donationSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmitDonation}
                  className="space-y-6"
                >
                  <div className="border-b-2 border-[#00000b]/10 pb-4 mb-4">
                    <span className="font-accent text-[#FF6B35] text-xl block mb-1">Supporter Coin Slot</span>
                    <p className="text-xs text-[#78767d] font-mono">CHOOSE YOUR MATERIAL REFILL TIER</p>
                  </div>

                  {/* Preset Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {presets.map((preset) => {
                      const Icon = preset.icon;
                      const isSelected = selectedPreset === preset.amount;
                      return (
                        <button
                          key={preset.amount}
                          type="button"
                          onClick={() => handlePresetSelect(preset.amount)}
                          className={`p-4 bg-white border-2 text-left rounded-sm transition-all focus:outline-none flex flex-col justify-between h-40 ${
                            isSelected
                              ? 'border-[#FF6B35] ring-1 ring-[#FF6B35] shadow-[4px_4px_0px_rgba(255,107,53,0.15)] translate-y-[-2px]'
                              : 'border-[#00000b] hover:bg-[#fbf9f4] shadow-[3px_3px_0px_rgba(0,0,0,0.1)]'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <div className="w-10 h-10 bg-[#fbf9f4] flex items-center justify-center rounded-sm border border-[#00000b]/10">
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-[#FF6B35]' : 'text-[#47464c]'}`} />
                            </div>
                            <span className="text-xl font-bold font-mono text-[#00000b]">${preset.amount}</span>
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm text-[#00000b] mt-2">{preset.label}</h4>
                            <p className="text-[10px] text-[#78767d] leading-tight line-clamp-2 mt-1">{preset.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Donation Amount Area */}
                  <div className="pt-2">
                    <label className="text-xs font-bold font-label-accent mb-2 block uppercase text-[#845400] tracking-wider">
                      Or input customized support currency
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold font-mono text-[#00000b]">$</span>
                      <input 
                        type="number"
                        min="1"
                        max="1000"
                        value={customAmount}
                        onChange={handleCustomChange}
                        placeholder="Custom amount (e.g. 15)"
                        className="w-full border-2 border-[#00000b] pl-8 pr-4 py-4 rounded-xs font-mono text-xl focus:ring-1 focus:ring-[#FF6B35] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Supporter Details Ledger Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold font-label-accent mb-1.5 block uppercase text-[#78767d]">Your Name</label>
                      <input 
                        type="text"
                        value={supporterName}
                        onChange={(e) => setSupporterName(e.target.value)}
                        placeholder="e.g. Nicola Tesla"
                        maxLength={60}
                        className="w-full border border-[#00000b]/30 px-3 py-2.5 rounded-sm font-body text-sm bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold font-label-accent mb-1.5 block uppercase text-[#78767d]">Blessing / Message</label>
                      <input 
                        type="text"
                        value={supporterMsg}
                        onChange={(e) => setSupporterMsg(e.target.value)}
                        placeholder="e.g. Amazing software!"
                        maxLength={120}
                        className="w-full border border-[#00000b]/30 px-3 py-2.5 rounded-sm font-body text-sm bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#00000b] text-[#fbf9f4] font-label-accent text-lg hover:bg-[#FF6B35] active:translate-y-0.5 active:translate-x-0.5 transition-all shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hand-drawn-border flex items-center justify-center gap-3"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    <span>Drop ${activeAmount || 9} In Coin Slot</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center h-full relative"
                >
                  {/* Digital Felt Stamp overlay to capture "Artisanal Certified" feel */}
                  <motion.div 
                    initial={{ scale: 2, opacity: 0, rotate: -40 }}
                    animate={{ scale: 1, opacity: 0.85, rotate: -15 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.3 }}
                    className="absolute top-8 right-8 border-4 border-dashed border-[#FF6B35] px-4 py-2 font-accent text-xl text-[#FF6B35] uppercase tracking-widest bg-white/80 select-none shadow-[2px_2px_0px_rgba(0,0,0,0.1)] rounded-sm"
                  >
                    APPROVED STAMP <br /> ✦ THANKS ✦
                  </motion.div>

                  <div className="w-20 h-20 bg-[#FF6B35]/15 text-[#FF6B35] rounded-full flex items-center justify-center mb-6 border-2 border-[#FF6B35]">
                    <Sparkles className="w-10 h-10 animate-bounce" />
                  </div>

                  <h3 className="font-display text-3xl font-bold mb-3 text-[#00000b]">Coin Accepted Safely!</h3>
                  <p className="text-sm font-accent text-[#845400] max-w-md mx-auto mb-6">
                    "I heard a satisfying *clink* inside my metal tummy! Thank you for supporting small creators. You have been added to the local Artisan Ledger of Honor Scroll!"
                  </p>

                  <div className="w-full p-4 bg-[#fbf9f4] hand-drawn-border max-w-sm mb-8 text-center">
                    <p className="font-mono text-xs text-[#78767d] uppercase mb-1">Official Workshop Receipt</p>
                    <p className="font-display font-bold text-lg text-[#00000b]">
                      {supporterName.trim() || 'Anonymous Patron'}
                    </p>
                    <p className="font-mono text-xl font-bold text-[#FF6B35] mt-1">
                      Donated ${activeAmount}
                    </p>
                  </div>

                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 border-2 border-[#00000b] text-[#00000b] font-label-accent hover:bg-[#00000b] hover:text-white transition-all rounded-sm"
                  >
                    Do another donation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Ledger Scroll / Recent Supporters Board (5 cols) */}
          <div className="lg:col-span-5 bg-[#fbf9f4] hand-drawn-border p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary-container mb-4">
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
                      <span className="font-display text-[#00000b] font-bold text-sm block">
                        {supporter.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#FF6B35] bg-[#FF6B35]/5 px-2 py-0.5 rounded-sm">
                        ${supporter.amount}
                      </span>
                    </div>
                    {supporter.message && (
                      <p className="text-xs text-[#47464c] italic font-body mt-1">
                        "{supporter.message}"
                      </p>
                    )}
                    <span className="text-[10px] text-[#78767d] font-mono block mt-2">
                      {supporter.date}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#00000b]/10 text-center">
              <span className="font-accent italic text-xs text-[#845400]">
                "Every coin keeps Pip’s engines fully greased!"
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
