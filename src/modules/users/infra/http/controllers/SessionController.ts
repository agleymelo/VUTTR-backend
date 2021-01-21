import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

export default class SessionController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUserService.execute({ email, password })

    user.password = null as never

    return response.json({ user: classToClass(user), token })
  }
}
