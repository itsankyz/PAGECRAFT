import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolMode } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface PipAssistantProps {
  currentTool: ToolMode;
  filesCount: number;
  isProcessing: boolean;
  hasResult: boolean;
  isDragging?: boolean;
}

export default function PipAssistant({ currentTool, filesCount, isProcessing, hasResult, isDragging = false }: PipAssistantProps) {
  const [speech, setSpeech] = useState<string>('Welcome to the workshop! Draw or upload some paper to begin.');
  const [wink, setWink] = useState(false);

  // Trigger occasional winks for hand-drawn character behavior during idle
  useEffect(() => {
    if (isProcessing || isDragging) return;
    const interval = setInterval(() => {
      setWink(true);
      setTimeout(() => setWink(false), 300);
    }, 7000);
    return () => clearInterval(interval);
  }, [isProcessing, isDragging]);

  // Update speech dynamically based on state
  useEffect(() => {
    if (isDragging) {
      setSpeech('Ready to catch! Drop your digital papers right here into my crafting tray! ✦');
      return;
    }

    if (isProcessing) {
      setSpeech('Gasp! Running as fast as my gears can turn to deliver your document into the Formatting Engine!');
      return;
    }

    if (hasResult) {
      setSpeech('Hooray! The paper was successfully fed through the gears! Clean & formatted. Click download below.');
      return;
    }

    if (filesCount === 0) {
      switch (currentTool) {
        case 'merge':
          setSpeech('Ready to bind! Upload two or more PDFs and I will sew them together into a beautiful book.');
          break;
        case 'split':
          setSpeech('Artisan scissor ready! Add a document and tell me what pages to slice out.');
          break;
        case 'format':
          setSpeech('AI Smart Formatting is coming soon! We are wiring up Gemini magic — check back shortly. ✦');
          break;
        case 'watermark':
          setSpeech('Felt stamp ready to press! Upload a PDF to stamp your customized watermark signatures.');
          break;
        case 'convert':
          setSpeech('Let us compile a gallery! Feed me images and I will bind them into a single crisp PDF.');
          break;
        case 'password':
          setSpeech('Secure vault locks! Place a PDF in the slot and we will seal it with cryptographic wax.');
          break;
      }
    } else {
      setSpeech(`I see your ${filesCount} material${filesCount > 1 ? 's' : ''}! Let's feed them to the engine steam-press!`);
    }
  }, [currentTool, filesCount, isProcessing, hasResult, isDragging]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#fbf9f4] hand-drawn-border relative max-w-sm mx-auto shadow-[4px_4px_0px_rgba(26,26,46,0.1)] tilt--1 my-6" id="pip-assistant">
      
      {/* Dynamic Animated Dialogue Speech Bubble */}
      <div className="w-full bg-white p-3.5 border-2 border-[#00000b] rounded-xl relative shadow-[3px_3px_0px_rgba(0,0,0,0.1)] mb-6 text-center">
        <p className="font-accent tracking-wide text-base text-[#00000b] leading-tight mt-1">
          "{speech}"
        </p>
        
        {/* Speech Bubble Arrow Down */}
        <div className="absolute bottom-[-10px] left-[50%] translate-x-[-50%] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#00000b]"></div>
        <div className="absolute bottom-[-8px] left-[50%] translate-x-[-50%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
      </div>

      {/* Handmade / Hand-drawn Animated SVG Vector Character 'Pip' */}
      <div className="relative w-44 h-40 flex items-center justify-center">
        
        <svg viewBox="0 0 180 160" className="w-full h-full drop-shadow-[4px_4px_0px_rgba(26,26,46,0.08)]">
          {/* Speed Wind Lines / Dirt Puff behind Pip when running */}
          {isProcessing && (
            <g stroke="#00000b" strokeWidth="2" fill="none" strokeLinecap="round">
              <motion.path 
                d="M 15 115 Q 11 111, 6 115" 
                animate={{ opacity: [1, 0, 1], x: [10, -15, 10] }}
                transition={{ duration: 0.25, repeat: Infinity }}
              />
              <motion.path 
                d="M 18 100 Q 10 97, 13 103" 
                animate={{ opacity: [1, 0, 1], x: [15, -20, 15] }}
                transition={{ duration: 0.3, repeat: Infinity, delay: 0.05 }}
              />
              <motion.line 
                x1="5" y1="65" x2="20" y2="65" 
                strokeDasharray="4 4"
                animate={{ x: [5, -25, 5] }}
                transition={{ duration: 0.2, repeat: Infinity }}
              />
              <motion.line 
                x1="8" y1="45" x2="24" y2="45" 
                strokeDasharray="3 3"
                animate={{ x: [8, -20, 8] }}
                transition={{ duration: 0.25, repeat: Infinity, delay: 0.1 }}
              />
            </g>
          )}

          {/* Engine Intake Slot on the extreme Right side */}
          <g>
            {/* The Metallic Gear Press Container background */}
            <path d="M 155 35 L 178 35 L 178 125 L 155 125 Z" fill="#ebdfd0" stroke="#00000b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="155" y1="35" x2="155" y2="125" stroke="#00000b" strokeWidth="3" />
            
            {/* Flashing glow inside engine slot */}
            <motion.rect 
              x="158" y="42" width="6" height="76" rx="2"
              fill="#FF6B35"
              animate={isProcessing ? { opacity: [0.2, 1, 0.2], fill: ['#FF6B35', '#FFA07A', '#FF6B35'] } : { opacity: 0.4 }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />

            {/* Little moving cog on top of engine */}
            <motion.g
              transform="translate(166, 22)"
              animate={{ rotate: 360 }}
              transition={{ duration: isProcessing ? 1.5 : 5, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="0" cy="0" r="7" stroke="#00000b" strokeWidth="2.5" fill="#fcfbf7" />
              <line x1="0" y1="-9" x2="0" y2="9" stroke="#00000b" strokeWidth="2.5" />
              <line x1="-9" y1="0" x2="9" y2="0" stroke="#00000b" strokeWidth="2.5" />
            </motion.g>
          </g>

          {/* Dynamic Interactive Translation Group for Pip */}
          <motion.g
            animate={isProcessing ? {
              // Runs forward, holds at the slot to process, then runs back
              x: [-12, 22, 22, -12],
              rotate: [8, 6, 0, 8],
              y: [2, 0, 2, 2]
            } : isDragging ? {
              y: [-6, 0, -6],
              scale: [1, 1.05, 1],
              x: 0,
              rotate: 0
            } : {
              y: [0, -4, 0],
              x: 0,
              rotate: 1
            }}
            transition={isProcessing ? {
              duration: 2.5,
              repeat: Infinity,
              times: [0, 0.35, 0.75, 1],
              ease: "easeInOut"
            } : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* SVG Group holding Pip's core sketch pieces */}
            <g stroke="#00000b" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              
              {/* Hanging thread representation (becomes lax when running) */}
              <line 
                x1="80" y1="0" x2="80" y2="25" 
                strokeDasharray="4 4" 
                className="opacity-30" 
                stroke={isProcessing ? "transparent" : "#00000b"} 
              />

              {/* Legs Section (Dynamic running cycle overlay) */}
              {isProcessing ? (
                <>
                  {/* Swiftly animating running left leg */}
                  <motion.path 
                    d="M 62 100 Q 42 112, 58 116" 
                    animate={{ d: ["M 62 100 Q 42 112, 58 116", "M 62 100 Q 72 118, 50 114", "M 62 100 Q 42 112, 58 116"] }}
                    transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
                    strokeWidth="3.5"
                  />
                  {/* Swiftly animating running right leg */}
                  <motion.path 
                    d="M 98 100 Q 112 112, 92 116" 
                    animate={{ d: ["M 98 100 Q 112 112, 92 116", "M 98 100 Q 82 118, 108 114", "M 98 100 Q 112 112, 92 116"] }}
                    transition={{ duration: 0.2, repeat: Infinity, ease: 'linear', delay: 0.1 }}
                    strokeWidth="3.5"
                  />
                </>
              ) : (
                <>
                  {/* Stable legs */}
                  <path d="M 55 100 Q 55 112, 60 114" />
                  <path d="M 105 100 Q 105 112, 100 114" />
                  <path d="M 68 100 L 68 106" />
                  <path d="M 92 100 L 92 106" />
                </>
              )}

              {/* Little Jetpack Engine on Back */}
              <rect x="42" y="70" width="12" height="30" rx="4" fill="#eeeeee" />
              <rect x="106" y="70" width="12" height="30" rx="4" fill="#eeeeee" />
              
              {/* Flame booster effect when processing/running */}
              {isProcessing && (
                <motion.path 
                  d="M 48 100 Q 40 122, 48 116 Q 56 122, 48 100 M 112 100 Q 104 122, 112 116 Q 120 122, 112 100"
                  fill="#FF6B35"
                  stroke="#00000b"
                  strokeWidth="2"
                  animate={{ scaleY: [1, 1.5, 0.8, 1.3, 1] }}
                  transition={{ duration: 0.25, repeat: Infinity }}
                />
              )}

              {/* Main Boiler Tank Body */}
              <rect x="35" y="45" width="90" height="55" rx="20" fill="#fcfbf7" strokeWidth="4" />

              {/* Inner Heart/Battery Glass Window */}
              <rect x="50" y="60" width="60" height="30" rx="6" fill="#fdfcf9" />

              {/* Glowing atomic core */}
              <motion.circle 
                cx="80" 
                cy="75" 
                r={isProcessing ? "12" : "8"} 
                fill={isProcessing ? "#FF6B35" : hasResult ? "#FF6B35" : "#e0ded9"}
                animate={isProcessing ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />

              {/* Head-to-neck connection screw */}
              <rect x="72" y="38" width="16" height="8" rx="2" fill="#d0cec9" />

              {/* Cute TV Screen Head */}
              <rect x="48" y="14" width="64" height="26" rx="10" fill="#f0eee9" strokeWidth="3.8" />
              <rect x="54" y="18" width="52" height="18" rx="6" fill="#1b1c19" />

              {/* Eye Layout and facial expressions */}
              {isProcessing ? (
                <>
                  {/* Determined running/speed eyes: > < style */}
                  <path d="M 64 22 L 72 26 L 64 30" stroke="#FF6B35" strokeWidth="3.2" fill="none" />
                  <path d="M 96 22 L 88 26 L 96 30" stroke="#FF6B35" strokeWidth="3.2" fill="none" />
                </>
              ) : isDragging ? (
                <>
                  {/* Excited vertical wide-eyed sparkles looking up */}
                  <motion.ellipse 
                    cx="68" cy="24" rx="5.5" ry="6.5" 
                    fill="#FF6B35"
                    animate={{ scale: [1, 1.15, 1] }} 
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <motion.ellipse 
                    cx="92" cy="24" rx="5.5" ry="6.5" 
                    fill="#FF6B35"
                    animate={{ scale: [1, 1.15, 1] }} 
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                  />
                </>
              ) : !wink ? (
                <>
                  <ellipse cx="68" cy="27" rx="4.5" ry="4.5" fill="#FF6B35" />
                  <ellipse cx="92" cy="27" rx="4.5" ry="4.5" fill="#FF6B35" />
                </>
              ) : (
                <>
                  {/* Winking eye */}
                  <path d="M 64 27 Q 68 22, 72 27" stroke="#FF6B35" strokeWidth="3" />
                  <circle cx="92" cy="27" r="4.5" fill="#FF6B35" />
                </>
              )}

              {/* Antenna spark */}
              <line x1="80" y1="14" x2="80" y2="5" strokeWidth="3" />
              <motion.circle 
                cx="80" 
                cy="4" 
                r="4.5" 
                fill="#FF6B35"
                animate={{ opacity: [1, 0.3, 1] }} 
                transition={{ duration: 1, repeat: Infinity }}
              />

              {/* Arms (Carries paper and runs when isProcessing) */}
              {isProcessing ? (
                <>
                  {/* Rigid left running arm extended holding the file */}
                  <motion.path 
                    d="M 35 75 Q 75 70, 105 73" 
                    stroke="#00000b"
                    strokeWidth="3.5"
                    fill="none"
                    animate={{ y: [0, -1.5, 1.5, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  />
                  {/* Rigid right running arm extended holding the file */}
                  <motion.path 
                    d="M 125 75 Q 110 70, 105 73" 
                    stroke="#00000b"
                    strokeWidth="3.5"
                    fill="none"
                    animate={{ y: [0, 1.5, -1.5, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                  />

                  {/* CARRIED DOCUMENT: Pip runs with document sheet to the engine! */}
                  <motion.g
                    transform="translate(100, 52)"
                    animate={{ rotate: [-5, 6, -5], y: [-1, 2, -1] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  >
                    {/* Visual paper craft piece */}
                    <rect x="0" y="0" width="22" height="28" rx="2" fill="white" stroke="#00000b" strokeWidth="2.8" />
                    {/* Simulated hand drawn writing lines on paper */}
                    <line x1="4" y1="6" x2="18" y2="6" stroke="#00000b" strokeWidth="1.8" />
                    <line x1="4" y1="12" x2="14" y2="12" stroke="#00000b" strokeWidth="1.8" />
                    <line x1="4" y1="18" x2="16" y2="18" stroke="#00000b" strokeWidth="1.8" />
                    
                    {/* Glowing golden star spark on paper */}
                    <path d="M 16 -3 L 18 -6 L 20 -3 L 18 0 Z" fill="#FF6B35" stroke="none" />
                  </motion.g>
                </>
              ) : isDragging ? (
                <>
                  {/* Excited outstretched helper hands looking up to catch the files */}
                  <motion.path 
                    d="M 35 72 Q 22 50, 24 30" 
                    stroke="#00000b"
                    strokeWidth="3.5"
                    fill="none"
                    animate={{ rotate: [-6, 6, -6] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M 125 72 Q 138 50, 136 30" 
                    stroke="#00000b"
                    strokeWidth="3.5"
                    fill="none"
                    animate={{ rotate: [6, -6, 6] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </>
              ) : (
                <>
                  {/* Idle/Healthy Standard Arms */}
                  <motion.path 
                    d="M 35 80 C 15 70, 20 90, 25 95" 
                    stroke="#00000b"
                    strokeWidth="3.5"
                    fill="white"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.path 
                    d={hasResult ? "M 125 80 C 145 50, 150 70, 135 90" : "M 125 80 C 145 92, 140 100, 132 102"} 
                    stroke="#00000b"
                    strokeWidth="3.5"
                    fill="white"
                    animate={hasResult ? { y: [0, -8, 0] } : { y: [0, 2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                </>
              )}
            </g>

            {/* Sparkle floats above head when formatting complete */}
            {hasResult && (
              <g fill="#FF6B35" className="animate-pulse">
                <path d="M 35 15 L 38 10 L 41 15 L 38 20 Z" />
                <path d="M 125 15 L 128 10 L 131 15 L 128 20 Z" />
                <path d="M 80 148 L 81 144 L 82 148 L 81 152 Z" />
              </g>
            )}
          </motion.g>
        </svg>

        {/* Floating star on successful outcomes */}
        {hasResult && (
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute top-10 right-4 bg-white p-1 rounded-full border border-[#00000b] shadow-sm text-[#FF6B35]"
          >
            <Sparkles className="w-5 h-5 fill-current" />
          </motion.div>
        )}
      </div>
      
      {/* Small handwritten credit block footer */}
      <div className="mt-2 w-full text-center border-t border-[#00000b]/10 pt-2.5">
        <span className="font-mono text-[9px] text-[#78767d] tracking-widest uppercase block">
          Pip the Workshop Assistant
        </span>
      </div>
    </div>
  );
}
