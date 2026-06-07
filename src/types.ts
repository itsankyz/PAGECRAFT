export type ToolMode = 'merge' | 'split' | 'format' | 'watermark' | 'convert' | 'password';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string; // Base64 data representation
  pagesCount?: number;
}

export interface AIPreset {
  id: string;
  name: string;
  prompt: string;
  icon: string;
  description: string;
}

export interface WatermarkConfig {
  text: string;
  textSize: number;
  opacity: number; // 0 to 1
  color: string; // hex
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export interface FAQItem {
  question: string;
  answer: string;
}
