import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'Is my data secure on PageCraft?',
      answer: '"Your documents are processed securely. We utilize server-side APIs that protect any exposed credentials and encrypt data in transit. We prioritize safety and artisan integrity for all uploaded files."'
    },
    {
      question: 'Is PageCraft truly free of charge?',
      answer: '"Yes! We have removed all subscription paywalls and billing accounts. Every single document tool—including the Gemini smart AI formatting suite—is 100% free. If our workshop saves you time, you can drop a coin in Pip’s slot optionally."'
    },
    {
      question: 'Why did you switch to a voluntary donation model?',
      answer: '"As digital artisans, we believe utilities should be as cozy and delightful as hand-pressed paper. Subscriptions add stress. By shifting to a supportive patron model, we keep Pip fueled by the community while ensuring everyone can craft beautifully."'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#fbf9f4]" id="faq-section">
      <div className="max-w-[768px] mx-auto px-4 md:px-16">
        <h2 className="font-display text-4xl font-bold text-center mb-16">Common Enquiries</h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index}
                className="border-b-2 border-[#00000b]/10 pb-4"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left py-4 group focus:outline-none"
                >
                  <span className="font-display text-xl font-bold text-[#00000b] hover:text-[#FF6B35] transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#00000b] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF6B35]' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 pb-4 text-[#47464c] italic font-body text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
