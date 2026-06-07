import React from 'react';
import { Feather } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f0eee9] dark:bg-[#eae8e3] w-full py-12 border-t-2 border-[#00000b]/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00000b] text-[#fbf9f4] flex items-center justify-center rounded-sm">
              <Feather className="w-4 h-4 text-[#FF6B35]" />
            </div>
            <span className="font-label-accent text-lg font-bold text-[#00000b]">
              PageCraft
            </span>
          </div>
          <p className="font-mono text-xs text-[#78767d]">
            © {new Date().getFullYear()} PageCraft. Handcrafted for the digital era.
          </p>
        </div>

        <div className="flex gap-8">
          <a className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" href="#">Terms</a>
          <a className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" href="#">Privacy</a>
          <a className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" href="#">Support</a>
          <a className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
