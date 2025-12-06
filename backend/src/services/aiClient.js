import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const HF_API_URL = `https://router.huggingface.co/models/Felladrin/gguf-flan-t5-small`;
const API_KEY = process.env.HF_TOKEN;

export async function generateArticle(prompt) {
  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();

    // HuggingFace may return an error
    if (data.error) {
      console.error('HuggingFace API Error:', data.error);
      return "Generated article (default)"; // fallback text
    }

    // Some models return text in array of objects
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    }

    // If the response is a string directly
    if (typeof data === 'string') return data;

    // fallback
    console.warn('Unexpected HF response:', data);
    return "Generated article (default)";
    
  } catch (err) {
    console.error('Failed to generate article:', err);
    return "Generated article (default)";
  }
}
