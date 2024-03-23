import { Hono, Context } from 'https://deno.land/x/hono@v4.0.4/mod.ts'
import { logger } from 'https://deno.land/x/hono@v4.0.4/middleware.ts'
import { generateResponse, history } from './prompt.ts'

const app = new Hono()

app.use(logger())

app.get('/', (c: Context) => {
  return c.text('Hello Hono!')
})

app.post('/generate', generateResponse)
app.post('/history', (c: Context) => c.json(history))

app.onError((err: unknown, c: Context) => {
  console.error(err)
  return c.text('Internal Server Error', 500)
})

Deno.serve(app.fetch)
