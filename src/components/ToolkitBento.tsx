import React from 'react';
import { motion } from 'motion/react';
import { ToolMode } from '../types';
import { Sparkles, Combine, Scissors, FileKey, Layers, Stamp } from 'lucide-react';

interface ToolkitBentoProps {
  onSelectTool: (tool: ToolMode) => void;
}

export default function ToolkitBento({ onSelectTool }: ToolkitBentoProps) {
  const tools = [
    {
      id: 'convert',
      title: 'Image to PDF',
      description: 'Transform multiple images into single print-ready PDFs. Compile galleries, receipts, and drawings into structured files.',
      icon: Layers,
      color: 'text-[#FF6B35]',
    },
    {
      id: 'split',
      title: 'Extract Pages',
      description: 'Isolate pages or extract a batch of custom page ranges into brand-new document craft-works instantly.',
      icon: Scissors,
      color: 'text-secondary-container',
    },
    {
      id: 'merge',
      title: 'Merge PDFs',
      description: 'Combine several documents into a coherent single book-bind. Stitch and bundle multiple independent PDF files.',
      icon: Combine,
      color: 'text-primary',
    },
    {
      id: 'watermark',
      title: 'Watermark Stamp',
      description: 'Stamp customized felt text with tailored transparency, font, and positioning to sign your creations.',
      icon: Stamp,
      color: 'text-[#845400]',
    },
    {
      id: 'password',
      title: 'Password Lock',
      description: 'Enforce security seals with full cryptographic password protection, protecting sensitive information.',
      icon: FileKey,
      color: 'text-outline',
    }
  ];

  return (
    <section className="py-24 bg-[#f0eee9]" id="features-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <div className="mb-16">
          <span className="font-accent text-3xl text-[#FF6B35] block mb-2">Our Workshop Tools</span>
          <h2 className="font-display text-4xl font-bold">The Artisan's Toolkit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-6">
          {/* Main Large Card - AI Formatting (SaaS Aesthetic Highlight) */}
          <motion.div 
            whileHover={{ y: -4, rotate: 0 }}
            className="md:col-span-2 md:row-span-2 p-8 bg-white hand-drawn-border tilt-1 cursor-pointer transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            onClick={() => onSelectTool('format')}
          >
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#FF6B35] text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              Coming Soon
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#FF6B35] mb-5">
                <Sparkles className="w-8 h-8 fill-current" />
                <span className="font-label-accent tracking-wider font-bold">AI SMART-CRAFT</span>
              </div>
              <h3 className="font-display text-3xl font-bold mb-4">AI Smart Formatting</h3>
              <p className="text-[#47464c] leading-relaxed mb-6">
                Let our dedicated assistant restructure and reformat your messy files. Perfect for summarization, multilingual translating, financial report audits, and professional polish.
              </p>
            </div>
            
            <div className="bg-[#1a1a2e] text-[#f2f1ec] p-6 rounded-sm border-2 border-[#00000b] shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
              <span className="font-mono text-xs text-[#FF6B35] block mb-2">✦ WORKSHOP NOTE PRESET</span>
              <p className="font-accent text-lg leading-relaxed italic">
                "Simply submit any documentation. Choose your preferred formatting tool, and we will clean up the draft layout perfectly."
              </p>
            </div>
          </motion.div>

          {/* Other Grid Items */}
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            // Introduce beautiful asymmetric rotations
            const rotations = ['tilt--1', 'tilt-2', 'tilt--2', 'tilt-1'];
            const rotClass = rotations[idx % rotations.length];

            return (
              <motion.div
                key={tool.id}
                whileHover={{ y: -4, rotate: 0 }}
                onClick={() => onSelectTool(tool.id as ToolMode)}
                className={`p-6 bg-white hand-drawn-border ${rotClass} cursor-pointer transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="w-10 h-10 bg-[#f5f3ee] flex items-center justify-center rounded-sm mb-4 border border-[#78767d]/20">
                    <Icon className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{tool.title}</h3>
                  <p className="text-[#47464c] text-sm leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#845400] font-label-accent">
                  Launch Tool <span className="text-[10px]">➔</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
