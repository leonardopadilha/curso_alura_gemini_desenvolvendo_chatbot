import "dotenv/config";

import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Functions Calling
const funcoes = {
  taxaJurosParcelamento: ({ value }) => {
    const meses = typeof value == "string" ? parseInt(value) : value

    if(meses <= 6) {
      return 3
    } else if (meses <= 12) {
      return 5
    } else if (meses <= 24) {
      return 7
    }
  }
}

const tools = [{
  functionDeclarations: [
    {
      name: "taxaJurosParcelamento",
      description: "Retorna a taxa de juros para parcelamento baseado na quantidade de meses",
      parameters: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          value: { type: FunctionDeclarationSchemaType.NUMBER }
        },
        required: ["value"]
      }
    }
  ]
}]

const model = genAI.getGenerativeModel(
  { model: "gemini-2.0-flash", tools },
  { apiVersion: "v1beta"
}
);

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
  funcoes,
  inicializaChat
}