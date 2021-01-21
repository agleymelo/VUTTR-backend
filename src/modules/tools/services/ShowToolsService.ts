import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import AppError from '@shared/error/AppError'

import Tools from '../infra/typeorm/entities/Tools'
import IToolsRepository from '../repositories/IToolsRepository'

type IRequest = {
  tools_id: string
  user_id: string
}

@injectable()
export default class ShowToolsService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  public async execute({ tools_id, user_id }: IRequest): Promise<Tools> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const tools = await this.toolsRepository.findById(tools_id)

    if (!tools) {
      throw new AppError('Tool not found!', 404)
    }

    return tools
  }
}
