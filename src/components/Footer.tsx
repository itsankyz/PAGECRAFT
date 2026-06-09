import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f0eee9] dark:bg-[#eae8e3] w-full py-12 border-t-2 border-[#00000b]/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm overflow-hidden border border-[#00000b]/20">
              <img src="/logo.jpeg" alt="PageCraft logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-label-accent text-lg font-bold text-[#00000b]">
              PageCraft
            </span>
          </div>
          <p className="font-mono text-xs text-[#78767d]">
            © {new Date().getFullYear()} PageCraft. Handcrafted for the digital era.
          </p>
          <a href="https://www.producthunt.com/products/pagecraft?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-pagecraft" target="_blank" rel="noopener noreferrer">
            <img alt="PageCraft - format- convert- deliver | Product Hunt" width="200" height="43" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1166193&theme=light&t=1780994459989" />
          </a>
        </div>

        <div className="flex gap-8">
          <Link className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" to="/terms">Terms</Link>
          <Link className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" to="/privacy">Privacy</Link>
          <Link className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" to="/support">Support</Link>
          <Link className="font-mono text-xs text-[#78767d] hover:text-[#FF6B35] transition-colors" to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
