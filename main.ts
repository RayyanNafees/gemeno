import { Hono, Context } from 'hono'
import { logger } from 'hono/middleware.ts'
import { HTTPException } from 'hono/http-exception.ts'
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
