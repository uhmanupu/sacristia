import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, ModelType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;
let currentModel: ModelType = ModelType.FLASH;

export const initChat = (model: ModelType = ModelType.FLASH) => {
  currentModel = model;
  chatSession = ai.chats.create({
    model: model,
    config: {
      systemInstruction: "Você é um assistente de IA útil, criativo e inteligente. Responda sempre em Português do Brasil, a menos que solicitado o contrário. Use formatação Markdown para deixar suas respostas claras e legíveis.",
    },
  });
};

export const sendMessageStream = async function* (text: string): AsyncGenerator<string, void, unknown> {
  if (!chatSession) {
    initChat();
  }

  if (!chatSession) {
      throw new Error("Falha ao inicializar sessão de chat.");
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message: text });

    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Erro na API do Gemini:", error);
    throw error;
  }
};

export const resetChat = () => {
    chatSession = null;
    initChat(currentModel);
};