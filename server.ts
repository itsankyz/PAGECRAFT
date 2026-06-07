import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// Lazy initialize Gemini AI client as suggested by the environment variables guide
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('WARNING: GEMINI_API_KEY is not defined in the environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();

  // Clear Express identify header to prevent server software fingerprinting
  app.disable('x-powered-by');

  // Enforce secure response headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Increase payload size to support PDF/Image base64 upload
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Route - AI Re-formatting (Gemini Integration)
  app.post('/api/ai-format', async (req, res) => {
    try {
      const { fileData, mimeType, prompt, systemInstruction } = req.body;

      if (!fileData) {
        return res.status(400).json({ error: 'Missing fileData in request body.' });
      }

      // Safeguard: Ensure the fileData inputs are valid base64 schema.
      // This prevents bad actors from supplying local file paths (e.g. /etc/passwd or system configurations) for path traversal.
      const isBase64OrDataUrl = typeof fileData === 'string' && 
        (fileData.startsWith('data:') || /^[a-zA-Z0-9+/=]+$/.test(fileData.replace(/\s/g, '')));
      
      if (!isBase64OrDataUrl && !fileData.includes(';base64,')) {
        return res.status(400).json({ error: 'Invalid input material format. Document must be fully processed client-side as base64.' });
      }

      const client = getGeminiClient();
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
          error: 'The AI workshop key is safely sealed in our offline secrets locker. Please check back later.',
        });
      }

      console.log(`Sending AI request with mimeType: ${mimeType || 'unknown'} and prompt: ${prompt}`);

      // Strip base64 prefix if exists
      const cleanBase64 = fileData.includes(';base64,') 
        ? fileData.split(';base64,')[1] 
        : fileData;

      // Double-check the trimmed string is clean base64 format representing document data
      const base64Regex = /^[a-zA-Z0-9+/=]+$/;
      const strippedBase64 = cleanBase64.replace(/\s/g, '');
      if (!base64Regex.test(strippedBase64)) {
        return res.status(400).json({ error: 'Supplied document transmission hash is corrupted or unapproved.' });
      }

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          {
            inlineData: {
              data: strippedBase64,
              mimeType: mimeType || 'application/pdf',
            },
          },
          prompt || 'Summarize this document with key bullet points.',
        ],
        config: {
          systemInstruction: systemInstruction || 'You are PageCraft, a master document artisan and AI re-formatter. Reformat and clean up the uploaded document style with precision, outputting beautifully structured Markdown with generous negative space. Do not mention system internals, server structures, file locations, or developer paths.',
        },
      });

      const resultText = response.text || 'Unable to extract content from this document.';
      res.json({ result: resultText });
    } catch (error: any) {
      // Log the actual trace safely to the secure server logs, keeping it isolated
      console.error('SECURE SERVER LOG | Error in /api/ai-format:', error);
      
      // Send a sanitized, secure error message to the client. Never expose actual system stack traces, database parameters, or local workspace paths.
      res.status(500).json({ 
        error: 'The digital ink could not be pressed. Your source data structure is completely safe, but Gemini could not parse it. Please try formatting again.' 
      });
    }
  });

  // Serve static files / Vite middleware
  if (!isProduction) {
    console.log('Running server in Development mode with Vite middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Running server in Production mode...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`PageCraft backend listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
