import { load } from 'https://deno.land/std@0.216.0/dotenv/mod.ts'
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from 'npm:@google/generative-ai'

const env = await load()
const apiKey = env.GEMINI_API_KEY

// const generationConfig = {
//   stopSequences: ['red'],
//   maxOutputTokens: 200,
//   temperature: 0.9,
//   topP: 0.1,
//   topK: 16,
// }

// const safetySettings = [
//   {
//     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//     threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
// ]

const gemini = new GoogleGenerativeAI(apiKey).getGenerativeModel({
  model: 'gemini-pro',
  // generationConfig,
  // safetySettings,
})

export default gemini
