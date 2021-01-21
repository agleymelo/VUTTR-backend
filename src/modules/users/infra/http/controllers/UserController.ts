import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserServices'
import DeleteUserService from '@modules/users/services/DeleteUserServiec'
import UpdateUserService from '@modules/users/services/UpdateUserService'

export default class UserController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({ name, email, password })

    user.password = null as never

    return response.status(201).json(classToClass(user))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const { name, email, old_password, password } = request.body

    const updateUserService = container.resolve(UpdateUserService)

    const user = await updateUserService.execute({ user_id, name, email, old_password, password })

    user.password = null as never

    return response.status(200).json(classToClass(user))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const deleteUserService = container.resolve(DeleteUserService)

    await deleteUserService.execute({ user_id })

    return response.status(204).send()
  }
}
