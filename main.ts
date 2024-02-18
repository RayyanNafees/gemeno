import { Hono, Context, HTTPException } from 'hono'
import {logger} from 'hono/middleware'
import { generateResponse, history } from './prompt.ts'

const app = new Hono()

app.use(logger())

app.get('/', (c: Context) => {
  return c.text('Hello Hono!')
})

app.post('/generate', generateResponse)
app.post('/history', (c: Context) => c.json(history))

app.onError((err: HTTPException, c: Context) => {
  console.error(err)
  c.text('Internal Server Error', 500)
})

Deno.serve(app.fetch)
