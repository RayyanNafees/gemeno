import { Context } from 'https://deno.land/x/hono@v4.0.4/mod.ts'
import gemini from './gemini.ts'

export const history: string[] = []

export const generateResponse = async (c: Context) => {
  const { prompt } = await c.req.json<{ prompt: string }>()

  const content = await gemini.generateContent(prompt)
  const text = content.response.text()

  console.log(text)
  history.push(text)
  console.log({ history })

  return c.text(text)
}
