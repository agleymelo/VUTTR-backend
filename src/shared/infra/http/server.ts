import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'

import '@shared/infra/typeorm'

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  return response.json({ hello: 'world' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`⚡️ server running in port ${PORT}`)
})
