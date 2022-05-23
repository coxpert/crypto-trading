import next from 'next'
import express, { Express } from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import router from './routes'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server: Express = express()

  server.use(router)

  server.all('*', (req: IncomingMessage, res: ServerResponse) => {
    return handle(req, res)
  })

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})
