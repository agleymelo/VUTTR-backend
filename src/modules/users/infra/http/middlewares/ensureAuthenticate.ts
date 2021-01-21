import { Response, NextFunction, Request } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'
import AppError from '@shared/error/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticate(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 400)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, String(authConfig.jwt.secret))

    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch (err) {
    throw new AppError('Invalid JWT Token', 401)
  }
}
