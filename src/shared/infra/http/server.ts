import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import swaggerJSDoc, { Options } from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { errors } from 'celebrate'

import '@shared/container'
import '@shared/infra/typeorm'
import routes from './routes'
import AppError from '@shared/error/AppError'

const app = express()

const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.use(express.json())
app.use(errors())
app.use(routes)

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VUTTR API',
      version: '1.0.0',
      contact: {
        name: 'Agleylson Melo',
        email: 'agleylsonmelo@outlook.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      servers: [`http://localhost:${PORT}`, process.env.URL_API_BACKEND]
    },
    tags: [
      {
        name: 'users',
        description: 'Operations about user'
      },
      {
        name: 'session',
        description: 'Generate JWT'
      },
      {
        name: 'tools',
        description: "Operations about user's tools"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['src/modules/**/infra/http/routes/*.routes.ts']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

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

app.listen(PORT, () => {
  console.log(`⚡️ server running in port ${PORT}`)
})
