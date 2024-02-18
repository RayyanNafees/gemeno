import { Hono } from 'https://deno.land/x/hono@v4.0.4/mod.ts'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "npm:@google/generative-ai";
import { load } from "https://deno.land/std@0.216.0/dotenv/mod.ts";

const env = await load();
const apiKey = env["GEMINI_API_KEY"];

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };
}


const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];


const genAI = new GoogleGenerativeAI(apiKey)
const gemini = genAI.getGenerativeModel({ model: "gemini-pro",generationConfig, safetySettings });;


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

Deno.serve(app.fetch)
