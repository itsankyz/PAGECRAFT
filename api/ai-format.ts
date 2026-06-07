import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  try {
    const { fileData, mimeType, prompt, systemInstruction } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Missing fileData in request body.' });
    }

    const isBase64OrDataUrl =
      typeof fileData === 'string' &&
      (fileData.startsWith('data:') || /^[a-zA-Z0-9+/=]+$/.test(fileData.replace(/\s/g, '')));

    if (!isBase64OrDataUrl && !fileData.includes(';base64,')) {
      return res.status(400).json({ error: 'Invalid input material format.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'AI service is not configured.' });
    }

    const cleanBase64 = fileData.includes(';base64,')
      ? fileData.split(';base64,')[1]
      : fileData;

    const strippedBase64 = cleanBase64.replace(/\s/g, '');
    if (!/^[a-zA-Z0-9+/=]+$/.test(strippedBase64)) {
      return res.status(400).json({ error: 'Corrupted document data.' });
    }

    const client = getGeminiClient();
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { inlineData: { data: strippedBase64, mimeType: mimeType || 'application/pdf' } },
        prompt || 'Summarize this document with key bullet points.',
      ],
      config: {
        systemInstruction:
          systemInstruction ||
          'You are PageCraft, a master document artisan. Reformat the uploaded document with precision, outputting beautifully structured Markdown.',
      },
    });

    return res.status(200).json({ result: response.text || 'Unable to extract content.' });
  } catch (error: any) {
    console.error('Error in /api/ai-format:', error);
    return res.status(500).json({ error: 'AI could not process the document. Please try again.' });
  }
}
