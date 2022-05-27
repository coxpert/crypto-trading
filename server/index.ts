import express, { Express } from 'express'
import bodyParser from 'body-parser'
import router from './routes'

const server: Express = express()
server.use(bodyParser.json())
server.use(router)

server.listen(3000, () => {
  console.log('> Ready on http://localhost:3000')
})
