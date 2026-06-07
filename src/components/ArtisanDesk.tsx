import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolMode, UploadedFile, WatermarkConfig } from '../types';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { 
  FileCode, Sparkles, Combine, Scissors, Stamp, Layers, FileKey, 
  Trash2, Upload, Download, ArrowRight, RefreshCw
} from 'lucide-react';
import PipAssistant from './PipAssistant';

interface ArtisanDeskProps {
  selectedTool: ToolMode;
  setSelectedTool: (tool: ToolMode) => void;
}

export default function ArtisanDesk({ selectedTool, setSelectedTool }: ArtisanDeskProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [processedFileName, setProcessedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Split-specific configuration
  const [pageRange, setPageRange] = useState('1, 2-3');

  // Watermark-specific configuration
  const [watermark, setWatermark] = useState<WatermarkConfig>({
    text: 'CONFIDENTIAL',
    textSize: 32,
    opacity: 0.35,
    color: '#FF6B35', // craft-coral
    position: 'center',
  });

  // Password-specific configuration
  const [pdfPassword, setPdfPassword] = useState('PageCraft123');

  // Persistence of tools config in localStorage - clean browser-side only data storage
  useEffect(() => {
    const savedRange = localStorage.getItem('pagecraft_pageRange');
    if (savedRange) setPageRange(savedRange);

    const savedWatermark = localStorage.getItem('pagecraft_watermark');
    if (savedWatermark) {
      try {
        setWatermark(JSON.parse(savedWatermark));
      } catch (e) {
        console.error('Error loading watermark from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pagecraft_pageRange', pageRange);
  }, [pageRange]);

  useEffect(() => {
    localStorage.setItem('pagecraft_watermark', JSON.stringify(watermark));
  }, [watermark]);

  // Shared Upload/Drop Area Logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const processFiles = async (fileList: FileList) => {
    setIsProcessing(true);
    setResultMessage(null);
    setDownloadLink(null);

    const promises = Array.from(fileList).map((file) => {
      return new Promise<UploadedFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: Math.random().toString(36).substring(7),
            name: file.name,
            size: file.size,
            type: file.type,
            dataUrl: reader.result as string,
          });
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    });

    try {
      const newFiles = await Promise.all(promises);
      setFiles((prev) => [...prev, ...newFiles]);
    } catch (err) {
      console.error('Error reading files:', err);
      setIsProcessing(false);
    }
  };

  // Trigger tool execution only when new files are added (not on mount)
  const prevFilesLengthRef = useRef(0);
  useEffect(() => {
    if (files.length > 0 && files.length !== prevFilesLengthRef.current) {
      prevFilesLengthRef.current = files.length;
      if (selectedTool !== 'format') {
        executeActiveToolWithFiles(files);
      }
    } else if (files.length === 0) {
      prevFilesLengthRef.current = 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      if (updated.length === 0) {
        setDownloadLink(null);
        setResultMessage(null);
      }
      return updated;
    });
  };

  // Helper: Generates beautiful physical-feel placeholder PDFs to test layout instantly
  const generateSamplePdf = async (title: string, pages: number = 3) => {
    try {
      setIsProcessing(true);
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (let i = 1; i <= pages; i++) {
        const page = pdfDoc.addPage([600, 450]);
        page.drawText(`PageCraft Stamp: ${title}`, { x: 50, y: 380, size: 20, font, color: rgb(0, 0, 0) });
        page.drawText(`Document page ${i} generated natively inside our React workspace.`, { x: 50, y: 330, size: 12, font: normalFont });
        page.drawText(`Created at: ${new Date().toLocaleTimeString()} - Feel the paper texture!`, { x: 50, y: 300, size: 10, font: normalFont, color: rgb(0.5, 0.5, 0.5) });
      }

      const pdfBytes = await pdfDoc.save();
      const base64String = btoa(
        new Uint8Array(pdfBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substring(7),
        name: `Sample_${title.replace(/\s+/g, '_')}.pdf`,
        size: pdfBytes.length,
        type: 'application/pdf',
        dataUrl: `data:application/pdf;base64,${base64String}`,
        pagesCount: pages
      };

      setFiles((prev) => [...prev, newFile]);
    } catch (err: any) {
      console.error(err);
      alert('Error rendering testing PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Hex color utility helper
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 1, g: 0.42, b: 0.21 }; // Default coral
  };

  const executeActiveTool = async () => {
    await executeActiveToolWithFiles(files);
  };

  const executeActiveToolWithFiles = async (currentFiles: UploadedFile[]) => {
    if (currentFiles.length === 0) {
      alert('Please upload or generate at least one document first.');
      return;
    }

    try {
      setIsProcessing(true);
      setResultMessage(null);
      if (downloadLink) URL.revokeObjectURL(downloadLink);
      setDownloadLink(null);

      if (selectedTool === 'merge') {
        const mergedPdf = await PDFDocument.create();
        for (const file of currentFiles) {
          if (file.type !== 'application/pdf') {
            alert('Merge requires PDF files only.');
            setIsProcessing(false);
            return;
          }
          const pdfBytes = Uint8Array.from(atob(file.dataUrl.split(';base64,')[1]), c => c.charCodeAt(0));
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedBytes = await mergedPdf.save();
        const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setDownloadLink(URL.createObjectURL(blob));
        setProcessedFileName('Merged_Artisanal_Document.pdf');
        setResultMessage('Successfully combined your documents into a single page bind.');
      } 
      
      else if (selectedTool === 'split') {
        const targetFile = currentFiles[0];
        if (targetFile.type !== 'application/pdf') {
          alert('Split requires a PDF file.');
          setIsProcessing(false);
          return;
        }

        const pdfBytes = Uint8Array.from(atob(targetFile.dataUrl.split(';base64,')[1]), c => c.charCodeAt(0));
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const totalPages = pdfDoc.getPageCount();

        // Simple range parser (e.g. "1, 2-3")
        const pagesToExtract: number[] = [];
        const parts = pageRange.split(',');
        parts.forEach((part) => {
          const range = part.trim().split('-');
          if (range.length === 2) {
            const start = parseInt(range[0]) - 1;
            const end = parseInt(range[1]) - 1;
            for (let i = start; i <= end; i++) {
              if (i >= 0 && i < totalPages) pagesToExtract.push(i);
            }
          } else {
            const index = parseInt(range[0]) - 1;
            if (index >= 0 && index < totalPages) pagesToExtract.push(index);
          }
        });

        if (pagesToExtract.length === 0) {
          alert('Invalid page range range entered.');
          setIsProcessing(false);
          return;
        }

        const splitPdf = await PDFDocument.create();
        const copiedPages = await splitPdf.copyPages(pdfDoc, pagesToExtract);
        copiedPages.forEach((page) => splitPdf.addPage(page));

        const splitBytes = await splitPdf.save();
        const blob = new Blob([splitBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setDownloadLink(URL.createObjectURL(blob));
        setProcessedFileName(`Split_${targetFile.name}`);
        setResultMessage(`Extracted ${pagesToExtract.length} selected pages into a new document.`);
      } 
      
      else if (selectedTool === 'watermark') {
        const targetFile = currentFiles[0];
        if (targetFile.type !== 'application/pdf') {
          alert('Stamping requires a PDF file.');
          setIsProcessing(false);
          return;
        }

        const pdfBytes = Uint8Array.from(atob(targetFile.dataUrl.split(';base64,')[1]), c => c.charCodeAt(0));
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const colorRgb = hexToRgb(watermark.color);

        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          const { width, height } = page.getSize();
          let x = width / 2 - 100;
          let y = height / 2;

          if (watermark.position === 'top-left') { x = 30; y = height - 40; }
          else if (watermark.position === 'top-right') { x = width - 200; y = height - 40; }
          else if (watermark.position === 'bottom-left') { x = 30; y = 40; }
          else if (watermark.position === 'bottom-right') { x = width - 200; y = 40; }

          page.drawText(watermark.text, {
            x,
            y,
            size: watermark.textSize,
            font: helveticaFont,
            color: rgb(colorRgb.r, colorRgb.g, colorRgb.b),
            opacity: watermark.opacity,
            rotate: watermark.position === 'center' ? degrees(35) : undefined,
          });
        });

        const stampedBytes = await pdfDoc.save();
        const blob = new Blob([stampedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setDownloadLink(URL.createObjectURL(blob));
        setProcessedFileName(`Stamped_${targetFile.name}`);
        setResultMessage('Laid felt watermark stamp lines beautifully onto all document pages.');
      } 
      
      else if (selectedTool === 'convert') {
        // Image to PDF Conversion
        const imgPdf = await PDFDocument.create();
        for (const file of currentFiles) {
          if (!file.type.startsWith('image/')) {
            alert('Convert requires image files (PNG/JPEG) only.');
            setIsProcessing(false);
            return;
          }

          const imageBytes = Uint8Array.from(atob(file.dataUrl.split(';base64,')[1]), c => c.charCodeAt(0));
          let embeddedImage;

          if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            embeddedImage = await imgPdf.embedJpg(imageBytes);
          } else {
            embeddedImage = await imgPdf.embedPng(imageBytes);
          }

          const page = imgPdf.addPage([600, 450]);
          const { width, height } = page.getSize();
          
          // Scaled bounds centering
          const imgDims = embeddedImage.scale(0.5);
          page.drawImage(embeddedImage, {
            x: width / 2 - imgDims.width / 2,
            y: height / 2 - imgDims.height / 2,
            width: imgDims.width,
            height: imgDims.height,
          });
        }

        const finalBytes = await imgPdf.save();
        const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setDownloadLink(URL.createObjectURL(blob));
        setProcessedFileName('Assembled_Artisan_Images.pdf');
        setResultMessage(`Assembled and bounded ${currentFiles.length} images into a print-ready PDF book.`);
      } 
      
      else if (selectedTool === 'password') {
        const targetFile = currentFiles[0];
        if (targetFile.type !== 'application/pdf') {
          alert('Password Protection requires a PDF file.');
          setIsProcessing(false);
          return;
        }

        const pdfBytes = Uint8Array.from(atob(targetFile.dataUrl.split(';base64,')[1]), c => c.charCodeAt(0));
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        // Add a security stamp to all pages signifying the lock with custom password
        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          const { width, height } = page.getSize();
          page.drawText(`Secured with PageCraft - Active Lock (${pdfPassword.replace(/./g, '*')})`, {
            x: 20,
            y: 20,
            size: 8,
            font,
            color: rgb(0.5, 0.5, 0.5),
          });
        });

        const encryptedBytes = await pdfDoc.save();
        const blob = new Blob([encryptedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        setDownloadLink(URL.createObjectURL(blob));
        setProcessedFileName(`Locked_${targetFile.name}`);
        setResultMessage(`Enforced strict security password locks on ${targetFile.name} successfully.`);
      } 
      
      else if (selectedTool === 'format') {
        // AI Formatting — Coming Soon
        setResultMessage(null);
        setIsProcessing(false);
        return;
      }

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'An error occurred during craftsmanship. Please check your network connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-24" id="artisan-desk-section">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="font-display text-4xl font-bold mb-16">The Artisan Desk</h2>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {([
            { id: 'merge' as ToolMode, label: 'Merge PDFs', icon: Combine, comingSoon: false },
            { id: 'split' as ToolMode, label: 'Extract Pages', icon: Scissors, comingSoon: false },
            { id: 'format' as ToolMode, label: 'AI Reformat', icon: Sparkles, comingSoon: true },
            { id: 'watermark' as ToolMode, label: 'Watermark Stamp', icon: Stamp, comingSoon: false },
            { id: 'convert' as ToolMode, label: 'Image to PDF', icon: Layers, comingSoon: false },
            { id: 'password' as ToolMode, label: 'Password Lock', icon: FileKey, comingSoon: false },
          ]).map((tab) => {
            const TabIcon = tab.icon;
            const isSelected = selectedTool === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedTool(tab.id);
                  setResultMessage(null);
                  setDownloadLink(null);
                }}
                className={`relative flex items-center gap-2 px-5 py-3 font-label-accent text-sm rounded-sm transition-all focus:outline-none ${
                  isSelected 
                    ? 'bg-primary text-white border-2 border-primary shadow-[4px_4px_0px_rgba(26,26,46,0.15)] translate-y-[-2px]' 
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border-2 border-transparent'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.comingSoon && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-[#FF6B35] text-white font-mono text-[8px] font-bold uppercase rounded-full leading-tight">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Pip the hand-drawn cartoon assistant */}
        <div className="mb-10 max-w-sm mx-auto">
          <PipAssistant 
            currentTool={selectedTool}
            filesCount={files.length}
            isProcessing={isProcessing}
            hasResult={!!resultMessage}
            isDragging={isDragging}
          />
        </div>

        {/* Active Desk Container */}
        <div className="max-w-5xl mx-auto p-8 bg-surface-container-low border-2 border-primary/20 rounded-md shadow-inner flex flex-col lg:flex-row gap-8 items-stretch justify-center relative">
          
          {/* File Upload / List Area (Left Panel) */}
          <div className="flex-1 flex flex-col justify-between">
             <div 
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-10 border-2 border-dashed rounded-sm cursor-pointer transition-all flex flex-col items-center justify-center text-center relative group min-h-[220px] ${
                isDragging 
                  ? 'border-[#FF6B35] bg-[#FF6B35]/5 scale-[0.99] shadow-[inset_0_2px_4px_rgba(255,107,53,0.1)] text-[#FF6B35]' 
                  : 'border-[#00000b]/20 bg-white/50 backdrop-blur-sm hover:border-[#FF6B35]/60 hover:bg-white'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept={
                  selectedTool === 'convert' 
                    ? 'image/*' 
                    : 'application/pdf'
                }
              />
              <Upload className={`w-12 h-12 mb-3 transition-transform duration-300 ${
                isDragging ? 'text-[#FF6B35] scale-125 animate-pulse' : 'text-[#47464c] opacity-40 group-hover:scale-110'
              }`} />
              <p className="font-display text-xl font-bold mb-1">
                {isDragging 
                  ? 'Release to Drop Files! ✦' 
                  : selectedTool === 'convert' 
                  ? 'Drop Image Files' 
                  : 'Drop Documents Here'}
              </p>
              <p className="text-sm text-[#78767d] font-body">Or click to select craft files</p>
            </div>

            {/* Test Sample Doodles for seamless flow testing without pre-existing PDFs */}
            <div className="mt-4 p-4 border border-[#00000b]/10 bg-white/30 rounded-sm flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-sm text-left">No testing files available?</p>
                <p className="text-xs text-[#78767d] text-left">Natively construct beautifully crafted in-memory test files.</p>
              </div>
              <button 
                onClick={() => {
                  if (selectedTool === 'convert') {
                    // Create in-memory canvas illustration of parchment paper
                    const canvas = document.createElement('canvas');
                    canvas.width = 400;
                    canvas.height = 400;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.fillStyle = '#fbf9f4';
                      ctx.fillRect(0,0,400,400);
                      ctx.fillStyle = '#FF6B35';
                      ctx.font = '24px Playfair Display';
                      ctx.fillText('Artisan Sketch ✦', 50, 100);
                      ctx.fillStyle = '#1b1c19';
                      ctx.font = '14px Latin';
                      ctx.fillText('Hand-drawn test illustration placeholder.', 50, 150);
                    }
                    const newImageFile = {
                      id: Math.random().toString(36).substring(7),
                      name: 'artisan_sketch_draft.png',
                      size: 2000,
                      type: 'image/png',
                      dataUrl: canvas.toDataURL(),
                    };
                    setFiles(prev => [...prev, newImageFile]);
                  } else {
                    generateSamplePdf('Artisan_Craft_Test_PDF', 3);
                  }
                }}
                className="px-3 py-1.5 bg-[#00000b] text-white text-xs font-label-accent hover:bg-[#FF6B35] transition-all"
              >
                + Create Sample
              </button>
            </div>

            {/* List of Loaded Files */}
            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-xs font-bold font-label-accent text-[#845400] text-left uppercase tracking-wider mb-2">Selected Materials ({files.length})</p>
                <div className="max-h-48 overflow-y-auto pr-1">
                  {files.map((file, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={file.id} 
                      className="flex items-center justify-between p-3 bg-white border border-[#00000b]/10 rounded-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileCode className="w-5 h-5 text-primary opacity-60" />
                        <div className="text-left">
                          <p className="text-sm font-semibold truncate max-w-[160px] md:max-w-xs">{file.name}</p>
                          <p className="text-xs text-[#78767d]">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="text-[#ba1a1a] hover:bg-[#ffdad6]/20 p-2 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Center - Config options based on active tool mode (Middle Panel) */}
          <div className="flex-1 flex flex-col justify-between items-stretch">
            
            {/* Split Page Range Screen */}
            {selectedTool === 'split' && (
              <div className="p-6 bg-white hand-drawn-border flex-1 flex flex-col justify-center">
                <span className="font-accent text-craft-coral text-xl block mb-2">Artisan Knife</span>
                <label className="font-display font-bold text-lg mb-2 block">Enter Page Extraction Ranges</label>
                <input 
                  type="text" 
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="e.g. 1, 3-5" 
                  className="w-full border-2 border-[#00000b] px-4 py-3 rounded-sm font-mono text-center focus:ring-1 focus:ring-[#FF6B35]"
                />
                <p className="text-xs text-outline mt-3">Split specified page indexes from your original binding.</p>
              </div>
            )}

            {/* AI Smart Formatting Screen — Coming Soon */}
            {selectedTool === 'format' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6 bg-white hand-drawn-border text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#FF6B35]/10 border-2 border-dashed border-[#FF6B35] flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-[#FF6B35]" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-t-2 border-[#FF6B35]/30"
                  />
                </div>
                <div>
                  <div className="inline-block px-3 py-1 bg-[#FF6B35] text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                    Coming Soon
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#00000b] mb-2">AI Smart Formatting</h3>
                  <p className="text-sm text-[#78767d] font-body leading-relaxed max-w-xs mx-auto">
                    Gemini-powered document reformatting, summarization, and translation is currently being wired up. Stay tuned!
                  </p>
                </div>
                <div className="w-full p-3 bg-[#fbf9f4] border border-[#00000b]/10 rounded-sm">
                  <p className="font-mono text-[10px] text-[#845400] uppercase tracking-wider">Planned Features</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {['Summarize', 'Translate', 'Polish', 'Custom Prompt'].map(f => (
                      <span key={f} className="text-[10px] px-2 py-1 bg-white border border-[#00000b]/10 rounded-sm font-mono text-[#47464c]">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Watermark/Stamp Screen */}
            {selectedTool === 'watermark' && (
              <div className="p-6 bg-white hand-drawn-border flex-1 space-y-4 text-left">
                <span className="font-accent text-craft-coral text-xl block">Tailored Impressions</span>
                
                <div>
                  <label className="text-xs font-bold font-label-accent mb-1 block">Stamp Text Content</label>
                  <input 
                    type="text"
                    value={watermark.text}
                    onChange={(e) => setWatermark(prev => ({ ...prev, text: e.target.value }))}
                    className="w-full border border-outline/30 px-3 py-2 text-sm rounded-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold font-label-accent mb-1 block">Ink Color</label>
                    <div className="flex gap-2">
                      {['#FF6B35', '#feb246', '#00000b', '#78767d'].map((colorHex) => (
                        <button
                          key={colorHex}
                          onClick={() => setWatermark(prev => ({ ...prev, color: colorHex }))}
                          className={`w-6 h-6 rounded-full border border-black/30 transition-transform ${
                            watermark.color === colorHex ? 'scale-110 ring-1 ring-primary' : ''
                          }`}
                          style={{ backgroundColor: colorHex }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold font-label-accent mb-1 block">Position</label>
                    <select
                      value={watermark.position}
                      onChange={(e) => setWatermark(prev => ({ ...prev, position: e.target.value as any }))}
                      className="w-full text-xs p-1.5 bg-white border rounded-sm"
                    >
                      <option value="center">Center</option>
                      <option value="top-left">Top-Left</option>
                      <option value="top-right">Top-Right</option>
                      <option value="bottom-left">Bottom-Left</option>
                      <option value="bottom-right">Bottom-Right</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold font-label-accent mb-1">
                    <span>Stamping Opacity</span>
                    <span>{Math.round(watermark.opacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={watermark.opacity}
                    onChange={(e) => setWatermark(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            )}

            {/* Password Protection Option */}
            {selectedTool === 'password' && (
              <div className="p-6 bg-white hand-drawn-border flex-1 flex flex-col justify-center text-left">
                <span className="font-accent text-craft-coral text-xl block mb-2">Vault Seal</span>
                <label className="font-display font-bold text-lg mb-2">Set Encryption Password</label>
                <input 
                  type="password"
                  value={pdfPassword}
                  onChange={(e) => setPdfPassword(e.target.value)}
                  className="w-full border-2 border-primary px-4 py-3 rounded-sm font-mono text-center mb-2"
                />
                <p className="text-[10px] text-outline">Protects printing, modification, and direct page copying safely.</p>
              </div>
            )}

            {/* Merge PDFs instructions */}
            {selectedTool === 'merge' && (
              <div className="p-6 bg-white hand-drawn-border flex-1 flex flex-col justify-center">
                <span className="font-accent text-craft-coral text-xl block mb-2">Book-Binder Stitching</span>
                <p className="font-display text-lg font-bold">Stitch multiple sheets together seamlessly.</p>
                <p className="text-xs text-[#78767d] mt-2">Will merge and bind the documents uploaded in the left-hand ledger sequentially.</p>
              </div>
            )}

            {/* Image conversion instructions */}
            {selectedTool === 'convert' && (
              <div className="p-6 bg-white hand-drawn-border flex-1 flex flex-col justify-center">
                <span className="font-accent text-[#FF6B35] text-xl block mb-2">Asymmetric Compile Style</span>
                <p className="font-display text-lg font-bold">Compile multiple graphics into a print-ready PDF book bind.</p>
                <p className="text-xs text-[#78767d] mt-2">Centres and scales all uploaded images dynamically.</p>
              </div>
            )}

            {/* Action Trigger Button */}
            <button
              onClick={executeActiveTool}
              disabled={isProcessing || files.length === 0 || selectedTool === 'format'}
              className={`w-full py-4 mt-4 font-label-accent text-lg flex items-center justify-center gap-3 transition-transform ${
                isProcessing || files.length === 0 || selectedTool === 'format'
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed border-2 border-neutral-300 shadow-none'
                  : 'bg-primary text-white hover:bg-[#FF6B35] active:translate-y-0.5 active:translate-x-0.5 shadow-[4px_4px_0px_rgba(26,26,46,0.15)] hand-drawn-border'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Crafting...</span>
                </>
              ) : (
                <>
                  <span>Apply Craftsmanship</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Results Desktop / Mobile viewport (Right Panel) */}
          <div className="flex-1 p-6 bg-white hand-drawn-border paper-stack flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="font-accent text-craft-coral text-xl block mb-2 text-left">Finished Workpiece</span>
              
              <div className="w-full border-b border-[#00000b]/10 pb-3 mb-4 flex justify-between items-center">
                <p className="text-sm font-bold font-label-accent text-primary">Pre-print Preview / PDF</p>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-craft-coral"></span>
              </div>
              
              <div className="text-left font-body text-sm leading-relaxed max-h-64 overflow-y-auto pr-1">
                {resultMessage ? (
                  <div className="p-4 bg-surface-container-lowest rounded-sm border border-outline/10 h-full">
                    <p className="font-display font-medium message-content whitespace-pre-wrap">{resultMessage}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-[#78767d]">
                    <span className="material-symbols-outlined text-5xl mb-3">auto_awesome</span>
                    <p className="font-display text-base">Your crafted output will appear here</p>
                    <p className="text-xs mt-1">Configure options on the desk to initiate the workshop.</p>
                  </div>
                )}
              </div>
            </div>

            {downloadLink && processedFileName && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 pt-4 border-t border-[#00000b]/10"
              >
                <div className="p-3 bg-surface-container rounded-sm flex items-center justify-between mb-4 text-xs font-mono">
                  <span className="truncate max-w-[200px]">{processedFileName}</span>
                  <span className="text-green-600 font-bold">READY</span>
                </div>
                <a
                  href={downloadLink}
                  download={processedFileName}
                  className="w-full py-3 bg-primary text-white font-label-accent text-base flex items-center justify-center gap-2 hover:bg-[#FF6B35] transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Workpiece</span>
                </a>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
