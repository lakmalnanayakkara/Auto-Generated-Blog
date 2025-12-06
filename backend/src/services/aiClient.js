import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { marked } from "marked";

dotenv.config();

export async function generateArticle(prompt) {
  try {
    const data = {
      messages: [
        {
            role: "user",
            content: prompt,
        },
      ],
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
    }
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
	  );
    const result = await response.json();
	  return marked(result.choices[0].message.content);
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
}
