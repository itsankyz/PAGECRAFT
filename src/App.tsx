import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './components/Header';
import ToolkitBento from './components/ToolkitBento';
import ArtisanDesk from './components/ArtisanDesk';
import Donation from './components/Donation';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Contact from './pages/Contact';
import { ToolMode } from './types';
import { Layers, Feather } from 'lucide-react';

function Home() {
  const [selectedTool, setSelectedTool] = useState<ToolMode>('merge');

  // Scrolling References
  const bentoRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const donationRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTool = (tool: ToolMode) => {
    setSelectedTool(tool);
    scrollToSection(deskRef);
  };

  return (
    <div className="font-body text-[#1b1c19] bg-[#fbf9f4] min-h-screen relative overflow-x-hidden selection:bg-[#FF6B35]/20 selection:text-[#FF6B35]">
      
      {/* Background Texture Overlay to simulate paper grain */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.06]"></div>

      {/* Decorative Border Line */}
      <div className="fixed top-0 bottom-0 left-0 w-1 bg-[#FF6B35] z-50"></div>

      <Header 
        onScrollToDesk={() => scrollToSection(deskRef)}
        onScrollToDonation={() => scrollToSection(donationRef)}
        onScrollToFeatures={() => scrollToSection(bentoRef)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract Background Doodles */}
        <div className="absolute top-[30%] left-[10%] opacity-15 transform -rotate-12 hidden lg:block">
          <Layers className="w-24 h-24 text-primary" />
        </div>
        <div className="absolute bottom-[25%] right-[10%] opacity-15 transform rotate-12 hidden lg:block">
          <Feather className="w-28 h-28 text-primary" />
        </div>

        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-5 py-1.5 border-2 border-[#00000b] rounded-full font-accent text-2xl text-[#FF6B35] mb-8 bg-white shadow-[2px_2px_0px_rgba(26,26,46,0.1)]"
          >
            Format. Convert. Deliver.
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-5xl md:text-7.5xl font-bold text-[#00000b] mb-8 leading-[1.1] tracking-tight"
          >
            Your PDFs, <br /> 
            <span className="relative inline-block mt-2">
              Perfectly Crafted
              <span className="absolute bottom-2 left-0 w-full h-[6px] bg-[#FF6B35]/30 -z-10 rounded-sm"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-on-surface-variant font-body max-w-xl mx-auto text-lg mb-10 leading-relaxed"
          >
            A physical-feel digital workshop for document artisans. Seamlessly stitch, split, secure, stamp, and format any file layout.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          >
            <button 
              onClick={() => scrollToSection(deskRef)}
              className="w-full sm:w-auto px-10 py-4 bg-[#00000b] text-[#fbf9f4] font-label-accent text-lg ink-fill-hover active:translate-y-1 active:translate-x-1 transition-all shadow-[5px_5px_0px_rgba(26,26,46,0.15)] hand-drawn-border"
            >
              Start Crafting
            </button>
            <button 
              onClick={() => scrollToSection(bentoRef)}
              className="w-full sm:w-auto px-10 py-4 border-2 border-[#00000b] text-[#00000b] font-label-accent text-lg hover:bg-[#00000b] hover:text-white transition-all"
            >
              Explore Tools
            </button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Bento Features Section */}
      <div ref={bentoRef}>
        <ToolkitBento onSelectTool={handleSelectTool} />
      </div>

      {/* The Core Artisan Desk Workspace */}
      <div ref={deskRef}>
        <ArtisanDesk selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </div>

      {/* Supporter Donation Box */}
      <div ref={donationRef}>
        <Donation />
      </div>

      {/* Common Enquiries FAQ Accordion */}
      <FAQ />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
