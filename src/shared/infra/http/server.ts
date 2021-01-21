import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import { errors } from 'celebrate'

import '@shared/container'
import '@shared/infra/typeorm'
import routes from './routes'
import AppError from '@shared/error/AppError'

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(errors())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`⚡️ server running in port ${PORT}`)
})
