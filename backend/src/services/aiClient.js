import fetch from 'node-fetch';

const HF_API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-small';
const API_KEY = process.env.HF_TOKEN;

export async function generateArticle(prompt) {
  const response = await fetch(HF_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const data = await response.json();
  return data[0].generated_text ?? "Generated article";
}
