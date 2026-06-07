import React from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onScrollToDesk: () => void;
  onScrollToDonation: () => void;
  onScrollToFeatures: () => void;
}

export default function Header({ onScrollToDesk, onScrollToDonation, onScrollToFeatures }: HeaderProps) {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-[#fbf9f4]/90 backdrop-blur-sm border-b-2 border-[#00000b] h-20 px-4 md:px-16"
      id="pagecraft-navbar"
    >
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onScrollToDesk}>
          <div className="w-10 h-10 rounded-sm overflow-hidden shadow-[3px_3px_0px_rgba(26,26,46,0.15)] border-2 border-[#00000b]">
            <img src="/logo.jpeg" alt="PageCraft logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-2xl font-bold italic text-[#00000b]">
            PageCraft
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={onScrollToFeatures}
            className="font-label-accent text-[#47464c] hover:text-[#845400] transition-colors font-semibold"
          >
            Features
          </button>
          <button 
            onClick={onScrollToDonation}
            className="font-label-accent text-[#47464c] hover:text-[#845400] transition-colors font-semibold"
          >
            Support Workshop
          </button>
          <button 
            onClick={onScrollToDesk}
            className="bg-[#00000b] text-[#fbf9f4] px-6 py-2.5 font-label-accent hover:bg-[#FF6B35] active:translate-y-0.5 active:translate-x-0.5 transition-all shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hand-drawn-border"
          >
            Start Crafting
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-[#00000b]" onClick={onScrollToDesk}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
