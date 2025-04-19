import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Oi, adoro viajar!" }],
      },
      {
        role: "model",
        parts: [{ text: "Ah, que legal. Para onde deseja viajar?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "Quero ir para o Canadá";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
