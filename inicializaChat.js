import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let chat
function inicializaChat() {
  chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Você é Jordi, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenha relação com viagens." }],
      },
      {
        role: "model",
        parts: [{ text: "Sua primeira mensagem sempre deve ser: Olá! Obrigado por entrar em contato com o Jornada Viagens. Antes de responder suas dúvidas, preciso do seu nome e endereço de e-mail." }],
      },
    ],
  
    generationConfig: {
      maxOutputTokens: 1000,
    },
  
  });
}

export {
  chat,
  inicializaChat
}